
const HtmlWebpackPlugin = require('html-webpack-plugin');  //引入插件，不可漏掉！！！
const path = require('path');
module.exports = {
    entry: {
        index : __dirname + '/src/index/index.js',// index的入口文件，webpack是以js为入口文件的
        page2 : __dirname + '/src/page2/index.js',
    },
    output : {
        path : __dirname + '/dist',//产出路径，一般放在dist目录下
        filename:'js/[name]-[chunkhash].js',
        //把为入口文件放在dist目录的js文件夹下，
        //name是文件名，chunkhash是每次打包文件的hash值，
        
    },
    devServer: { 
        host : '127.0.0.1', 
        port : 8088 ,
        inline : true,
        open :true,   //自动打开浏览器
        hot : false,   //慎用！打开热更新，会导致修改样式可能不支持。关闭热更新，页面会强刷
        contentBase : path.join(__dirname, "dist"), //打包的文件目录
       //contentBase : path.join(__dirname, "src/index"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename : 'index.html',//入口html
            template : './src/index/index.html',
            minify : {
                // removeComments:true,   //删除注释
                // collapseWhitespace: true      //删除空格，压缩
            },
            chunks: ['index']  //对应entry的入口js.这样可以按需加载js
        }),
        new HtmlWebpackPlugin({
            filename : 'page2.html',
            template : './src/page2/index.html',
            minify : {
                // removeComments:true,   //删除注释
                // collapseWhitespace: true      //删除空格，压缩
            },
            chunks: ['page2']
        }),
    ],
    module:{
        rules:[
            {
                test:/\.css$/,  //遇到有css后缀的文件自动使用下边两个loader转换，图片等资源同理
                use:['style-loader','css-loader']
            }
        ]
    },
}