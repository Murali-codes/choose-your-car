import { Component, Vue , Watch} from 'vue-property-decorator';
import { filterAndSortVehicleData, ModulesNameSpaces , VEHICLE_PROPERTIES} from '@/store/modules/constants';
import { State, Action, Getter} from 'vuex-class';
import { CarsState, Vehicle, Filters, IToastInfo} from '@/store/modules/types';
const namespace = ModulesNameSpaces.Cars;
type StoreAction = () => Promise<void>;
type StoreActionWithParams = (arg0: any) => Promise<void>;
@Component
export default class CarModuleMixin extends Vue {
    @Action('fetchMakes', { namespace }) public fetchMakes!: StoreAction;
    @Action('updateSelectedMake', { namespace }) public updateSelectedMake!: StoreActionWithParams;
    @Action('updateSelectedModel', { namespace }) public updateSelectedModel!: StoreActionWithParams;
    @Action('updateSelectedVehicle', { namespace }) public updateSelectedVehicle!: StoreActionWithParams;
    @Action('updateFilters', { namespace }) public udpateFiltersInStore!: StoreActionWithParams;
    @Action('updateSort', { namespace }) public updateSort!: StoreActionWithParams;
    @Getter('allMakes', { namespace }) public allMakes!: string[];
    @Getter('modelsBasedOnSelectedMake', { namespace }) public modelsBasedOnSelectedMake!: string[];
    @Getter('vehiclesBasedOnSelectedModelAndMake', { namespace }) public vehiclesBasedOnSelectedModelAndMake!: string[];
    @State((cars: CarsState) => cars.selectedMake, {namespace}) public selectedMake!: string;
    @State((cars: CarsState) => cars.sortOrder, {namespace}) public sortOrder!: string;
    @State((cars: CarsState) => cars.sortBy, {namespace}) public sortBy!: string;
    @State((cars: CarsState) => cars.selectedModel, {namespace}) public selectedModel!: string;
    @State((cars: CarsState) => cars.selectedVehicle, {namespace}) public selectedVehicle!: Vehicle;
    @State((cars: CarsState) => cars.isFetchingDataInProgress, {namespace}) public isFetchingDataInProgress !: object;
    @State((cars: CarsState) => cars.toastInfo, {namespace}) public toastInfo !: IToastInfo;
    @State((cars: CarsState) => cars.filteredData, {namespace}) public filteredData !: Vehicle[];
    @State((cars: CarsState) => cars.filtersApplied, {namespace})
    public filters !: Record<string, Filters | null>;
    public $store: any;
    public vehicleProperties = VEHICLE_PROPERTIES;

    @Watch('vehiclesBasedOnSelectedModelAndMake')
      public updateFilteredData(): void {
        this.udpateFiltersInStore(this.filters);
    }

    public get makes() {
        return this.allMakes || [];
    }

    public onVehicleSelect(vehicle: Vehicle) {
        if (vehicle === this.selectedVehicle) {
            this.updateSelectedVehicle(null);
            return;
        }
        this.updateSelectedVehicle(vehicle);
    }
    public filtersChanged(filters: Filters, prop: string) {
        this.filters[prop] = filters;
        this.updateFilteredData();
    }

    public get showClearFilters() {
        return Object.entries(this.filters).some(
            ([prop, filter]) => filter && (filter.min !== null || filter.max !== null || filter.filterText) );
    }

    public clearFilters() {
        const filters = this.vehicleProperties.reduce(
            (newFilters, prop) => ({...newFilters, [prop.propertyName]: null}), {});
        this.udpateFiltersInStore(filters);
    }

    public setSelectedVehicle(vehicle: Vehicle) {
        if (this.selectedVehicle === vehicle) {
            this.updateSelectedVehicle(null);
        } else {
            this.updateSelectedVehicle(vehicle);
        }
    }

    public updateSortBy(sortBy: string) {
        this.updateSort({sortOrder: this.sortOrder, sortBy});
    }

    public updateSortOrder(sortOrder: string) {
        this.updateSort({sortOrder, sortBy: this.sortBy});
    }
}
