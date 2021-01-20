"use strict";
const path = require("path");
const pxtovw = require("postcss-px-to-viewport");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/api": {
        target: "http://rc.hq.huanwei.tidecloud.com/",
        // target: "http://192.168.0.110:13200",
        changeOrigin: true,
        pathRewrite: {}
      }
    }
  },
  configureWebpack: {
    name: "vue-project",
    resolve: {
      alias: {
        "@": resolve("src")
      }
    },
    externals: {
      AMap: "AMap"
    }
  },
  chainWebpack(config) {
    config.plugins.delete("prefetch");

    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${path.join(
            __dirname,
            "./src/styles/theme.less"
          )}";`
        }
      },
      postcss: {
        plugins: [
          new pxtovw({
            unitToConvert: "px", //需要转换的单位，默认为"px"；
            viewportWidth: 375, //设计稿的视口宽度(vant是375）
            unitPrecision: 5, //单位转换后保留的小数位数
            propList: ["*"], //要进行转换的属性列表,*表示匹配所有,!表示不转换
            viewportUnit: "vw", //转换后的视口单位
            fontViewportUnit: "vw", //转换后字体使用的视口单位
            selectorBlackList: [".ignore", ".hairlines"], //不进行转换的css选择器，继续使用原有单位
            minPixelValue: 1, //设置最小的转换数值
            mediaQuery: false, //设置媒体查询里的单位是否需要转换单位
            replace: true //是否直接更换属性值，而不添加备用属性
            // exclude: [/node_modules/] //忽略某些文件夹下的文件
          })
        ]
      }
    }
  }
};
