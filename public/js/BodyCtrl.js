(function() {
	'use strict';

	angular
		.module('app')
		.controller('BodyCtrl', BodyCtrl);

	BodyCtrl.$inject = ['$rootScope'];

	function BodyCtrl($rootScope) {
		var ctrl = this;

		ctrl.keydown = keydown;

		function keydown(e) {
			switch(e.code) {
				case 'ArrowUp':
				case 'ArrowDown': 
					$rootScope.$broadcast(e.code);
					break;
			}
		}
	}

})();