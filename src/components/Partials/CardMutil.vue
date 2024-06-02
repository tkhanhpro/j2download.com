<template>
  <section id="main" class="section">
    <div class="container">
      <div id="download" class="download">
        <div class="download-box">
          <div class="video-header mb-3">
            <img :src="thumbnail(data?.thumbnail)" @error="onErrorImage()" class="avatar" alt="thumbnail" id="thumbnail" />
            <div class="info">
              <div class="video-title">{{ data?.title }}</div>
              <span>{{ data?.author }} ️</span>
            </div>
          </div>
          <div v-if="hasImageMedia(data.medias)" class="video-medias">
            <div class="video-links">
              <button
                class="button btn-render"
                :disabled="disabled"
                :style="{ opacity: disabled ? '0.5' : '' }"
                @click="clickRender"
              >
                {{ t("card.render_video") }}
              </button>
            </div>
            <div class="video-links">
              <a href="/" class="button is-black mt-3">{{ t("card.download_other_video") }}</a>
            </div>
          </div>
          <div v-else class="video-medias">
            <div class="video-links">
              <a href="/" class="button mt-3">{{ t("card.download_other_video") }}</a>
            </div>
          </div> 
        </div>
        <div class="render-wrapper mt-3 mb-3" :class="{ show: showRender }">
          <p class="render-label">{{ renderLabel }}</p>
          <div class="progress" aria-label="Render progress">
            <div class="progress-bar" :style="{ width: progress + '%' }">{{ progress }}%</div>
          </div>
          <a v-if="renderCompleted"
            :href="api_url_download + downloadUrl + '&extension=mp4'"
            class="button mt-3 download-render show"
          >
            <i class="icon icon-down"></i>{{ t("card.download_video") }}
          </a>
        </div>
        <span class="alert-render"></span>

        <div class="columns is-multiline mt-3">
          <div v-for="(media, index) in data?.medias" :key="index" class="column is-one-third">
            <div v-if="media.type" class="photo">
              <div @click="media.type === 'audio' && !media.thumbnail ? null : openMediaModal(media)">
                <img :src="getImageUrl(media)" loading="lazy" alt="Photo" />
              </div>
              <div class="dl-footer">
                <a :href="getDownloadUrl(media)" class="button w100">
                  {{ getDownloadLabel(media.type) }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div v-if="showImageModal" class="image-modal-overlay" @click="closeImageModal">
          <div class="image-modal">
            <img :src="enlargedImageURL" alt="Enlarged Image" @click.stop />
            <button class="close-button" @click="closeImageModal">X</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import config from "../../config";
import io from 'socket.io-client';

export default {
  name: "Card",
  props: ["data", "t"],
  data() {
    return {
      api_url_download: config.API_URL_DOWNLOAD,
      showRender: false,
      disabled: false,
      progress: 0,
      renderLabel: 'Render In Progress',
      renderCompleted: false,
      downloadUrl: '',
      socket: null,
      showImageModal: false,
      enlargedImageURL: null,
    };
  },
  created() {
    this.socket = io(config.SOCKET_ENDPOINT);
    this.socket.on('render-progress', (response) => {
      this.progress = response.progress;
      this.renderLabel = response.label;
      this.renderCompleted = this.progress === 100;
      this.downloadUrl = response.downloadUrl;
    });
  },
  methods: {
    thumbnail(url) {
      if(url && url != '') {
        return this.api_url_download + url + '&extension=jpg';
      }
      return './static/png/j2download.png';
    },
    onErrorImage() {
      return './static/png/j2download.png';
    },
    openImageModal(imageURL) {
      this.enlargedImageURL = imageURL;
      this.showImageModal = true;
      document.body.classList.add("modal-open");
    },
    closeImageModal() {
      this.showImageModal = false;
      document.body.classList.remove("modal-open");
    },
    openMediaModal(media) {
      const imageUrl = this.getImageUrl(media);
      this.openImageModal(imageUrl);
    },
    getImageUrl(media) {
      if (media.type === 'audio' && media.thumbnail) {
        return `${this.api_url_download}${media.thumbnail}&extension=jpg`;
      } else if (media.type === 'audio') {
        return './static/png/mp3.png';
      } else {
        return `${this.api_url_download}${media.thumbnail || media.url}&extension=jpg`;
      }
    },
    getDownloadUrl(media) {
      return `${this.api_url_download}${media.url}&extension=${media.extension}`;
    },
    getDownloadLabel(mediaType) {
      switch (mediaType) {
        case 'video':
          return this.t("card.download_video");
        case 'audio':
          return this.t("card.download_mp3");
        default:
          return this.t("card.download_photo");
      }
    },
    hasImageMedia(medias) {
      return medias.filter(media => media.type === 'image').length > 0;
    },
    clickRender() {
      this.disabled = true;
      this.showRender = true;

      const { medias } = this.data;
      const audio = medias.find(media => media.type === 'audio');
      const images = medias.filter(media => media.type === 'image').map(media => media.url);

      const requestData = { images, audio };
      this.socket.emit('start-render', requestData);
    },
  }
};
</script>

<style scoped>
/* CSS cho overlay */
.image-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /*  z-index: 999; */
}

/* CSS cho modal */
.image-modal {
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  position: relative;
  text-align: center;
  padding: 0;
}

/* CSS cho hình ảnh trong modal */
.image-modal img {
  max-width: 100%;
  max-height: 70vh;
  margin: 0 auto;
  display: block;
  border: 1px solid #3c8f24;
  border-radius: 10px;
}

/* CSS cho nút đóng modal */
.close-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 0px; 
  border-radius: 50%;
}

/* CSS cho che mờ phía sau modal */
.modal-open {
  overflow: hidden;
}
</style>
