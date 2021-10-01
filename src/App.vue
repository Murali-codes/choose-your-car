<template>
  <div id="app">
    <div id="content">
        <HelloWorld/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
import HelloWorld from '@/components/MakeAndModel.vue';
@Component({
  components: {
    HelloWorld
  }
})
export default class Counter extends Vue {
}
</script>

<style scoped lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  #content {
    min-height: 100vh;
    background-color: #F8F8F8;
    display: grid
  }
}
</style>
