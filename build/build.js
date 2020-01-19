'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
const fse = require('fs-extra');

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    var from = path.join(__dirname, "../dist/vue");
    var to = path.join(__dirname, "../../", 'ipcoffee-consumer/src/main/resources/static/vue/');
    rm(to, error => {
      if(error) throw error;
      try{
        fse.copySync(from, to);
        console.log("copy success");
      } catch (e) {
        console.error(e)
      }
    });

    var from1 = path.join(__dirname, "../dist/html");
    var to1 = path.join(__dirname, "../../", 'ipcoffee-consumer/src/main/resources/html/');
    rm(to1, error => {
      if(error) throw error;
      try{
        fse.copySync(from1, to1);
        console.log("copy success");
      } catch (e) {
        console.error(e)
      }
    });

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
