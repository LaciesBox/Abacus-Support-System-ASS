# abacus-support-system

## How to build
1. delete gh-pages branch in this github repository
2. Build with `npm run build`
3. add baseUrl to vue.config.js, in module.exports
```
module.exports = {
 baseUrl: '/Ass-Bisha/',
 ...
} 
```
4. in `.gitignore`, comment out `/dist`
5. Run command 
```
git add dist && git commit -m "Initial dist subtree commit" 
```
IMPORTANT: Make sure you don’t commited the vue.config.js and .gitignore files.

6. Run the command: 
```
git subtree push --prefix dist origin gh-pages
```
7. When done, do `git checkout .` to undo all changes to config.js and .gitignore.

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
