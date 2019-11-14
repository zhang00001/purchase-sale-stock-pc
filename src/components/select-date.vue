<template>
  <div class="date order-date">
    <span class="time-tit">单据日期 :</span>
    <el-radio-group v-model="selectData" size="medium" @change="chanDate">
      <el-radio-button v-for="item in dates" :label="item.value" :key="item.value">{{item.lable}}</el-radio-button>
    </el-radio-group>
    <div class="pick-time">
      <el-date-picker
        v-model="start_time"
        type="date"
        placeholder="开始日期"
        value-format="yyyy-MM-dd"
        class="time"
        @change="chanStart"
      ></el-date-picker>
      <el-date-picker
        v-model="end_time"
        type="date"
        placeholder="结束日期"
        value-format="yyyy-MM-dd"
        class="time"
        @change="chanEnd"
      ></el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectData: "1",
      start_time: "",
      end_time: "",
      dates: [
        { lable: "全部", value: "1" },
        { lable: "今日", value: "2" },
        { lable: "昨日", value: "3" },
        { lable: "一周内", value: "4" },
        { lable: "一月内", value: "5" }
      ]
    };
  },
  filters: {},
  mounted() {},
  created() {},
  methods: {
    chanDate() {
      switch (this.selectData) {
        case "1":
          (this.start_time = ""), (this.end_time = "");
          this.$emit("refresh", this.start_time, this.end_time);
          break;
        case "2":
          (this.end_time = new Date(
            new Date().getTime() + 8 * 60 * 60 * 1000
          ).toISOString()),
            (this.start_time = new Date(
              new Date(new Date().setHours(0, 0, 0, 0)).getTime() +
                8 * 60 * 60 * 1000
            ).toISOString());
          this.$emit("refresh", this.start_time, this.end_time);
          break;

        case "3":
          (this.end_time = new Date(
            new Date().getTime() + 8 * 60 * 60 * 1000
          ).toISOString()),
            (this.start_time = new Date(
              new Date(new Date().setHours(0, 0, 0, 0)).getTime() +
                8 * 60 * 60 * 1000 -
                1 * 24 * 60 * 60 * 1000
            ).toISOString());
          this.$emit("refresh", this.start_time, this.end_time);
          break;

        case "4":
          (this.end_time = new Date(
            new Date().getTime() + 8 * 60 * 60 * 1000
          ).toISOString()),
            (this.start_time = new Date(
              new Date(new Date().setHours(0, 0, 0, 0)).getTime() +
                8 * 60 * 60 * 1000 -
                7 * 24 * 60 * 60 * 1000
            ).toISOString());
          this.$emit("refresh", this.start_time, this.end_time);
          break;

        case "5":
          this.end_time = new Date(
            new Date().getTime() + 8 * 60 * 60 * 1000
          ).toISOString();
          this.start_time = new Date(
            new Date(new Date().setHours(0, 0, 0, 0)).getTime() +
              8 * 60 * 60 * 1000 -
              30 * 24 * 60 * 60 * 1000
          ).toISOString();
          this.$emit("refresh", this.start_time, this.end_time);
          break;
        default:
          (this.start_time = ""), (this.end_time = "");
          this.$emit("refresh", this.start_time, this.end_time);
      }
    },

    chanStart(startTime) {
      this.start_time = startTime;
      this.$emit("refresh", this.start_time, this.end_time);
    },

    chanEnd(endTime) {
      this.end_time = endTime;
      this.$emit("refresh", this.start_time, this.end_time);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.date {
  /deep/ .el-button--text {
    color: rgba(153, 153, 153, 1);
  }

  /deep/ .el-radio-button--medium .el-radio-button__inner {
    background: none !important;
    // color: #999999;
  }
  span {
    margin-right: 16px;
  }
  .datepicker {
    margin-left: 16px;
  }
  .time-tit {
    color: #606266;
  }
  .pick-time {
    margin: 2px 0 0 23px;
  }
}
</style>
