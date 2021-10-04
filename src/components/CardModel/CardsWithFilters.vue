<template>
    <div class="cards-with-filters">
        <div class="filters">
            <component :is="filterComponent" class="filter-panel" 
            :properties="vehicleProperties"
            :filters="filters"
            :sortBy="sortBy"
            :sortOrder="sortOrder"
            @update-sort-by="updateSortBy"
            @update-sort-order="updateSortOrder"
            @update-filters="updateFilteredData"
            />
        </div>
        <div class="vehicles">
            <div class="filters-applied">
                <FiltersApplied  @update-filters="updateFilteredData" :properties="vehicleProperties" :filters="filters" />
            </div>
        <div class="cards">
            <Card v-for="(vehicle,vehicleIndex) in filteredData" :key="vehicleIndex" @click="onVehicleSelect(vehicle)">
                <div>
                <div class="prop-info" v-for="property in vehicleProperties" :key="`${property.propertyName}-${vehicleIndex}`">
                    <span> <span class="property">{{property.label}} : </span><span class="value">{{vehicle[property.propertyName]}}</span> </span>
                </div>
                  <button class="get-btn" @click="updateSelectedVehicle(vehicle)">Get this car</button>
                </div>  
            </Card>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import Card from '@/components/re-usable-components/card.vue';
import CarsModuleMixin from '@/components/CarsModuleMixin';
import FilterAsPanel from '@/components/filter-as-panel.vue';
import FilterAsModal from '@/components/filters-as-modal.vue';
import FiltersApplied from '@/components/CardModel/FiltersApplied.vue';
import Modal from '@/components/re-usable-components/modal.vue';
import { Vehicle } from '@/store/modules/types';
type FilterComponent = typeof FilterAsModal | typeof FilterAsPanel;
@Component({
    components: {
        Card,
        FilterAsModal,
        FilterAsPanel,
        FiltersApplied,
        Modal
    }
})
export default class CardsWithFilters extends Mixins(CarsModuleMixin) {
    public showFilterAsModal = false;
    public filterComponent: FilterComponent = FilterAsPanel;
   public created() {
       window.addEventListener('resize', this.onResize);
       this.onResize();
   }
   public beforeDestroy() {
       window.removeEventListener('resize', this.onResize);
   }

   public onResize() {
       const width = document.documentElement.offsetWidth;
       if (width < 1200) {
           this.filterComponent = FilterAsModal;
       } else {
           this.filterComponent = FilterAsPanel;
       }
   }
    public areEqual(vehicle: Vehicle): boolean {
        return JSON.parse(JSON.stringify(vehicle)) === JSON.parse(JSON.stringify(this.selectedVehicle));
    }
}
</script>

<style scoped>
.cards-with-filters{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
}
.prop-info{
    padding-top:5px;
    padding-bottom: 5px;
}
.prop-info .property{
    font-weight: normal
}
.cards{
   display: flex;
   flex-wrap: wrap;
}
.cards .card {
    white-space: nowrap;
    margin: 5px;
    padding: 5px;
    max-width: 200px;
    min-width: 100px;
}
.filter-button{
    visibility: hidden;
}
.vehicles{
    max-width: 70%;
    flex-grow: 2;
}
.get-btn{
    width: 100%;
}
.filters{
    flex-grow: 1;
    max-width: 25%;
}
@media only screen and (max-width: 29.9375em){
    .cards-with-filters{
        flex-direction: column;
    }
    .filters{
        max-width:100%;
    }
    .vehicles{
        max-width: 100%;
    }
    .cards{
        justify-content: center;
    }
    .filter-button{
        visibility: show;
    }
}
</style>