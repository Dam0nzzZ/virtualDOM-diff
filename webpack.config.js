// import { requeire } from 'node'
const path = require('path')
// import path from 'path'

module.exports = {
    // 入口文件路径
    entry: './src/index.js',

    // 打包后文件路径
    output: {
        path: path.resolve(__dirname,'virtal'),

        // 虚拟打包路径,只会生成在8080端口
        publicPath: '/xuni/',
        
        // 打包出来的文件名,同上,不会真正生成
        filename: 'bundle.js'
    },

    devServer: {
        // 本地运行端口号
        port: 8080,

        // 静态资源文件夹
        static: {
            directory: path.join(__dirname,'www')
        }
    }
}