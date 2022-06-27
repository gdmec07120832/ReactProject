const path = require('path')
const {
  addLessLoader,
  addPostcssPlugins,
  override,
  overrideDevServer,
  addWebpackAlias,
  addWebpackPlugin,
  addBabelPlugins,
} = require('customize-cra')

const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const proxyFile = require('./bootstarp').proxyFile

const proxy = require(proxyFile)

const devServerConfig = () => (config) => {
  return {
    ...config,
    proxy,
  }
}

// 这里是查看打包速度的
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const useSMP = (config) => {
  return process.env.SPEED_MEASURE === 'true' ? new SpeedMeasurePlugin().wrap(config) : config
}

// webpack5 与 webpack4的写法有区别 本版本是webpack5  这个配置是开发环境才用到的
const sourceMap = (config) => {
  // webpack4的写法
  // config.devtool = process.env.NODE_ENV === 'production' ? false : 'cheap-module-eval-source-map'
  // webpack5的写法
  config.devtool = process.env.NODE_ENV === 'production' ? false : 'eval-cheap-module-source-map'
  return config
}

module.exports = {
  webpack: override(
    useSMP,
    sourceMap,
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#327bf8',
          '@layout-header-padding': '0 20px',
          '@layout-sider-background': '#fff',
          '@layout-header-background': '#fff',
          '@table-row-hover-bg': '#f0f7ff',
        },
      },
    }),
    addPostcssPlugins([require('tailwindcss'), require('autoprefixer')]),
    addWebpackAlias({
      'styled-components': path.resolve(__dirname, 'node_modules', 'styled-components'),
      'ahooks': path.resolve(__dirname, 'node_modules', 'ahooks-v2'),
      'ahooks-v3': path.resolve(__dirname, 'node_modules', 'ahooks'),
    }),
    addWebpackPlugin(new ProgressBarPlugin()),
    process.env.NODE_ENV === 'production'
      ? addBabelPlugins(['transform-remove-console', { exclude: ['error', 'warn'] }])
      : (config) => config
  ),
  devServer: overrideDevServer(devServerConfig()),
  paths: (paths) => {
    paths.appBuild = path.resolve(__dirname, 'dist')
    return paths
  },
}
