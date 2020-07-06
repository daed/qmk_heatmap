// Initial welcome page. Delete the following line to remove it.
'use strict';
const styles=document.createElement('style');
styles.innerText;
const vueScript=document.createElement('script');
vueScript.setAttribute('type','text/javascript'),
vueScript.setAttribute('src','https://unpkg.com/vue'),
vueScript.onload=init,document.head.appendChild(vueScript),
document.head.appendChild(styles);
function init() {
  Vue.config.devtools=false,
    Vue.config.productionTip=false,
    new Vue({
      data:{
        versions:{
          electron:process.versions.electron,
          electronWebpack:require('electron-webpack/package.json').version
        }
      },
      methods:{
        open(b){
          require('electron').shell.openExternal(b)
        }},
template:`<p>This intitial landing page can be easily removed from <code>src/renderer/index.js</code></p>`}).$mount('#app')}
