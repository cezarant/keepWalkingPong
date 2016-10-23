/************************************************************/
/* Principal arquivo do site, onde todo o Game Design é 
desenvolvido. Precisa ser refatorado para melhorar a manutenção
/************************************************************/
// Variáveis globais, retirar depois 
var lstNotasTocadas = [];
var lista=[];
/************************************************************/
// Variáveis locais
var qtdErrosGeral = 0;
var qtdTotalExercicios = 12;			
var qtdExerciciosAcertados = 0;  
var vbTimerIniciado = false;  
var primeiraNota = 48; 
var iNotasLiberadas = 2;
var qtdTotalAcertos = 10;
var id_game = 0; 
var vbExercicioTocado = false;

function getNotasLiberadas()
{
	return iNotasLiberadas;
} 
function setNotasLiberadas(aNota)
{
    iNotasLiberadas = aNota; 
}
function aleatorio()
{
	inferior = primeiraNota;
	superior = primeiraNota + iNotasLiberadas;
	return gerarAleatorio(inferior,superior);
}  
function confereDesafio()	
{
	if ((qtdAcertos) < qtdTotalAcertos)
	{
	    qtdAcertos++;	    
	}else{
	    avancaExercicio();
	    if ((iNotasLiberadas + 1) < 12)	        
	    {
	        alert('Você acertou! Mais uma nota será liberada.');
	        gravaResultado();
	        qtdErrosGeral = 0;
	        qtdAcertos = 0;
	        for (var i = 0; i <= 9; i++)
	            document.getElementById('moeda' + (i + 1)).src = "img/moedaAzulpq.png";
	    }
    }   
}
function tocaMidi(nota, delay, armazenar)
{
	var velocity = 127;		
	MIDI.setVolume(0, 127);		
	MIDI.noteOn(0, nota, velocity, delay);
	MIDI.noteOff(0, nota, delay + 0.75);
}      
function gerarAleatorio(inferior,superior)
{
	var numPossibilidades = superior - inferior;
	var aleat = 0;
	aleat = Math.random() * numPossibilidades;			
	aleat = Math.floor(aleat);			
	return parseInt(inferior) + aleat;
}
function conferir()
{   
    acenderLuzes();  
	if (!exercicioCorreto())
	{
	    alert('Exerc\u00edcio incorreto, tente novamente.');
	    qtdErrosGeral++;
	}else{
		if (qtdExerciciosAcertados <= qtdTotalExercicios)
		{
		    if (iNotasLiberadas == 12)
            {
                alert('O jogo acabou! Parabéns!Aguarde e veja a sua posição no ranking...');
                gravaResultado();
                apagarLuzes(); 
		    }else{
		        confereDesafio();
		    }            					
 			atualizaPlacar();
		}
	}
	lstNotasTocadas.length = 0;	
    iniciar();
}
function resultado()
{      
	if ((iNotasLiberadas + 1) == 12)
        window.location = 'resultados.html';	
}		
function atualizaPlacar()
{
    document.getElementById('qtdAcertos').innerHTML = qtdAcertos;
    document.getElementById('qtdErros').innerHTML = qtdErrosGeral;    	
	vbExercicioTocado = false; 		
	for(var i = 0;i < qtdAcertos;i++)
		document.getElementById('moeda'+ (i+ 1)).src ="img/moedaVerdePq.png";		
}
function avancaExercicio()
{
    for (var i = 0; i < iNotasLiberadas; i++)
        document.getElementById('Img' + (i + 1)).src = "img/moedaVerdePq.png";

    if ((iNotasLiberadas + 1) < 12)
    {
        iNotasLiberadas++;
        qtdExerciciosAcertados++;
        habilita();
    }else{
        alert('O jogo acabou! Parabéns!Aguarde e veja a sua posição no ranking...');
        gravaResultado();
    } 	
}
function habilita()
{
    var i = 0;
    var nomeBotao = '';
}
function preparaGame(abNotasLiberadas,asTotalAcertos,aIdGame)
{
	vi_game = aIdGame; 	
	qtdTotalAcertos = asTotalAcertos;
	iNotasLiberadas = abNotasLiberadas;			
	apagarLuzes();		
	MIDI.loadPlugin(
	{
		soundfontUrl: "./soundfont/",
		instrument: "acoustic_grand_piano",
		callback: function()
		{   		
			acenderLuzes(); 		        
		}
    });    
};
function iniciar()
{    
	apagarLuzes();	
    if(!vbExercicioTocado)		
		geraExercicio();  
			
    tocarDesafio();			
	if(!vbTimerIniciado)			
	{
		iniciarTimer();	    
		vbTimerIniciado = true; 
		document.getElementById('btnIniciar').innerHTML = 'Repetir';				
	}
    acenderLuzes();
    for (var i = 0; i < iNotasLiberadas; i++)
        document.getElementById('Img' + (i + 1)).src = "img/moedaVerdePq.png";		
} 
function tocarDesafio() 
{
    var delay = 0;
    var cont = 0;
    for (var n = 0; n < lista.length; n++) 
	{
        delay = cont / 4;
        var note = n; 
        tocar(lista[n], delay, false);
        cont = cont + 1;						
    }		
	vbExercicioTocado = true; 		
}
/** Inicia a contagem do tempo. */
function iniciarTimer()
{	
	var s = 1;
	var m = 0;
	var h = 0;
	intervalo = window.setInterval(function()
	{
		if (s == 60) { m++; s = 0; }
		if (m == 60) { h++; s = 0; m = 0; }
		if (h < 10) document.getElementById("hora").innerHTML = "0" + h + ""; 
		else document.getElementById("hora").innerHTML = h + "";
		if (s < 10) document.getElementById("segundo").innerHTML = "0" + s + ""; 
		else document.getElementById("segundo").innerHTML = s + "";
		if (m < 10) document.getElementById("minuto").innerHTML = "0" + m + ""; 
		else document.getElementById("minuto").innerHTML = m + "";					
		s++;
	},1000);			
}
