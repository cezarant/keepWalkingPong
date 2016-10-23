	var servicoRanking = 'controller/ranking.php';
	var servicoDeezer =  'controller/deezer.php';
	var retornoServidor = null;					 
	function verificaRetorno()
	{
		if(retornoServidor.valor == null)
			setNotasLiberadas(1);
		else    
		   setNotasLiberadas(retornoServidor.valor);				   
		
		if(getNotasLiberadas() == 10)
		{		
			if (confirm('Você já completou este desafio.Deseja jogar novamente e apagar o histórico atual?'))			
				setNotasLiberadas(1);	
			else
				window.location ='http://ouvidoperfeito.besaba.com/new/Resultados.html';				  
		}
	} 	
	function excluiTudo()
	{
		$.get(servicoDeezer + "?servico=buscarUsuarioxDeezer&contador=" + getNotasLiberadas(),
		function (data)
		{
			alert(data); 
		});
	}	
	function buscaColocacaoCandidato(aId_game)
	{
		$.ajax(
		{
			method: "GET",
			url: servicoRanking,
			data: { servico: "buscaColocacao", id_game: aId_game }
		})
		.done(function(retorno)
		{			 
			retornoServidor = jQuery.parseJSON(retorno);
			if(parseInt(retornoServidor.retorno) == 1)
			{
				verificaRetorno();				
				$.ajax(
				{
					method: "GET",
					url: servicoDeezer,
					data: { servico: "buscarUsuarioxDeezer", contador: getNotasLiberadas() }
				})
				.done(function(data)
				{
					retornoServidor = jQuery.parseJSON(data);					
					if(retornoServidor.retorno == 1)
					{ 	
						retornoServidor = jQuery.parseJSON(retornoServidor.valor);											
						carregaJogo(retornoServidor.imagemFundo);		
						acenderLuzes();									
					}else{
						alert("Erro no retorno:"+retornoServidor.valor); 
					}
				})
				.fail(function()
				{
					alert( "Erro na busca do Serviço, contate o desenvolvedor.");
				});	
			}
		})
		.fail(function(){
			alert( "Erro na busca do Serviço, contate o desenvolvedor.");
		});				
	}
	function consulta()
	{   
		// Json vindo do Deezer, informações que são buscadas: 
		// - Imagem do Artista 
		// - Nome do Artista 
		// - Titulo da música
		// - Image de fundo 		         
		document.getElementById('ImgArtista').src = retornoServidor.artist.picture;
		$("#btnIniciar").disable = 'true';
		$("#artista").text(retornoServidor.artist.name);
		$("#tituloMusica").text(retornoServidor.title);
		$("#proximaMusica").text(retornoServidor.proximaMusica);		         		
		carregaApartirNota(retornoServidor.campo);			
	}
	function carregaApartirNota(tomEncontrado)
	{
		$("#acordeVindoServidor").text(tomEncontrado);            		
		tocaMusicaAPartirDoDeezer(retornoServidor.id);                
		procuraIndiceAcorde();
	}
	function tocarMusicas()
	{			
		DZ.player.playTracks(vetMusicas);
		acenderLuzes();
		DZ.Event.subscribe('track_end', 
		function ()
		{	
			window.location = './gameCampoHarmonico.html';						
		});		
	} 	
	function tocaMusicaAPartirDoDeezer(aTrackId)
	{
		vetMusicas[0] = aTrackId;			
		apagarLuzes();
		DZ.init(
		{
			appId  : '193422',	
			channelUrl : 'http://ouvidoperfeito.besaba.com/final/deezerLogin.php',	
			player:
			{
				onload: tocarMusicas
			}				
		});		
	}
	var qtdErros = 0;
	/**
	 *
	 */
	/*
	 *  -------------------------------------------------------------------------
	 * Campo harmônico   
	 */
	var grausCampoHarmonico = [];
	var listaAcordes = [];
	var alturaAcordeServidor = "";
	listaAcordes[0] = "C";
	listaAcordes[1] = "C#";
	listaAcordes[2] = "D";
	listaAcordes[3] = "D#";
	listaAcordes[4] = "E";
	listaAcordes[5] = "F";
	listaAcordes[6] = "F#";
	listaAcordes[7] = "G";
	listaAcordes[8] = "G#";
	listaAcordes[9] = "A";
	listaAcordes[10] = "A#";
	listaAcordes[11] = "B";

	var contAcertos = 0;
	var indiceAcordeEncontrado = 0;
	var acordeVindoServidor = "";
	var ai_VelocidadeInicial = 50;
	var vbTimerIniciado = false;
	/*
	 *  -------------------------------------------------------------------------
	 *  Cores 
	 */
	var coresAcordes = [];
	coresAcordes[0] = "#FF2200";
	coresAcordes[1] = "#000080";
	coresAcordes[2] = "#C0C0C0";
	coresAcordes[3] = "#990033";
	coresAcordes[4] = "#333399";
	coresAcordes[5] = "#660066";
	coresAcordes[6] = "#FF6600";
	coresAcordes[7] = "#669966";
	coresAcordes[8] = "#99CC00";
	coresAcordes[9] = "#CC99FF";
	coresAcordes[10] = "#CC9933";
	coresAcordes[11] = "#330000";
	var campoHarmonico = [];
	var ai_Acordes = 0;
	var vetMusicas = [];
	var campoHarmonicoLiberado = 0; 
	function verificaNotaEstaCerta(nota)
	{
		var concluido = true;
		var qtdAcertos = 0;
		var bAcertou = false;
		for (i = 0; i < campoHarmonico.length; i++)
		{
			if (campoHarmonico[i] == nota)
			{
				$('#grau' + i).text(campoHarmonico[i]);
				qtdAcertos = $('#qtdAcertos').text();
				qtdAcertos++;
				$('#qtdAcertos').text(qtdAcertos.toString());
				bAcertou = true;
			}
		}	
		// Penaliza erro se necessário
		penalizaErro(bAcertou);

		for (i = 0; i < 7; i++){
			if ($('#grau' + i).text() == "*"){
				concluido = false;
				i = 7; // sai do loop. 
			}
		}

		if (concluido)
		{
			alert("Você acertou todas os acordes e liberou a próxima música. Vamos para o próximo campo harmônico.");
			campoHarmonicoLiberado++;		
			// -- grava o desempenho do usuário. 
			var horaFinal = document.getElementById("hora").innerHTML + " -" +
							document.getElementById("minuto").innerHTML + " -" +
							document.getElementById("segundo").innerHTML;		
							
			var notasMalditas = parseInt(getNotasLiberadas());  				
			notasMalditas = parseInt(notasMalditas + 1);
			
			var parametros = { 
								servico: 'gravar', erros: qtdErros , acertos : qtdAcertos, tempo :horaFinal,
								id_game: 8, liberadas : notasMalditas   
							 }			
			$.get(paginaOvPerfeito + "?servico=gravar&", parametros, 
			function (data)
			{
				var retornoServidor = jQuery.parseJSON(data);
				if(retornoServidor.retorno == 1)
				{ 	
					if((notasMalditas) == 10)
					{					
						alert('Parabéns Jovem! Você acaba de concluir o desafio!'); 
						window.location = 'http://ouvidoperfeito.besaba.com/Resultados.html';						
					}else{
						window.location = './DArk.html';						
					}
				}else{
					alert('Ocorreu um erro ao tentar fazer a gravação.'+ retornoServidor.valor); 
				} 			
			});        
		}
	}
	function retornaIndiceEncontrado()
	{
	  return indiceAcordeEncontrado; 
	} 
	function aumentaTomDaMusica()
	{
		if ((indiceAcordeEncontrado + 1) == listaAcordes.length)
			indiceAcordeEncontrado = 0;
		else
			indiceAcordeEncontrado++;
	}
	function penalizaErro(bAcertou)
	{    
		if (!bAcertou){
			qtdErros = $('#qtdErros').text();
			qtdErros++;
			// Se o usuario errou mais de cinco notas, clicou em 
			// mais de cinco balões que não pertençam ao campo harmônico
			if (qtdErros > 5)
				comecaDoZero();
			else
				$('#qtdErros').text(qtdErros.toString());
		}
	}
	function comecaDoZero()
	{
		// Apaga todas as notas que o cara acertou.
		for (i = 0; i < 7; i++)
			$('#grau' + i).text("*");

		// Libera só algumas notas.    
		for (i = 0; i < campoHarmonico.length; i++)
			if ((i == 2) || (i == 5))
				$('#grau' + i).text(campoHarmonico[i]);

		$('#qtdErros').text("0");
		$('#qtdAcertos').text("0");
	}
	function procuraIndiceAcorde()
	{
		var bAcordeEncontrado = false;
		for (var i = 0; i < listaAcordes.length; i++)
		{
			if (listaAcordes[i] == $("#acordeVindoServidor").text().replace("Maj","").trim()) 
			{
				indiceAcordeEncontrado = i;
				montaCampoHarmonicoMaiorNatural(i);
				bAcordeEncontrado = true;
				alturaAcordeServidor = "M";
				// Sai do loop
				i = listaAcordes.length;
			}
		}

		if (!bAcordeEncontrado)
		{
			var acr = ($("#acordeVindoServidor").text());
			// Verifica se o acorde não é do tipo menor
			for (var i = 0; i < listaAcordes.length; i++) {
				if ((listaAcordes[i] + " MIN") == acr.toString().toUpperCase()) {
					indiceAcordeEncontrado = i;
					//montaCampoHarmonicoMaiorNatural(i);
					montaCampoHarmonicoMenorNatural(i);
					bAcordeEncontrado = true;
					alturaAcordeServidor = "m";
					// Sai do loop
					i = listaAcordes.length;
				}
			}
		}

		if (!bAcordeEncontrado){
			alert("O tom dessa música: " + $("#acordeVindoServidor").text() + ". É muito bizzaro.Sinto não poder ajudar :( ");
			acenderLuzes();
		}
	}
	function tocarDesafio() {
		procuraIndiceAcorde();
	}

	function monta(iAcordes) {
		apagarLuzes();
		var i = 0;
		// Sistema começa com 2 porque duas notas já estão liberadas.
		contAcertos = 2;
		ai_Acordes = iAcordes;
		var indiceAcorde = 0;
		var somatorio = 0;

		campoHarmonico.length = 0;

		for (i = 0; i < 7; i++) {
			somatorio = parseInt(grausCampoHarmonico[i].split('@')[0]);
			indiceAcorde = (iAcordes + somatorio);
			if (indiceAcorde > 11) {
				indiceAcorde = (indiceAcorde - 12);
				if (indiceAcorde < 0)
					indiceAcorde = (indiceAcorde * (-1));
			}
			campoHarmonico.push(listaAcordes[indiceAcorde] + '' + grausCampoHarmonico[i].split('@')[1]);
		}

		for (i = 0; i < campoHarmonico.length; i++)
			if ((i == 2) || (i == 5))
				$('#grau' + i).text(campoHarmonico[i]);
			
		if (!vbTimerIniciado)
		{
			iniciarTimer();
			vbTimerIniciado = true;
		}
		acenderLuzes();
	}

	function montaCampoHarmonicoMenorNatural(iAcordes) {
		grausCampoHarmonico[0] = "0@m";
		grausCampoHarmonico[1] = "2@m";
		grausCampoHarmonico[2] = "3@ ";
		grausCampoHarmonico[3] = "5@m";
		grausCampoHarmonico[4] = "7@m";
		grausCampoHarmonico[5] = "8@ ";
		grausCampoHarmonico[6] = "11@m";

		monta(iAcordes);
	}
	function montaCampoHarmonicoMaiorNatural(iAcordes)
	{
		grausCampoHarmonico[0] = "0@ ";
		grausCampoHarmonico[1] = "2@m";
		grausCampoHarmonico[2] = "4@m";
		grausCampoHarmonico[3] = "5@ ";
		grausCampoHarmonico[4] = "7@ ";
		grausCampoHarmonico[5] = "9@m";
		grausCampoHarmonico[6] = "11@m";

		monta(iAcordes);
	}
	function recuperaIdGame()
	{
		return 8;
	}
	// --------------------------------------------------------------------------------------
/**
 * Converts number to string adding zeroes to the left
 * if necessary.
 * @param   number  integer
 * @param   width   string size
 * @return  string
 */
function zeroFill ( number, width ) 
{
    width -= number.toString().length;
    if ( width > 0 ) 
	{
        return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // always return a string
}
var g_Score = 0;

/**
 * Gameplay scene
 */
 
function retornaCenaPrincipal()
{
	return MainScene;
}  
 
var MainScene = Class.create(Scene, 
    {
    /**
     * Constructor
     * @param   gameObj     game object.
     * @return  void
     */
    initialize: function (gameObj)
	{
        Scene.apply(this);
        this.m_GameObj = gameObj;
        this.m_LifeIcons = Array();
        this.m_Score = 0;
        this.m_TempScore = 0;
        this.m_Lives = 3;
        this.m_LblScore = new Label("");
        this.m_LblScore.font = "42px Caesar Dressing";
        this.m_LblScore.text = zeroFill(this.m_Score,3);
        this.m_LblScore.x = 175;
        this.m_LblScore.color = "#ffde00";
        this.m_World = new PhysicsWorld(0.0, 9.8);
        this.m_FruitsList = new Array();
        var background = new Sprite(760,570);
        var scoreIcon = new Sprite(50,50);
        scoreIcon.x = 125;
        scoreIcon.y = 5;
        background.image = this.m_GameObj.assets[g_ImgBackgroundGameplay];		
        this.addChild(background);
        scoreIcon.image = this.m_GameObj.assets[g_ImgScore];        
        for (i = 0; i < 1; i++)
		{
            this.m_LifeIcons[i] = new Sprite(50,50);
            this.m_LifeIcons[i].image = this.m_GameObj.assets[g_ImgScore];
            this.m_LifeIcons[i].x = 425 + 50 * (i+1);
            this.m_LifeIcons[i].y = 5
            this.m_LifeIcons[i].frame = 1;            
        }        
        this.addEventListener(Event.ENTER_FRAME, this.update);
        
    },
    /**
     * Executes on each frame. Implements the gameplay's logic.
     * @param   evt     event object
     * @return  void
     */
    update: function (evt)
	{
        if (this.m_Lives == 0)
        {
            //GameOver
            g_Score = this.m_Score;
            goToScene("over", this.m_GameObj);
        }
        else
        {
            if (this.m_GameObj.frame % this.m_GameObj.fps == 0)
			{
                // each second we randomize a fruit, a bomb or nothing
                var selection = Math.floor(Math.random()*10);
                var timer = Math.floor(Math.random()*700+200);
                switch (selection) {
                    case 1:
						this.createElement("fruit");
						break;
                    case 2:
						this.createElement("fruit");
						break;
                    case 4:
						this.createElement("fruit");
						break;
                    case 5:
                    case 8:
                        this.createElement("fruit");
                        break;
                    case 0:
                    case 6:
                        this.createElement("fruit");
                        setTimeout(this.createElement("bomb"), timer);
                }
            }
            this.m_World.step(this.m_GameObj.fps);
            //We avoid the calling of zeroFill if the score hasn't changed
            if (this.m_Score != this.m_TempScore)
            {
                this.m_Score = this.m_TempScore;
                this.m_LblScore.text = zeroFill(this.m_Score,3);
            }
        }
    },
    /**
     * Updates the order of the objects in the scene, so
     * the fruits are moved over the fruits' stains.
     * @param   evt     event object
     * @return  void
     */
    overlapFruits: function (evt)
	{
        var tmpList = new Array();
        for (i = 0; i < this.m_FruitsList.length; i++)
		{
            if (this.m_FruitsList[i] != null) 
			{
                this.removeChild(this.m_FruitsList[i]);
                if (this.m_FruitsList[i].m_IsAlive)
				{
                    this.addChild(this.m_FruitsList[i]);
                    tmpList.push(this.m_FruitsList[i]);
                }    
            }
        }
        this.m_FruitsList = tmpList;
    },
    /**
     * Creates a fruit or a bomb.
     * @param   type    string (fruit or bomb), fruit is default
     * @return  void
     */
    createElement: function (type)
	{
        if (type === undefined)
            type = "fruit"
        var element;							
		var vi_acorde = gerarAleatorio(0, 12);				
		var vi_alturaAcorde = gerarAleatorio(1, 3);
		var acordeAleatorio = "";
		if (vi_alturaAcorde == 2)
			acordeAleatorio = listaAcordes[vi_acorde] + "m";
		else
			acordeAleatorio = listaAcordes[vi_acorde] + " ";	
												
		if (type == "bomb")
            element = new Bomb(this.m_GameObj,acordeAleatorio);
        else
            element = new Bomb(this.m_GameObj,acordeAleatorio);
        
		this.addChild(element);
        this.m_FruitsList.push(element);
    }
});