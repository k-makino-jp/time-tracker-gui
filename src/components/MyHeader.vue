<template>
  <div>
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark flex-md-nowrap p-0 shadow">
      <div class="container-fluid">
        <a class="navbar-brand" href="index.html">Time Tracker GUI</a>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
              data-bs-toggle="dropdown" aria-expanded="false">
              Development
            </button>
            <ul class="dropdown-menu text-small shadow" style="">
              <li><a class="dropdown-item" target="_blank"
                  href="https://v3.ja.vuejs.org/guide/introduction.html">Vue.js</a></li>
              <li> <a class="dropdown-item" target="_blank"
                  href="https://getbootstrap.jp/docs/5.0/getting-started/introduction/">Bootstrap</a></li>
            </ul>
          </div>
        </div>

      </div>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  background-color: #4169e1;
}

.navbar-brand {
  padding-left: .1rem;
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: 1rem;
}

#dropdownMenuButton {
  background-color: #4169e1;
  border: #4169e1;
  font-size: 0.9rem;
}
</style>
