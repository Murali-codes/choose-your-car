import {Filters, ISort, Vehicle} from './types';
export const BASE_URL = 'http://localhost:8080/api/';

const API_ENDPOINTS  = {
    MAKES :  `${BASE_URL}makes`,
    models :  `${BASE_URL}models`,
    vehicles :  `${BASE_URL}vehicles`
};

export const getModeUrl = (make: string) => {
    return `${API_ENDPOINTS.models}?make=${make}`;
};
export const getVehicleUrl = (make: string, model: string) => {
    return `${API_ENDPOINTS.vehicles}?make=${make}&model=${model}`;
};

export const getMakeUrl = () => API_ENDPOINTS.MAKES;

export const VEHICLE_PROPERTIES = [
   {
        label: 'Engine PowerPS',
        propertyName: 'enginePowerPS',
        type: 'number',

    }, {
        label: 'Engine PowerKW',
        propertyName: 'enginePowerKW',
        type: 'number',
    }, {
        label: 'Fuel Type',
        propertyName: 'fuelType',
        type: 'string',

    }, {
        label: 'Build Type',
        propertyName: 'bodyType',
        type: 'string',

    }, {
        label: 'Engine Capacity',
        propertyName: 'engineCapacity',
        type: 'number',

    }, ];

export const ModulesNameSpaces = {
    Cars: 'cars',
};

export const defaultToastInfo = () => ({
    type: '',
    message: ''
});

export const defaultCarsState = () => ( {
    _makes: [],
    _models: {},
    _vehicles: {},
    selectedMake: '',
    selectedModel: '',
    selectedVehicle: null,
    filtersApplied: {},
    filteredData: [],
    toastInfo: defaultToastInfo(),
    isFetchingDataInProgress: {
      makes: false,
      models: false,
      vehicles: false
    },
    sortBy: '',
    sortOrder: ''
  });


export const filterAndSortVehicleData = (
    allFilters: Record<string, Filters | null>,
    sort: ISort ,
    vehicles: Vehicle[]) => {
    let vehiclesData: Vehicle[] = JSON.parse(JSON.stringify(vehicles));
    Object.entries(allFilters).forEach(([property, filters]) => {
        if (!filters) {
        return;
        }
        const type =  VEHICLE_PROPERTIES.find((prop) => prop.propertyName === property)!.type;
        if (type === 'string' && filters.filterText) {
        const stringInUpperCase = filters.filterText.toUpperCase();
        vehiclesData = vehiclesData.filter(
            (vehicle) => vehicle[property].toUpperCase().indexOf(stringInUpperCase) > -1);
        }
        if (type === 'number' ) {
        const min = filters.min !== null && filters.min !== undefined ? filters.min : -Infinity;
        const max = filters.max !== null && filters.max !== undefined ? filters.max : Infinity;
        vehiclesData  = vehiclesData.filter(
            (vehicle) => vehicle[property] >= min && vehicle[property] <= max );
        }

    });
    return sortVehicleData(sort, vehiclesData);
};

export const sortVehicleData = (sort: ISort, vehicles: Vehicle[]) => {
    const vehiclesData: Vehicle[] = JSON.parse(JSON.stringify(vehicles));
    const {sortOrder, sortBy} = sort;
    if (!sortOrder || !sortBy) {
        return vehiclesData;
    }

    const ascend = sortOrder === 'asc' ? 1 : -1;
    return vehiclesData.sort((v1, v2) => v1[sortBy] > v2[sortBy] ? ascend : -ascend);
};
