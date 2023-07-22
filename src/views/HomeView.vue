<script setup>
import MaterialList from "../components/materials/MaterialList.vue";
import MaterialStatusChart from "../components/materials/MaterialStatusChart.vue";
import AddMaterial from "../components/materials/AddMaterial.vue";
import { useMaterialStore } from "../stores/material.js";

const materialStore = useMaterialStore();
</script>

<template>
  <main class="container py-5">
    <div class="mb-5">
      <h1 class="fw-bold mb-3">Liste des matériels :</h1>
      <AddMaterial class="my-5" />
      <MaterialList :materials="materialStore.materials" />
    </div>

    <div>
      <h1 class="fw-bold mb-3">Nombre et états des matériels :</h1>
      <MaterialStatusChart
        :goodCount="materialStore.goodCount"
        :badCount="materialStore.badCount"
        :damagedCount="materialStore.damagedCount"
        :totalCount="materialStore.totalCount"
      />
    </div>
  </main>
</template>
