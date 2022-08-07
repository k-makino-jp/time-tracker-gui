<template>
  <MyHeader></MyHeader>
  <div class="container-fluid">
    <div class="row">
      <nav class="col-md-3 col-lg-2 d-md-block sidebar collapse">
        <MySidebar></MySidebar>
      </nav>
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
  font-size: .875rem;
  background-color: #f8f8f8;
  padding-top: 50px;
}
</style>
