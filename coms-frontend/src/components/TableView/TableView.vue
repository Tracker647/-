<template>
  <v-app>
    <v-app-bar app color="white" flat>
      <div class="title">欢迎使用客户订单管理系统</div>
      <v-container class="py-0" fill-height>
        <span>
          欢迎,{{ userName }}, 你现在的身份是: {{ identity }} 现在时间:
          {{ time }}
        </span>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3 my-2">
      <v-row>
        <v-col cols="2">
          <v-sheet rounded="lg">
            <v-list>
              <v-list-item
                v-for="(item, index) in tables"
                :key="index"
                link
                @click="tableSelect(index)"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider class="my-2"></v-divider>

              <v-list-item link color="grey lighten-4">
                <v-list-item-content>
                  <v-list-item-title @click="refresh"> 刷新 </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>

        <v-col>
          <v-row align="center" class="mx-12">
            <v-col>
              <v-text-field
                v-model="pkvForSearch"
                label="输入主键值搜索"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-btn @click="search(pkvForSearch)">搜索</v-btn>
            </v-col>
            <v-col> 搜索结果:{{ searchQuery }} </v-col>
          </v-row>

          <v-card v-if="!inModify" class="mx-auto">
            <v-card-title>{{ currentTable.name }}</v-card-title>

            <v-data-table :headers="headers" :items="dataList">
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editData(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small class="mr-2" @click="deleteData(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>

            <v-card-actions>
              <v-btn default color="info" @click="addData">添加数据</v-btn>
            </v-card-actions>
          </v-card>

          <v-container v-else>
            <v-btn default color="info" @click="endEdit">返回</v-btn>
            <v-col v-if="mode === 'add'">
              <add-data></add-data>
            </v-col>

            <v-col v-else>
              <update-data></update-data>
            </v-col>
          </v-container>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import DataService from "@/services/DataService";
import UpdateData from "@/components/TableView/UpdateData";
import AddData from "@/components/TableView/AddData";

var dataService;
export default {
  name: "TableView",
  components: {
    UpdateData,
    AddData,
  },
  data: () => ({
    inModify: false,
    mode: null,
    userName: "admin",
    identity: "工作人员",
    time: "",
    pkvForSearch: "",
    searchQuery: null,
    currentTable: {
      index: null,
      name: "",
      path: "",
      pkName: "",
      data: {},
    },
    tables: [
      {
        name: "订单",
        path: "/order",
        pk: "订单号",
      },
      {
        name: "订单包含",
        path: "/orderDetail",
        pk: "订单包含_id",
      },
      {
        name: "发票",
        path: "/ticket",
        pk: "发票号",
      },

      {
        name: "服务",
        path: "/service",
        pk: "客户号",
      },
      {
        name: "工作人员",
        path: "/worker",
        pk: "工号",
      },
      {
        name: "客户",
        path: "/customer",
        pk: "客户号",
      },
      {
        name: "客户订单",
        path: "/customerOrder",
        pk: "订单号",
      },
      {
        name: "商品",
        path: "/product",
        pk: "商品号",
      },
      {
        name: "支付",
        path: "/payby",
        pk: "支付_id",
      },
    ],
    dataList: [],
    headers: [],
  }),
  methods: {
    /** 左部List选取表格,原理是用下标获取对应table对象的名字和url
     *  大多数时候都是调用这两个函数
     */
    tableSelect(index) {
      var url = this.tables[index].path.substring(1);
      /**
       * 选取表格时 存储对应的索引,主键名,api路径和数据样本供CRUD使用
       */
      this.currentTable.index = index;
      this.currentTable.pkName = this.tables[index].pk;
      this.currentTable.path = url;
      this.currentTable.name = this.tables[index].name;
      this.initTable(this.currentTable.path);
    },
    async initTable() {


      var pathName = this.currentTable.path;
      dataService = new DataService(pathName);
      this.dataList = await this.retrieveDataList();
      this.currentTable.data = this.dataList[0];

      this.disPlayData(this.dataList);

      this.searchQuery = null;
    },

    refresh() {
      this.tableSelect(this.currentTable.index);
    },
    async retrieveDataList() {
      var pkName = this.currentTable.pkName;
      var promData = await dataService
        .getAll()
        .then((res) => {
          var rawData = this.dataParser(res.data);
          var dataList = [];
          for (let i = 0; i < rawData.length; i++) {
            dataList.push(rawData[i]);
            dataList[i].pkv = rawData[i][pkName];
          }

          return dataList;
        })
        .catch((e) => {
          console.log(e);
        });

      return promData;
    },
    async disPlayData(dataList) {
      console.log(dataList);

      var list = this.dataParser(dataList);
      var keyList = Object.keys(list[0]);
      var headers = [];
      for (let i = 0; i < keyList.length; i++) {
        var item = {};
        item.text = keyList[i];
        item.value = keyList[i];
        headers.push(item);
      }
      var action = { text: "Actions", value: "actions", sortable: false };
      this.headers = headers;
      this.headers.push(action);
    },
    /**将后端获取的对象转化为JSON字符后再解析，
     * 起到提纯效果 */
    dataParser(dataList) {
      var rawString = JSON.stringify(dataList);
      var rawData = JSON.parse(rawString);
      return rawData;
    },

    // 查询,修改和删除都要求把对应元组的路径和主键值拿出来给api!(早知道数据库设计阶段直接用统一的id了)
    editData(tableItem) {
      this.inModify = true;
      this.mode = "update";

      console.log("要更新的数据为:");
      console.log(this.dataParser(tableItem));

      console.log(this.currentTable.path);
      this.$store.currentTablePath = this.currentTable.path;
      this.$store.currentTableItem = tableItem;
    },
    addData() {
      this.inModify = true;
      this.mode = "add";

      console.log("修改表的对应属性");
      console.log(Object.keys(this.currentTable.data));

      this.$store.currentTablePath = this.currentTable.path;
      this.$store.currentTableItem = this.currentTable.data;
    },

    deleteData(tableItem) {
      console.log("要删除的数据");
      console.log(this.dataParser(tableItem));
      var tableItemData = this.dataParser(tableItem);
      dataService
        .delete(tableItemData.pkv)
        .then(() => {
          this.refresh();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    endEdit() {
      this.inModify = false;
      this.refresh();
    },

    search() {
      var condition = this.pkvForSearch;
      dataService
        .get(condition)
        .then((res) => {
          console.log(res.data);
          this.searchQuery = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    setInterval(() => {
      var nowTime = new Date();
      this.time = nowTime.toLocaleString();
    }, 1000);
  },
  beforeDestroy() {
    if (this.time) {
      clearInterval(this.time);
    }
  },
};
</script>
<style lang="">
</style>