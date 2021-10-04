<template>
    <div>
        <Chip @close="close">{{label}}: {{chipText}}</Chip>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import Chip from '@/components/re-usable-components/chip.vue';
@Component({
    components: {
        Chip
    }
})
export default class FilterChip extends Vue {
    @Prop() public filter!: any;
    @Prop() public label!: string;
    @Prop() public type!: string;
    @Emit()
    public close() {}
    public get chipText() {
        let text = '';
        if (this.type === 'number') {

            const {min = null , max = null} = this.filter || {};
            if (min !== null) {
                text += `Min: ${min} `;
            }
            if (max !== null) {
                text += `Max ${max}`;
            }
        } else {
            text = this.filter.filterText;
        }
        return text;
    }
}
</script>

<style scoped>

</style>