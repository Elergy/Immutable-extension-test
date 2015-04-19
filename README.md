# Immutable-extension-test
Chrome extension with immutable.js

We have plain JS object in the background page:
```
var data = {
    item1: {
        name: 'Name 1'
    },

    item2: {
        name: 'Name 2'
    }
};
```

In the popup.js script we want to get this object and create immutable version of it:
```
chrome.runtime.getBackgroundPage(function(page) {
    var data = page.data;
    var immutableData = Immutable.fromJS(data);
});
```

but we can't because 'data' has been created in different context (in the background page). 

```
immutableData === data; //true
```

If we serialize and deserialize data we can have immutable version:
```
var dataAfterSerialization = JSON.parse(JSON.stringify(data));
var newImmutableData = Immutable.fromJS(dataAfterSerialization);

newImmutableData.toString() === 'Map { "item1": Map { "name": "Name 1" }, "item2": Map { "name": "Name 2" } }'; //true
```
