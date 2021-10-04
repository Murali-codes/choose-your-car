<template>
  <tr>
        <th v-for="col in columns" :key="col.propertyName">
            {{col.label}}
            <SortAndFilter :property="col" :clickedProperty="clickedProperty" @icon-click="iconClick(col.propertyName)" @filters-changed="updateFilters($event, col.propertyName)"/> 
        </th>
        </tr>
</template>

<script lang="ts">
import { Filters } from '@/store/modules/types';
import { Component, Prop, Vue , Emit, Watch} from 'vue-property-decorator';
import SortAndFilter from './sort-and-filter.vue';
@Component({
    components: {
        SortAndFilter
    }
})
export default class TableHeader extends Vue {
    @Prop({default: []}) public columns!: any;

    public clickedProperty = '';

    @Emit()
    public updateFilters(columnProperty: string, filters: Filters): void {
        this.iconClick(columnProperty);
    }

    public iconClick(columnClicked: string): void {
        if (this.clickedProperty === columnClicked) {
            this.clickedProperty = '';
        } else {
            this.clickedProperty = columnClicked;
        }
  }
}
</script>

<style scoped>
th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #04AA6D;
  color: white;
  min-width: 50px;
  white-space: nowrap;
  text-overflow: ellipsis;
    border: 1px solid #ddd;
  padding: 8px;
    font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 20%;
}
</style>