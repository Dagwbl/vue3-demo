<template>
  <div class="debug-view">
    {{debugView}}
  </div>
  <div class="table-box">
    <!--  Title-->
    <h1 class="title">Sensor</h1>
    <div class="query-box">
      <el-input v-model="queryInput" placeholder="请输入 model 过滤" @change="handleQueryName"/>
      <div class="btn-list">
        <el-button type="primary" @click="handleInsert">Insert</el-button>
        <el-button type="danger" @click="handleDelMulti" v-if="multipleSelection.length>0">删除多选</el-button>
      </div>
    </div>
    <el-table ref="multipleTableRef"
              :data="tableData"
              :header-cell-style="{'text-align':'center', 'background':'#404040','color':'white'}"
              :cell-style="{'text-align':'center'}"
              style="width: 100%;"
              @selection-change="handleSelectionChange"
              border>
      <el-table-column fixed="left" type="selection" label="Select"/>

      <template v-for="(item,index) in tableHead">
        <el-table-column :prop="item.prop" :label="item.label" :key="index" v-if="item.prop != '!id'"></el-table-column>
      </template>

      <el-table-column fixed="right" label="Operations">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleRowDelete(scope.row)" style="color: #F56C6C"
          >Delete
          </el-button
          >
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        small
        background
        layout="prev, pager, next"
        v-model:total="total"
        class="mt-4"
        v-model:current-page="curPage"
        v-model:page-size="pageSize"
        @current-change="handleChangePage"
        style="display: flex;justify-content: center;margin-top: 10px"
    />
    <el-dialog v-model="dialogFormVisible" :title="dialogType === 'add' ? 'Insert' : 'Edit'">
      <el-form :model="dialogForm">
        <el-form-item label="id" :label-width="120">
          <el-input v-model="dialogForm.id" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="node" :label-width="120">
          <el-input v-model="dialogForm.node" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="model" :label-width="120">
          <el-input v-model="dialogForm.model" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="parameter" :label-width="120">
          <el-input v-model="dialogForm.parameter" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="unit" :label-width="120">
          <el-input v-model="dialogForm.unit" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="range" :label-width="120">
          <el-input v-model="dialogForm.range" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="upload" :label-width="120">
          <el-input v-model="dialogForm.upload" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="optocouple" :label-width="120">
          <el-input v-model="dialogForm.optocouple" autocomplete="off"/>
        </el-form-item>

      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogConfirm"
        >Confirm</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>

</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
//导入资源
import {ref} from "vue";
import request from "../utils/request.js";
import {ElNotification} from "element-plus";

// 数据
const queryInput = ref("");
let tableData = ref([])
// const tableDataCopy = Object.assign(tableData) //此为浅拷贝，并不可靠，为普通类型时可视作深拷贝
const tableDataCopy = ref([])
const multipleSelection = ref([])
const dialogFormVisible = ref(false)
const dialogForm = ref({
  'id': null,
  'node': null,
  'model': null,
  'parameter': null,
  'unit': null,
  'range': null,
  'upload': null,
  'optocouple': null,
})
const tableHead = ref([
  {prop: 'id', label: 'ID'},
  {prop: 'node', label: 'node'},
  {prop: 'model', label: 'model'},
  {prop: 'parameter', label: 'parameter'},
  {prop: 'unit', label: 'unit'},
  {prop: 'range', label: 'range'},
  {prop: 'upload', label: 'upload'},
  {prop: 'optocouple', label: 'optocouple'},
])
const dialogType = ref('add')
tableData.value = [
  {
    id: "1",
    name: 'Tom1',
    email: "dabwl@qq.com",
    phone: "213423451123",
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  }
]
tableDataCopy.value = [
  {
    id: "1",
    name: 'Tom1',
    email: "dabwl@qq.com",
    phone: "213423451123",
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  }
]
const debugView = ref('')

let curPage = ref(1)
let total = ref(10)
let pageSize = ref(20)
// 方法

// 分页

function handleChangePage(val) {
  getTableData(val)
}


//请求测试,获取表格数据
async function getTableData(cur = 1) {
  let res = await request.get('/api/sensor.php?&action=query', {
    pageSize: pageSize.value,
    p: cur
  });
  console.log(res)
  tableData.value = res.data.data
  total.value = parseInt(res.data.total)
  curPage.value = parseInt(res.data.pageNum)
  // notify('Success','查询成功','success')
  // return 0

}

getTableData()

// 搜索
async function handleQueryName(val) {
  console.log(val.length);
  // if (val.length>0){
  //   tableData.value = tableDataCopy.value.filter(item=>item.name.toLowerCase().match(val));
  // }else{
  //   console.log(tableDataCopy.value);
  //   tableData.value = tableDataCopy.value;
  //   console.log(tableDataCopy.value);
  // }
  if (val.length != 0) {
    let res = await request.get("/api/sensor.php?&action=query", {coords: val})
    tableData.value = res.data.data
  } else {
    await getTableData(curPage.value)

  }


}

// handleQueryName
// 删除
async function handleRowDelete(raw) {

  // console.log(id);
  // //通过id获取到对应索引
  // let index = tableData.value.findIndex(item=>item.id===id);
  // tableData.value.splice(index,1);
  // //
  // console.log(index);
  // console.log(raw);
  let res = await request.delete("/api/sensor.php?action=delete", {"model": raw['model']})
  console.log(res)
  notify('Success', '删除成功', 'success')
  await getTableData(curPage.value)

}

//多选
function handleSelectionChange(val) {
  multipleSelection.value = val;
  // console.log(multipleSelection.value)
  console.log(val);
  multipleSelection.value = []
  val.forEach(item => {
    multipleSelection.value.push(item)
  })
  console.log(multipleSelection.value);
}

// 删除多选
async function handleDelMulti() {
  console.log(multipleSelection.value);
  multipleSelection.value.forEach(item => {
    console.log(item);
    handleRowDelete(item)
  })

  notify('Success', '删除成功', 'success')
  await getTableData(curPage.value)

}


//插入
function handleInsert() {
  dialogFormVisible.value = true;
  dialogForm.value = {};

}

// 确认
async function dialogConfirm() {
  dialogFormVisible.value = false
  console.log(dialogType.value);
  // 判断是新增还是编辑
  if (dialogType.value == 'add') {
    // console.log(dialogForm.value);
    // console.log(tableData.value);
    // //拿到数据添加到tableData中
    // tableData.value.push(dialogForm.value);
    // dialogFormVisible.value = false;

    //服务端接受列表（数组）类型，不能够传递单个对象
    let res = await request.post("/api/sensor.php?action=insert", [dialogForm.value])
    console.log(res);
    debugView.value = res.data
    //刷新数据
    await getTableData(curPage.value)
  } else {
    // 获取当前索引
    // let index = tableData.value.findIndex(item=>item.id === dialogForm.value.id)
    // console.log(index);
    // tableData.value[index]=dialogForm.value;
    // dialogFormVisible.value = false;
    let res = await request.post("/api/sensor.php?action=update", {...dialogForm.value})
    console.log(res);
    //刷新数据
    await getTableData(curPage.value)
  }

}

// 编辑
async function handleEdit(row) {
  dialogFormVisible.value = true;
  dialogType.value = 'edit';
  // console.log(row);
  dialogForm.value = {...row}
  // console.log(dialogForm.value);

}

function notify(title, msg, type) {
  //success, warning, info, error
  ElNotification({
    title: title,
    message: msg,
    type: type,
  })
}


</script>


<style scoped>
@import "../style.css";
</style>
