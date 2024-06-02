<template>
  <footer class="footer">
    <section class="section">
      <div class="container">
        <div class="columns footer-link">
          <div class="column" v-for="(section, index) in footerSections" :key="index">
            <h4 class="col-heading">{{ section.title }}</h4>
            <ul class="list-unstyled">
              <li v-for="(link, linkIndex) in section.links" :key="linkIndex">
                <a :href="getLink(link.path)" rel="nofollow">{{ link.text }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="copyright">
        <span>
          © 2022 - {{ getNextYear() }}
          {{ $t("first_name") + $t("last_name") }} - <a href="/"></a> Version 2
        </span>
      </div>
    </div>
    <div id="js-result"></div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      lang: localStorage.getItem("lang") || "en",
      footerSections: [
        {
          title: "Company",
          links: [
            { path: "/landing/contact", text: this.$t("footer.contact_us") },
          ],
        },
        {
          title: "Legal",
          links: [
            { path: "/landing/terms-of-service", text: this.$t("footer.terms_of_service") },
            { path: "/landing/privacy-policy", text: this.$t("footer.privacy_policy") },
          ],
        },
        {
          title: "Tools",
          links: this.getToolLinks(),
        },
      ],
    };
  },
  methods: {
    getNextYear() {
      return new Date().getFullYear();
    },
    getLink(path) {
      return this.lang === "en" ? path : "/" + this.lang + path;
    },
    generateToolLink(pathSuffix, textKey) {
      const currentType = this.$route.meta.type;
      if (currentType !== pathSuffix) {
        const base = pathSuffix;
        const path = `/${base}`;
        const text = this.$t(`footer.tool.${textKey}`);
        return { path, text };
      }
      return null;
    },
    getToolLinks() {
      const links = [
        this.generateToolLink('all', 'all'),
        this.generateToolLink('douyin', 'douyin'),
        this.generateToolLink('tiktok', 'tiktok'),
        this.generateToolLink('how_to_download', 'how_to_download'),
      ];
      links.forEach((link) => {
        if (link !== null && link.path === '/all') {
         link.path = '/';
        }
      });
      return links.filter(link => link !== null);
    },
  },
};
</script>
