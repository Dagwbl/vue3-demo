<template>
  <header style="display: block">

    <div
        style="background: #f2f2ea;width: 100%;height: 7vh;display: flex;justify-content: center;align-items: center">
      <img alt="贵州大学矿业学院" src="./assets/banner-cn.png"
           style="width: 1080px;height: auto;display: inline-block;">
    </div>
  </header>

  <el-row type="flex">
    <el-col :span="4" :style="sideStyle">
      <div class="navi" style="margin-top: 150px;">
        <p style="font-size: 40px;display: flex;justify-content: center">导航</p>
        <router-link to="/data" @click="changeTheme">基础数据</router-link>
        <router-link to="/sensor" @click="changeTheme">传感器表</router-link>
        <router-link to="/node" @click="changeTheme">物端列表</router-link>
        <router-link to="/log" @click="changeTheme">系统日志</router-link>
        <router-link to="/export" @click="changeTheme">数据导出</router-link>
        <router-link to="/about" @click="changeTheme">关于</router-link>

        <el-footer>
          <div>College of Mining, GZU</div>
          <div>Dagwbl 2022</div>
        </el-footer>

      </div>
    </el-col>
    <el-col :span="20" :style="mainStyle">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script setup>
import {reactive, ref} from "vue";
import {VueJsExcel} from 'vue-js-excel'


// dynamic css
let curRouter = ref(0)
let sideColors = ref([
  "#60656C", "#A39797", "#A39797", "#8E9BAE", "#72626C", "#8B7F8B", "#8C736F", "#53565C"
])
let mainColors = ref([
  "#F9ECE4", "#E3E7EA", "#E0DFE4", "#E0DFE4", "#EEF1EA", "#E1E1DF", "#DCDDDF"
])
let sideStyle = ref({
  background: sideColors.value[Math.random() * 10 % sideColors.value.length], height: 'inherit'
})
let mainStyle = ref({
  background: mainColors.value[Math.random() * 10 % mainColors.value.length], height: 'inherit'
})

function changeTheme() {
  curRouter.value = (curRouter.value + 1) % sideColors.value.length
  sideStyle.value = {background: sideColors.value[curRouter.value], height: 'inherit'}
  // console.log({background:sideColors.value[curRouter.value],height: 'inherit'})
  mainStyle.value = {background: mainColors.value[curRouter.value], height: '100%'}
}

</script>


<style>


.el-row:last-child {
  margin-bottom: 0;
  /*background: #91282e;*/
}

.el-col {
  border-radius: 6px;
  width: available;
  /*background: #91282e;*/
}

.el-col-4 {
  background: #976666;
}

.el-col-20 {
  background: #CCD2CC;
}

.grid-content {
  border-radius: 6px;
  /*min-height: 36px;*/
}


a {
  display: block;
  text-align: center;
  font-size: 23px;
  margin-top: 23px;
  color: #f0f9eb;
}

html, body {
  min-width: 1080px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  /*background: #91282e;*/
}

#app {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  /*background: #f8e3c5;*/
}

.el-footer {
  color: #fff;
  display: block;
  /*justify-content: center;*/
  word-wrap: normal;
  bottom: 56px;
  text-align: center;
  width: inherit;
  flex-wrap: wrap;
  margin-top: 230px;

  /*position: absolute;*/
  /*background: #333333;*/
}

.el-header {
  display: flex;
  justify-content: center;
  font-size: 50px;
  /*background-color: #fcd3d3;*/
  height: 2em;
  text-align: center;
  line-height: 2em;
  background: image("./assets/学院logo透明.png")
}
</style>
