requirejs.config({
  paths: {
    ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ramda.min',
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min'
  }
});

require([
    'ramda',
    'jquery'
  ],
  function (_, $) {
    var trace = _.curry(function (tag, x) {
      console.log(tag, x);
      return x;
    });
    var getTable = function(doc) {
      return $(doc).find("body div.body-wrapper div.body div.browsename");
    };
    var Impure = {
      getJSON: _.curry(function(callback, url) {
        $.getJSON(url, callback);
      }),

      setHtml: _.curry(function(sel, html) {
        $(sel).html(html);
      }),

      getHtml: _.curry(function(callback, url) {
        $.get(url, callback);
      }),

      parseHtml: function(responseText) {
        var doc = document.implementation.createHTMLDocument("whatever");
        doc.documentElement.innerHTML = responseText;
        return doc;
      }
    };
    var url = function (page) {
      return 'http://cors.io/?u=http://www.behindthename.com/names/gender/masculine/' + page;
    };
    var traceDoc = _.compose(trace("table"), getTable, Impure.parseHtml);
    var app = _.compose(Impure.getHtml(traceDoc), url);
    app("1");
  });
