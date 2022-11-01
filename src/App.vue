<template>
  <header style="display: block">
    <div
        style="background: #f2f2ea;width: 100%;height: 7vh;display: flex;justify-content: center;align-items: center">
      <img alt="贵州大学矿业学院" src="./assets/banner.jpg"
           style="width: 1080px;height: auto;display: inline-block;">
    </div>
  </header>

  <el-row>
    <div class="aside">

    </div>
    <el-col :span="4" style="background-color: #91282e;height: 93vh">
      <div class="navi" style="margin-top: 150px;">
        <p style="font-size: 40px;display: flex;justify-content: center">导航</p>
        <router-link to="/data">Data 表</router-link>
        <router-link to="/sensor">Sensor 表</router-link>
        <router-link to="/node">Node 表</router-link>
        <router-link to="/log">Log 表</router-link>
        <router-link to="/about">About</router-link>

        <el-footer>
          <div>College of Mining, GZU</div>
          <div>Dagwbl 2022</div>
        </el-footer>
      </div>


    </el-col>
    <el-col :span="20" style="height: 100%;background-color: #ededed">

      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script setup>


</script>


<style>


.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
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
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #ededed;
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
  width: 17%;
  flex-wrap: wrap;
  position: absolute;
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
