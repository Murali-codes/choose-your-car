<template>
    <div>
        <Accordion :isExpanded="sortOpen" @on-expansion-change="sortOpen = !sortOpen">
            <template slot="header">
                Order By
            </template>
            <template slot="content">
                <CustomSelect :source="labels" label="Order by :" :selected="sortBy" @update-selected="updateSortBy"/>
                <CustomSelect :source="order" label="Sort in : " :selected="sortOrder" @update-selected="updateSortOrder"/>
            </template>
        </Accordion>
        <Accordion v-for="property in properties" 
        :key="property.propertyName" 
        :isExpanded="accordionOpened === property.propertyName" 
        @on-expansion-change="onExpansionChange(property.propertyName)">
            <template slot="header">
                {{property.label}}
            </template>
            <template slot="content">
                <FilterContent :type="property.type" :filters="getFilters(property.propertyName)"/>
            </template>
        </Accordion>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import Accordion from './accordion.vue';
import FilterContent from './filter-content.vue';
import CustomSelect from '@/components/re-usable-components/custom-select.vue';
const defaultFilterObject = () => ({min: null, max: null, filterText: ''});
const dummyEntry = () => ({label: '', value: '', id: ''});
@Component({
    components: {
        Accordion,
        FilterContent,
        CustomSelect
    }
})
export default class FilterAndSort extends Vue {

    public get labels() {
        return [dummyEntry(),
         ...this.properties.map((col) => ({label: col.label, value: col.propertyName, id: col.propertyName}))];
    }
    @Prop({required: true}) public properties!: any[];
    @Prop({required: true, default: null}) public filters!: any;
    @Prop() public sortOrder!: string;
    @Prop() public sortBy!: string;
    public accordionOpened = '';
    public sortOpen = false;
    public readonly order = [dummyEntry(), {label: 'Ascending', value: 'asc', id: 'asc'}, {label: 'Descending', value: 'desc', id: 'desc'}];
    public getFilters(propertyName: string) {
        if (!this.filters[propertyName]) {
            this.filters[propertyName] = defaultFilterObject();
        }
        return this.filters[propertyName];
    }


    @Emit()
    public updateFilters() {}
    @Emit()
    public updateSortOrder(value: string) {}
    @Emit()
    public updateSortBy(value: string) {}

    public accordionClosed(propertyName: string) {
        const filters = this.filters[propertyName];
        if (filters && !filters.min && filters.max && filters.filterText) {
            this.filters[propertyName] = null;
        }

        this.updateFilters();
    }

    public onExpansionChange(propName: string) {
        this.accordionClosed(this.accordionOpened);
        if (this.accordionOpened === propName) {
            this.accordionOpened = '';
        } else {
            this.accordionOpened = propName;
        }
    }
}
</script>

<style scoped>

</style>