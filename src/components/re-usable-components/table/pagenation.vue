<template>
  <div class="pagination" v-if="pages > 1">
          <div>
            <a @click="moveSet(-1)">{{showFrom !== 0 ? '&laquo;&laquo;' :''}}</a>
            <a @click="movePage(-1)"> {{ pageSelected !== 1 ? '&laquo;' : '' }}</a>
            <a v-for="page of showUpTo" :class="page === pageSelected  ? 'active' : ''" :key="`page-${page}`" @click="pageSelectionChange(page)">{{page}}</a>
            <a  @click="movePage(+1)"> {{pageSelected !== pages ? '&raquo;' : ''}} </a>
            <a  @click="moveSet(+1)"> {{showTo !== pages ? '&raquo;&raquo;' : ''}}</a>
          </div>
        </div>
</template>

<script lang="ts">
import { Component, Prop, Vue , Emit} from 'vue-property-decorator';
@Component
export default class Pagenation extends Vue {
  @Prop() public totalRecords!: number;
  @Prop() public pageSelected!: number;

  public showFrom = 0;
  public showTo  = 8;

  @Emit()
  public pageSelectionChanged(page: number): void {}

  public get showUpTo(): number[] {
    return this.allPages.slice(this.showFrom, Math.min(this.pages, this.showTo));
  }
  public get allPages(): number[] {
    return new Array(this.pages).fill('').map((v, i) => i + 1);
  }
  public get pages(): number {
    return Math.ceil(this.totalRecords / 15);
  }

  public pageSelectionChange(page: number): void {
    this.pageSelectionChanged(page);
  }

   public movePage(move: number): void {
    this.pageSelectionChanged(this.pageSelected + move);
    this.showFrom =  Math.max(this.pageSelected - 1, 0);
    this.showTo =  Math.min(this.showFrom + 8, this.pages);
  }

    public moveSet(move: number): void {
    if (move === 1) {
       this.showTo = Math.min(this.pages, this.showTo +  8);
       this.showFrom = Math.max(0, this.showTo - 8);
    } else {
      this.showFrom = Math.max(this.showFrom - 8, 0);
      this.showTo = Math.min(this.pages, this.showFrom +  8);
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}

.pagination a.active {
  background-color: #4CAF50;
  color: white;
}

</style>