var carregado = false;
var viAlturaAcordeUsuario = 0;
var viAlturaAcorde = 7;
var viTonica = 0;
/** Esta função esconde os campos antes do jogo começar */
/** Dependendo do exercício ela é implementada de uma forma */
function habilita()
{
    var i = 0;
    var nomeBotao = '';
}
function recuperaIdGame()
{
	return 2;
} 
function tocaMenor()
{
    viAlturaAcordeUsuario = 3;             
    fazerConferencia();
}
function exercicioCorreto()
{
    return (viAlturaAcorde == viAlturaAcordeUsuario);
}       
function tocaMaior() {
    // Se o intervalo for par é este cara.
    viAlturaAcordeUsuario = 4;         
    fazerConferencia();
}
function geraExercicio()
{
    lista.length = 0;
    viAlturaAcorde = gerarAleatorio(3, 5);
    viTonica = aleatorio();

    lista.push(viTonica);
    lista.push(viTonica + viAlturaAcorde);
    lista.push(viTonica + 7);

    for (i = 0; i <= 2; i++)
    {
        nomeBotao = 'btnNota' + i;
        // Configura a dificuldade do jogo, a partir da terceira nota uma carta é omitida.
        if (iNotasLiberadas <= 3)
        {
            document.getElementById(nomeBotao).src = 'img/Notas/Nota' + (lista[i]) + '.jpg';
        }else{
            if (i == 0)
                document.getElementById(nomeBotao).src = 'img/Notas/Nota' + (lista[i]) + '.jpg';
            else
                document.getElementById(nomeBotao).src = 'img/Notas/Verso.jpg';
        }
    }
}
function configuraBotoesIntervalos(altura)
{
    if (!carregado)
    {
        document.getElementById('btnAcordeMenor').innerHTML = altura + 'ª Menor';
        document.getElementById('btnAcordeMaior').innerHTML = altura + 'ª Maior';
        carregado = true;
    }
}
function tocar(nota, delay, armazenar) {
    tocaMidi(nota, delay, armazenar);

    if (armazenar)
        lstNotasTocadas.push(nota);
}
function fazerConferencia()
{
    conferir();
}
function limpaLoops() {
    clearInterval(intervaloConferencia);
}