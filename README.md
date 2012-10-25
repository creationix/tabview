# TabView

A simple web component for tabs.

## Install

```sh
component install creationix/tabview
```

## Usage

```js
var TabView = require('tabview').TabView;

// The minimal interface for a tab label
function FileView(name) {
  this.el = document.createElement('span');
  this.el.textContent = name;
}

FileView.prototype.activate = function () {
  // You've been activated, show your content
};

FileView.prototype.deactivate = function () {
  // Hide the content
};

FileView.prototype.close = function () {
  return !confirm("Are you sure you want to close this?");
};

var tabs = new TabView();
document.body.appendChild(tabs.el);

tabs.add(new FileView("file1.js"));
tabs.add(new FileView("file2.js"));
tabs.add(new FileView("file3.js"));

tabs.resize(500, 26);
```
