# <%= appName %>

## Preparation

- 安装node和yarn，建议使用最新的长期支持版（LTS）

- 安装VS Code

- 安装VS Code的插件Setting Sync：https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync

- 在VS Code中，安装开发插件（extensions）

  1. 按下`F1`，执行`Sync:Advanced Options`，再执行`Sync:Download Settings from Public GIST`
  2. 按下`F1`，执行`Sync:Download Settings`，输入`5a0c1cf0e0b90172960d565a539a1b5e`

## Develop&Debug

- `yarn dev`是开发调试

- `yarn add <package>`是添加依赖，用法与npm相似

- `yarn upgrade <package>@<version>`更新依赖

## Release

- `yarn build`打包发布版本