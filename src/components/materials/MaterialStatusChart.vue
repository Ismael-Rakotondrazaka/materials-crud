<template>
  <div class="d-flex justify-content-evenly align-items-center">
    <div class="w-50" style="max-width: 20rem">
      <Doughnut
        :options="chartOptions"
        :data="chartData"
        chart-id="custom-pie-chart"
        dataset-id-key="label"
      />
    </div>

    <div class="">
      <table class="table table-borderless">
        <tbody>
          <tr>
            <td class="align-middle">
              <span
                style="
                  display: inline-block;
                  width: 2rem;
                  height: 2rem;
                  background-color: rgb(0, 197, 105);
                "
              ></span>
            </td>
            <td class="align-middle">Bon</td>
            <td class="align-middle text-end fw-bold text-xl text-success display-6">
              {{ goodCount }}
            </td>
          </tr>
          <tr>
            <td class="align-middle">
              <span
                style="
                  display: inline-block;
                  width: 2rem;
                  height: 2rem;
                  background-color: rgb(253 224 71);
                "
              ></span>
            </td>
            <td class="align-middle">Mauvais</td>
            <td class="align-middle text-end fw-bold text-xl text-warning display-6">
              {{ badCount }}
            </td>
          </tr>
          <tr>
            <td class="align-middle">
              <span
                style="
                  display: inline-block;
                  width: 2rem;
                  height: 2rem;
                  background-color: rgb(255, 10, 84);
                "
              ></span>
            </td>
            <td class="align-middle">Abîmé</td>
            <td class="align-middle text-end fw-bold text-xl text-danger display-6">
              {{ damagedCount }}
            </td>
          </tr>

          <tr>
            <td class="align-middle text-center fw-bold" colspan="2">Total</td>
            <td class="align-middle text-end fw-bold text-xl text-primary display-6">
              {{ totalCount }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { Doughnut } from "vue-chartjs";
import { computed, ref } from "vue";

import { Chart as ChartJS, Tooltip, ArcElement, DoughnutController } from "chart.js";

ChartJS.register(Tooltip, DoughnutController, ArcElement);

const props = defineProps({
  goodCount: {
    type: Number,
    required: false,
    default: 0
  },
  badCount: {
    type: Number,
    required: false,
    default: 0
  },
  damagedCount: {
    type: Number,
    required: false,
    default: 0
  },
  totalCount: {
    type: Number,
    required: false,
    default: 0
  }
});

const chartOptions = ref({
  responsive: true
});

const chartData = computed(() => {
  let result;

  result = {
    // labels: ["Bon", "Mauvais", "Abîmé"],
    datasets: [
      {
        backgroundColor: ["rgb(0, 197, 105)", "rgb(253 224 71)", "rgb(255, 10, 84)"],
        borderColor: ["white"],
        data: [props.goodCount, props.badCount, props.damagedCount]
      }
    ]
  };

  return result;
});
</script>

<style lang="scss" scoped></style>
