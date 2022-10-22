<template>
  <nav class="col-md-3 col-lg-2 d-md-block sidebar collapse">
    <div class="position-sticky list-group list-group-flush">
      <ul class="nav flex-column">
        <li class="nav-item">
          <!-- Tools -->
          <h6 class="px-3 mt-3 mb-3 text-muted"> <span>Tools</span> </h6>

          <router-link to="/" active-class="active" class="nav-link list-group-item sidebaritem px-4 py-3">
            <span data-feather="clock"></span>Time Tracker
          </router-link>

          <router-link to="/timeconverter" active-class="active" class="nav-link list-group-item sidebaritem px-4 py-3">
            <span data-feather="activity"></span>Time Converter
          </router-link>

          <router-link to="/pomodorotimer" active-class="active" class="nav-link list-group-item sidebaritem px-4 py-3">
            <span data-feather="watch"></span>Pomodoro Timer
          </router-link>

          <!-- References -->
          <h6 class="px-3 mt-3 mb-3 text-muted"> <span>References</span> </h6>

          <router-link to="/usage" active-class="active" class="nav-link list-group-item sidebaritem px-4 py-3">
            <span data-feather="file"></span>Usage
          </router-link>

          <a class="nav-link list-group-item sidebaritem px-4 py-3"
            href="https://v3.ja.vuejs.org/guide/introduction.html">
            <span data-feather="github"></span>Git Repository </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.sidebar {
  position: fixed;
  background-color: #ffffff;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 48px 0 0; /* Behind the navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1); /* Height of navbar */
}

.list-group .list-group-item.sidebaritem {
  background-color: #ffffff;
  border-top-color: #ffffff;
  border-bottom-color: #ffffff;
}

.list-group .list-group-item.sidebaritem:hover {
  background-color: #dcdcdc;
  border-top-color: #ffffff;
  border-bottom-color: #ffffff;
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  margin-bottom: 3px;
  color: #727272;
  width: 16px;
  height: 16px;
}

.sidebar .nav-link.active {
  color: #007bff;
  background-color: #e6e6e6;
  border-color: #acacac;
  border-top-color: #e7e7e7;
  border-bottom-color: #e7e7e7;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}
</style>
