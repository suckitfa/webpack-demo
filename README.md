# webpack4.X

![image-20211204113431558](./public/img/image-20211204113431558.png)

### 构建工具作用

- 装换ES6+语法 兼容低版本的浏览器
- 转换JSX React和Vue的语法
- CSS前缀补全，预处理器
- 压缩混淆
- 图片处理



### 前端构建的历史

![image-20211204114004476](./public/img/image-20211204114004476.png)

打包工具的选择指标

- 社区生态
- 配置灵活 和插件扩展
- 官方迭代的速度

### 基础配置

0配置默认：你不用配置，直接可以用的，就是给你的默认配置

- entry：`./src/index.js`
- output: `./dist/main.js`

```sh
# webpack.config.js
webpack --config
```

```js
//  webpack.config.js
module.exports = {
  // 1. 打包入口文件
  entry:"./src/index.js",
  // 2. 打包后的资源出口
  output:'./dist/main.js',
  // 3. 环境， production development
  mode:'production',
  // 4. 模块处理，loader的配置
  module: {
    rules: [
      {test:/\.txt$/,use:'raw-loader'}
    ]
  },
  // 5. 插件的配置
  plugins: [
    new HtmlwebpackPlugin({
      template:'./src/index.html'
    })
  ]
}
```



### 核心概念

- entry

依赖的入口，非代码的依赖：图片，字体不断加入到依赖树中

```js
// 单入口：适合单页应用
entry:"./src/index.js"
// 多入口
entry: {
  app:'./src/app.js',
  search:'./src/search.js'
}
```

- output

```js
output: {
  filename:'[name].js', //  【name】是占位符，制定打包后的文件名称
   path:__dirname+'/dist'
}
```

![image-20211204125022500](./public/img/image-20211204125022500.png)

- loaders

webpack默认支持js和json文件类型，通过loaders去支持其他文件的类型并且将他们转成有效的模块，添加到依赖中。

本身是一个函数，接受源文件作为参数，返回转换的结果。

1. babel-loader
2. css-loader
3. less-loader
4. ts-loader
5. file-loader 图片，字体打包
6. raw-loader 将文件以字符串的形式导入
7. thread-loader 多进程打包js和css 加快打包速度

```js
module: {
  rules:[
    {test:/.txt$/,use'raw-loader'}
  ]
}
```

- plugins

  插件作用文件的优化，将资源和环境变量注入

  作用于整个构建过程

  ![image-20211204130730858](./public/img/image-20211204130730858.png)

  1. CommonsChunckPlugin 将chunks相同的代码提取成公共的js
  2. CleanWebpackPlugin 清理构建目录
  3. ExtractTextWebpackPlugin 
  4. Html

- mode

  1. `production`
  2. `development`

  ![image-20211204131851818](./public/img/image-20211204131851818.png)

  ```js
  ```

  

### 具体配置

**通过babel解析ES6**

babel-loader

- `.babelrc` babel的配置文件
- **babel-loader：**使用Babel和webpack来转译JavaScript文件。
- **@babel/preset-react：**转译react的JSX
- **@babel/preset-env：**转译ES2015+的语法
- **@babel/core：**babel的核心模块

```sh
npm i @babel/core @babel/preset-env babel-loader -D
```



![image-20211204132713416](./public/img/image-20211204132713416.png)

- **解析CSS**

  ```js
  {
    test:/.css$/,
      use:[
        'style-loader',
        'css-loader'
      ]
  }
  ```

  

  ![image-20211204142112790](./public/img/image-20211204142112790.png)

less文件

> less  less-loader

```js
{
  test:/.less$/,
    use:[
      'style-loader',
      'css-loader',
      'less-loader'
    ]
}
```



### 文件处理

> 图片，字体

![image-20211204151609799](./public/img/image-20211204151609799.png)

url-loader





###  webpack文件监听

文件监听是发生文件变化汇总，自动投建出新的文件

- `--watch` 每次都要手动刷新浏览器
- webpack.config.js watch

>  监听文件变化机制 **轮询监听文件**

![image-20211204152457628](/Users/bobtang/Library/Application Support/typora-user-images/image-20211204152457628.png)

### 热更新

>  webpack-dev-server
>
> HotModuleReplacementPlugin
>
> 结合使用

WDS 不刷新浏览器，输出的内容放在内存中

中间件

![image-20211204153816739](./public/img/image-20211204153816739.png)

## **热更新原理**

![image-20211204153835404](./public/img/image-20211204153835404.png)



## 文件指纹(important)

> 版本管理，
>
> 浏览器缓存

1. Hash: 文件内容改变，整个项目构建的的hash值改变

2. Chunkhash： 不同的entry生成不同的chunkhash

3. Contenthash:根据文件内容定义

### JS文件指纹

chunkhash

```js
output: {
  path:path.join(__driname,'dist'),
    filename:'[name]_[chunkhash:8].js'
}
```



#### CSS文件和图片文件指纹的设置

![image-20211205121248138](./public/img/image-20211205121248138.png)

![image-20211205121317445](./public/img/image-20211205121317445.png)



将css提取成独立的文件

```sh
yarn add mini-css-extract-plugin -D
```

`style-loader`和`MiniCssExtractPlugin.loader`的作用是相反的，不可以同时使用。



### 文件的压缩

![image-20211205123507525](./public/img/image-20211205123507525.png)

![image-20211205123557447](./public/img/image-20211205123557447.png)

![image-20211205130853664](/Users/bobtang/Desktop/webpack-demo/public/img/image-20211205130853664.png)

![image-20211205131901110](/Users/bobtang/Library/Application Support/typora-user-images/image-20211205131901110.png)



### 自动清除构建产物

打包新的产物自动清理

```sh
rm -rf dist
```

插件

`clean-webpack-plugin`

### css前缀处理

> caniuse.com

![image-20211205134614713](./public/img/image-20211205134614713.png)



```sh
yarn add postcss-loader autoprefixer -D
```

### 处理移动端css转rem

```sh
// 处理移动端布局
yarn add lib-flexible -S
yarn add px2rem-loader -D
```

### 静态资源内联

代码层面

- 页面框架的初始化脚本
- 上报相关打点
- css内联避免页面闪动

### 请求层面:减少http请求次数

- 小图盘或者字体 url-loader



![image-20211212104503067](./public/img/image-20211212104503067.png)



css内联

# 多页面打包方案

- MPA: seo友好

- SPA：

#### 方案一:

动态获取entry和设置html-webpack-plugin

![image-20211212110014737](/Users/bobtang/Desktop/webpack-demo/public/img/image-20211212110014737.png)

```js
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    // 所有页面的入口index.js
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index]
        const match = entryFile.match(/src\/(.*)\/index\.js/ig)
        const pageName = match && match[1];
        entry[pageName] = entryFile;
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: `src/${pageName}/index.html`,
                filename: `${pageName}.html`,
                chunks: [pageName],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false
                }
            }),
        )
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}
const { entry, htmlWebpackPlugins } = setMPA();
```



### 基础库的分离

![image-20211212144332480](/Users/bobtang/Desktop/webpack-demo/public/img/image-20211212144332480.png)

### SplitChunksPlugin进行公共脚本的分离???

引用了同一个脚本

- async
- initial
- all (推荐)所有引入的库进行分离

![image-20211212145338433](/Users/bobtang/Desktop/webpack-demo/public/img/image-20211212145338433.png)



### sourcemap

将



### TreeShaking



必须是ES6语法，不支持CJS。

- 只能做顶层语句出翔
- import的模块只能是常量
- import binding是immutable的

 **webpack中的`mode`**

- production默认开启treeshaking



### scopeHoisting的使用



