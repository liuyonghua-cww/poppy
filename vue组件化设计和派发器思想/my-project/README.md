# my-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 派发器模式改造vue组件的逻辑部分
 
### 组件外部提供的叫属性，组件内的叫数据


组件：页面组件 -> 他只是块组件的容器
     块组件 -> 组件出口（index.vue）+ 子组件
     
