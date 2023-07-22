import { axios } from "../utils/axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useMaterialStore = defineStore(
  "material",
  () => {
    const STATUS_VALUE = {
      GOOD: "bon",
      BAD: "mauvais",
      DAMAGED: "abîmé"
    };

    const materials = ref([]);

    // total numbers of materials
    const totalCount = computed(() =>
      materials.value.reduce((prev, curr) => curr.quantity + prev, 0)
    );

    // total numbers of damaged materials, not the number of type of materials
    const goodCount = computed(() =>
      materials.value.reduce(
        (prev, curr) => (curr.status === STATUS_VALUE.GOOD ? curr.quantity + prev : prev),
        0
      )
    );

    const badCount = computed(() =>
      materials.value.reduce(
        (prev, curr) => (curr.status === STATUS_VALUE.BAD ? curr.quantity + prev : prev),
        0
      )
    );

    const damagedCount = computed(() =>
      materials.value.reduce(
        (prev, curr) => (curr.status === STATUS_VALUE.DAMAGED ? curr.quantity + prev : prev),
        0
      )
    );

    // this one is used to get materials from the db, not from the store, which is directly accessible from anywhere
    const getMaterials = () => axios("/materials").then((response) => response.data);

    const getMaterial = (id) => axios(`/materials/${id}`).then((response) => response.data);

    const findIndex = (id) => materials.value.findIndex((value) => value.id === id);

    const createMaterial = (data) => {
      axios.post("/materials", data).then((response) => materials.value.push(response.data));
    };

    const updateMaterial = (id, updates) =>
      getMaterial(id)
        .then((material) => {
          for (const key in updates) {
            if (Object.hasOwnProperty.call(updates, key)) {
              material[key] = updates[key];
            }
          }

          return material;
        })
        .then((material) =>
          axios.put(`/materials/${id}`, material).then(() => {
            const index = findIndex(id);

            if (index !== -1) {
              materials.value[index] = material;
            }
          })
        );

    const deleteMaterial = (id) => {
      axios.delete(`/materials/${id}`).then(() => {
        const index = findIndex(id);

        if (index !== -1) {
          materials.value.splice(index, 1);
        }
      });
    };

    return {
      materials,
      STATUS_VALUE,
      totalCount,
      goodCount,
      badCount,
      damagedCount,
      getMaterials,
      getMaterial,
      createMaterial,
      updateMaterial,
      deleteMaterial
    };
  },
  {
    persist: true
  }
);
