<template>
  <div class="d-inline-block text-start">
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="bsTarget">
      Ajouter un nouveau matériel
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      :id="modalId"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Ajouter un nouveau matériel</h1>

            <button
              @click="resetModels"
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label :for="'edit_name_material_' + id" class="form-label">Désignation</label>

                <input
                  type="text"
                  class="form-control"
                  :id="'edit_name_material_' + id"
                  :class="[nameInputClass]"
                  v-model="nameModel"
                />

                <div class="invalid-feedback">{{ errors.name }}</div>
              </div>

              <div class="mb-3">
                <label :for="'edit_quantity_material_' + id" class="form-label">Quantité</label>

                <input
                  type="number"
                  class="form-control"
                  min="0"
                  :id="'edit_quantity_material_' + id"
                  :class="[quantityInputClass]"
                  v-model="quantityModel"
                />

                <div class="invalid-feedback">{{ errors.quantity }}</div>
              </div>

              <div class="mb-3">
                <label :for="'edit_status_material_' + id" class="form-label">État</label>

                <select
                  v-model="statusModel"
                  class="form-select is-valid"
                  :id="'edit_status_material_' + id"
                  required
                >
                  <option value="bon">Bon</option>
                  <option value="mauvais">Mauvais</option>
                  <option value="abîmé">Abîmé</option>
                </select>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button
              @click="resetModels"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Annuler
            </button>

            <button
              :disabled="haveErrors"
              @click="updateMaterial"
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Enregistrer les modifications
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMaterialStore } from "../../stores/material";
import { computed, ref, watch } from "vue";

const materialStore = useMaterialStore();

const modalId = computed(() => `add_material_modal`);

const bsTarget = computed(() => `#${modalId.value}`);

const nameModel = ref("");
const statusModel = ref("bon");
const quantityModel = ref(0);

const errors = ref({
  name: null,
  quantity: null
});

const haveErrors = computed(() => {
  let result = false;

  for (const key in errors.value) {
    if (Object.hasOwnProperty.call(errors.value, key) && errors.value[key] !== null) {
      result = true;
      break;
    }
  }

  return result;
});

const resetModels = () => {
  nameModel.value = "";
  statusModel.value = "bon";
  quantityModel.value = 0;
};

const nameInputClass = computed(() => (errors.value.name ? "is-invalid" : "is-valid"));

const quantityInputClass = computed(() => (errors.value.quantity ? "is-invalid" : "is-valid"));

watch(
  nameModel,
  (newValue) => {
    const trimmed = newValue.trim();

    if (trimmed.length > 0) {
      errors.value.name = null;
    } else {
      errors.value.name = "La désignation du matériel est requis.";
    }
  },
  {
    immediate: true
  }
);

watch(
  quantityModel,
  (newValue) => {
    if (newValue >= 0) {
      errors.value.quantity = null;
    } else {
      errors.value.quantity = "La quantité du matériel doit être positive.";
    }
  },
  {
    immediate: true
  }
);

const updateMaterial = () => {
  if (!haveErrors.value) {
    materialStore.createMaterial({
      name: nameModel.value,
      status: statusModel.value,
      quantity: quantityModel.value
    });

    resetModels();
  }
};
</script>

<style scoped></style>
