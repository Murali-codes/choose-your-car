<template>
  <div class="custom-select">
    <label class="label" v-if="label" for="select">{{label}}</label>
    <div class="select">
        <select id="slct" required="required" @change="onSelectionChange" :value="selected">
            <option value="" disabled="disabled" selected="selected">
              <span >Select ...</span>
            </option>
            <option v-for="opt in options" :key="`option-${opt.id}`" :value="opt.value">{{opt.label}}</option>
        </select>
        <Loader class="select-loader" v-if="loading"/>
        <svg v-else>
            <use xlink:href="#select-arrow-down"></use>
        </svg>
    </div>
    <!-- SVG Sprites-->
    <svg class="sprites">
    <symbol id="select-arrow-down" viewbox="0 0 10 6">
        <polyline points="1 1 5 5 9 1"></polyline>
    </symbol>
    </svg>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
import Loader from '@/components/re-usable-components/loader.vue';
const defaultKeys = () => ({label: 'label', value: 'value', id: 'id'});
interface ISelectItemKeys {
    label: string;
    value: any;
    id: string | number;
}
@Component({
  components: {
    Loader
  }
})
export default class CustomSelect extends Vue {
    @Prop({required: false, default: ''}) public label!: string;
    @Prop({required: true, default: () => []}) public source!: any[];
    @Prop({required: false }) public keys!: ISelectItemKeys ;
    @Prop({required: true, default: ''}) public selected!: string;
    @Prop({required: false, default: false}) public loading!: boolean;

    public get validKeys(): ISelectItemKeys {
        return { ...this.keys || {} , ...defaultKeys()};
    }
    public get options() {
        if (this.source.length && typeof this.source[0] === 'object') {
            if (this.keys) {
                return this.source.map((i) => (
                  {
                    label: i[this.validKeys.label],
                    value: i[this.validKeys.value],
                    id: i[this.validKeys.id]
                  }
                ));
            }
            return this.source;
        } else {
            return this.source.map((i) => ({label: i, value: i, id: i}));
        }
    }


    @Emit()
    public updateSelected(seleted: any): void {}
    public onSelectionChange(event: any): void {
        const selected = event.target.value;
        this.updateSelected(selected);
    }
}
</script>

<style scoped>
label{
    margin:auto;
    white-space: nowrap;
}
.select {
  position: relative;
  min-width: 200px;
  margin:auto;
}
.custom-select{
    display: flex;
}
.select svg {
  position: absolute;
  right: 12px;
  top: calc(50% - 3px);
  width: 10px;
  height: 6px;
  stroke-width: 2px;
  stroke: #9098a9;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  pointer-events: none;
}
.select select {
  -webkit-appearance: none;
  padding: 7px 40px 7px 12px;
  border: 1px solid #e8eaed;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 1px 3px -2px #9098a9;
  cursor: pointer;
  font-family: inherit;
  font-size: 16px;
  transition: all 150ms ease;
}
select{
  width: 100%;
}
.select select:required:invalid {
  color: #5a667f;
}
.select select option {
  color: #223254;
}
.select select option[value=""][disabled] {
  display: none;
}
.select select:focus {
  outline: var(--input-elm-outline);
  border-color: var(--input-elm-focus-border-color);
  box-shadow: var(--input-elm-focus-border-shadow);
}
.select select:hover + svg {
  stroke:var(--svg-arrow-storke-color);
}
.sprites {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  user-select: none;
}

.select-loader{
  height: 100%;
  position: absolute;
  right: 12px;
  width: 25px;
}

</style>