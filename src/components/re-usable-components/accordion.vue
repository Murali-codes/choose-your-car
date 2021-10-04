<template>
    <div id="accordion-container">
      <div class="accordion" @click="onExpansionChange">
        
        <span class="header">
          <slot name="header"/>
         <svg class="arrow">
            <use xlink:href="#select-arrow"></use>
        </svg>
        </span>
      </div>
      <div :class="{panel: true, expanded: isExpanded}">
        <slot name="content" />
      </div>
      <svg class="sprites">
    <symbol id="select-arrow" viewbox="0 0 10 6">
        <polyline v-if="isExpanded" points="1 1 5 5 9 1"></polyline>
        <polyline v-else points="5 9 1 4.5 5 0"></polyline>
    </symbol>
    </svg>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component
export default class Accordion extends Vue {
  @Prop({default: false, required: true}) public isExpanded!: boolean;

  @Emit()
  public onExpansionChange() {}
}
</script>

<style scoped>
.accordion-container{

  height: 100%;
  width: 100%;
}
.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: calc(100% - 36px);
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}
.accordion svg{
  width: 10px;
  height: 10px;
  float: right;
  padding: 5px 0px 0px 5px;
  stroke-width: 2px;
  stroke: #9098a9;
  fill: none;
}
.accordion:hover + svg {
  stroke:var(--svg-arrow-storke-color);
}
.expanded, .accordion:hover {
  display: block !important;
}
.accordion:focus{
  outline: var(--input-elm-outline);
  border-color: var(--input-elm-focus-border-color);
  box-shadow: var(--input-elm-focus-border-shadow);
}

.panel {
  background-color: #eee;
  padding: 0 18px;
  width: calc(100% - 36px);
  display: none;
  overflow: hidden;
}
.sprites {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  user-select: none;
  
}
.header{
font-family: LeasePlan, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Arial, sans-serif;
    font-weight: bold;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 100%;
    color: rgb(45, 45, 45);
    cursor: pointer;
}
</style>