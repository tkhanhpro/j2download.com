<template>
  <section id="hero" class="section hero">
    <div class="container w100">
      <h1 class="title">{{ $t(`title.${this.type}`) }}</h1>
      <h2 class="title title-2">{{ $t("title_2." + this.type) }}</h2>
      <form @submit.prevent="submitForm">
        <div class="message" :class="{ show: showError }">
          <div class="message-body">{{ errorMessage }}</div>
        </div>
        <div class="is-relative" style="overflow: hidden; width: 100%">
          <input
            name="url"
            id="url"
            type="text"
            class="link-input"
            :placeholder="$t('placeholder')"
            aria-label="Name"
            autocomplete="off"
            autocapitalize="none"
            v-model="clearValue"
            @input="updateButtonLabel"
          />
          <input name="lang" value="vn" type="hidden" />
          <button
            class="button button-paste transition-all"
            :class="isPasted ? 'btn-clear' : ''"
            type="button"
            @click="pasteOrClear"
          >
            <i class="icon icon-paste"></i>
            {{ pasteOrClearLabel }}
          </button>
        </div>
        <button
          type="submit"
          aria-label="Get"
          class="button button-go is-link transition-all"
          @click="getAioData"
        >
          <i class="icon icon-down"></i>
          {{ $t("download_icon") }}
        </button>
        <div class="get-loader flex-center transition-all">
          <span class="j2download-loader"></span>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import apiService from "../../services/apiService";
import Card from "../Partials/Card.vue";
import CardMutil from "../Partials/CardMutil.vue";
import { createApp, h } from "vue";
import CryptoJS from "crypto-js";
import config from "../../config";
export default {
  name: "Input",
  data() {
    return {
      type: this.$route.meta.type,
      showError: false,
      timeoutId: null,
      errorMessage: "",
      clearValue: "",
      fullPage: true,
      loading: null,
      isPasted: false,
    };
  },
  components: [Card, CardMutil],
  computed: {
    pasteOrClearLabel() {
      return this.isPasted ? this.$t("clear_icon") : this.$t("paste_icon");
    },
  },
  methods: {
    showErrorPopup(message) {
      this.showError = true;
      this.errorMessage = message;
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.timeoutId = setTimeout(() => {
        this.hideErrorPopup();
      }, 5000);
    },
    hideErrorPopup() {
      this.showError = false;
      this.errorMessage = "";
    },
    showLoader(status) {
      if (status) {
        this.loading = this.$loading.show({
          container: this.fullPage ? null : this.$refs.formContainer,
          canCancel: true,
          onCancel: this.onCancel,
          loader: 'dots',
          color: '#31D36F',
          width: 128,
          height: 128,
        });
      } else if (this.loading) {
        this.loading.hide();
        this.loading = null;
      }
    },
    updateButtonLabel() {
      this.isPasted = this.clearValue.length > 0;
    },
    pasteOrClear() {
      if (this.isPasted) {
        this.clearValue = "";
        this.isPasted = false;
      } else {
        navigator.clipboard
          .readText()
          .then((text) => {
            this.clearValue = text;
            this.isPasted = true;
          })
          .catch(() => {
            return this.showErrorPopup(this.$t("paste_button.error"));
          });
      }
    },
    isRegexURL(url) {
      const regexUrlText = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
      const found = (url).match(regexUrlText);
      const urlLink = found ? found[0] : url;
      const regexSocialMedia = /^(?:https?:\/\/)?(?:[\w-]+\.)?(tiktok|douyin|iesdouyin|capcut|instagram|threads|facebook|fb|espn|kuaishou|pinterest|pin|imdb|imgur|ifunny|reddit|youtube|youtu|twitter|x|t|vimeo|snapchat|bilibili|dailymotion|sharechat|linkedin|tumblr|hipi|getstickerpack|xvideos|xnxx|xiaohongshu|weibo|miaopai|meipai|xiaoying|nationalvideo|yingke|soundcloud|mixcloud|spotify|zingmp3|bitchute|febspot|bandcamp|izlesene|9gag|rumble|streamable|ted|sohu|ixigua)\.[a-z]{2,}(\/.*)?$/i;
      return regexSocialMedia.test(urlLink);
    },
    secretKey() {
      var decrypted = CryptoJS.AES.decrypt(config.J2DOWN_SECRET, 'manhg-api');
      return decrypted.toString(CryptoJS.enc.Utf8);
    },
    async getAioData() {
      try {
        this.showLoader(true);
        if (!this.isRegexURL(this.clearValue)) {
          return this.showErrorPopup(this.$t("invalid_url"));
        }

        const encryptedPayload = CryptoJS.AES.encrypt(
          JSON.stringify({ url: this.clearValue, unlock: true }),
          this.secretKey()
        ).toString();
        let response = await apiService.getAio(encryptedPayload);
        
        if (response.data.error) {
          return this.showErrorPopup(this.$t(response.data.message));
        }
        let cardDownload = Card;
        
        if(this.clearValue.includes("instagram.")){
          if(response.data.type == 'multiple'){
            cardDownload = CardMutil;
          }
        }else if(['tiktok.', 'weibo.'].some(v => this.clearValue.includes(v))) {
          const hasNonVideo = response.data.medias.some((media) => media.type === "video");
          cardDownload = hasNonVideo ? Card : CardMutil;
        }

        const indexBody = document.querySelector(".indexBody");
        indexBody.innerHTML = "";
        const container = document.createElement("div");
        document.body.appendChild(container);

        const app = createApp({
          render: () => h(cardDownload, { data: response.data, t: this.$t }),
        });

        app.component("Card", cardDownload);
        app.mount(container);
        indexBody.appendChild(container);
      } catch (err) {
        return this.showErrorPopup(this.$t("error"));
      } finally {
        this.showLoader(false);
      }
    },
  },
};
</script>
