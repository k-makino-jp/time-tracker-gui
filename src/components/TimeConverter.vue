<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 mb-3 border-bottom">
    <h1>Time Converter</h1>
  </div>

  <div class="card">
    <div class="card-header">
      <h4>Convert time hh:mm:ss to hours, minutes or seconds</h4>
    </div>
    <div class="card-body">
      <form @submit.prevent="calculate">
        <div class="mb-3">
          <label class="form-label">Please enter hh:mm:ss</label>
          <input v-model="inputTime" class="form-control" placeholder="12:34:56" pattern="\d{2}:\d{2}:\d{2}" required>
        </div>

        <div class="mb-3">
          <label class="form-label">Please select unit</label>
          <div class="form-select">
            <select v-model="selectedUnit" @click="calculate">
              <option>hour</option>
              <option>minute</option>
              <option>second</option>
            </select>
          </div>
        </div>

        <div class="mb-3 pb-3 border-bottom">
          <button type="submit" class="btn btn-primary">{{ buttonContent }}</button>
        </div>

        <div>
          <h6>Result: {{ result }} [{{ selectedUnit }}]</h6>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonContent: 'Calculate',
      result: 0,
      inputTime: '',
      selectedUnit: 'hour',
      activeTimeConverter: 'active'
    }
  },
  methods: {
    calculate() {
      const inputTimeElements = this.inputTime.split(':');
      const hours = parseInt(inputTimeElements[0]);
      const minutes = parseInt(inputTimeElements[1]);
      const seconds = parseInt(inputTimeElements[2]);
      if (this.selectedUnit == 'hour') {
        this.result = hours + minutes / 60 + seconds / 3600;
      } else if (this.selectedUnit == 'minute') {
        this.result = hours * 60 + minutes + seconds / 60;
      } else {
        this.result = hours * 3600 + minutes * 60 + seconds;
      }
    },
  }
}
</script>

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
  padding-left: .2rem;
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
