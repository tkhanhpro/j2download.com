<template>
  <section id="main" class="section">
    <div class="container">
      <div id="download" class="download"></div>
      <div class="contents">
        <AutoBot :type="this.type" />
        <div v-if="this.type == 'all'">
          <h2 class="title f24">{{ $t('container.support_platform.title') }}</h2>
          <p class="f16">{{ $t('container.support_platform.description') }}</p>
        </div>
        <!-- <AppStore :type="this.type" /> -->
        <h3 class="title f14">{{ $t("container.title_f14." + this.type) }}</h3>
        <p>{{ $t("container.description_f14." + this.type) }}</p>
        <h3 class="subtitle f14 mb-3">{{ $t("container.subtitle_f14") }}</h3>
        <ul>
          <li v-for="index in 6" :key="index">
            {{ $t("container.main_function." + this.type + "." + index) }}
          </li>
        </ul>
        <br />
        <div class="accordion" id="faq" itemscope itemtype="https://schema.org/FAQPage">
          <div v-for="faqItem in faqItems" :key="faqItem.id" class="accordion-item" itemprop="mainEntity" itemscope
            itemtype="https://schema.org/Question">
            <button class="button is-info btn-accordion">
              <h3 class="accordion-title" itemprop="name">
                {{ $t(`faq.title.${this.type}.${faqItem.id}`) }}
              </h3>
              <span class="icon arrow"></span>
            </button>
            <div class="accordion-content" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
              <div class="accordion-text" itemprop="text">
                {{ $t(`faq.reply.${this.type}.${faqItem.id}`) }}
              </div>
            </div>
          </div>
        </div>
        <p>{{ $t("alert." + this.type) }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import AppStore from "./AppStore.vue";
import AutoBot from "./AutoBot.vue";

export default {
  name: "Main",
  components: { AppStore, AutoBot },
  data() {
    return {
      type: this.$route.meta.type,
      faqItems: Array.from({ length: 12 }, (_, index) => ({ id: index + 1 })),
    };
  },
  mounted() {
    const buttons = this.$el.querySelectorAll(".btn-accordion");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const content = button.nextElementSibling;
        if (button.classList.contains("active")) {
          button.classList.remove("active");
          content.style.maxHeight = null;
        } else {
          const activeButtons = this.$el.querySelectorAll(
            ".btn-accordion.active"
          );
          activeButtons.forEach((activeButton) => {
            activeButton.classList.remove("active");
            activeButton.nextElementSibling.style.maxHeight = null;
          });
          button.classList.add("active");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  },
};
</script>
