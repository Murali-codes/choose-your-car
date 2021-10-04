<template>
    <div>
        <button  class="filters-button" @click="showModal =  true"> Filters </button>
        <Modal v-if="showModal" @close="onModalClose">
            <FilterAndSort  v-bind ="$props" v-on="$listeners"
             />
        </Modal>
    </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import Modal from '@/components/re-usable-components/modal.vue';
import FilterAndSort from '@/components/re-usable-components/filter-and-sort.vue';
import FiltersMixin from '@/components/CardModel/FiltersMixin';
@Component({
    components: {
        Modal,
        FilterAndSort
    }
})
export default class FilterAsModal extends Mixins(FiltersMixin) {
    public showModal = false;

    public onModalClose() {
        this.updateFilters();
        this.showModal = false;
    }

}
</script>

<style scoped>
 .filters-button{
     width: 100%;
 }
</style>