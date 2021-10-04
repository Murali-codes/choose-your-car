import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component
export default class FiltersMixin extends Vue {
    @Prop({required: true}) public properties!: object;
    @Prop({required: true}) public filters!: object;

    @Prop() public sortBy!: string;
    @Prop() public sortOrder!: string;

    @Emit()
    public updateFilters() {}

    @Emit()
    public udpateSortOrder(v: string) {}

    @Emit()
    public updateSortBy(v: string) {}
}
