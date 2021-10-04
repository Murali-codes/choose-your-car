<template>
    <FilterAndSort   v-bind ="$props" v-on="$listeners"/>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import FilterAndSort from '@/components/re-usable-components/filter-and-sort.vue';
import FiltersMixin from '@/components/CardModel/FiltersMixin';
@Component({
    components: {
        FilterAndSort
    }
})
export default class FilterAsPanel extends Mixins(FiltersMixin) {


}
</script>

<style scoped>

</style>