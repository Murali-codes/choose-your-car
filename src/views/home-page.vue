<template>
  <div id="appContainer">
      <Header/>
      <Content />
      <Footer /> 
  </div>
</template>

<script lang= "ts">
import {Vue, Component} from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Content from '@/components/Content.vue';

@Component({
    components: {
        Header,
        Footer,
        Content
    }
})
export default class HomePahe extends Vue {

}
</script>

<style scoped>
    #appContainer{
        background-color: rgb(255, 255, 255);
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>