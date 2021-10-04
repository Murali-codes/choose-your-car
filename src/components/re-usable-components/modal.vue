<template>
   <div id="myModal" class="modal">
        <div class="modal-content">
            <div  class="close">
                <span @click="close">&times;</span>
            </div>
            <slot/>
        </div>
</div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component
export default class Modal extends Vue {
  @Emit()
  public close() {}
}
</script>

<style scoped>
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
.close{
    height: 28px;
}

/* The Close Button */
.close span{
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close span:hover,
.close span:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>