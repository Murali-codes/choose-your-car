<template>
    <div class="filters-applied">
        <FilterChip v-for="(prop, index) in propertiesWithFilters" :key="`filters-${index}`" 
            :filter="filters[prop.propertyName]"
            :label="prop.label"
            :type="prop.type"
            @close="close(prop.propertyName)" />
        
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import FilterChip from '@/components/CardModel/filter-chip.vue';
@Component({
    components: {
        FilterChip
    }
})
export default class FiltersApplied extends Vue {
    @Prop({required: true}) public filters!: Record<string, any>;
    @Prop({required: true}) public properties!: any[];

    @Emit()
    public updateFilters() {}

    public get filtersArray() {
        return Object.entries(this.filters).filter(([, filters]) => filters);
    }

    public get propertiesWithFilters() {
        return this.properties.filter((prop) => {
         const filters =  this.filters[prop.propertyName];
         if (!filters) {
             return false;
         }
         return filters.min !== null ||  filters.max !== null || filters.filterText;
        });
    }

    public close(propName: string) {
        this.filters[propName] = null;
        this.updateFilters();
    }


}
</script>

<style scoped>
.filters-applied{
    display: flex;
    flex-wrap: wrap;
}
</style>