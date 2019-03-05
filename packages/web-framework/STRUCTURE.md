# 项目目录说明

```
├─dist --打包发布目录
│   ├─config.js --业务API服务和认证API服务地址配置
├─scripts 脚本文件夹
│   ├─webpack.config.build.js --webpack打包脚本
│   ├─webpack.config.dev.js --webpack调试脚本
├─src --源码目录
│   ├─app --应用页目录
│   ├─components --公共组件目录
│   ├─constants --公共常量目录，包括但不限于前后端枚举
│   ├─lib --公共抽象逻辑目录
│   ├─login --登录页面
│   ├─pages --业务页面目录
│   │  ├─page1 --业务页面1
│   │  ├─page2 --业务页面2
│   │  ├─index.js --业务页面懒加载统一露出定义
│   ├─resources --公共资源定义
│   │  ├─images --图片目录
│   │  ├─theme_vars.js --主题变量定义
│   ├─services --业务API服务定义
│   │  ├─mock_data --业务API服务mock数据
│   │  ├─index.js ---业务API服务统一露出定义
│   ├─index.html --应用页html
│   ├─index.js --应用页启动js，具体参考
│   ├─login.html --登录页html
│   ├─login.js --登录页启动js
├─.babelrc --Babel配置
├─.editorconfig --编辑器配置
├─.eslintignore --eslint忽略配置
├─.eslintrc.js --eslint配置
├─.gitattributes --git配置
├─.gitignore --git忽略配置
├─.yo-rc.json --yeman配置
├─package.json --package配置
├─postcss.config.js --postcss配置
├─prettier.config.js --编辑器格式化插件配置
├─yarn.lock --依赖锁定
```
> app、login、pages(page1,page2,..)都可以用Bundle或者Block的方式实现
> [Bundle](https://github.com/zhuoluo-hq/web-framework#Bundle)
> [Block](https://github.com/zhuoluo-hq/web-framework#Block)