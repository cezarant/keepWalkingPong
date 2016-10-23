var carregado = false; 
/** Esta função esconde os campos antes do jogo começar */
/** Dependendo do exercício ela é implementada de uma forma */
function habilita() 
{
    var i = 0;
    var nomeBotao = '';	    
}
function tocaMenor()
{
	// Se o intervalo é impar é este cara.
	if (diferencaIntervalos % 2 != 0)
		diferencaUsuario = (diferencaIntervalos);		
	else 
		diferencaUsuario = 0; 
	fazerConferencia();
}
function tocaMaior()
{
	// Se o intervalo for par é este cara.
	if (diferencaIntervalos % 2 == 0)
	   diferencaUsuario = (diferencaIntervalos);	
	else   
	   diferencaUsuario = 0; 
	fazerConferencia();
}
function geraExercicio()
{        
	lista.length = 0;
	for (var i = 0; i <= 1; i++)
		lista.push(aleatorio());				
		
	if((Math.abs(lista[0] - lista[1])) == 0)
		geraExercicio();
	else 
	{
		for (i = 0; i <= 1; i++)
		{
			nomeBotao = 'btnNota' + i;            			
            // Configura a dificuldade do jogo, a partir da terceira nota uma carta é omitida.
			if(iNotasLiberadas <= 2)
			{			
				document.getElementById(nomeBotao).src = 'img/Notas/Nota'+ (lista[i]) +'.jpg';							
			}else{
				if(i == 0)
					document.getElementById(nomeBotao).src = 'img/Notas/Nota'+ (lista[i]) +'.jpg';							
				else 
					document.getElementById(nomeBotao).src = 'img/Notas/Verso.jpg';							
			}	
		}
		diferencaIntervalos = (Math.abs(lista[0] - lista[1]));	
		verificaDiferencaIntervalos(diferencaIntervalos);
	}
}
/** Confere se as notas que o usuário digitou, são as mesmas que o sistema tocou.*/
function exercicioCorreto()
{
    return (diferencaIntervalos == diferencaUsuario);
}       
function configuraBotoesIntervalos(altura)
{
	if(!carregado)
    { 
	   document.getElementById('btnAcordeMenor').innerHTML = altura +'ª Menor';
	   document.getElementById('btnAcordeMaior').innerHTML = altura +'ª Maior';
	   carregado = true;
	}
} 
function verificaDiferencaIntervalos(diferencaIntervalos)
{
	carregado = false; 
	if (diferencaIntervalos <= 2)
		configuraBotoesIntervalos(2);
	if ((diferencaIntervalos >= 3 && diferencaIntervalos < 5))
	    configuraBotoesIntervalos(3);
	if ((diferencaIntervalos >= 4 && diferencaIntervalos < 6))
	    configuraBotoesIntervalos(4);		
	if ((diferencaIntervalos >= 6 && diferencaIntervalos < 8))
	    configuraBotoesIntervalos(6);		
	if ((diferencaIntervalos >= 7 && diferencaIntervalos < 9))
	    configuraBotoesIntervalos(7);		
	if ((diferencaIntervalos >= 8 && diferencaIntervalos < 10))
	    configuraBotoesIntervalos(8);							
}  
function tocar(nota, delay, armazenar)
{
	tocaMidi(nota, delay, armazenar);
	
	if(armazenar) 
		lstNotasTocadas.push(nota);		
 }
 function fazerConferencia()
 {
    conferir();    
 } 
 function limpaLoops()
 {
    clearInterval(intervaloConferencia);     
 }