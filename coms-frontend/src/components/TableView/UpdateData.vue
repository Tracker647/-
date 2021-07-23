<template>
  <div v-if="!submit" class="submit-form mx-auto">
    <p class="headline">更新记录</p>
    <v-form>
      <v-text-field
        v-model="currentData[item]"
        v-for="item in rowList"
        :key="item"
        :label="item"
      >
      </v-text-field>
    </v-form>

    <v-btn color="success" class="mt-3" @click="updateData">提交</v-btn>
  </div>
  <div v-else>
    <v-card class="mx-auto">
      <v-card-title> 提交成功! </v-card-title>
      <v-card-text> 新数据: {{ currentData }}</v-card-text>
      <v-card-subtitle> 点击下面的按钮添加新的记录。 </v-card-subtitle>
      <v-card-actions>
        <v-btn color="success" class="mt-3" @click="backFornewUpdate"
          >继续提交</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>


<script>
import DataService from "../../services/DataService";
var dataService;
export default {
  name: "Data",
  data() {
    return {
      currentData: this.$store.currentTableItem,
      currentPath: this.$store.currentTablePath,
      rowList: Object.keys(this.$store.currentTableItem),
      submit: false,
    };
  },
  methods: {
    updateData() {
      this.submit = !this.submit;
      dataService = new DataService(this.currentPath);
      dataService
        .update(this.currentData.pkv, this.currentData)
        .then((res) => {})
        .catch((e) => {
          console.log(e);
        });
    },
    backFornewUpdate() {
      this.submit = !this.submit;
    },
    /**将后端获取的对象转化为JSON字符后再解析，
     * 起到提纯效果
     *
     * 由于未知原因,在方法间传递data都要先用这个函数解析才能正常使用
     * */
    dataParser(dataList) {
      var rawString = JSON.stringify(dataList);
      var rawData = JSON.parse(rawString);
      return rawData;
    },
  },
  mounted() {},
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>