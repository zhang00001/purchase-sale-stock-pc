<template>
  <div class="map">
    <area-cascader :level="1" type="text" :data="pcaa" v-model="selected"></area-cascader>
  </div>
</template>
<script>
import { AreaCascader } from "vue-area-linkage";
import { pca, pcaa } from "area-data";
export default {
  data() {
    return {
      pca: pca,
      pcaa: pcaa,
      selected: []
    };
  },
  props: ["region"],
  created() {
    this.selected = this.region;
  },
  watch: {
    region(e) {
      this.selected = e;
    }
    // region(e) {
    //   if (e == "[]") {
    //     this.selected = [];
    //   } else {
    //     this.selected = e;
    //   }
    // }
  },
  methods: {
    clear() {
      Object.assign(this.$data, this.$options.data());
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.map {
  display: inline-block;
}

.map /deep/ .area-cascader-wrap {
  width: 190px;
  display: inline-block;
}
.map /deep/ .area-select {
  height: 40px;
}
.map /deep/ .area-select .area-selected-trigger {
  top: 11px;
}
</style>