<template>
<div class="table-box">
<!--  Title-->
  <h2 class="title">Simple CRUD Demo</h2>
  <div class="query-box">
    <el-input v-model="queryInput" placeholder="Please input" @input="handleQueryName"/>
    <div class="btn-list">
      <el-button type="primary" @click="handleInsert">Insert</el-button>
      <el-button type="danger" @click="handleDelMulti" v-if="multipleSelection.length>0">删除多选</el-button>
    </div>
  </div>
  <el-table     ref="multipleTableRef"
                :data="tableData"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                border>
    <el-table-column fixed="left" type="selection" width="55" label="Select"/>
    <el-table-column prop="id" label="ID" width="120" />
    <el-table-column prop="coords" label="Coords" width="120" />
    <el-table-column prop="optocouple" label="Optocouple" width="120" />
    <el-table-column prop="response_level" label="Response Level" width="120" />
    <el-table-column prop="address" label="Address" width="200" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleRowDelete(scope.row)" style="color: #F56C6C"
        >Delete</el-button
        >
        <el-button link type="primary" size="small" @click="handleEdit(scope.row)">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogFormVisible" :title="dialogType === 'add' ? 'Insert' : 'Edit'">
    <el-form :model="dialogForm">
      <el-form-item label="Name" :label-width="80">
        <el-input v-model="dialogForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Email" :label-width="80">
        <el-input v-model="dialogForm.email" autocomplete="off" />
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
import request from "./utils/request.js";

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


// 方法




//请求测试
async function getTableData(cur=1){
  let res = await request.get('/projects/learn/ESP/api/node.php?&action=query',{
    pageSize: 10,
    p: cur
  });
  console.log(res)
  tableData.value = res.data;
  // return res.v

}
getTableData()

// 搜索
function handleQueryName(val){
  console.log(val);
  if (val.length>0){
    tableData.value = tableDataCopy.value.filter(item=>item.name.toLowerCase().match(val));
  }else{
    console.log(tableDataCopy.value);
    tableData.value = tableDataCopy.value;
    console.log(tableDataCopy.value);
  }

}

// handleQueryName
// 删除
function handleRowDelete(id){
// alert("clicked.")
  console.log(id);
  //通过id获取到对应索引
  let index = tableData.value.findIndex(item=>item.id===id);
  tableData.value.splice(index,1);
  //
  console.log(index);
}
// 删除多选
function handleDelMulti(){
  console.log(multipleSelection.value);
  multipleSelection.value.forEach(id=>{
    handleRowDelete(id)
  })

}
//多选
function handleSelectionChange (val) {
  multipleSelection.value = val;
  // console.log(multipleSelection.value)
  console.log(val);
  multipleSelection.value = []
  val.forEach(item=>{
    multipleSelection.value.push(item.id)
  })
  console.log(multipleSelection.value);
}

//插入
function handleInsert(){
  dialogFormVisible.value = true;
  dialogForm.value = {};

}
// 确认
function dialogConfirm(){
  // 判断是新增还是编辑
  if (dialogType.value=='add'){
    console.log(dialogForm.value);
    console.log(tableData.value);
    //拿到数据添加到tableData中
    tableData.value.push(dialogForm.value);
    dialogFormVisible.value = false;
  }
  else {
    // 获取当前索引
    let index = tableData.value.findIndex(item=>item.id === dialogForm.value.id)
    console.log(index);
    tableData.value[index]=dialogForm.value;
    dialogFormVisible.value = false;
    // 替换当前索引位置
  }

}
// 编辑
function handleEdit(row){
  dialogFormVisible.value=true;
  dialogType.value = 'edit';
  console.log(row);
  dialogForm.value = {...row}
  console.log(dialogForm.value);
}
</script>


<style scoped>
.table-box {
  width: 80%;
  margin: 50px auto;
}
.title {
  text-align: center;
}
.query-box{
  display: flex;
  justify-content: space-between;
margin-bottom: 20px;
}
.el-input{
  width: 200px;
}
</style>
