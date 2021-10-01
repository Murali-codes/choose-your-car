import { MutationTree, Module, GetterTree, ActionTree } from 'vuex';
import axios from 'axios';
import { RootState } from './types';
import {getMakeUrl, getModeUrl, getVehicleUrl} from './constants';
import { Vue } from 'vue-property-decorator';

import { CarsState, Vehicle , Filters} from './types';
export const state: CarsState = {
  _makes: [],
  _models: {},
  _vehicles: {},
  selectedMake: '',
  selectedModel: '',
  selectedVehicle: null,
  filtersApplied: {} as Filters,
  error: '',
  info: ''
};
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
    return s._models[s.selectedMake];
  },

  vehiclesBasedOnSelectedModelAndMake(s: CarsState): Vehicle[] {
    return s._vehicles[`${s.selectedMake}_${s.selectedModel}`] || [];
  },

  hasError(s: CarsState): boolean {
    return Boolean(s.error);
  },
};

const actions: ActionTree<CarsState, RootState> = {

  async fetchData({ commit }, {url, commitString}): Promise<void> {
    commit('setError', '');
    commit('setInfo', '');
    try {
      const response = await axios({
        url
      });
      const payload: string[] = response && response.data;
      if (!payload.length) {
        commit('setInfo', 'Sorry we do not have vehicles for the choosen combination');
      }
      commit(commitString, payload);
    } catch (error) {
      console.log(`Error while fetching request ${url}: ${error}`);
      commit('setError', 'Error occured. Please try again later');
      commit(commitString, []);
    }
  },

  async fetchMakes({dispatch}): Promise<void> {
    await dispatch('fetchData', {url: getMakeUrl(), commitString: 'setMakes'});
  },

  async fetchModels({dispatch}, selectedMake): Promise<void> {
    await dispatch('fetchData', {url: getModeUrl(selectedMake), commitString: 'setModels'});
  },

  async fetchVehicles({state: s, dispatch}): Promise<void> {
    const make = s.selectedMake;
    const model = s.selectedModel;
    await dispatch('fetchData', {url: getVehicleUrl(make, model), commitString: 'setVehicles'});
  },

  async updateSelectedMake({state: s, commit, dispatch}, selectedMake): Promise<void> {
    commit('setSelectedMake', selectedMake);
    commit('setSelectedModel', '');
    commit('setInfo', '');
    commit('setError', '');
    if (!s._models[selectedMake]) {
     await dispatch('fetchModels', selectedMake);
    } else if (!s._models[selectedMake].length) {
      commit('setInfo', 'Sorry we do not have model for the selcted make . Please choose another');
    }
  },

  updateSelectedVehicle({state: s, commit}, vehicle: Vehicle): void {
    console.log('update selctedvehicle');
    commit('setSelectedVehicle', vehicle);
  },

  async updateSelectedModel({state: s, commit, dispatch}, selectedModel): Promise<void> {
    commit('setSelectedModel', selectedModel);
    commit('setInfo', '');
    commit('setError', '');
    if (!s._vehicles[`${s.selectedMake}_${selectedModel}`]) {
      await dispatch('fetchVehicles');
    } else if (!s._vehicles[`${s.selectedMake}_${selectedModel}`].length) {
      commit('setInfo', 'Sorry we do not have vehicles for the selcted make . Please choose another');
    }
  },

  updateFilters({state: s, commit}, filters: Record<string, Filters|null>): void {
    commit('setFilters', filters);
  }
};

const mutations: MutationTree<CarsState> = {
  setFilters(s: CarsState, filters): void {
    Vue.set(s , 'filtersApplied', filters);
  },
 setMakes(s: CarsState, makes: string[]): void {
   Vue.set(s, '_makes', makes);
 },

 setModels(s: CarsState, models: string[]): void {
   Vue.set(s._models, s.selectedMake, models);
 },
  setInfo(s: CarsState, info): void {
    s.info = info;
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
 setError(s: CarsState, error: string): void {
   s.error = error;
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
