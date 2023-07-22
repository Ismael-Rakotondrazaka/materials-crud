<template>
  <div>
    <table class="table table-striped">
      <thead class="table-primary">
        <tr>
          <th class="" scope="col">Id</th>
          <th class="text-center" scope="col">Designation</th>
          <th class="" scope="col">État</th>
          <th class="text-center" scope="col">Quantité</th>
          <th class="text-center" scope="col" style="width">Actions</th>
        </tr>
      </thead>

      <tbody class="">
        <MaterialItem
          v-for="material in materials"
          :key="material.id"
          :id="material.id"
          :name="material.name"
          :status="material.status"
          :quantity="material.quantity"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import MaterialItem from "./MaterialItem.vue";

defineProps({
  materials: {
    type: Array,
    required: false,
    default: () => []
  }
});
</script>

<style scoped></style>
