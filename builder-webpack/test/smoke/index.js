const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const { stat } = require('fs');
// 到template目录
process.chdir(path.join(__dirname, 'template'))
rimraf('./dist', () => {
    const prodConfig = require('../../lib/webpack.prod')
    webpack(prodConfig, (err, stats) => {
        if (err) {
            console.error(err);
            // 抛出错误码，退出
            process.exit(2);
        }
        console.log(stat.toString({
            colors: true,
            module: false,
            children: false
        }))
    })
});