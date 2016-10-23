PongGame = {
	deltaTime: 0,

	canvas: {
		width: 0,
		height: 0
	},

	ball: {
		pos: {x: 0, y: 0},
		size: {x: 0, y: 0},
		speed: {x: 0, y: 0},
	},

	paddle1: {
		top: 0,
		width: 0,
		height: 0
	},

	paddle2: {
		top: 0,
		width: 0,
		height: 0
	},

	UpdateBallPosition: function(paddle1, paddle2)
	{
		if ((this.ball.pos.x >= 0) && (this.ball.pos.x <= this.canvas.width))
		{
			this.ball.pos.x += this.ball.speed.x * this.deltaTime;
			this.ball.pos.y += this.ball.speed.y * this.deltaTime;

			if (this.ball.pos.x < 0 || (this.ball.pos.x + this.ball.size.x) > this.canvas.width)
			{
				this.ball.speed.x *= -1;

				if (this.ball.pos.x < 0)
					this.ball.pos.x = 0;
				else if ((this.ball.pos.x + this.ball.size.x) > this.canvas.width)
					this.ball.pos.x = this.canvas.width;
			}

			if (this.ball.pos.y < 0 || (this.ball.pos.y + this.ball.size.y) > this.canvas.height)
			{
				this.ball.speed.y *= -1;

				if (this.ball.pos.y < 0)
					this.ball.pos.y = 0;
				else if ((this.ball.pos.y + this.ball.size.y) > this.canvas.height)
					this.ball.pos.y = this.canvas.height;
			}

			// ball hits right edge
			if (this.ball.pos.x <= paddle2.width)
			{
				// did the ball hit the paddle?
				if ((this.ball.pos.y > paddle2.top) && (this.ball.pos.y < (paddle2.top + paddle2.height)))
				{
					this.ball.pos.x += paddle2.width;

					// give a random speed to y
					var min = 1;
					var max = 3;
					this.ball.speed.y = (Math.floor(Math.random() * (max - min + 1) + min) / 100);
				}
				else
					this.ball.pos.x = -5;
			}
			else if (this.ball.pos.x >= (this.canvas.width - paddle1.width)) // ball hits left edge
			{
				// did the ball hit the paddle?
				if ((this.ball.pos.y > paddle1.top) && (this.ball.pos.y < (paddle1.top + paddle1.height)))
				{
					this.ball.pos.x -= paddle1.width;

					// give a random speed to y
					var min = 1;
					var max = 3;
					this.ball.speed.y = (Math.floor(Math.random() * (max - min + 1) + min) / 100);
				}
				else
					this.ball.pos.x = this.canvas.width + 5;
			}
		}
	}
}