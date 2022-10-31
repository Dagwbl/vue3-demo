import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    // 开启Vue语法糖不通过value即可访问数据
    // refTransform:true,
    // reactivityTransform:true
  }),
  ],
  server:{
    // port: 8000,
    // proxy: {
    //   '/projects':{
    //     target: "http://127.0.0.1:80/projects/"
    //   }
    // }
  },
  base: './' // 打包相对路径
})
