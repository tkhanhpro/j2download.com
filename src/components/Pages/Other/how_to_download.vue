<template>
    <div>
        <Header :type="this.type" />
        <section class="section tos page-content">
            <div class="container">
                <div class="columns">
                    <div class="column is-12">
                        <div>
                            <h1 class="mt-0 mb-4 title is-1">{{ this.$t("other.how_to_download.title_h1") }}</h1>
                            <p v-html="this.$t('other.how_to_download.description_h1')"></p>
                        </div>
                        <div>
                            <h2 class="mt-3 title is-2 h3">{{ this.$t("other.how_to_download.introducing.title") }}</h2>
                            <img src="/static/png/homepage-web.png" alt="Homepage Page Web">
                            <p v-html="this.$t('other.how_to_download.introducing.description')"></p>
                        </div>
                        <div>
                            <h3 class="mt-3 h3 title is-3">{{ this.$t("other.how_to_download.feature.title") }}</h3>
                            <p v-html="this.$t('other.how_to_download.feature.description')"></p>
                        </div>
                        <div>
                            <h3 class="mt-3 h3 title is-3">{{ this.$t("other.how_to_download.tutorial.computer.title") }}
                            </h3>
                            <div v-html="this.$t('other.how_to_download.tutorial.computer.description')"></div>
                        </div>
                        <div>
                            <p v-html="this.$t('other.how_to_download.notice')"></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer :type="this.type" />
    </div>
</template>

<script>
import Header from '../../Partials/Header.vue'
import Footer from '../../Partials/Footer.vue';

export default {
    name: 'How to download',
    components: {
        Header, Footer
    },
    data() {
        return {
            type: this.$route.meta.type,
        }
    },
}
</script>