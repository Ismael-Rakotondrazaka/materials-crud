<template>
  <header>
    <div class="container">
      <header class="d-flex justify-content-center py-3">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <RouterLink
              to="/"
              class="nav-link"
              :class="{
                active: $route.name == 'home'
              }"
              >Accueil</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              to="/about"
              class="nav-link"
              :class="{
                active: $route.name == 'about'
              }"
              >A propos</RouterLink
            >
          </li>
        </ul>
      </header>
    </div>
  </header>
</template>

<script setup></script>

<style scoped></style>
