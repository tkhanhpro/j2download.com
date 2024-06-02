<template>
  <div>
    <h3 class="title f16">{{ $t("container.title_download") }}</h3>
    <p>{{ $t("container.description_title." +this.type) }}</p>
    <br />
    <div class="text-center app-wrapper">
      <a class="link-app android-link" :href="$t('install_app.android')"  rel="nofollow noopener">
        <i class="icon icon-ggplay"></i>
      </a>
      <a class="link-app ios-link" :href="$t('install_app.ios')"  rel="nofollow noopener">
        <i class="icon app-store"></i>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppStore',
    props: ['type']
  }
</script>
