<template>
<div class="loader " title="Loading">
  <svg   x="0px" y="0px"
     width="100%" height="100%" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
  <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 25 25"
      to="360 25 25"
      dur="0.6s"
      repeatCount="indefinite"/>
    </path>
  </svg>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Loader extends Vue {

}
</script>

<style scoped>
.loader{
  margin: auto;
  text-align: center;
  display: inline-block;
  vertical-align: top;
}
svg path,
svg rect{
  fill: #FF6700;
}
</style>