<template>
    <div class="textbox">
        <label class="label" v-if="label" for="textbox">{{label}}</label>
        <input name="textbox" :value="value" @input="input"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue , Prop, Emit} from 'vue-property-decorator';

@Component
export default class TextInput extends Vue {
    @Prop({required: false, default: ''}) public label!: string;
    @Prop({required: true, default: null}) public value!: string;
    @Emit()
    public input(event: any) {
        return event.target.value;
    }
}
</script>

<style scoped>

.textbox input:focus {
  outline: var(--input-elm-outline);
  border-color: var(--input-elm-focus-border-color);
  box-shadow: var(--input-elm-focus-border-shadow);
}
.textbox input{
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