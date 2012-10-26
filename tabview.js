exports.TabView = TabView;

function TabView(el) {
    el = this.el = el || document.createElement("div");
    el.classList.add("tabview");
    this.tabs = [];
    this.selected = null;
    this.width = null;
    this.height = null;
}

function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}

TabView.prototype.resize = function (width, height) {

  if (arguments.length === 0) {
    if (!isNumber(this.width) || !isNumber(this.height)) {
      return;
    }
    width = this.width;
    height = this.height;
  }
  else {
    if (!isNumber(width) || !isNumber(height)) {
      throw new TypeError("width and height must be numbers");
    }
    this.width = width;
    this.height = height;
  }

  this.el.style.width = width + "px";
  this.el.style.height = (height - 1) + "px";

  var i, l = this.tabs.length;
  var space = width - l * 23;
  var lineHeight = (height - 4) + "px";
  for (i = 0; i < l; i++) {
    var maxWidth = Math.floor(space / (l - i));
    space -= maxWidth;
    this.tabs[i].label.el.style.maxWidth = maxWidth + "px";
    this.tabs[i].el.style.lineHeight = lineHeight;
    this.tabs[i].el.style.height = lineHeight;
  }

};

// Content is a cell
// tab is any object that fits the Tab interface
// .el, the root element
// .activate() for when the tab is selected
// .deactivate() for when the tab is deselected
// .close() for when the tab is being closed. Return a truthy value to cancel.
TabView.prototype.add = function (label) {
  var self = this;
  var tab = { label: label };
  label.select = function () {
    self.select(tab);
  };
  label.deselect = function () {
    self.desekect(tab);
  };
  label.remove = function () {
    self.remove(tab);
  };
  this.tabs.push(tab);
  tab.el = document.createElement('div');
  this.el.appendChild(tab.el);
  tab.el.appendChild(label.el);
  var closeButton = document.createElement('a');
  var closeIcon = document.createElement('i');
  closeButton.appendChild(closeIcon);
  closeIcon.className = "icon-remove";
  tab.el.appendChild(closeButton);
  tab.el.addEventListener("click", function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (self.selected === tab) {
      self.deselect(tab);
    }
    else {
      self.select(tab);
    }
  }, false);
  closeButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    self.remove(tab);
  }, true);


  this.resize();
};

TabView.prototype.deselect = function (tab) {
  if (this.selected === tab) {
    tab.label.deactivate();
    tab.el.classList.remove("selected");
    this.selected = null;
  }
};

TabView.prototype.select = function (tab) {
  if (this.selected) {
    this.deselect(this.selected);
  }
  tab.label.activate();
  tab.el.classList.add("selected");
  this.selected = tab;
};

TabView.prototype.remove = function (tab) {
  if (!tab.label.close()) {
    var index = this.tabs.indexOf(tab);
    if (tab === this.selected) {
      this.deselect(tab);
      var next = this.tabs[index + 1] || this.tabs[index - 1];
      if (next) {
        this.select(next);
      }
    }
    this.tabs.splice(index, 1);
    this.el.removeChild(tab.el);
    this.resize();
  }
};
