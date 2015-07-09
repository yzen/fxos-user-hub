/* global Select, SettingsHandler */

(function(exports) {
  'use strict';

  function Switch(setting, selector) {
    this.selector = document.querySelector(selector);
    SettingsHandler.call(this, { name: setting, type: 'boolean' });

    this.selector.addEventListener('change', () =>
      this.set(this.setting.name, this.selector.hasAttribute('checked')));
  }

  Switch.prototype = Object.create(SettingsHandler.prototype);
  Switch.prototype.select = function(val) {
    if (val) {
      this.selector.setAttribute('checked', val);
    } else {
      this.selector.removeAttribute('checked');
    }
  };
  Switch.prototype.reset = function(val) {
    this.select(val);
  };

  function Select(options) {
    SettingsHandler.call(this, options.setting);
    this.selections = {};

    Object.keys(options.selections).forEach(name => {
      this.selections[name] = document.querySelector(options.selections[name]);
      this.selections[name].addEventListener('click', e => {
        var val = this.map(e.target.dataset.value);
        this.set(this.setting.name, val);
        this.select(val);
      });
    });
  }

  Select.prototype = Object.create(SettingsHandler.prototype);
  Select.prototype.select = function(val) {
    Object.keys(this.selections).forEach(name =>
      this.selections[name].classList.remove('active'));

    var active = Object.keys(this.selections).find(name =>
      this.map(this.selections[name].dataset.value) === this.map(val));
    this.selections[active || 'default'].classList.add('active');
  };
  Select.prototype.reset = function(val) {
    this.set(this.setting.name, val);
    this.select(val);
  };

  var Screen = {
    switches: {
      invert: new Switch('layers.effect.invert', '#invert'),
      grayscale: new Switch('layers.effect.grayscale', '#grayscale'),
      contrast: new Select({
        setting: {
          name: 'layers.effect.contrast',
          type: 'float'
        },
        selections: {
          'lower': '.contrast-lower',
          'default': '.contrast-default',
          'higher': '.contrast-higher',
          'highest': '.contrast-highest'
        }
      })
    }
  };

  exports.Screen = Screen;
})(window);
