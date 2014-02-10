goog.provide('example.Application');
goog.require('goog.ui.Component');
goog.require('example.ApplicationTemplate');
goog.require('goog.dom');
goog.require('goog.ui.Button');
goog.require('goog.ui.Component.EventType');

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
example.Application = function() {
  goog.base(this);

  var handler = this.getHandler();
  var actionEv = goog.ui.Component.EventType.ACTION;

  this.redButton = new goog.ui.Button();
  this.registerDisposable(this.redButton);

  handler.listen(this.redButton, actionEv, this.onRedButtonAction);


  this.yellowButton = new goog.ui.Button();
  this.registerDisposable(this.yellowButton);
  handler.listen(this.yellowButton, actionEv, this.onYellowButtonAction);
};
goog.inherits(example.Application, goog.ui.Component);

/**
 * @param {goog.events.Event} event
 */
example.Application.prototype.onRedButtonAction = function(event) {
  this.setContentText(goog.getMsg("{$Button} Pressed!!!", {
    'Button': goog.getMsg('Red Button')
  }));
};

/**
 * @param {goog.events.Event} event
 */
example.Application.prototype.onYellowButtonAction = function(event) {
  this.setContentText(goog.getMsg("{$Button} Pressed!!!", {
    'Button': goog.getMsg('Yellow Button')
  }));
};

/**
 * @param {string} text
 */
example.Application.prototype.setContentText = function(text) {
  var element = this.getContentElement();
  if (goog.isDefAndNotNull(element)) {
    goog.dom.setTextContent(element, text);
  }
};


/**
 * @override
 */
example.Application.prototype.getContentElement = function() {
  var contentElementCss = goog.getCssName('example-Application-content');
  return this.getElementByClass(contentElementCss);
};


/** @override */
example.Application.prototype.createDom = function() {
  var html = example.ApplicationTemplate.Template();
  var element = /** @type {Element} */ (goog.dom.htmlToDocumentFragment(html));
  this.setElementInternal(element);
};

/** @override */
example.Application.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var yellowCss = goog.getCssName('example-Application-yellow-button');
  var yellowButtonElement = this.getElementByClass(yellowCss);
  if (goog.isDefAndNotNull(yellowButtonElement)) {
    this.yellowButton.decorate(yellowButtonElement);
  }

  var redCss = goog.getCssName('example-Application-red-button');
  var redButtonElement = this.getElementByClass(redCss);
  if (goog.isDefAndNotNull(redButtonElement)) {
    this.redButton.decorate(redButtonElement);
  }

};

/** @override */
example.Application.prototype.exitDocument = function() {
  this.yellowButton.exitDocument();
  this.redButton.exitDocument();
  goog.base(this, 'exitDocument');
};

/**
 * @const
 * @type {boolean}
 */
example.Application.AUTO_LOAD = true;


if (example.Application.AUTO_LOAD) {
  var application = new example.Application();
  var fn = window.onload;
  window.onload = function() {
    if (goog.isFunction(fn)) {
      fn.apply(this, arguments);
    }
    application.render(document.body);
  }
}
