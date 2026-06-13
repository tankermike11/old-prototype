/* ================================================================
   OLD Prototype Hub — Shared State Bus + Navigation
   ================================================================
   Usage:
     OLD.state.set('key', value)   // writes JSON to sessionStorage
     OLD.state.get('key')          // reads + parses; null if missing
     OLD.state.clear('key')        // removes one key
     OLD.state.clearAll()          // removes all OLD_state_* keys

     OLD.nav.goTo('belief_ticket') // → /protos/belief_ticket.html
     OLD.nav.back()                // history.back()
   ================================================================ */

(function () {
  var PREFIX = 'OLD_state_';

  window.OLD = {
    state: {
      set: function (key, value) {
        try {
          sessionStorage.setItem(PREFIX + key, JSON.stringify(value));
        } catch (e) {
          console.warn('[OLD.state] sessionStorage unavailable:', e);
        }
      },
      get: function (key) {
        try {
          var raw = sessionStorage.getItem(PREFIX + key);
          return raw ? JSON.parse(raw) : null;
        } catch (e) {
          return null;
        }
      },
      clear: function (key) {
        try { sessionStorage.removeItem(PREFIX + key); } catch (e) {}
      },
      clearAll: function () {
        try {
          Object.keys(sessionStorage)
            .filter(function (k) { return k.indexOf(PREFIX) === 0; })
            .forEach(function (k) { sessionStorage.removeItem(k); });
        } catch (e) {}
      }
    },

    nav: {
      goTo: function (screen) {
        var inProtos = window.location.pathname.indexOf('/protos/') !== -1;
        window.location.href = inProtos
          ? screen + '.html'
          : 'protos/' + screen + '.html';
      },
      back: function () {
        history.back();
      }
    }
  };
})();
