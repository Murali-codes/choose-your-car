<template>
  <div class="table-container">
   <table id="table">
        <TableHeader :columns="columns" @update-filters="updateFilters"/>
        <tr v-for="(row, index) of numberOfRowsInTable"  :key="`row-${index}`" :class="{selected : index === rowSelctedIndex}" @click="onRowSelect(index)">
          <template v-if="rowsToDisplay[index]">
            <td  v-for="col in columns" :key="`row-${index}-${col.propertyName}`">{{rowsToDisplay[index][col.propertyName]}}</td>
          </template>
          <template v-else>
              <td  v-for="col in columns" :key="`row-${index}-${col.propertyName}`"></td>
          </template>
        </tr>
    </table>
    <div v-if="rowsToDisplay.length">
        <Pagenation :totalRecords="data.length" :pageSelected="pageSelected" @page-selection-changed="pageSelected = $event"/>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue , Emit} from 'vue-property-decorator';

import {Filters} from '@/store/modules/types';
import Pagenation from './Pagenation.vue';
import TableHeader from './ColumnsHeader.vue';


@Component({
    components: {
        Pagenation,
        TableHeader
    }
})
export default class Table extends Vue {

  public get rowsToDisplay(): number[] {
    const startIndex =  (this.pageSelected - 1) * 10;
    return this.data.slice(startIndex, startIndex + 10);
  }

  public readonly numberOfRowsInTable = 10;
  @Prop({default: []}) public data!: any;
  @Prop({default: []}) public columns: any;

  public pageSelected = 1;

  public rowSelctedIndex: number = -1;
  public clickedProperty = '';

  @Emit()
  public updateFilters(columnPropertyName: string, filters: Filters): void {}

  @Emit('row-selected')
  public onRowSelect(index: number): any {
    this.rowSelctedIndex = index;
    return this.rowsToDisplay[index];
  }
}
</script>

<style scoped>

#table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 98vw;
}

#table td, #table th {
  border: 1px solid #ddd;
  padding: 8px;
}

#table tr:hover {background-color: #ddd;}

#table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #04AA6D;
  color: white;
  min-width: 50px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.table-container{
  width: 98vw;
  padding: 0 1vw 0 1vw;
  overflow: scroll;
}
.selected{
  background-color: lightblue;
}
</style>