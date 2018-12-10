var app = angular.module('Application', []);

app.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{a');
  $interpolateProvider.endSymbol('a}');
}]);

var AppController = /** @class */ (function () {
  function AppController($scope, $mdDialog, $mdMedia, $mdToast) {
      this.$scope = $scope;
      this.$mdDialog = $mdDialog;
      this.$mdMedia = $mdMedia;
      this.$mdToast = $mdToast;
      this.status = '';
      this.customFullscreen = this.$mdMedia('xs') || this.$mdMedia('sm');
  }
  AppController.prototype.showDialog = function (event) {
      var _this = this;
      var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs')) && this.customFullscreen;
      this.$mdDialog.show({
          controller: LoginDialogController,
          controllerAs: 'dialog',
          templateUrl: 'login-dialog.template.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: true,
          fullscreen: useFullScreen
      })
          .then(function (credentials) { return _this.showToast("Thanks for logging in, " + credentials.username + "."); }, function () { return _this.showToast('You canceled the login.'); });
      this.$scope.$watch(function () { return _this.$mdMedia('xs') || _this.$mdMedia('sm'); }, function (wantsFullScreen) { return _this.customFullscreen = wantsFullScreen === true; });
  };
  AppController.prototype.showToast = function (content) {
      this.$mdToast.show(this.$mdToast.simple()
          .content(content)
          .position('top right')
          .hideDelay(3000));
  };
  return AppController;
}());
var LoginDialogController = /** @class */ (function () {
  function LoginDialogController($mdDialog) {
      this.$mdDialog = $mdDialog;
  }
  LoginDialogController.prototype.hide = function () {
      this.$mdDialog.hide();
  };
  LoginDialogController.prototype.close = function () {
      this.$mdDialog.cancel();
  };
  LoginDialogController.prototype.login = function () {
      this.$mdDialog.hide({username: this.username, password: this.password});
      Login(this.username, this.password);
  };
  return LoginDialogController;
}());
function config($mdThemingProvider) {
  $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('orange');
  $mdThemingProvider.theme('input', 'default')
      .primaryPalette('grey');
}
angular
  .module('app', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
  .controller('AppController', AppController)
  .config(config);