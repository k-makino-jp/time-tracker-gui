<template>
  <MyHeader></MyHeader>
  <div class="container-fluid">
    <div class="row">
      <MySidebar></MySidebar>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue'
import MySidebar from './components/MySidebar.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import feather from 'feather-icons'

export default {
  name: 'App',
  components: {
    MyHeader,
    MySidebar,
  },
  mounted() {
    feather.replace();
  }
}
</script>

<style>
body {
  background-color: #f8f8f8;
  overflow-y: scroll;
  font-size: .875rem;
  padding-top: 50px;
}
</style>
