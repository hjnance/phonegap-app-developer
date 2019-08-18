(function() {
  'use strict';

  var gaPlugin;

  bootstrapApplication();

  function bootstrapApplication() {
    if (window.cordova) {
      document.addEventListener('deviceready', initializeCordovaApplication, false);
    } else {
      loadPage();
    }
  }

  function initializeCordovaApplication() {
    StatusBar.hide();
    window.open = cordova.InAppBrowser.open;
    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);

    checkConnection();
    initializeGoogleAnalytics();
    loadPage();
  }

  function checkConnection() {
    var networkState = navigator.connection.type;

    switch (networkState) {
      case Connection.ETHERNET:
        onOnline();
      case Connection.WIFI:
        onOnline();
        break;
      case Connection.CELL_4G:
        onOnline();
        break;
      case Connection.CELL_3G:
        onOnline();
        break;
      case Connection.CELL:
        onOnline();
        break;
      case Connection.CELL_2G:
        onOnline();
        break;
      case Connection.UNKNOWN:
        onOffline();
        break;
      case Connection.NONE:
        onOffline();
        break;
      default:
        onOffline();
        break;
    }
  }

  function onOnline() {
    $('#networkModal').modal('hide');
    $('.modal-backdrop').hide();
    mainLoader();
  }

  function onOffline() {
    $(document).ready(function() {
      $('#networkModal').modal('show');
    });
  }

  function initializeGoogleAnalytics() {
    gaPlugin = window.plugins.gaPlugin;
    gaPlugin.init(function() {
      trackEvent('App', 'Open', 'App', Math.floor(new Date().getTime() / 1000));
    }, function(err) {
      console.error(err);
    }, "UA-39356750-2", 10);
  }

  function trackEvent(category, action, label, value) {
    if (gaPlugin) {
      gaPlugin.trackEvent(null, function(err) {
        console.error(err);
      }, category, action, label, value);
    }
  }

  function loadPage() {
    $(document).ready(function() {
      FastClick.attach(document.body);
      mainLoader();

      $('a').live('click', function(event) {
        event.preventDefault();

        var href = $(this).attr("href");
        var pathArray = String(href).split('/');
        var hostname = pathArray[2];

        if (String(href).indexOf(".pdf") > -1) {
          urlLoader(href);
        } else if (String(hostname) == "apecguidelines.org") {
          absoluteLoader(href);
        } else if (String(href) == "/guidelines/") {
          mainLoader();
        } else if (String(href).charAt(0) == "/") {
          relativeLoader(href);
        }
      });
    });
  }

  function mainLoader() {
    $('#appContent').load("http://apecguidelines.org/guidelines/?no_header=true", function() {
      trackPage('/guidelines/');
    });
  }

  function absoluteLoader(href) {
    $('#appContent').load(href + "?no_header=true", function() {
      trackPage(getPathParts(href));
    });
  }

  function relativeLoader(path) {
    $('#appContent').load("http://apecguidelines.org/" + path + "?no_header=true", function() {
      trackPage(path);
    });
  }

  function urlLoader(href) {
    var ref = window.open(href, '_system', 'location=no');

    ref.addEventListener('loadstart', function() {
      alert(event.url);
    });
  }

  function trackPage(pagePath) {
    if (window.cordova) {
      gaPlugin.trackPage(null, function(err) {
        console.error(err);
      }, pagePath);
    }
  }

  function getPathParts(url) {
    var pathParts = String(url).split('/');

    return '/' + pathParts[3] + '/' + pathParts[4] + '/';
  }

  window.onerror = function(msg, url, linenumber) {
    console.error(msg);
  };
  window.checkConnection = checkConnection;
})();
