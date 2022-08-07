<template>
  <nav class="col-md-3 col-lg-2 d-md-block sidebar collapse">
    <div class="position-sticky list-group list-group-flush scrollarea">
      <ul class="nav flex-column">
        <li class="nav-item">
          <h6 class="d-flex justify-content-between px-3 mt-3 mb-3 text-muted"> <span>Tools</span> </h6>
          <router-link to="/" @click="activate('/')" class="nav-link list-group-item sidebaritem list-group-item-action px-4 py-3 lh-tight"
            :class="{ active: isActiveTimeTracker }">
            <span data-feather="clock"></span>Time Tracker
          </router-link>

          <router-link to="/timetrackerforazuredevops" @click="activate('/timetrackerforazuredevops')" class="nav-link list-group-item sidebaritem list-group-item-action px-4 py-3 lh-tight"
            :class="{ active: isActiveTimeTrackerForAzureDevOps }">
            <span data-feather="clock"></span>Time Tracker For Azure DevOps
          </router-link>

          <router-link to="/timeconverter" @click="activate('/timeconverter')"
            class="nav-link list-group-item sidebaritem list-group-item-action px-4 py-3 lh-tight"
            :class="{ active: isActiveTimeConverter }">
            <span data-feather="activity"></span>Time Converter
          </router-link>

          <h6 class="d-flex justify-content-between px-3 mt-3 mb-3 text-muted"> <span>References</span> </h6>
          <router-link to="/usage" @click="activate('/usage')"
            class="nav-link list-group-item sidebaritem list-group-item-action px-4 py-3 lh-tight"
            :class="{ active: isActiveTimeTrackerUsage }">
            <span data-feather="file"></span>Usage
          </router-link>

          <a class="nav-link list-group-item sidebaritem list-group-item-action px-4 py-3 lh-tight"
            href="https://v3.ja.vuejs.org/guide/introduction.html">
            <span data-feather="github"></span>Git Repository </a>
        </li>
      </ul>
    </div>
  </nav>
</template>


<script>
export default {
  data() {
    return {
      isActiveTimeTracker: false,
      isActiveTimeTrackerForAzureDevOps:false,
      isActiveTimeConverter: false,
      isActiveTimeTrackerUsage: false
    }
  },
  methods: {
    activate(path) {
      this.isActiveTimeTracker = false;
      this.isActiveTimeTrackerForAzureDevOps = false;
      this.isActiveTimeConverter = false;
      this.isActiveTimeTrackerUsage = false;
      switch (path) {
        case '/':
          this.isActiveTimeTracker = true;
          break;
        case '/timetrackerforazuredevops':
          this.isActiveTimeTrackerForAzureDevOps = true;
          break;
        case '/timeconverter':
          this.isActiveTimeConverter = true;
          break;
        case '/usage':
          this.isActiveTimeTrackerUsage = true;
          break;
      }
    }
  }
}
</script>

<style scoped>
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
  margin-bottom: 3px;
  color: #727272;
  width: 16px;
  height: 16px;
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
</style>
