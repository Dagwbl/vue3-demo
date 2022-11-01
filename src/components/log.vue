<template>
  <div class="table-box">
    <!--  Title-->
    <h1 class="title">Log</h1>
    <div class="query-box">
      <el-input v-model="queryInput" placeholder="Please input" @change="handleQueryName"/>
      <div class="btn-list">
        <el-button type="primary" @click="handleInsert">Insert</el-button>
        <el-button type="danger" @click="handleDelMulti" v-if="multipleSelection.length>0">删除多选</el-button>
      </div>
    </div>
    <el-table     ref="multipleTableRef"
                  :data="tableData"
                  :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}"
                  style="width: 100%;"
                  @selection-change="handleSelectionChange"
                  border>
      <el-table-column fixed="left" type="selection" label="Select"/>
      <el-table-column prop="id" label="ID" width="120" />
      <el-table-column prop="coords" label="Coords" />
      <el-table-column prop="optocouple" label="Optocouple"  />
      <el-table-column prop="response_level" label="Response Level" />
      <el-table-column fixed="right" label="Operations" >
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleRowDelete(scope.row)" style="color: #F56C6C"
          >Delete</el-button
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
        @current-change = "handleChangePage"
        style="display: flex;justify-content: center;margin-top: 10px"
    />
    <el-dialog v-model="dialogFormVisible" :title="dialogType === 'add' ? 'Insert' : 'Edit'">
      <el-form :model="dialogForm">
        <el-form-item label="Coords" :label-width="120">
          <el-input v-model="dialogForm.coords" autocomplete="off" />
        </el-form-item>
        <el-form-item label="optocouple" :label-width="120">
          <el-input v-model="dialogForm.optocouple" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Response Level" :label-width="120">
          <el-input v-model="dialogForm.response_level" autocomplete="off" />
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
let tableData = ref( [])
// const tableDataCopy = Object.assign(tableData) //此为浅拷贝，并不可靠，为普通类型时可视作深拷贝
const tableDataCopy = ref([])
const multipleSelection = ref([])
const dialogFormVisible = ref(false)
const dialogForm = ref({
  name:"zjp",
  email:"dagwbl@qq.com"
})
const dialogType = ref('add')
tableData.value = [
  {
    id:"1",
    name: 'Tom1',
    email:"dabwl@qq.com",
    phone:"213423451123",
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id:"2",
    name: 'Tom2',
    email:"dabwl@qq.com",
    phone:"213423451123",
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id:"3",
    name: 'Tom3',
    email:"dabwl@qq.com",
    phone:"213423451123",
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id:"4",
    name: 'Tom4',
    email:"dabwl@qq.com",
    phone:"213423451123",
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  }
]
tableDataCopy.value = [
  {
    id:"1",
    name: 'Tom1',
    email:"dabwl@qq.com",
    phone:"213423451123",
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id:"2",
    name: 'Tom2',
    email:"dabwl@qq.com",
    phone:"213423451123",
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id:"3",
    name: 'Tom3',
    email:"dabwl@qq.com",
    phone:"213423451123",
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id:"4",
    name: 'Tom4',
    email:"dabwl@qq.com",
    phone:"213423451123",
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  }
]
let curPage = ref(1)
let total = ref(10)
let pageSize = ref(15)
// 方法

// 分页

function handleChangePage(val){
  getTableData(val)
}


//请求测试,获取表格数据
async function getTableData(cur=1){
  let res = await request.get('/projects/learn/ESP/api/node.php?&action=query',{
    pageSize: pageSize.value,
    p: cur
  });
  // console.log(res.data.data)
  tableData.value = res.data.data
  total.value = parseInt(res.data.total)
  curPage.value = parseInt(res.data.pageNum)
  // notify('Success','查询成功','success')
  // return 0

}
getTableData()

// 搜索
async function handleQueryName(val){
  console.log(val.length);
  // if (val.length>0){
  //   tableData.value = tableDataCopy.value.filter(item=>item.name.toLowerCase().match(val));
  // }else{
  //   console.log(tableDataCopy.value);
  //   tableData.value = tableDataCopy.value;
  //   console.log(tableDataCopy.value);
  // }
  if (val.length!=0){
    let res = await request.get("/projects/learn/ESP/api/node.php?&action=query",{coords:val})
    tableData.value = res.data.data
  }else {
    await getTableData(curPage.value)

  }


}

// handleQueryName
// 删除
async function handleRowDelete(raw){

  // console.log(id);
  // //通过id获取到对应索引
  // let index = tableData.value.findIndex(item=>item.id===id);
  // tableData.value.splice(index,1);
  // //
  // console.log(index);
  // console.log(raw);
  let res = await request.delete("/projects/learn/ESP/api/node.php?action=delete",{"coords":raw['coords']})
  console.log(res)
  notify('Success','删除成功','success')
  await getTableData(curPage.value)

}

//多选
function handleSelectionChange (val) {
  multipleSelection.value = val;
  // console.log(multipleSelection.value)
  console.log(val);
  multipleSelection.value = []
  val.forEach(item=>{
    multipleSelection.value.push(item)
  })
  console.log(multipleSelection.value);
}

// 删除多选
async function handleDelMulti(){
  console.log(multipleSelection.value);
  multipleSelection.value.forEach(item=>{
    console.log(item);
    handleRowDelete(item)
  })

  notify('Success','删除成功','success')
  await getTableData(curPage.value)

}


//插入
function handleInsert(){
  dialogFormVisible.value = true;
  dialogForm.value = {};

}
// 确认
async function dialogConfirm(){
  dialogFormVisible.value = false

  // 判断是新增还是编辑
  if (dialogType.value=='add'){
    // console.log(dialogForm.value);
    // console.log(tableData.value);
    // //拿到数据添加到tableData中
    // tableData.value.push(dialogForm.value);
    // dialogFormVisible.value = false;

    let res = await request.post("/projects/learn/ESP/api/node.php?action=insert",{...dialogForm.value})
    console.log(res);
    //刷新数据
    await getTableData(curPage.value)
  }
  else {
    // 获取当前索引
    // let index = tableData.value.findIndex(item=>item.id === dialogForm.value.id)
    // console.log(index);
    // tableData.value[index]=dialogForm.value;
    // dialogFormVisible.value = false;
    let res = await request.post("/projects/learn/ESP/api/node.php?action=update",{...dialogForm.value})
    console.log(res);
    //刷新数据
    await getTableData(curPage.value)
  }

}
// 编辑
async function handleEdit(row){
  dialogFormVisible.value=true;
  dialogType.value = 'edit';
  // console.log(row);
  dialogForm.value = {...row}
  // console.log(dialogForm.value);

}

function notify(title,msg,type){
  //success, warning, info, error
  ElNotification({
    title: title,
    message: msg ,
    type: type,
  })
}



</script>


<style scoped>
@import "../style.css";
</style>

