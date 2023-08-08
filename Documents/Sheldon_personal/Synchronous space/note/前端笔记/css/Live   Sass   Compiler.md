# Live Sass Compiler 配置方法
#css	#sass/scss

插件的作用：VSCode扩展，实时将SASS / SCSS文件编译/转换为CSS文件。


## 特征
-   实时SASS和SCSS编译。
-   导出CSS的可自定义文件位置。
-   可定制的导出CSS样式（`expanded`，`compact`，`compressed`，`nested`）。
-   可自定义的扩展名（`.css`或`.min.css`）。
-   快速状态栏控件。
-   通过设置排除特定文件夹。
-   实时重新加载（取决于`Live Server`扩展名）。
-   支持自动前缀

## 基本配置

~~~
"liveSassCompile.settings.formats":[
        // 扩展
        {
            "format": "compact",//可定制的出口CSS样式（expanded，compact，compressed，nested）
            "extensionName": ".min.css",//编译后缀名
            "savePath": null//编译保存的路径
        } 
        
    ],

    "liveSassCompile.settings.excludeList": [
        "**/node_modules/**",
        ".vscode/**"
     ],
~~~
