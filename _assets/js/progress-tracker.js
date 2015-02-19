(function () {
  'use strict';

  /**
   * Metodos Auxiliares
   */

  var utils = {
    /**
     * Converte um tempo #t=H:MM:SS em 'ms'
     * @param  {string} t tempo
     * @return {number}   tempo em 'ms'
     */
    getTime: function (str) {
      var PATTERN = /#t=(\d{0,2}:|)(\d{1,2}|):(\d{1,2})/;
      var match = str.match(PATTERN);

      if (!match)
        return 0;

      // 'purificando' o resultado (passa a poder ter
      // ':' no resultado)
      match = match.slice().splice(1,3).map(function (elem) {
        return elem.replace(/\D/, '');
      });

      return (((+match[0] * 60) * 60 ) * 1000) +
             ((+match[1] * 60) * 1000) +
             (+match[2] * 1000);
    },

    /**
     * Encontra, em um array de numeros, o numero
     * mais proximo de um dado.
     * @param  {array} where onde procurar
     * @param  {number} num   numero que setta a
     *                        proximidade
     * @return {number}       o numero mais
     *                        proximo daquele passado
     */
    getNearest: function (where, num) {
      var c = where[0];

      for (var i = 0, N = where.length; i < N; i++)
        if (Math.abs(num - where[i]) < Math.abs(num - c))
          c = where[i];

      return c;
    }
  };

  // para que possamos testar com o Mocha
  if (typeof exports === 'object')
      return module.exports = utils;

  /**
   * Interface
   */

  $(function () {
    'use strict';

    var iframe = document.querySelector('#soundcloud-player iframe');

    if (!iframe)
      return;

    var widget = SC.Widget(iframe);
    var slice = Function.prototype.call.bind(Array.prototype.slice);
    var currNearest;

    /**
     * Obtem um mapeamento 'tempo-em-ms':'dom node'
     */
    var timeMap = slice($('a[href]')).reduce(function (memo, elem) {
      var time = (utils.getTime($(elem).attr('href'))) / 1000;

      if (time)
        memo[time] = elem;

      return memo;
    }, {});

    // setta o mais proximo como o primeiro
    currNearest = utils.getNearest(timeMap, 0);

    widget.bind(SC.Widget.Events.READY, function () {
      widget.bind(SC.Widget.Events.PLAY_PROGRESS, highlightTime);
    });

    /**
     * Da um 'highlight' no tempo atual
     * @param  {Object} ev evento retornado do
     * widget
     */
    function highlightTime (ev) {
      var time = (ev.currentPosition / 1000) | 0;
      var nearest = utils.getNearest(Object.keys(timeMap), time);

      if (currNearest !== nearest) {
        for (var i in timeMap) {
          if (+i > +nearest)
            $(timeMap[i]).removeClass('time-selected');
          else
            $(timeMap[i]).addClass('time-selected');
        }

        currNearest = nearest;
      }
    }
  });

})();
