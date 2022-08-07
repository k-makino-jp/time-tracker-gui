<template>
  <div>
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-secondary flex-md-nowrap p-0 shadow">
      <div class="container-fluid">
        <a class="navbar-brand" href="index.html">Time Tracker GUI</a>
        <div class="dropdown collapse navbar-collapse" id="navbarSupportedContent">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            Development
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" target="_blank" href="https://v3.ja.vuejs.org/guide/introduction.html">Vue.js</a>
            <a class="dropdown-item" target="_blank" href="https://getbootstrap.jp/docs/5.0/getting-started/introduction/">Bootstrap</a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
body {
  font-size: .875rem;
  background-color: #f8f8f8;
  padding-top: 50px;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

.card {
  border-radius: 0%;
}

.card-header {
  background-color: #fff;
}

.btn {
  border-radius: 0%;
}

.form-control {
  border-radius: 0%;
}

/*
   * Sidebar
   */

.sidebar {
  position: fixed;
  top: 48px;
  /* rtl:raw:
    right: 0;
    */
  bottom: 0;
  /* rtl:remove */
  left: 0;
  z-index: 100;
  /* Behind the navbar */
  padding: 0px 0 0;
  /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.list-group .list-group-item.sidebaritem {
  background-color: #e7e7e7;
  border-top-color: #e7e7e7;
  border-bottom-color: #e7e7e7;
  /* or whatever color you'd like */
}

.list-group .list-group-item.sidebaritem:hover {
  background-color: #c0c0c0;
  border-top-color: #e7e7e7;
  border-bottom-color: #e7e7e7;
  /* or whatever color you'd like */
}

.sidebar {
  background-color: #e7e7e7;
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto;
  /* Scrollable contents if viewport is shorter than content. */
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #727272;
}

.sidebar .nav-link.active {
  background-color: #cccccc;
  border-color: #acacac;
  border-top-color: #e7e7e7;
  border-bottom-color: #e7e7e7;
  /* border-left-color: #333;
  border-left-width: 4px; */
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

/*
   * Navbar
   */

.navbar {
  background-color: #333;
}

.navbar-brand {
  padding-left: .1rem;
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: 1rem;
}

.navbar .navbar-toggler {
  top: .25rem;
  right: 1rem;
}

.navbar .form-control {
  padding: .75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}

.each-task-spend-time {
  font-family: SFMono-Regular;
}
</style>
