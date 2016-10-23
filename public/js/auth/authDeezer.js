var servicoAuth = 'controller/deezer.php';	  
function validaLoginDeezer(id, descricao) 
{
	$.ajax(
	{
		method: "GET",
		url: servicoAuth,
		data: { servico: "criarUsuarioxDeezer", descricao: descricao, id: id }
	})
	.done(function()
	{
		window.location = 'gameCampoHarmonico.html';
	})
	.fail(function(){
		alert( "Erro na busca do Serviço, contate o desenvolvedor.");
	});		  
}