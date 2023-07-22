<script setup>
import { RouterView } from "vue-router";
import TheHeader from "@/components/header/TheHeader.vue";
import DemoNotification from "@/components/demo/DemoNotification.vue";
</script>

<template>
  <DemoNotification class="position-absolute top-0 end-0" />

  <TheHeader />

  <RouterView />
</template>

<style scoped></style>
