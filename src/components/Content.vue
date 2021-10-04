<template>
  <div id="layout-content">
      <div id="content">
        <MakeModel :makes="makes" :models="modelsBasedOnSelectedMake" 
          :totalVehicles="vehiclesBasedOnSelectedModelAndMake.length"
          :filteredVehicles="filteredData.length"
          :selected-make="selectedMake"
          :selected-model="selectedModel"
          :isFetchingDataInProgress="isFetchingDataInProgress"
          :showToggle="showToggle"
          :showClearFilters="showClearFilters"
          v-model="checked"
          @on-make-select="updateSelectedMake"
          @on-model-select="updateSelectedModel"
          @clear-filters="clearFilters"
          />
          <Table v-if="checked" :data="filteredData" :columns="vehicleProperties" @update-filters="filtersChanged" @row-selected="updateSelectedVehicle"/>
          <CardsWithFilters v-else/>
         <Modal v-if="selectedVehicle" @close="updateSelectedVehicle(null)">
            <Card>
                <div class="vehicle-content">
                    <h3>Great choice</h3>
                    <div class="prop-info" v-for="property in vehicleProperties" :key="`${property.propertyName}`">
                      <span> <span class="property">{{property.label}} : </span><span class="value">{{selectedVehicle[property.propertyName]}}</span> </span>
                    </div>
                </div> 
            </Card>
        </Modal>
        <ToastMessage class= "cars-toast-info" :message="toastInfo.message" :classStyle="toastInfo.type" />
      </div>
  </div>
</template>

<script lang="ts">
import {Mixins , Component} from 'vue-property-decorator';
import MakeModel from '@/components/MakeModel.vue';
import CardsWithFilters from '@/components/CardModel/CardsWithFilters.vue';
import CarModuleMixin from '@/components/CarsModuleMixin';
import ToastMessage from '@/components/re-usable-components/toast-message.vue';
import Table from '@/components/re-usable-components/table/table.vue';
import Modal from '@/components/re-usable-components/modal.vue';
import Card from '@/components/re-usable-components/card.vue';
@Component({
    components: {
        MakeModel,
        CardsWithFilters,
        ToastMessage,
        Table,
        Modal,
        Card
    }
})
export default class Content extends Mixins(CarModuleMixin) {
  public checked = false;
  public showToggle = true;
  public async created(): Promise<void> {
     window.addEventListener('resize', this.onResize);
     this.onResize();
     await this.fetchMakes();
  }
  public onResize() {
    const width = document.documentElement.offsetWidth;
    if (width < 1000) {
           this.checked = false;
           this.showToggle = false;
       } else {
         this.showToggle = true;
       }
  }
   public beforeDestroy() {
       window.removeEventListener('resize', this.onResize);
   }

}
</script>
<style scoped >
.cars-toast-info{
  --info-color: blue;
  --error-color: red;
  --info-bg-color: lightblue;
  --error-bg-color: #f59c9a 
}

#layout-content{
    flex: 1 1 auto;
    max-width: 1638px;
    margin-left: auto;
    margin-right: auto;
    padding: 24px 24px 32px;
    width: calc(100% - 48px);
    overflow-y:auto ;
}
#content{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: calc(100% + 16px);
    margin: -8px;
    
}
#content > div{
    padding: 8px;
}

.prop-info .property{
    font-weight: normal
}

.vehicle-content h3{
  padding-bottom: 10px;
} 

@media only screen and (min-width: 600px ){
  #layout-content{
    padding-top: 32px;
  }
   #content{
    margin: -12px;
    width: calc(100% + 24px);
  }

}

@media only screen and (max-width: 450px){
    #layout-content{
        padding-left: 12px;
        padding-right: 12px;
    }
}

 
</style>

