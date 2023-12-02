// postcss.config.js
// 用 vite 创建项目，配置 postcss 需要使用 post.config.js，之前使用的 .postcssrc.js 已经被抛弃
// 具体配置可以去 postcss-pxtorem 仓库看看文档
module.exports = {
  "plugins": {
    "postcss-pxtorem": {
      // Vant 官方根字体大小是 37.5 根元素字体大小
      rootValue: 
      // 16,
      37.5, 
      propList: ['*'],
      // 过滤掉.norem-开头的class，不进行rem转换
      selectorBlackList: ['.norem'] 
      // //转换成rem后保留的小数点位数
      // unitPrecision: 5,
      // //小于12px的样式不被替换成rem
      // minPixelValue: 3,
      // //忽略一些文件，不进行转换，比如我想忽略 依赖的UI框架
      // exclude: ['node_modules']
    }
  }
}