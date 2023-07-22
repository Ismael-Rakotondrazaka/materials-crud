<template>
  <div class="d-inline-block text-start">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#demo-notification"
    >
      A lire
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="demo-notification"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">A lire</h1>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <p>
              Ce site web est un demo, il utilise donc le
              <span class="text-primary">localStorage</span> pour stocker les données.
            </p>

            <p>
              Utiliser la version
              <a href="https://github.com/code-verse-unity/materials-crud">originale</a>
              (intégration d'API inclus), si vous voulez contribuer ou l'utiliser en production.
            </p>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
