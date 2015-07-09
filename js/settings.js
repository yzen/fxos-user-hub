(function(exports) {
  'use strict';

  var Maps = {
    float: function(val) {
      return typeof val === 'string' ? parseFloat(val) : val;
    },

    boolean: function(val) {
      return val;
    }
  };

  function SettingsHandler(setting) {
    this.setting = setting;
    this.defaultSetting = this.setting.name + '.default';
    this.map = Maps[this.setting.type];

    var defaultValue;
    this.get(this.defaultSetting)
      .then(val => defaultValue = val)
      .then(() => this.get(this.setting.name))
      .then(val => {
        if (typeof defaultValue === 'undefined') {
          this.set(this.defaultSetting, val);
        }
        this.select(val);
      });

    window.addEventListener('reset',
      () => this.get(this.defaultSetting).then(val => this.reset(val)));
  }

  SettingsHandler.prototype = {
    get: function(name, defaultValue) {
      return new Promise((resolve, reject) => {
        var req = navigator.mozSettings.createLock().get(name, defaultValue);
        req.onsuccess = () => {
          var settingValue = req.result[name] || defaultValue;
          resolve(settingValue);
        };
        req.onerror = () => { reject(req.error); };
      });
    },

    select: function() {}, // This must be implemented by subclass
    reset: function() {},  // This must be implemented by subclass

    set: function(name, value) {
      var settings = {};
      settings[name] = value;
      navigator.mozSettings.createLock().set(settings);
    }
  };

  exports.SettingsHandler = SettingsHandler;
})(window);
