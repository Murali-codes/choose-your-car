<template>
    <div class="dropdown">
        <button class="dropbtn" @click="iconClick"><img class="down-arrow-image" src="/down-arrow.svg" /></button>
        <div v-if="show" class="dropdown-content">
            <div class="filter-text flex" v-if="property.type === 'string'">
                <label :for="`${property.propertyName}-filterText`">Filter Text :</label>
                <input  :name="`${property.propertyName}-filterText`" v-model="filterText"/>
            </div>
            <div class="min-max " v-if="property.type === 'number'">
                <div class="flex">
                    <label :for="`${property.propertyName}-filterText`">Min : </label>
                    <input type="number"  :name="`${property.propertyName}-filterText`" v-model="min"/>
                </div>
                <div class="flex">
                    <label :for="`${property.propertyName}-filterText`">Max : </label>
                    <input type="number" :name="`${property.propertyName}-filterText`" v-model="max"/>
                </div>
            </div>
            <div class="sort flex">
                <label :for="`${property.propertyName}-sort`">Sort Order :</label>
                <select  v-model="sortOrder" :name="`${property.propertyName}-sort`">
                    <option value="asc">Ascending</option>
                    <option value="desc">Decending</option>
                </select>
            </div>
            <div class="footer-buttons">
                <button @click="onReset"> Reset </button>
                <button @click="onOkClick"> Ok </button>
                <button @click="onCancelClick"> Cancel </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component
export default class SortAndFilter extends Vue {
    public get show(): boolean {
        return this.property.propertyName === this.clickedProperty;
    }
    @Prop() public property!: any;
    @Prop() public clickedProperty!: string;
    public filterText = '';
    public sortOrder  = '';
    public min = null;
    public max = null;
    @Emit()
    public filtersChanged(payload: object | null): void {}
    public onOkClick(): void {
        const payload: any = {};
        if (this.property.type === 'string') {
            payload.filterText = this.filterText;
        } else {
            payload.min = this.min;
            payload.max = this.max;
        }
        payload.sortOrder  = this.sortOrder;
        this.filtersChanged(payload);
    }

    public onCancelClick(): void {
        this.iconClick();
    }
    public onReset(): void {
        this.filterText = '';
        this.min = null;
        this.max = null;
        this.sortOrder = '';
        this.filtersChanged(null);
    }

    @Emit()
    private iconClick(): void {}
}
</script>

<style scoped>
.down-arrow-image{
  float:right;
  padding-right: 3px;
}

.dropbtn {
  background-color: #04AA6D;
  color: white;
  font-size: 16px;
  border: none;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: flex;
  right: 5px;
  flex-direction: column;
  text-align: left;
  font-size: small;
  position: absolute;
  min-width: 160px;
  color: black;
  background-color: #d9cccc;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.filter-text, .sort, .min-max div{
  padding: 5px; 
}
.dropdown-content label{
    width: 50%
}

.min-max input, .filter-text input, .sort select {
  width: 50%;
}
.dropdown:hover .dropdown-content {display: block;}
.flex{
    display: flex;
}
.footer-buttons button{
    width: 30%;
}
.footer-buttons{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>