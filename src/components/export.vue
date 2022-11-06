<template>
  <h1 style="text-align: center">数据导出</h1>
  <el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align: center">
    <el-form-item label="数据表">
      <el-select v-model="formInline.table" placeholder="请选择" style="width: 100px">
        <el-option label="Data" value="data"/>
        <el-option label="Sensor" value="sensor"/>
        <el-option label="Node" value="node"/>
        <el-option label="Log" value="log"/>
      </el-select>
    </el-form-item>
    <el-form-item label="条件">
      <el-input v-model="formInline.filter" placeholder="sensor='testsensor-2'"/>
    </el-form-item>
    <el-form-item label="时间">
      <div class="block">
        <span class="demonstration"></span>
        <el-date-picker
            v-model="formInline.date"
            type="date"
            placeholder="Pick a day"
            :disabled-date="disabledDate"
            :shortcuts="shortcuts"
            style="width: 150px"
        />
      </div>
    </el-form-item>

    <el-form-item>
      <el-button type="success" @click="onSubmit">预览</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="exportData">导出</el-button>
    </el-form-item>
  </el-form>
  <div class="table-box">
    <el-table ref="multipleTableRef"
              :data="tableData"
              :header-cell-style="{'text-align':'center', 'background':'#404040','color':'white'}"
              :cell-style="{'text-align':'center'}"
              style="width: 100%;"
              border>
      <!--      <el-table-column fixed="left" type="selection" label="Select"/>-->
      <template v-for="(item,index) in tableHead">
        <el-table-column :prop="item.prop" :label="item.label" :key="index" v-if="item.prop != '!id'"></el-table-column>
      </template>

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
  </div>

</template>

<script setup>

// import
import {ref} from "vue";
import request from "../utils/request.js"
// import {VueJsExcel} from 'vue-js-excel'
import {reactive} from 'vue'


// 定义数据
let curPage = ref(1)
let total = ref(10)
let pageSize = ref(15)
const shortcuts = [
  {
    text: 'Today',
    value: new Date(),
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
]
const formInline = reactive({
  table: '',
  filter: '',
  date: '',
})

const tableData = ref([])
const exportForm = ref({
  "table": "data",
  "filter": "sensor='testsensor-2'",
  "time": '2022-11-3'
})

const tableHead = ref([])

// 方法

function handleChangePage(val) {
  PreviewData(val)
}

// set tableHead
function setTableHead(row) {
  tableHead.value = []
  let tmp = Object.keys(row)
  console.log(tmp);
  for (let tmpKey in tmp) {
    tableHead.value.push({prop: tmp[tmpKey], label: tmp[tmpKey].toUpperCase()})
  }
  console.log(tableHead.value);
}

//请求测试,获取表格数据
async function PreviewData(cur = 1) {
  let res = await request.get('/api/export.php?action=preview', {
    ...formInline,
    pageSize: pageSize.value,
    p: cur
  })
  console.log(res);
  tableData.value = res.data.data
  setTableHead(res.data.data[0])
  // console.log(res.data.data)
  tableData.value = res.data.data
  total.value = parseInt(res.data.total)
  curPage.value = parseInt(res.data.pageNum)

}

// 日期验证
const disabledDate = function (time) {
  return time.getTime() > Date.now()
}

// submit
const onSubmit = () => {
  PreviewData()
  console.log('submit!')
}


const VueJsExcelExport = function (JSONData, ReportTitle, ShowLabel) {
  const arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
  let CSV = 'sep=,' + '\r';
  if (Array.isArray(ShowLabel)) {
    ShowLabel.forEach(item => {
      CSV += '"' + item + '",'
    })
    CSV += '\r\n'
  }
  arrData.forEach((item) => {
    console.log(item)
    let row = ""
    console.log(typeof item)
    if (typeof item == "object") {
      for (const value of Object.values(item)) {
        row += '"' + value + '",'
      }
    } else {
      row = item
    }
    CSV += row + '\r\n'
  })

  if (CSV == '') {
    alert("Invalid data")
    return
  }
  let fileName = ReportTitle.replace(/ /g, "_")
  let uri = 'data:text/csv;charset=utf-8,' + escape(CSV)
  let link = document.createElement("a")
  link.href = uri

  link.style = "visibility:hidden";
  link.download = fileName + ".csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


async function exportData() {
  let res = await request.get('/api/export.php?action=export', {
    ...formInline,
    pageSize: pageSize.value,
    p: cur
  })
  console.log(res);
  console.table(tableData.value);
  let fileName = exportForm.value['table']+"-"+exportForm.value['filter']+"-"+exportForm.value['date']
  VueJsExcelExport(tableData.value, fileName, Object.keys(tableData.value[0]))
}


</script>

<style scoped>
#export {
  margin: 50px 0px 0px 50px;
}
</style>