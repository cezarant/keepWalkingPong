var servicoRanking = 'controller/ranking.php';
var vi_TotalAcertos = 10;
/*****************************************************************************
 *****************  Traz o tempo, os erros e os acertos do usuário ***********
 ***************************************************************************** 
*/
function buscaRanking() 
{
    $.ajax(
	{
		method: "GET",
		url: servicoRanking,
		data: { servico: "buscaResultados"}
	})
	.done(function(result)
	{
		document.getElementById('tbResultados').innerHTML = result;		
	})
	.fail(function(){
		alert( "Erro na busca do Serviço, contate o desenvolvedor.");
	});
}	
/*****************************************************************************
 *****************  Para cada game, traz qual posíção o usuário parou ********
 ***************************************************************************** 
*/
function buscaColocacaoCandidato(a_Game)
{
	$.ajax(
	{
		method: "GET",
		url: servicoRanking,
		data: { servico: "buscaColocacao", id_game : a_Game}
	})
	.done(function(result)
	{
		var vi_IntervaloInicial = 3;
		var jsonResult = jQuery.parseJSON(result);	
		if(parseInt(jsonResult.retorno) == 1)
		{		
			if(jsonResult.valor !== null)
				vi_IntervaloInicial = parseInt(jsonResult.valor);				
		}		
		// Javascript Game.js 
		preparaGame(vi_IntervaloInicial,vi_TotalAcertos,a_Game);				
	})
	.fail(function()
	{
		alert( "Erro na busca do Serviço, contate o desenvolvedor.");
	});
}
/*****************************************************************************
 *****************  Grava o desempenho do usuário no banco de dados. *********
 ***************************************************************************** 
*/
function recuperaIdGame()
{
	return parseInt(document.getElementById('idGame').innerHTML);   
}
function gravaResultado()
{
	var horaFinal = document.getElementById("hora").innerHTML + " -" + 
                    document.getElementById("minuto").innerHTML + " -"+ 
                    document.getElementById("segundo").innerHTML;	
	$.ajax(
	{
		method: "GET",
		url: servicoRanking,
		data: { servico: "gravar", erros :qtdErrosGeral , acertos : qtdAcertos,
                tempo: horaFinal, id_game: recuperaIdGame(), liberadas: iNotasLiberadas	}
			  
	})
	.done(function(result)
	{	
		// Função do arquivo game.js		
		resultado();
	})
	.fail(function()
	{
		alert("Erro na busca do Serviço, contate o desenvolvedor.");
	});   	
}