function carregaMenu()
{
	$("#menuPrincipal").append("<li><a href=\"resultados.html\">Ir para o início</a></li>");									
	$("#subMenu").append("<li><a href=\"gameIntervalos.html\">Intervalos</a></li>"); 
	$("#subMenu").append("<li><a href=\"gameAcordes.html\">Acordes</a></li>");
	$("#subMenu").append("<li><a href=\"loginDeezer.html\">Campo Harmônico</a></li>");			
	$("#subMenu").append("<li><a target=\"_blank\" href=\"https://www.facebook.com/cezar.a.desouza\">Falar com o Desenvolvedor</a></li></ul>");			
} 
function abrePagina(asPagina)
{
    window.location = asPagina;
}
function acenderLuzes()
{
    document.getElementById('luzApagada').style.display = 'none';
}
/** Mostra mensagem "Carregando".....*/
function apagarLuzes()
{
    document.getElementById('luzAcessa').style.display = 'block';
    document.getElementById('luzApagada').style.display = 'block';
}
