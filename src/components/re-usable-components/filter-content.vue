<template>
    <div>
        <MinMax v-if="type === 'number'" :min="filters.min" :max="filters.max" @input-max="$event => filters.max = $event" @input-min="$event => filters.min = $event" />
        <div v-else>
        <TextInput  v-model="filters.filterText" label="Filter Text: "/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MinMax from './min-max.vue';
import TextInput from './text-input.vue';
@Component({
    components: {
        MinMax,
        TextInput
    }
})
export default class FilterContent extends Vue {
    @Prop({required: true}) public filters!: object;
    @Prop({required: false, default: 'text'}) public type!: string;
}
</script>

<style scoped>

</style>