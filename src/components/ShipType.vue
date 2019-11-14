<template>
  <div>
    <el-dialog
      title="发货方式"
      :visible.sync="dialogVisible"
      :show-close="false"
      :before-close="hidedialogVisible"
    >
      <el-form ref="form" :model="form" label-width="auto">
        <el-form-item label="发货方式 :">
          <el-select placeholder="请选择" v-model="mode1">
            <el-option label="自提" value="1"></el-option>
            <el-option label="送车" value="2"></el-option>
            <el-option label="送指定点" value="3"></el-option>
            <el-option label="电子面单" value="4"></el-option>
            <el-option label="发物流" value="5"></el-option>
          </el-select>
        </el-form-item>
        <div style="    display: flex;
    flex-wrap: wrap;">
          <template v-if="mode1=='2'">
            <el-form-item label="车牌 :">
              <el-input v-model="form.cardNo"></el-input>
            </el-form-item>
            <el-form-item label="司机姓名 :">
              <el-input v-model="form.cardname"></el-input>
            </el-form-item>
            <el-form-item label="司机电话 :">
              <el-input v-model="form.cardmobie"></el-input>
            </el-form-item>
            <el-form-item label="发货地址 :">
              <el-input v-model="form.cardaddress"></el-input>
            </el-form-item>
          </template>

          <template v-if="mode1=='4'||mode1=='5'">
            <el-form-item label="物流 :">
              <el-select
                placeholder="请选择"
                v-model="form.logistics"
                @change="changeLog(form.logistics)"
              >
                <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in logs"></el-option>
              </el-select>
            </el-form-item>
          </template>
          <template v-if="mode1=='5'">
            <el-form-item label="网点 :">
              <el-select placeholder="请选择" v-model="form.networks">
                <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in nets"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单号 :">
              <el-input v-model="form.number"></el-input>
            </el-form-item>
          </template>

          <template v-if="mode1=='2'||mode1=='3'||mode1=='4'||mode1=='5'">
            <el-form-item label="收件人 :">
              <el-input v-model="form.people"></el-input>
            </el-form-item>
            <el-form-item label="联系电话 :">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </template>
        </div>
        <template v-if="mode1=='2'||mode1=='3'||mode1=='4'||mode1=='5'">
          <el-form-item label="地址 :">
            <Region ref="region" :region="regions"></Region>
            <el-input style="    width: 61%;" v-model="form.address"></el-input>
          </el-form-item>
        </template>
        <el-checkbox
          v-if="showCheckBox"
          v-model="synchronization"
          style="margin-left:30px;"
          @change="changeBox"
        >同步至客户地址</el-checkbox>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hidedialogVisible">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { logistics, logisticsOutlets, editCus } from "@/api/index";
import Region from "@/components/Region";
export default {
  components: {
    Region
  },
  data() {
    return {
      form: {
        cardNo: "", //车牌
        cardname: "", //司机姓名
        cardmobie: "", //cardmobie
        cardaddress: "", //发货地址
        logistics: "", //物流
        networks: "", //网点
        number: "", //单号
        people: "", //收件人
        phone: "", //联系电话
        address: "", //地址
        region: "", //地址省市区
        synchronization: ""
      },
      synchronization: "",
      regions: "",
      mode1: this.mode,
      nets: [],
      logs: []
    };
  },
  props: ["mode", "dialogVisible", "showCheckBox", "cusOne", "mode_address"],
  methods: {
    changeBox() {
      if (this.synchronization) {
        editCus(this.cusOne.id, {
          mode: this.mode1,
          name: this.cusOne.name,
          sort: this.cusOne.sort,
          mode_address: JSON.stringify(this.form)
        }).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg);
          }
        });
      }
    },
    save() {
      this.form.region = this.$refs.region.selected;
      this.$emit("modedes", this.form);
      this.$emit("mode", this.mode1);
      this.hidedialogVisible();
    },
    hidedialogVisible() {
      this.$emit("hidedialogVisible", false);
    },
    getbaseSelect() {
      logistics({ page: 1, size: 100000 }).then(res => {
        this.logs = res.data.data;
      });
    },
    changeLog(id) {
      this.form.networks = "";
      logisticsOutlets({
        id: id,
        page: 1,
        size: 100000
      }).then(res => {
        this.nets = res.data.data;
      });
    }
  },
  computed: {},
  created() {
    this.getbaseSelect();
  },
  mounted() {},
  watch: {
    mode_address(e) {
      this.form = JSON.parse(e);
    },
    mode(e) {
      this.mode1 = e.toString();
    },
    dialogVisible(e) {
      this.regions = this.form.region;
    },
    cusOne(e) {
      if (e.mode_address) {
        this.changeLog(JSON.parse(e.mode_address).networks);
      }

      this.form = JSON.parse(e.mode_address);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .map .area-select .area-selected-trigger {
  top: -8px !important;
}
</style>
