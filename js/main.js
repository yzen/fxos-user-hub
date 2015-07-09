(function(exports) {
  'use strict';

  var Main = {
    header: document.querySelector('gaia-header'),
    resetButton: document.querySelector('.reset-button'),

    init: function() {
      if (navigator.mozHasPendingMessage &&
          navigator.mozHasPendingMessage('activity')) {
        navigator.mozSetMessageHandler('activity', activity => {
          this.activity = activity;
        });
      }
    },

    close: function() {
      this.activity.postResult('closed');
    },

    reset: function() {
      window.dispatchEvent(new CustomEvent('reset'));
    }
  };

  Main.header.addEventListener('action', event => {
    if (event.detail.type === 'close') { Main.close(); }
  });

  Main.resetButton.addEventListener('click', () => Main.reset());

  Main.init();

  exports.Main = Main;
})(window);
