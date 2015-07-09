/* globals console */

(function() {

  'use strict';

  var UserHub = {
    get softwareButtons() {
      var buttons = document.getElementById('software-buttons');
      if (buttons) {
        delete this.softwareButtons;
        this.softwareButtons = buttons;
      }
      return buttons;
    },

    render: function render() {
      var userHubButton = document.querySelector('.user-hub-button');
      if (userHubButton) { userHubButton.remove(); }

      userHubButton = document.createElement('button');
      userHubButton.classList.add('user-hub-button');
      userHubButton.dataset.l10nId = 'user';
      userHubButton.dataset.icon = 'user';
      userHubButton.addEventListener('click', () => new window.MozActivity(
        { name: 'configure', data: { target: 'user' }}), true);

      this.softwareButtons.appendChild(userHubButton);
    },

    init: function init() {
      if (!this.softwareButtons) {
        console.warn('no software buttons found');
        return;
      }
      this.render();
    }
  };

  // Make sure we have the homebar element before booting.
  if (UserHub.softwareButtons) {
    UserHub.init();
  } else {
    window.addEventListener('mozContentEvent', function readyListener(e) {
      if (e.detail.type !== 'system-message-listener-ready') {
        return;
      }
      window.removeEventListener('mozContentEvent', readyListener);
      UserHub.init();
    });
  }

}());
