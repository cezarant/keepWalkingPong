(function() {
	'use strict';

	angular
		.module('app')
		.controller('GameCtrl', GameCtrl);

	GameCtrl.$inject = ['$scope', '$interval'];

	function GameCtrl($scope, $interval) {
		var ctrl = this;
		var top_max = 90;
		var max_movements = top_max / 9;

		ctrl.game = {
			player1: {
				score: 0,
				paddle: {
					top: 45,
					width: 1,
					height: 27
				}
			},
			player2: {
				score: 0,
				paddle: {
					top: 0,
					width: 1,
					height: 27
				}
			},
			ball: {
				top: 50,
				right: 50
			}
		};
		PongGame.deltaTime = 500;
		PongGame.canvas = {
			width: 98.8,
			height: 97.5
		};

		PongGame.ball = {
			pos: {
				x: 50,
				y: 50
			},

			size: {
				x: 1.25,
				y: 1.25
			},

			speed: {
				x: 0.01,
				y: 0.01
			}
		};

		PongGame.paddle1 = {
			width: 1,
			height: 10
		};

		PongGame.paddle2 = {
			width: 1,
			height: 10
		};

		var numUsers = 0;
		var gameAuth = false;  
		var socket = io('https://pongkeepwalking.herokuapp.com/');
		socket.on('subir', function (data)
		{
		    if (ctrl.game.player1.paddle.top > 0)
			{
				ctrl.game.player1.paddle.top -= max_movements;
				if (ctrl.game.player1.paddle.top < 0)
					ctrl.game.player1.paddle.top = 0;
			}
			alert('Subir'); 
		});
		
		socket.on('descer', function (data)
		{
		    if (ctrl.game.player1.paddle.top < top_max)
			{
				ctrl.game.player1.paddle.top += max_movements;
				if ((ctrl.game.player1.paddle.top + ctrl.game.player1.paddle.height) > PongGame.canvas.height)
					ctrl.game.player1.paddle.top = PongGame.canvas.height - ctrl.game.player1.paddle.height + 2.5;				
			}
		});
		
		socket.on('user', function (username)
		{
			if ((addedUser) || (numUsers === 2)) return;
			// we store the username in the socket session for this client
			socket.username = username;
			++numUsers;			 
			if(numUsers === 2)
				gameAuth = true; 	
			
			alert(numUsers); 
			 
			//addedUser = true;
			/*socket.emit('login', 
			{
			  numUsers: numUsers
			});
			// echo globally (all clients) that a person has connected
			socket.broadcast.emit('user joined', 
			{
			  username: socket.username,
			  numUsers: numUsers
			});*/
		});
		
		
		
		$interval(function()
		{
			if(gameAuth)
			{ 
			
				PongGame.UpdateBallPosition(ctrl.game.player1.paddle, ctrl.game.player2.paddle);

				if ((PongGame.ball.pos.x < 0) || (PongGame.ball.pos.x > PongGame.canvas.width))
				{
					if (PongGame.ball.pos.x < PongGame.canvas.width)
					{
						ctrl.game.player1.score += 1;

						PongGame.ball.pos.x = PongGame.canvas.width;
						PongGame.ball.pos.y = ctrl.game.player1.paddle.top;

						if (PongGame.ball.speed.x > 0)
							PongGame.ball.speed.x *= -1;
					}
					else
					{
						ctrl.game.player2.score += 1;
						PongGame.ball.pos.x = 0;
						PongGame.ball.pos.y = ctrl.game.player2.paddle.top;

						if (PongGame.ball.speed.x < 0)
							PongGame.ball.speed.x *= -1;
					}

					ctrl.game.player2.paddle.top = 45;
				}
				// top do player2
				// PongGame.ball.pos.x
				// PongGame.ball.pos.y
				// player1.score
				// player2.score
				ctrl.game.ball.right = PongGame.ball.pos.x;
				ctrl.game.ball.top = PongGame.ball.pos.y;
			}
		}, 100);

		$scope.$on('ArrowUp', function(event, args) {
			if (ctrl.game.player1.paddle.top > 0)
			{
				ctrl.game.player1.paddle.top -= max_movements;
				if (ctrl.game.player1.paddle.top < 0)
					ctrl.game.player1.paddle.top = 0;
				
				console.log('enviado');
			}
		});

		$scope.$on('ArrowDown', function(event, args)
		{
			if (ctrl.game.player1.paddle.top < top_max)
			{
				ctrl.game.player1.paddle.top += max_movements;
				if ((ctrl.game.player1.paddle.top + ctrl.game.player1.paddle.height) > PongGame.canvas.height)
					ctrl.game.player1.paddle.top = PongGame.canvas.height - ctrl.game.player1.paddle.height + 2.5;				
			}
		});
	}

})();