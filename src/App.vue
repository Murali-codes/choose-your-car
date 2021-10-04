<template>
  <div id="app">
        <router-view/>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
@Component
export default class Counter extends Vue {
}
</script>

<style scoped lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
<style>
#app{
  --input-elm-focus-border-color :#07f;
  --input-elm-focus-border-shadow: 0 0 0 2px rgba(0,119,255,0.2);
  --input-elm-focus-outline: none;
  --svg-arrow-storke-color: #07f;
}

button {
  background-color: rgb(74, 156, 177);
  border: none;
  color: white;
  text-align: center;
  padding: 5px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px solid var(--input-elm-focus-border-color);
}

</style>

