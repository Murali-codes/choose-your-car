<template>
    <div class="number-input">
         <label class="label" v-if="label" for="number">{{label}}</label>
        <input name="number" min="0" type="number" :value="value" @input="inputChanged"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue , Prop, Emit} from 'vue-property-decorator';

@Component
export default class NumberInput extends Vue {
    @Prop({required: false, default: ''}) public label!: string;
    @Prop({required: true, default: null}) public value!: number| null;

    @Emit()
    public input(value: null | number) {}

    public inputChanged(event: any) {
        let value: any = event.target.value;
        if (value === '') {
            value = null;
        } else {
            value = Number(value);
        }
        this.input(value);
    }
}
</script>

<style scoped>

.number-input input:focus {
  outline: var(--input-elm-outline);
  border-color: var(--input-elm-focus-border-color);
  box-shadow: var(--input-elm-focus-border-shadow);
}
.number-input input{
 padding: 7px 7px 7px 12px;
 border: 1px solid #e8eaed;
 border-radius: 5px;
 background: #fff;
}
label{
    margin:auto;
    white-space: nowrap;
    font-weight: normal;
}
</style>