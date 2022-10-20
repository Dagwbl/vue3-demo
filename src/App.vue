<template>
<div class="table-box">
<!--  Title-->
  <h2 class="title">Simple CRUD Demo</h2>
  <div class="query-box">
    <el-input v-model="queryInput" placeholder="Please input" />
    <el-button type="primary">Insert</el-button>
  </div>
  <el-table     ref="multipleTableRef"
                :data="tableData"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                border>
    <el-table-column type="selection" width="55" label="Select"/>
    <el-table-column fixed prop="date" label="Date" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="state" label="State" width="120" />
    <el-table-column prop="city" label="City" width="120" />
    <el-table-column prop="address" label="Address" width="600" />
    <el-table-column prop="zip" label="Zip" width="120" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="rowClick"
        >Detail</el-button
        >
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>

</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
import {ref} from "vue";
// 数据
const queryInput = ref("");
const tableData = ref([])
tableData.value = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]

const multipleSelection = ref([])
// 方法
function rowClick(){
alert("clicked.")
}

function handleSelectionChange (val) {
  multipleSelection.value = val;
  // console.log(multipleSelection.value)
  console.log(val);
}


</script>


<style scoped>
.table-box {
  width: 800px;
  position: absolute;
  /*margin: auto;*/
  top: 5%;
  left: 10%;
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
