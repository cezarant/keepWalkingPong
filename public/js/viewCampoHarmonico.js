	var g_ImgBackgroundGameOver = "https://cdns-images.dzcdn.net/images/artist/f2bc007e9133c946ac3c3907ddc5d2ea/120x120-000000-80-0-0.jpg";
	var g_ImgBackgroundGameplay = "https://cdns-images.dzcdn.net/images/artist/f2bc007e9133c946ac3c3907ddc5d2ea/640x480-000000-80-0-0.jpg";
	var g_ImgGameOver = "img/gameover.png";		
	var id_game = 8; 
	var g_ImgBomb = "img/bomb.png";					 
	var g_ImgA= "img/Notas_Deezer/A.png";
	var g_ImgAm= "img/Notas_Deezer/Am.png";
	var g_ImgASharp= "img/Notas_Deezer/ASharp.png";
	var g_ImgASharpm= "img/Notas_Deezer/ASharpm.png";
	var g_ImgB= "img/Notas_Deezer/B.png";
	var g_ImgBm= "img/Notas_Deezer/Bm.png";
	var g_ImgC= "img/Notas_Deezer/C.png";
	var g_ImgCm= "img/Notas_Deezer/Cm.png";
	var g_ImgCSharp= "img/Notas_Deezer/CSharp.png";
	var g_ImgCSharpm= "img/Notas_Deezer/CSharpm.png";
	var g_ImgD= "img/Notas_Deezer/D.png";
	var g_ImgDm= "img/Notas_Deezer/Dm.png";
	var g_ImgDSharp= "img/Notas_Deezer/DSharp.png";
	var g_ImgDSharpm= "img/Notas_Deezer/DSharpm.png";
	var g_ImgE= "img/Notas_Deezer/E.png";
	var g_ImgEm= "img/Notas_Deezer/Em.png";
	var g_ImgF= "img/Notas_Deezer/F.png";
	var g_ImgFm= "img/Notas_Deezer/Fm.png";
	var g_ImgFSharp= "img/Notas_Deezer/FSharp.png";
	var g_ImgFSharpm= "img/Notas_Deezer/FSharpm.png";
	var g_ImgG= "img/Notas_Deezer/G.png";
	var g_ImgGm= "img/Notas_Deezer/Gm.png";
	var g_ImgGSharp= "img/Notas_Deezer/GSharp.png";
	var g_ImgGSharpm= "img/Notas_Deezer/GSharpm.png";
	var g_ImgFruits = "img/fruits.png";
	var g_ImgScore = "img/score.png";
	var g_ImgSplash = "img/splash.png";        
	var newScene;
	var game; 
	enchant();    	
	function goToScene(scene, gameObj)
	{            
            switch (scene)
            {
                default:
                case "main":
                    newScene = new MainScene(gameObj); 
                    break;
                case "over":
                    newScene = new GameOverScene(gameObj);
                    break;
            }
            gameObj.replaceScene(newScene);
    }
	function carregaJogo(imagemACarregar)		
	{			
			game = new Game(640, 480);
			g_ImgBackgroundGameplay = imagemACarregar;			
            game.fps = 75;
            game.preload(
				 g_ImgBackgroundGameplay,
				 g_ImgBackgroundGameOver,
				 g_ImgBomb,
				 g_ImgA,
				 g_ImgAm,
				 g_ImgASharp,
				 g_ImgASharpm,
				 g_ImgB,
				 g_ImgBm,
				 g_ImgC,
				 g_ImgCm,
				 g_ImgCSharp,
				 g_ImgCSharpm,
				 g_ImgD,
				 g_ImgDm,
				 g_ImgDSharp,
				 g_ImgDSharpm,
				 g_ImgE,
				 g_ImgEm,
				 g_ImgF,
				 g_ImgFm,
				 g_ImgFSharp,
				 g_ImgFSharpm,
				 g_ImgG,
				 g_ImgGm,
				 g_ImgGSharp,
				 g_ImgGSharpm,
                 g_ImgFruits,
                 g_ImgScore,
                 g_ImgSplash,
                 g_ImgGameOver
            );            
			game.onload = function ()
            {
                goToScene("main", game);
            };
            game.start();			
			consulta();
	} 		