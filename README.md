# abacus-support-system

## How to build

1. add to vue.config.js
```
module.exports = {
 baseUrl: ‘/Ass-Bisha/’
} 
```
2. in .gitignore, comment out '/dist'
3. Run command 
```
git add dist && git commit -m "Initial dist subtree commit" 
```
IMPORTANT: Make sure you don’t commited the vue.config.js and .gitignore files

4. Run the command: 
```
git subtree push --prefix dist origin gh-pages
```

Reference: https://medium.com/@Roli_Dori/deploy-vue-cli-3-project-to-github-pages-ebeda0705fbd

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

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
