<template>
  <div class="grid">
   <div class="header">
      <h1>Welcome to Choose your car</h1>
    </div>
    <div class="card">
      <h3>Please choose Make and Model</h3>
      <div>
        <table>
          <tr>
            <td>Select Make :</td>
            <td><select :size="makeSize" @blur="makeSize = 1"  @focus="makeSize = maxMakeSize" name="makeInput" id="makeInput" :value="cars.selectedMake" @change="($event) => {makeSize = 1; makeSelectionChanged($event)}" aria-placeholder="Please select make">
          <option disabled value="">Please select one</option>
          <option v-for="make in allMakes" :key="make" :value="make">{{make}}</option>
        </select></td>
          </tr>
          <tr>
            <td>Select Model :</td>
            <td><select  :size="modelSize" @focus="modelSize = maxModelSize" @blur="modelSize =  1" name="modelInput" id="modelInput" :value="cars.selectedModel"  @change="($event) => {modelSize = 1; modelSelectionChanged($event)}" aria-placeholder="Please select model">
          <option disabled value="">Please select one</option>
          <option v-for="model in modelsBasedOnSelectedMake" :key="model" :value="model">{{model}}</option>
        </select></td>
          </tr>
          <tr v-if="info || error">
             <td colspan="2" :class="{error:!!error, message: !!info}">{{info || error}}</td>
          </tr>
        </table>

      </div>
    </div> 
    
    <div v-if="filteredData.length">
      <Table :data="filteredData" :columns="columns" @update-filters="filtersChanged" @row-selected="onVehicleSelect"/>
    </div>
      <div v-if="filteredData.length" class="footer-buttons">
        <button :disabled="cars.selectedVehicle === null" @click="onConfirm"> Confirm</button>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue , Watch} from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import { CarsState, Vehicle, Filters} from '@/store/modules/types';
import {VEHICLE_PROPERTIES} from '@/store/modules/constants';

import Table from './Table/Table.vue';
const namespace = 'cars';

@Component({
 components: {

   Table
 }
})
export default class MakeAndModel extends Vue {
  @State('cars') public cars!: CarsState;
  @Action('fetchMakes', { namespace }) public fetchMakes: any;
  @Action('updateSelectedMake', { namespace }) public updateSelectedMake: any;
  @Action('updateSelectedModel', { namespace }) public updateSelectedModel: any;
  @Action('updateSelectedVehicle', { namespace }) public updateSelectedVehicle: any;
  @Action('updateFilters', { namespace }) public udpateFiltersInStore: any;
  @Getter('allMakes', { namespace }) public allMakes!: any[];
  @Getter('modelsBasedOnSelectedMake', { namespace }) public modelsBasedOnSelectedMake!: string[];
  @Getter('vehiclesBasedOnSelectedModelAndMake', { namespace }) public vehiclesBasedOnSelectedModelAndMake!: string[];
  @State((state) => state.cars.info) public info!: string;
  @State((state) => state.cars.error) public error!: string;
  public filteredData: Vehicle[] = [];
  public makeSize = 1;
  public modelSize = 1;
  public columns  = VEHICLE_PROPERTIES;
  public filters: Record<string, Filters|null> = {};
  public get maxMakeSize(): number {
    return Math.min(this.allMakes.length, 5);
  }
   public get maxModelSize(): number {
    return Math.min(this.modelsBasedOnSelectedMake.length, 5);
  }

  @Watch('vehiclesBasedOnSelectedModelAndMake')
  public updateFilteredData(): void {
    this.filteredData = this.filterData();
  }
  public async created(): Promise<void> {
    await this.fetchMakes();
  }
 public async onVehicleSelect(vehicle: Vehicle): Promise<void> {
   console.log('on vehcile selcted');
   await this.updateSelectedVehicle(vehicle);
 }
  public async makeSelectionChanged(event: any): Promise<void> {
    await this.updateSelectedMake(event.target.value);
  }

  public async modelSelectionChanged(event: any): Promise<void> {
    await this.updateSelectedModel(event.target.value);
  }

  public onConfirm() {
    if (this.cars.selectedVehicle !== null) {
      alert(`Great !!! \n ${this.cars.selectedMake} ${this.cars.selectedModel} ${this.cars.selectedVehicle.enginePowerPS} ${this.cars.selectedVehicle.fuelType}is a wonderful choice`);
    }
  }
  public filtersChanged(filters: Filters | null, propertyName: string): void {
    this.filters[propertyName]  = filters;
    this.filteredData =  this.filterData();
  }
  public filterData(): Vehicle[] {
    let vehiclesData: Vehicle[] = JSON.parse(JSON.stringify(this.vehiclesBasedOnSelectedModelAndMake));
    const allFilters = this.filters;
    Object.entries(allFilters).forEach(([property, filters]) => {
      if (!filters) {
        return;
      }
      const type =  VEHICLE_PROPERTIES.find((prop) => prop.propertyName === property)!.type;
      if (type === 'string' && filters.filterText) {
        const stringInUpperCase = filters.filterText.toUpperCase();
        vehiclesData = vehiclesData.filter(
          (vehicle) => vehicle[property].toUpperCase().indexOf(stringInUpperCase) > -1);
      }
      if (type === 'number' ) {
        const min = filters.min !== null && filters.min !== undefined ? filters.min : -Infinity;
        const max = filters.max !== null && filters.max !== undefined ? filters.max : Infinity;
        vehiclesData  = vehiclesData.filter(
          (vehicle) => vehicle[property] >= min && vehicle[property] <= max );
      }
      if (filters.sortOrder) {
        const ascend = filters.sortOrder === 'asc' ? 1 : -1;
        vehiclesData = vehiclesData.sort((v1, v2) => v1[property] > v2[property] ? ascend : -ascend);
      }
    });
    return vehiclesData;
  }

}
</script>

<style scoped lang="scss">
.card {
    margin: 2vh auto 2vh auto;
    width: calc(100% - 2px);
    display: flex;
    flex-direction: column;
    border: 1px red solid;
}
.wrapper{
width:200px;
padding:20px;
height: 150px;
}
.card h3{
      padding: 2vh;
    text-align: center;
}
.card div{
  margin: auto
}
.header {
  display: grid;
  align-items: center;
  justify-content:  center;
  text-align: center;
  background: #1abc9c;
  color: white;
  font-size: 2em;
  width: 100%;
}
.header h1 {
  margin: 5vh 0 5vh 0;
}
.container {
    padding: 2px 16px;
}
.grid{
      height: 100vh;
    width: 100%;
    overflow: scroll;
}

.footer-buttons button{
    width: 30%;
}
.footer-buttons{
  padding-top: 2vh;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.error{
  color: red;
}
.message{
  color: orange;
}
</style>
