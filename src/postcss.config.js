module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      // rootValue 设置设计稿量出来的尺寸除以多少  设置基准字体大小
      rootValue ({ file }) {
        // 只有我妈自己写的样式才除以75转换成rem，其他的vant的内置样式 github markdown样式除以37.5
        // 因为我们自己的设计稿宽度为750
        return (file.indexOf('vant') !== -1 || file.indexOf('github-markdown-css') !== -1) ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
