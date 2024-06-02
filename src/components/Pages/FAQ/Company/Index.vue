<script setup>
import Header from '../../../Partials/Header.vue'
import Footer from '../../../Partials/Footer.vue';
</script>

<template>
    <div>
        <Header />
        <section class="content section">
            <div class="container">
                <div class="columns">
                    <div class="column is-12">
                        <h1>Contact</h1>
                        <form @submit.prevent="submitForm">
                            <div class="mb-3">
                                <label for="your-name" class="form-label">Your Name</label>
                                <input type="text" v-model="formData.name" class="form-control" id="your-name" placeholder="Your Name">
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Your Email</label>
                                <input type="email" v-model="formData.email" class="form-control" id="email" placeholder="name@example.com">
                            </div>
                            <div class="mb-3">
                                <label for="content" class="form-label">Message</label>
                                <textarea class="form-control" v-model="formData.message" id="content" rows="3"></textarea>
                            </div>
                            <button type="submit" class="btn btn-main">Send</button>
                        </form>
                        <p>We are here to answer any questions or inquiries that you may have. Reach out to us and we will
                            respond as soon as possible. In the mean time please have a look at our <a
                                href="/landing/terms-of-service">terms of service</a>.</p>
                        <p><br></p>
                        <p>Email: <a href="mailto:contact@j2download.com">contact@j2download.com</a></p>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </div>
</template>

<script>
export default {
  name: 'Company',
  data() {
    return {
        formData: {
        name: '',
        email: '',
        message: '',
      },
    };
  },
  methods: {
    submitForm() {
      this.formData = {}
    },
  },
};
</script>

<style scoped>
.ad-main.active {
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    overflow: auto;
    background-color: #000;
    background-color: rgba(10, 10, 10, .86);
    padding-right: 0;
    padding-left: 0
}

.ad-main.active .container {
    background-color: #fefefe;
    padding-bottom: 1.5rem;
    margin-top: 51px
}

.mb-3 {
    margin-bottom: 1rem
}

.ad-main hr {
    margin-bottom: .5rem;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, .1)
}

.hr-ad.hr-bottom {
    margin-bottom: 1rem
}

.ad-main .abutton,
.ad-main .notification,
.ad-main hr {
    display: none
}

.ad-main.active .abutton,
.ad-main.active .notification,
.ad-main.active hr {
    display: block
}

.ad-main.active .ad-boxcontent {
    padding-left: 15px;
    padding-right: 15px
}

.modalothervideo {
    margin-top: 1rem
}

.ad-main .modal-close {
    display: none
}

.ad-main.active .modal-close {
    display: block
}

@media screen and (max-width:960px) {
    .ad-box {
        min-height: 100px
    }
}

.app-header {
    display: flex;
    height: 50px;
    width: 100%;
    padding: 6px 16px;
    justify-content: space-between;
    align-items: center;
    background-color: #eeecf4
}

.app-header img {
    width: 42px;
    height: 42px
}

.app-cta {
    font-size: 11px;
    line-height: 13px;
    color: #70757a;
    margin-right: 4px;
    grid-row: 2/2
}

.app-info {
    width: 100%;
    padding-left: 8px;
    padding-right: 8px;
    white-space: nowrap;
    display: grid;
    text-align: left
}

.app-name {
    font-size: 14px;
    line-height: 18px;
    color: #353439;
    white-space: nowrap;
    grid-column: 1/1
}

.store_info img {
    width: 8px;
    height: 8px
}

.store_info {
    display: flex;
    align-items: flex-end
}

.store_info span {
    margin-right: 8px
}

.app-install {
    display: block;
    background: #00c214;
    background: linear-gradient(0deg, #00c214 0, #24e837 100%);
    color: #fff;
    padding: 4px 16px;
    border-radius: 6px;
    clear: both;
    display: inline-block;
    white-space: nowrap
}

.app-head {
    display: none
}

@media only screen and (max-width:600px) {
    .app-head {
        display: block;
        height: 50px
    }
}

.banner-pagedl {
    display: block;
    margin-left: -16px;
    margin-right: -16px
}

.app-header {
    display: none
}

.navbar-item .nav-app {
    font-size: 16px;
    font-weight: 500;
    border: 1px solid #2f72e2;
    background: #e6efff;
    border-radius: 4px;
    padding: 4px 12px;
    display: flex;
    align-items: center;
    color: #2f72e2;
    cursor: pointer
}

.navbar-item .nav-app svg {
    margin-right: 8px
}

@media screen and (min-width:1024px) {
    .navbar-item .nav-app {
        display: none
    }
}

.inputurl-container .form-submit {
    display: flex
}

.mb-3 {
    margin-bottom: 1rem !important;
}

label {
    display: inline-block;
}

.form-label {
    margin-bottom: .5rem;
    font-weight: 600;
}

.form-control {
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

textarea.form-control {
    min-height: 150px;
}

.alert-success {
    color: #0f5132;
    background-color: #d1e7dd;
    border-color: #badbcc;
}

.share-button {
    position: fixed;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    line-height: 40px;
    border: none;
    background-color: #29b76b;
    bottom: 80px;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
}

.icon-sprite {
    background: url(/assets/imgs/css_sprites.png) no-repeat;
    background-size: 173px 96px;
}

.icon.icon-sprite.icon-share {
    background-position: -39.5px -63px;
    display: table-cell;
    width: 20px;
    height: 20px;
}

.icon.icon-sprite.icon-gplay {
    background-position: -5px -5px;
    width: 163px;
    height: 48px;
}

.icon.icon-sprite.icon-reddit {
    background-position: -5px -64px;
    width: 25px;
    height: 25px;
}

</style>