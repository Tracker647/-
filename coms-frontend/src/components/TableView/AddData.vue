<template>
  <div class="submit-form mx-auto">
    <p class="headline">添加数据</p>
    <div v-if="!submit">
      <v-form>
        <v-text-field
          v-model="newData[item]"
          v-for="item in rowList"
          :key="item"
          :label="item"
        >
        </v-text-field>
      </v-form>

      <v-btn color="success" class="mt-3" @click="addData">提交</v-btn>
    </div>
    <div v-else>
      <v-card class="mx-auto">
        <v-card-title> 提交成功! </v-card-title>
        <v-card-subtitle> 点击下面的按钮添加新的记录。 </v-card-subtitle>
        <v-card-actions>
          <v-btn color="success" class="mt-3" @click="backFornewData"
            >继续提交</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import DataService from "@/services/DataService";
var dataService;
export default {
  data() {
    return {
      rowList: null,
      newData: {},
      submit: false,
      fieldName: null,
    };
  },
  methods: {
    backFornewData() {
      this.submit = !this.submit;
      this.newData = {};
    },
    addData() {
      this.submit = !this.submit;
      dataService = new DataService(this.$store.currentTablePath);
      dataService.create(this.newData)
      .then((res)=>{
        console.log(res.data);
      })
    },
  },
  mounted() {
    var rawRowList = Object.keys(this.$store.currentTableItem);
    rawRowList.pop();
    this.rowList = rawRowList;
    console.log(this.rowList);
  },
};
</script>

<style>
</style>