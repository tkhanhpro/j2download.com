<template>
  <section id="main" class="section">
    <div class="container">
      <div id="download" class="download">
        <div class="download-box">
          <div class="video-header mb-3">
            <img :src="thumbnail(data?.thumbnail)" class="avatar" alt="thumbnail" id="thumbnail" />
            <div class="info">
              <div class="video-title">{{ data?.title }}</div>
              <span>{{ data?.author }} ️</span>
            </div>
          </div>
          <div class="video-medias">
            <div v-for="(media, index) in data?.medias" :key="index" class="video-links">
              <button 
                  :class="[index === 0 ? 'button download-file mt-3'  
                  : (media.type == 'video' ? 'button download-file' : 'button download-file is-secondary') + ' mt-3']"
                  @click="downloadItem(media?.url, media?.quality ?? media?.format, media?.extension)">
                <i class="icon icon-down"></i>{{ (media?.quality ?? media?.format) || medias?.extension }}
              </button>
            </div>
            <div class="video-links">
              <a href="/" class="button is-black mt-3">{{ t("card.download_other_video") }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import config from "../../config";
import apiService from "../../services/apiService";
export default {
  name: "Card",
  props: ["data", "t"],
  data() {
    return {
      api_url_download: config.API_URL_DOWNLOAD
    };
  },
  methods: {
    downloadItem(url, quality, extension) {
      const name = import.meta.env.VITE_J2NAME;
      quality = this.toUnicode(quality);
      const object_data = { url, extension, name, quality };
      apiService.downloadFile(object_data);
    },
    thumbnail(url) {
      if(url && url != '') {
        return this.api_url_download + url + '&extension=jpg';
      }
      return './static/png/j2download.png';
    },
    toUnicode(str) {
      return str.split('').map(function (value, index, array) {
          var temp = value.charCodeAt(0).toString(16).toUpperCase();
          if (temp.length > 2) {
              return '\\u' + temp;
          }
          return value.trim();
      }).join('');
    }
  },
};
</script>