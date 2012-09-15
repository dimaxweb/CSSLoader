var css = 'h1 { background: red; }',
head = document.getElementsByTagName('head')[0];

for(var i=0;i<31;i++){
style = document.createElement('style');
style.type = 'text/css';
if(style.styleSheet){
    style.styleSheet.cssText = css;
}else{
    style.appendChild(document.createTextNode(css));
}
head.appendChild(style);

}


//TODO  : check big files and files from other domains
requirejs.config({
    baseUrl: '../../src'


});


require(['css!../test/functional/basicTest.css'],function(){
   alert('Callback success');
},function(){
   alert('Errorback');
});

