/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
module( "Internal methods test", {

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



