'use strict';

chrome.runtime.getBackgroundPage(function(page) {
    var data = page.data;

    console.log('before serialization:');
    var immutableData = Immutable.fromJS(data);
    if (immutableData === data) {
        console.log('Fail: immutableData is not immutable. It is the exact same object as before');
    }
    if (!immutableData.get) {
        console.log('Fail: method get is missing');
    }
    if (immutableData.toString() === 'Map { "item1": Map { "name": "Name 1" }, "item2": Map { "name": "Name 2" } }') {
        console.log('Ok: immutableData is really immutable');
    }
    if (typeof immutableData.get === 'function') {
        console.log('Ok: method get exists');
    }

    console.log('after serialization:');
    var dataAfterSerialization = JSON.parse(JSON.stringify(data));
    var newImmutableData = Immutable.fromJS(dataAfterSerialization);

    if (newImmutableData.toString() === 'Map { "item1": Map { "name": "Name 1" }, "item2": Map { "name": "Name 2" } }') {
        console.log('Ok: immutableData is really immutable');
    }
    if (typeof newImmutableData.get === 'function') {
        console.log('Ok: method get exists');
    }
});
