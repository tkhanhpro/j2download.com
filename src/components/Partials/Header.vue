<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <div class="navbar-item logo">
          <a :href="lang === 'en' ? '/' : '/' + lang " class="fs24 fw700" :title="this.$t('title.' + this.type)">
            {{ $t("first_name") }} <span>{{ $t("last_name") }}</span>
          </a>
          <a :href="$t('install_app.android')" class="flex-center button button-install">
            <i class="icon icon-mobile"></i> <span class="nav_install_label">{{ $t("container.title_download") }}</span>
          </a>
        </div>
        <div role="button" class="navbar-burger" aria-label="Menu" data-target="downloader-menu"
          @click="toggleBurgerMenu" :class="{ 'is-active': isBurgerActive }">
          <span></span><span></span><span></span>
        </div>
      </div>
      <div id="downloader-menu" class="navbar-menu transition-all" :class="{ 'is-active': isBurgerActive }">
        <div class="navbar-start"></div>
        <div class="navbar-end">
          <div id="locale-control" class="navbar-item has-dropdown is-hoverable" aria-label="Language">
            <div class="navbar-link fw600 transition-all">
              {{ $t("select_language") }}
            </div>
            <div class="navbar-dropdown transition-all">
              <ul>
                <li v-for="language in languages" :key="language.code">
                  <a :href="getLanguageLink(language.code)" class="navbar-item" 
                    :class="{ 'is-active': language.code === lang }" 
                    @click.prevent="changeLanguage(language.code)">
                    {{ language.language }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      type: this.$route.meta.type || 'tiktok',
      lang: localStorage.getItem("lang") || "en",
      languages: [
        { language: "🇺🇸 English", code: "en" },
        { language: "🇻🇳 Vietnamese", code: "vi" },
        { language: "🇨🇳 中国", code: "zh" },
        { language: "🇮🇩 Indonesia", code: "id" },
        { language: "🇨🇿 Čeština", code: "cs" },
        { language: "🇪🇸 Español", code: "es" },
        { language: "🇫🇷 Français", code: "fr" },
        { language: "🇩🇪 German", code: "de" },
        { language: "🇮🇹 Italian", code: "it" },
        { language: "🇭🇺 Magyar", code: "hu" },
        { language: "🇲🇾 Malaysia", code: "ms" },
        { language: "🇳🇱 Nederlands", code: "nl" },
        { language: "🇵🇱 Polish", code: "pl" },
        { language: "🇵🇹 Português", code: "pt" },
        { language: "🇹🇭 Thailand", code: "th" },
        { language: "🇹🇷 Turkish (Turkey)", code: "tr" },
        { language: "🇬🇷 Ελληνικά", code: "el" },
        { language: "🇺🇦 украї́нська мо́ва", code: "uk" },
        { language: "🇷🇺 Русский", code: "ru" },
        { language: "🇸🇦 عَرَبِيّ", code: "ar" },
        { language: "🇰🇷 한국어", code: "ko" },
        { language: "🇯🇵 日本語", code: "ja" },
        { language: "🏴󠁡󠁲󠁡󠁿 Basa Jawa", code: "jv" },
        { language: "🇷🇴 Română", code: "ro" },
      ],
      isBurgerActive: false,
      dynamicPath: "",
    };
  },
  head() {
    return {
      title: this.$t('header.' + this.type + '.title') || 'J2download - All In One',
      htmlAttrs: {
        lang: this.lang,
      },
      meta: [
        { name: 'application-name', content: this.$t('header.' + this.type + '.meta.application_name') },
        { hid: 'description', name: 'description', content: this.$t('header.' + this.type + '.meta.description'), id: 'desc' },
        // Twitter
        { name: 'twitter:title', content: this.$t('header.' + this.type + '.meta.twitter.title') },
        // with shorthand
        { n: 'twitter:description', c: this.$t('header.' + this.type + '.meta.twitter.description') },
        // ...
        // Google+ / Schema.org
        { itemprop: 'name', content: this.$t('header.' + this.type + '.meta.itemprop.name') },
        { itemprop: 'description', content: this.$t('header.' + this.type + '.meta.itemprop.description') },
        // ...
        // Facebook / Open Graph
        { property: 'fb:app_id', content: this.$t('header.' + this.type + '.meta.fb_app_id') },
        { property: 'og:title', content: this.$t('header.' + this.type + '.meta.og_title') },
        // with shorthand
        { p: 'og:image', c: this.$t('header.' + this.type + '.meta.og_image') },
      ],
      link: [
        { rel: 'canonical', href: window.location.href, id: 'canonical' },
        { rel: 'author', href: this.$t('header.' + this.type + '.links.author'), undo: false },
        {
          rel: 'shortcut icon', href: this.$t('header.' + this.type + '.links.icon.href'),
          sz: this.$t('header.' + this.type + '.links.icon.size'), t: 'image/png'
        },
        { rel: 'apple-touch-icon', href: this.$t('header.' + this.type + '.links.icon.href'), t: 'image/png'}
      ],
    }
  },
  created() {
    this.dynamicPath = this.regexPathName(window.location.pathname, this.languages);
    if (window.location.href === window.location.origin + '/' && this.lang !== "en") {
      const newURL = '/' + this.lang;
      window.history.pushState({ path: newURL }, '', newURL);
    }
  },
  methods: {
    getLanguageLink(languageCode) {
      return languageCode === "en" ? this.dynamicPath || '/' : '/' + languageCode + this.dynamicPath;
    },
    regexPathName(url, languages) {
      let lastPart = url;
      languages.forEach(lang => {
        lastPart = lastPart.replace(`/${lang.code}`, '').replace(`${lang.code}/`, '');
      });
      return lastPart.replace(/\/$/, '');
    },
    changeLanguage(lang) {
      localStorage.setItem("lang", lang);
      this.lang = lang;
      this.$i18n.locale = lang;
      const lastPath = this.dynamicPath || '/';
      window.location.href = lang === "en" ? lastPath : '/' + lang + this.dynamicPath;
    },
    toggleBurgerMenu() {
      this.isBurgerActive = !this.isBurgerActive;
    },
  },
};
</script>