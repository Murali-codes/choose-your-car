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
        label: 'MAKE',
        propertyName: 'make',
        type: 'string',
        canFilteredOfSorted: false
    },
    {
        label: 'MODEL',
        propertyName: 'model',
        type: 'string',
        canFilteredOfSorted: false
    } , {
        label: 'Engine PowerPS',
        propertyName: 'enginePowerPS',
        type: 'number',
        canFilteredOfSorted: true
    }, {
        label: 'Engine PowerKW',
        propertyName: 'enginePowerKW',
        type: 'number',
        canFilteredOfSorted: true
    }, {
        label: 'Fuel Type',
        propertyName: 'fuelType',
        type: 'string',
        canFilteredOfSorted: true
    }, {
        label: 'Build Type',
        propertyName: 'buildType',
        type: 'string',
        canFilteredOfSorted: true
    }, {
        label: 'Engine Capacity',
        propertyName: 'engineCapacity',
        type: 'string',
        canFilteredOfSorted: true
    }, ];

