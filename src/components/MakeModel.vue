<template>
   <div class="make-model">
        <CustomSelect :selected="selectedMake" :source="makes" @update-selected="onMakeSelect" label="Select Make : " :loading="isFetchingDataInProgress.make"/>
        <CustomSelect :selected="selectedModel" :source="models" @update-selected="onModelSelect" label="Select Model : " :loading="isFetchingDataInProgress.model"/>
         <div :style="{margin: 'auto'}" v-if="showClearFilters">
            <button @click="clearFilters">Clear Filters</button>
          </div>
        <div class="results-no"> 
          <span v-if="totalVehicles" > Showing {{filteredVehicles}} of {{totalVehicles}} </span>          
        </div>
         <div v-if="showToggle" class="toggle-viewer" >
             Show Table: <ToggleSwitch :value="value" @input="input"/>
          </div>
      </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
import CustomSelect from '@/components/re-usable-components/custom-select.vue';
import Loader from '@/components/re-usable-components/loader.vue';
import ToggleSwitch from '@/components/re-usable-components/toggle-witch.vue';
@Component({
    components: {
        CustomSelect,
        Loader,
        ToggleSwitch
    }
})
export default class MakeModel extends Vue {
  @Prop({required: true}) public makes!: string[];
  @Prop({required: true, default: () => ([])}) public models!: string[];
  @Prop({default: 0}) public totalVehicles!: number;
  @Prop({default: 0}) public filteredVehicles!: number;
  @Prop({default: ''}) public selectedMake!: string;
  @Prop({default: ''}) public selectedModel!: string;
  @Prop() public isFetchingDataInProgress!: object;

  @Prop() public value!: boolean;
  @Prop() public showToggle!: boolean;
  @Prop() public showClearFilters!: boolean;

  @Emit()
  public onMakeSelect(selectedMake: string): void {}

  @Emit()
  public onModelSelect(selectedModel: string ): void {}

  @Emit()
  public input(checked: boolean) {}

  @Emit()
  public clearFilters() {}

}
</script>

<style scoped>
.custom-select{
  padding: 5px
}
 .make-model{
    flex: 0 0 auto;
    max-width: 100%;
    box-sizing: border-box;
    flex-direction: row;
    display: flex;
 }
 .dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
  max-height: 100px;
  overflow-y: scroll;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.results-no{
  margin:auto;
  white-space: nowrap;
}
.toggle-viewer{
      display: flex;
    align-items: center;
}

@media only screen and (max-width: 685px){
    .make-model{
        flex-direction: column;
    }
}

@media only screen and (max-width: 1000px){
       .toggle-viewer{
  visibility: hidden;
}
}
</style>