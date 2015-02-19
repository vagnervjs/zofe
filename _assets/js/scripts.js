$(document).ready( function(){
  var searchFocusTimer;

  // search behavior
  $('.buscaBtn').on('mouseenter', function() {
    if (searchFocusTimer) {
      window.clearTimeout();
    }
    $('.buscaBtn .buscaWrapper').fadeIn();
    $('.buscaBtn #s').focus();
  });
  $('.buscaBtn').on('mouseleave', function() {
    searchFocusTimer = window.setTimeout( function() {
      $('.buscaBtn .buscaWrapper').fadeOut();
      $('body').focus();
    }, 3000);
  });

  // Altera links externos para abrirem em uma nova aba
  var domain = document.location.protocol+'//'+document.location.host,
    links = $('.entry-content a').each(function(index,element) {
    if(element.href.substr(0,domain.length) !== domain) {
      element.target = '_blank';
    }
  });
});
