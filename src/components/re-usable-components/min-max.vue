<<template>
    <div>
        <NumberInput class="min"  :value="min" @input="inputMin" label="Min :" />
        <NumberInput class="max" :value="max" @input="inputMax" label="Max :"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue , Prop, Emit} from 'vue-property-decorator';
import NumberInput from './number-input.vue';
@Component({
    components: {
        NumberInput
    }
})
export default class MinMax extends Vue {
    @Prop({required: false, default: null}) public min!: null|number;
    @Prop({required: false, default: null}) public max!: null|number;

    @Emit()
    public inputMin(value: number) {}

    @Emit()
    public inputMax(value: number) {}

}
</script>

<style scoped>
 .max{
    padding: 5px;
 }
 .min{
   padding: 5px
 }
</style>