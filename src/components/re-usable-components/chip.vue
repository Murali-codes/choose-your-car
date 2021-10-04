<template>
    <div class="chip">
      <slot/>
      <span @click="close">&times;</span>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component
export default class Chip extends Vue {
    @Emit()
    public close() {}
}
</script>

<style scoped>
.chip {
  display: inline-block;
  padding: 0 25px;
  height: 50px;
  font-size: 16px;
  line-height: 50px;
  border-radius: 25px;
  background-color: #f1f1f1;
}

.chip img {
  float: left;
  margin: 0 10px 0 -25px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.chip span{
  padding-left:5px;
}
</style>