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

function tocaMusicaAPartirDoDeezer(aTrackId) {
    apagarLuzes();
    vetMusicas[0] = aTrackId;
    DZ.player.playTracks(vetMusicas);
}
function onPlayerLoaded() {
    DZ.Event.subscribe('track_end', function () {
        incrementaMusicaDeezer();
    });
    acenderLuzes();
}
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

    for (i = 0; i < 7; i++) {
        if ($('#grau' + i).text() == "*") {
            concluido = false;
            i = 7; // sai do loop. 
        }
    }

    if (concluido)
    {
        alert("Você acertou todas os acordes. Vamos para o próximo campo harmônico");
        // gravaResultado();	  
        // atualizaPlacarCampoHarmonico();
        for (i = 0; i < 7; i++)
            $('#grau' + i).text("*");

        aumentaTomDaMusica();
        if (alturaAcordeServidor == "m")
            montaCampoHarmonicoMenorNatural(indiceAcordeEncontrado);
        else
            montaCampoHarmonicoMaiorNatural(indiceAcordeEncontrado);
        // ai_VelocidadeInicial = ai_VelocidadeInicial + 30; 
    }
}
function aumentaTomDaMusica() {
    if ((indiceAcordeEncontrado + 1) == listaAcordes.length)
        indiceAcordeEncontrado = 0;
    else
        indiceAcordeEncontrado++;
}
function penalizaErro(bAcertou) {
    var qtdErros = 0;
    if (!bAcertou)
    {
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

function comecaDoZero() {
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
function procuraIndiceAcorde() {
    var bAcordeEncontrado = false;

    for (var i = 0; i < listaAcordes.length; i++) {
        if (listaAcordes[i] == $("#acordeVindoServidor").text()) {
            indiceAcordeEncontrado = i;
            montaCampoHarmonicoMaiorNatural(i);
            bAcordeEncontrado = true;
            alturaAcordeServidor = "M";
            // Sai do loop
            i = listaAcordes.length;
        }
    }

    if (!bAcordeEncontrado) {
        var acr = ($("#acordeVindoServidor").text());
        // Verifica se o acorde não é do tipo menor
        for (var i = 0; i < listaAcordes.length; i++) {
            if ((listaAcordes[i] + " MIN") == acr.toString().toUpperCase())
            {
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

    if (!bAcordeEncontrado) {
        alert("O tom dessa música: " + $("#acordeVindoServidor").text() + ". É muito bizzaro.Sinto não poder ajudar :( ");
        acenderLuzes();
    }
}
function tocarDesafio() {
    procuraIndiceAcorde();
}

function monta(iAcordes)
{
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

    init();
    if (!vbTimerIniciado) {
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

function montaCampoHarmonicoMaiorNatural(iAcordes) {
    grausCampoHarmonico[0] = "0@ ";
    grausCampoHarmonico[1] = "2@m";
    grausCampoHarmonico[2] = "4@m";
    grausCampoHarmonico[3] = "5@ ";
    grausCampoHarmonico[4] = "7@ ";
    grausCampoHarmonico[5] = "9@m";
    grausCampoHarmonico[6] = "11@m";

    monta(iAcordes);
}
function recuperaIdGame() {
    return 8;
}
/*
*  -------------------------------------------------------------------------
*    
*/
// Namespace
var BalloonShooter = {};
BalloonShooter.Utils =
{
    List: function () {
        return {
            hasValue: function (obj) {
                return (((typeof (obj) == 'undefined') || (obj == null)) == false);
            },
            items: [],
            item: function (index, obj) {
                if (this.hasValue(obj))
                    this.items[index] = obj;
                else
                    return this.items[index];
            },
            add: function (obj) {
                this.items[this.items.length] = obj;
            },
            isEqual: function (a, b) {
                return (a === b);
            },
            clear: function () {
                this.items = [];
            },
            remove: function (obj) {
                var tmp = [], i = 0, j = 0;
                for (i = 0; i < this.items.length; i++) {
                    if (!this.isEqual(this.items[i], obj)) {
                        tmp[j++] = this.items[i];
                    };
                };
                this.clear();
                this.items = tmp;
            },
            removeAt: function (index)
            {
                this.remove(this.items[index]);
            }
        };
    }
};
// Constantes
BalloonShooter.LARGURA_FECHO = 0.12;
BalloonShooter.ALTURA_FECHO = 0.10;
BalloonShooter.CURVA_FECHO = 0.13;
BalloonShooter.RAIO_GRADIENTE_CIRCULO = 3;
BalloonShooter.VELOCIDADE_INICIAL = ai_VelocidadeInicial;
// Construtor
BalloonShooter.Balloon = function (ctx, posXCentro, posYCentro, raio, cor) {
    var vi_acorde = gerarAleatorio(0, 12);
    var vi_alturaAcorde = gerarAleatorio(1, 3);
    this.contexto = ctx;
    this.posXCentro = posXCentro;
    this.posYCentro = posYCentro;
    this.raio = raio;
    if (vi_alturaAcorde == 2)
        this.tomClaroCor = listaAcordes[vi_acorde] + "m";
    else
        this.tomClaroCor = listaAcordes[vi_acorde] + " ";

    this.tomEscuroCor = coresAcordes[vi_acorde];
    this.velocidade = BalloonShooter.VELOCIDADE_INICIAL;
}
// Desenha o balão
BalloonShooter.Balloon.prototype.desenha = function ()
{
    var contexto = this.contexto;
    var posXCentro = this.posXCentro;
    var posYCentro = this.posYCentro;
    var raio = this.raio;
    var fundoBalaoY = posYCentro + raio;
    // Inicia o desenho do balão
    contexto.beginPath();
    contexto.arc(posXCentro, posYCentro, raio, 0, Math.PI * 2, true);
    /*
	 * CONFIGURA OS BALÕES
	 */
    var distanciaGradiente = (raio / 3);
    contexto.fillStyle = this.tomEscuroCor;
    contexto.fill();
    contexto.font = "12px Verdana";
    contexto.fillStyle = "white";
    contexto.fillText(this.tomClaroCor, posXCentro - 10, posYCentro - 2);
    /****************************************************************/
    var larguraMeioFecho = (raio * BalloonShooter.LARGURA_FECHO) / 2;
    var alturaFecho = (raio * BalloonShooter.ALTURA_FECHO);
    var curvaAlturaFecho = (raio * BalloonShooter.CURVA_FECHO);
    contexto.beginPath();
    contexto.moveTo(posXCentro - 1, fundoBalaoY);
    contexto.lineTo(posXCentro - larguraMeioFecho, fundoBalaoY + alturaFecho);
    contexto.quadraticCurveTo(posXCentro, fundoBalaoY + curvaAlturaFecho, posXCentro + larguraMeioFecho, fundoBalaoY + alturaFecho);
    contexto.lineTo(posXCentro + 1, fundoBalaoY);
    contexto.fill();
}
// Verifica se o ponto clicado esta contido na área do balão
BalloonShooter.Balloon.prototype.verificaColisao = function (x, y)
{
    var raio = this.raio;
    var dx = Math.abs(x - this.posXCentro)
    var dy = Math.abs(y - this.posYCentro)
    var distanciaClique = Math.round((dx + dy) / raio, 2);    
    // alert('dx:' + dx.toString() + 'dy:' + dy.toString() + ' distanciaClique:' + distanciaClique.toString());
    return ((distanciaClique < 13) && (distanciaClique > 10));
}
// Par de cores utilizadas no preenchimento do balão
BalloonShooter.Cor = function (clara, escura)
{
    this.corClara = clara;
    this.corEscura = escura;
}
// constantes
var TAXA_ATUALIZACAO = 1;
var TECLA_PAUSE = 112;
var TEMPO_NOVO_BALAO = 100;
var TAXA_VELOCIDADE = 0.0009;
// variáveis globais
var _context;
var _tela;
var _baloes = new BalloonShooter.Utils.List();
var _fundoCarregado = false;
var _imagemFundo = new Image();
var _estourados = 0;
var _perdidos = 0;
var _timerNovoBalao = 0;
var _acrescimoVelocidade = 0;
var _tempoAtualizado = Date.now();
var _cores = [new BalloonShooter.Cor('rgb(252,139,139)', 'rgb(250, 50, 50)')];
var _executando = true;
var _mostrarMenu = true;
var _mainMenu = null;

function init()
{
    // eventos
    window.onmousedown = mouseDown;
    // window.onkeypress = keyPress;    
    _imagemFundo.onload = function () { _fundoCarregado = true; };
    _tela = document.getElementById('mainCanvas');
    _context = _tela.getContext('2d');
    _imagemFundo.src = "img/sky_bkg.png";
    // Inicia
    window.setInterval(atualiza, TAXA_ATUALIZACAO);
    _mainMenu = null;
}
function atualiza() {
    desenha();
    moveBaloes();
    adicionaBalao();
}
function desenha()
{
    if (_fundoCarregado)
        _context.drawImage(_imagemFundo, 0, 0);

    for (var i = 0; i < _baloes.items.length; i++)
        _baloes.items[i].desenha();
}
function mouseDown(e)
{   
        var indiceEliminar = 0;
        var posx = 0;
        var posy = 0;
        if (!e) var e = window.event;
        if (e.pageX || e.pageY)
        {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY){
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        for (var i = 0; i < _baloes.items.length; i++)
        {
            var balloon = _baloes.items[i];
            if (balloon.verificaColisao(posx, posy))
            {
                alert(balloon.tomClaroCor);
                verificaNotaEstaCerta(balloon.tomClaroCor);
                //_baloes.remove(balloon);   
                indiceEliminar = i;
                i = _baloes.items.length;
            }
        }
        // _baloes.removeAt(indiceEliminar);
}
function adicionaBalao()
{
    _timerNovoBalao++;
    if (_timerNovoBalao == TEMPO_NOVO_BALAO)
    {
        var x = 32 + (Math.random() * (_tela.width - 64));
        var novoBalao = new BalloonShooter.Balloon(_context, x, 700, 30, _cores[0]);
        _baloes.add(novoBalao);
        _timerNovoBalao = 0;
        //_acrescimoVelocidade += TAXA_VELOCIDADE;
    }
}
function geraExercicio()
{
    // TO DO 
}
function moveBaloes()
{
    var agora = Date.now();
    var diferenca = agora - _tempoAtualizado;
    var modificador = diferenca / 800;
    _tempoAtualizado = agora;
    for (var i = 0; i < _baloes.items.length; i++)
    {
        var balloon = _baloes.items[i];
        balloon.posYCentro -= (modificador * balloon.velocidade) + _acrescimoVelocidade;
        if (balloon.posYCentro < -30){
            _baloes.remove(balloon);
            _perdidos++;
        }
    }
}