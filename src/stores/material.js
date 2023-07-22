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

    const lastId = ref(0);

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
    const getMaterial = (id) => materials.value.find((value) => value.id === id);

    const findIndex = (id) => materials.value.findIndex((value) => value.id === id);

    const createMaterial = (data) => {
      const material = {};

      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          material[key] = data[key];
        }
      }

      material.id = ++lastId.value;

      materials.value.push(material);
    };

    const updateMaterial = (id, updates) => {
      const material = getMaterial(id);

      if (material) {
        for (const key in updates) {
          if (Object.hasOwnProperty.call(updates, key)) {
            material[key] = updates[key];
          }
        }
      }
    };

    const deleteMaterial = (id) => {
      const index = findIndex(id);

      if (index !== -1) {
        materials.value.splice(index, 1);
      }
    };

    return {
      materials,
      STATUS_VALUE,
      totalCount,
      goodCount,
      badCount,
      damagedCount,
      lastId,
      getMaterial,
      createMaterial,
      updateMaterial,
      deleteMaterial
    };
  },
  {
    persist: {
      afterRestore: (ctx) => {
        const hasBeenUsed = localStorage.getItem("hasBeenUsed");

        if (hasBeenUsed !== "true") {
          const store = useMaterialStore();
          // we initialize with fake data
          store.materials = [
            {
              id: 1,
              name: "Stylo",
              status: "bon",
              quantity: 50
            },
            {
              id: 2,
              name: "Cahiers",
              status: "bon",
              quantity: 20
            },
            {
              id: 3,
              name: "Crayon",
              status: "abîmé",
              quantity: 10
            },
            {
              id: 4,
              name: "Ruban adhésif",
              status: "mauvais",
              quantity: 5
            },
            {
              id: 5,
              name: "Marqueur",
              status: "bon",
              quantity: 15
            },
            {
              id: 6,
              name: "Ciseaux",
              status: "abîmé",
              quantity: 12
            },
            {
              id: 7,
              name: "Trombone",
              status: "bon",
              quantity: 30
            },
            {
              id: 8,
              name: "Classeur",
              status: "bon",
              quantity: 8
            },
            {
              id: 9,
              name: "Calculatrice",
              status: "bon",
              quantity: 25
            },
            {
              id: 10,
              name: "Feutre",
              status: "abîmé",
              quantity: 3
            },
            {
              id: 11,
              name: "Correcteur",
              status: "bon",
              quantity: 18
            },
            {
              id: 12,
              name: "Stapler",
              status: "mauvais",
              quantity: 7
            },
            {
              id: 13,
              name: "Post-it",
              status: "bon",
              quantity: 40
            },
            {
              id: 14,
              name: "Élastiques",
              status: "bon",
              quantity: 50
            },
            {
              id: 15,
              name: "Chemises",
              status: "abîmé",
              quantity: 22
            }
          ];

          store.lastId = 15;

          // ! mark as used before persist, otherwise it will run into an infinite loop
          localStorage.setItem("hasBeenUsed", "true");
          ctx.store.$persist();
        }
      }
    }
  }
);
