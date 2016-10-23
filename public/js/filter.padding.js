(function() {
	'use strict';

	angular
		.module('app')
		.filter('Padding', function() {
			return function(value, len) {
				try
				{
					var num = parseInt(value, 10);
					len = parseInt(len, 10);

					if (isNaN(num) || isNaN(len))
						return n;

					num = ''+num;
					while (num.length < len) {
						num = '0'+num;
					}
					return num;
				}
				catch(err)
				{
					console.log(err);
					alert(err);
				}
			};
		});

})();