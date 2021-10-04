import { MutationTree, Module, GetterTree, ActionTree } from 'vuex';
import axios from 'axios';
import { RootState } from './types';
import {getMakeUrl,
  getModeUrl,
  getVehicleUrl,
  defaultCarsState,
  defaultToastInfo,
  filterAndSortVehicleData,
  sortVehicleData} from './constants';
import { Vue } from 'vue-property-decorator';

import { CarsState, Vehicle , Filters, IToastInfo , ToastMessageTypes, ToastMessages} from './types';
export const state: CarsState = defaultCarsState();
const getters: GetterTree<CarsState, RootState> = {
  allMakes(s: CarsState): string[] {
    return s._makes;
  },
  allModels(s: CarsState): Record<string, string[]> {
    return s._models;
  },

  allVehicles(s: CarsState): Record<string, Vehicle[]> {
    return s._vehicles;
  },

  modelsBasedOnSelectedMake(s: CarsState): string[] {
    return s._models[s.selectedMake] || [];
  },

  vehiclesBasedOnSelectedModelAndMake(s: CarsState): Vehicle[] {
    return s._vehicles[`${s.selectedMake}_${s.selectedModel}`] || [];
  },

};

const actions: ActionTree<CarsState, RootState> = {

  async fetchData({ commit, dispatch }, {url, commitString}): Promise<void> {
    let message: null | IToastInfo = null;
    try {
      const response = await axios({
        url
      });
      const payload: string[] = response && response.data;
      if (!payload.length) {
        message = {
          type: ToastMessageTypes.Info,
          message: ToastMessages.Info
        };
      }
      commit(commitString, payload);
    } catch (error) {
      console.log(`Error while fetching request ${url}: ${error}`);
      message = {
        type: ToastMessageTypes.Error,
        message: ToastMessages.Error
      };
      commit(commitString, null);
    } finally {
      if (message) {
        dispatch('updateToast', message);
      }
    }
  },

  async fetchMakes({dispatch, commit}): Promise<void> {
    commit('setFetching', {makes: true});
    await dispatch('fetchData', {url: getMakeUrl(), commitString: 'setMakes'});
    commit('setFetching', {makes: false});
  },

  async fetchModels({dispatch, commit}, selectedMake): Promise<void> {
    commit('setFetching', {models: true});
    await dispatch('fetchData', {url: getModeUrl(selectedMake), commitString: 'setModels'});
    commit('setFetching', {models: false});
  },

  async fetchVehicles({state: s, dispatch, commit}): Promise<void> {
    commit('setFetching', {vehicles: true});
    const make = s.selectedMake;
    const model = s.selectedModel;
    await dispatch('fetchData', {url: getVehicleUrl(make, model), commitString: 'setVehicles'});
    commit('setFetching', {vehicles: false});
  },

  async updateSelectedMake({state: s, commit, dispatch}, selectedMake): Promise<void> {
    commit('setSelectedMake', selectedMake);
    commit('setSelectedModel', '');
    if (!s._models[selectedMake]) {
     await dispatch('fetchModels', selectedMake);
    } else if (!s._models[selectedMake].length) {
      dispatch('updateToastMessage', 'Sorry we do not have model for the selected make . Please choose another');
    }
  },

  updateSelectedVehicle({state: s, commit}, vehicle: Vehicle|null): void {
    commit('setSelectedVehicle', vehicle);
  },

  async updateSelectedModel({state: s, commit, dispatch}, selectedModel): Promise<void> {
    commit('setSelectedModel', selectedModel);
    if (!s._vehicles[`${s.selectedMake}_${selectedModel}`]) {
      await dispatch('fetchVehicles');
    } else if (!s._vehicles[`${s.selectedMake}_${selectedModel}`].length) {
      commit('setInfo', 'Sorry we do not have vehicles for the selected make . Please choose another');
    }
  },

  updateFilters({state: s, getters: g , commit}, filters: Record<string, Filters|null>): void {
    const filteredData = filterAndSortVehicleData(filters,
      {sortBy: s.sortBy, sortOrder: s.sortOrder},
      g.vehiclesBasedOnSelectedModelAndMake);
    commit('setFilters', {filters, filteredData});
  },

  updateToast({commit}, toastInfo: IToastInfo): void {
    commit('setToastInfo', toastInfo);
    setTimeout(() => { commit('setToastInfo', defaultToastInfo()); }, 2000);
  },

  updateSort({state: s, commit}, sort: {sortBy: string, sortOrder: string}): void {
    const sortedData = sortVehicleData(sort, s.filteredData);
    commit('setSort', sort);
    commit('setFilters' , {filters: s.filtersApplied, filteredData: sortedData});
  }
};

const mutations: MutationTree<CarsState> = {
  setSort(s: CarsState, sort: {sortBy: string, sortOrder: string}) {
    s.sortBy = sort.sortBy;
    s.sortOrder = sort.sortOrder;
  },
  setToastInfo(s: CarsState, {type, message}: IToastInfo): void {
    s.toastInfo.type = type;
    s.toastInfo.message = message;
  },
  setFetching(s: CarsState, fetching: object = {}) {
    const [key, value] = Object.entries(fetching)[0] || {};
    s.isFetchingDataInProgress[key] = value;
  },
  setFilters(s: CarsState, {filteredData, filters}): void {
    Vue.set(s, 'filteredData', filteredData);
    Vue.set(s , 'filtersApplied', {...filters});
  },
 setMakes(s: CarsState, makes: string[]): void {
   Vue.set(s, '_makes', makes);
 },

 setModels(s: CarsState, models: string[]): void {
   Vue.set(s._models, s.selectedMake, models);
 },

 setVehicles(s: CarsState, vehicles: Vehicle[]): void {
  Vue.set(s._vehicles, `${s.selectedMake}_${s.selectedModel}`, vehicles);
 },

 setSelectedMake(s: CarsState, make: string): void {
   s.selectedMake = make;
 },

 setSelectedModel(s: CarsState, model: string): void {
  s.selectedModel = model;
 },
 selectedVehicle(s: CarsState, vehicle: Vehicle): void {
   s.selectedVehicle = vehicle;
 },

 setSelectedVehicle(s: CarsState, vehicle: Vehicle): void {
  s.selectedVehicle = vehicle;
 }
};

const namespaced: boolean = true;
export const cars: Module<CarsState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
