/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
module( "Internal method tests", {

});
test( "Get Unique ID for link", function() {
    var css = window['css'];
    var id1 = css._getUniqueId();
    var id2 = css._getUniqueId();
    notStrictEqual(id1,id2,'The ids not equal');
});

test( "Check isEventSupported", function() {
    expect(2);
    var css = window['css'];
    var isSupportedFake = css._isEventSupported('link','FAKE_EVENT_NOT_EXISTS_Event');
    var isSupportedReal = css._isEventSupported('a','click');
    notStrictEqual(isSupportedFake,true,'The fake event is not supported');
    strictEqual(isSupportedReal,true,'Real event is supported');
});

test("Native load not supported - 404 css url",function(){
    var css = window['css'];
    var url404 = 'basicTest10.css';
    var calledError = false;
    var testComplete = function(calledError){
        start();
        equal(calledError,true,'Error function is called when css file is not exists');
    }
    var callback  = function(loaded){

        //fail the test
        testComplete(false);

    };
    callback.error = function(err){

        testComplete(true);
    };

    stop();
    css._loadWhenNotSupported(url404,callback);
});

test("Native load not supported - not valid css file(can occur  when server returns some html on 404 )",function(){
    expect(1);
    var css = window['css'];
    var urlTextFile = 'textCss.txt';
    var calledError = false;
    var testComplete = function(calledError){
        start();
        equal(calledError,true,'Error function is called when css file is not exists');
    }
    var callback  = function(loaded){
        //fail the test
        testComplete(false);

    };
    callback.error = function(err){
        //pass the test
        testComplete(true);
    };

    stop();
    css._loadWhenNotSupported(urlTextFile,callback);
});

test("Existing valid css - callback called",function(){
    var css = window['css'];
    var urlTextFile = 'grid-min.css';
    var testComplete = function(calledCallback){
        start();
        equal(calledCallback,true,'Callback called when css is valid');
    }
    var callback  = function(loaded){

        //fail the test
        testComplete(true);

    };
    callback.error = function(err){
        //pass the test
        testComplete(false);
    };

    stop();
    css._loadWhenNotSupported(urlTextFile,callback);
});

test('Cross Domain CSS',function(){
    var css = window['css'];
    var urlTextFile = 'http://www.keentour.com/Scripts/widgets/css/colorbox.css';
    var testComplete = function(calledCallback){
        start();
        equal(calledCallback,true,'Callback called when css is valid');
    }
    var callback  = function(loaded){

        //fail the test
        testComplete(true);

    };
    callback.error = function(err){
      //pass the test
        testComplete(false);
    };

    stop();
    css._loadWhenNotSupported(urlTextFile,callback);
});

//TODO : looks like not deterministic test
//test('Cross Domain CSS - 404 css',function(){
//    expect(1);
//    var css = window['css'];
//    var urlTextFile = 'http://dffsdfdsf.dsffsdffdsfds.befd/Scripts/nottt.css';
//    var testComplete = function(calledCallback){
//        start();
//        equal(calledCallback,true,'Callback called when css is valid');
//    }
//    var callback  = function(loaded){
//
//        //fail the test
//        testComplete(true);
//
//    };
//    callback.error = function(err){
//
//        //pass the test
//        testComplete(false);
//    };
//
//    stop();
//    css._loadWhenNotSupported(urlTextFile,callback);
//});





