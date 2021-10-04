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
    filtersApplied: Record<string, Filters | null>;
    filteredData: Vehicle[];
    toastInfo: IToastInfo ;
    isFetchingDataInProgress: {
      models: boolean,
      makes: boolean,
      vehicles: boolean,
      [key: string]: boolean
    };
    sortBy: string;
    sortOrder: string;
}

export interface IToastInfo {
  type: string;
  message: string;
}

export enum ToastMessageTypes {
  Error = 'error',
  Info = 'info'
}

export enum ToastMessages {
  Error = 'Error occurred. Please try again later !',
  Info = 'Sorry we do not have vehicles for the choose combination'
}

export interface ISort {
sortOrder: string;
sortBy: string;
}

