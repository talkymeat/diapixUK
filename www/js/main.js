function updateWindow(prev, next){
  $("#" + prev).hide();
  $("#" + next).show();
}
function updateTextInput(val) {
  document.getElementById('timevalue').valueint=val; 
  document.getElementById('timevalue').value=val + " minutes"; 
}

/*$(document).ready(function() {
  alert("aa");
  $window.StatusBar.hide();
});*/

/*var app = angular.module('ionicApp', ['ionic', 'ngCordova'])

app.run(function($cordovaStatusbar) {
  alert("aa");

  $cordovaStatusbar.overlaysWebView(true)

  $cordovaStatusBar.style(1) //Light
  $cordovaStatusBar.style(2) //Black, transulcent
  $cordovaStatusBar.style(3) //Black, opaque
});*/