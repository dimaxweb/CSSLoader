//TODO  : check big files and files from other domains
requirejs.config({
    baseUrl: '../../src'


});
require(['css!../test/functional/basicTest.css','css!../test/functional/basicTest2.css','css!../test/functional/grid-min.css'],function(){
        //alert('Callback');
},function(){
    //alert('Errorback');
});
