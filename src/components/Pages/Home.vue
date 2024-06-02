
<template>
  <div>
    <Header />
    <div class="indexBody">
      <Input />
      <Main />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../Partials/Header.vue';
import Footer from '../Partials/Footer.vue';
import Input from '../Container/Input.vue';
import Main from '../Container/Main.vue';
</script>