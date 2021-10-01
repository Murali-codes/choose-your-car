// tslint:disable-next-line:no-empty-interface
export interface RootState {
}
export interface Filters {
    filterText: string;
    sortOrder: string;
    min?: null | number;
    max?: null | number;
  }
export interface Vehicle {
    make: string;
    model: string;
    enginePowerPS: number;
    enginePowerKW: number;
    fuelType: string;
    bodyType: string;
    engineCapacity: number;
    [key: string]: any;
  }
export interface CarsState {
    _makes: string[];
    _models: Record<string, string[]>;
    _vehicles: Record<string, Vehicle[]>;
    selectedMake: string;
    selectedModel: string;
    selectedVehicle: null | Vehicle;
    filtersApplied: Filters;
    error: string;
    info: string;
  }



