
module.exports = {
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    before: require('./src/mock/list.ts')
  },
  runtimeCompiler: true
}
