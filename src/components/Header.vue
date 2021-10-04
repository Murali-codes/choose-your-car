<template>
  <div id="header">
     <img src="https://stimg.cardekho.com/pwa/img/CarDekho-Logo.svg" loading="eager" alt="CarDekho.com - Best place to buy New and Used Cars">
  </div>
</template>

<script lang="ts">
import {Vue , Component} from 'vue-property-decorator';
@Component
export default class Header extends Vue {

}
</script>

<style scoped>
  #header{
    flex: 0 0 auto;
  }
</style>