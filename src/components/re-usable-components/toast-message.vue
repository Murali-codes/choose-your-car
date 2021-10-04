<template>
<div id="toast" :class=" message ? `show ${classStyle}` : ''" >{{message}}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ToastMessage extends Vue {
    @Prop({required: true, default: ''}) public message!: string;
    @Prop({required: false, default: 'error'}) public classStyle!: string;
}
</script>

<style scoped>
#toast {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  text-align: center;
  border-radius: 15px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  right: 30px;
  font-size: 17px;
}

.info{
  background-color: var(--info-bg-color);
  color: var(--info-color);
}

.error{
  background-color: var(--error-bg-color);
  color: var(--error-color)
}

#toast.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {right: 0; opacity: 0;} 
  to {right: 30px; opacity: 1;}
}

@keyframes fadein {
  from {right: 0; opacity: 0;}
  to {right: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {right: 30px; opacity: 1;} 
  to {right: 0; opacity: 0;}
}

@keyframes fadeout {
  from {right: 30px; opacity: 1;}
  to {right: 0; opacity: 0;}
}

@media only screen and (max-width: 450px){
    @-webkit-keyframes fadein {
  from {top: 0; opacity: 0;} 
  to {top: 30px; opacity: 1;}
}

@keyframes fadein {
  from {top: 0; opacity: 0;}
  to {top: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {top: 30px; opacity: 1;} 
  to {top: 0; opacity: 0;}
}

@keyframes fadeout {
  from {top: 30px; opacity: 1;}
  to {top: 0; opacity: 0;}
}
@media only screen and (max-width: 450px){
  #toast{
    right:0px;
    width: 100%;
    padding: 5px 0 5px 0 !important;
  }
}
}
</style>