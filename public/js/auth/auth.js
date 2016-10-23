      var clientId = '582879577010-2apo08kkjvg9mkvpahlnsl8dco915o8m.apps.googleusercontent.com';      
      var apiKey = 'AIzaSyD-coiWmGmWUC2r6eO9fPY2r68FcIYR-8E';      
	  var servicoAuth = 'controller/auth.php';	  
      /* **************************** TENTATIVA DE LOGIN COM GOOGLE.*****************************/
	  var scopes = 'https://www.googleapis.com/auth/plus.me';
      // Use a button to handle authentication the first time.
      function handleClientLoad()
	  {
        gapi.client.setApiKey(apiKey);
        window.setTimeout(checkAuth,1);
      }  
      function checkAuth()
	  {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
      }
      function handleAuthResult(authResult)
	  {
        var authorizeButton = document.getElementById('authorize-button');
        if (authResult && !authResult.error)
		{
			authorizeButton.style.visibility = 'hidden';
			makeApiCall();
        }else{          		  
			authorizeButton.style.visibility = '';
			authorizeButton.onclick = handleAuthClick;		  
        }
      }	  
      function handleAuthClick(event)
	  {
			gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
			return false;
      }      
      function makeApiCall()
	  {
        gapi.client.load('plus', 'v1', function() {
          var request = gapi.client.plus.people.get({
            'userId': 'me'
          });
          request.execute(function(resp)
		  {
            var vs_email = "indisponivel";			
			var vs_descricao = "Usuário não identificado";
			if(resp.verified)
			{			
				if(resp.emails.lenght > 0)			
					vs_email = resp.emails[0].value				 			
				
				vs_descricao = resp.displayName;
			}else{
				alert('Sua conta não está validada no Google Plus.Você poderá jogar e utilizar o sistema, porém recomendamos validá-la para uma melhor experiência.'); 				
			} 
			validaLogin(resp.id,vs_descricao,vs_email);			
          });
        });
      }  
	  /** FUNÇÕES ESPECÍFICAS OUVIDO PERFEITO*/
	  function validaLogin(a_id, a_descricao,a_email) 
	  {
		$.ajax(
		{
			method: "GET",
			url: servicoAuth,
			data: { servico: "login", descricao: a_descricao, id: a_id , email : a_email}
		})
		.done(function()
		{
			window.location = 'resultados.html';
		})
		.fail(function(){
			alert( "Erro na busca do Serviço, contate o desenvolvedor.");
		});		  
	  }	  	  
	  /////////////////////////////////////////////////////////////////////
      function buscaLogin()
	  {
		$.ajax(
		{
			method: "GET",
			url: servicoAuth,
			data: { servico: "buscaLogin"}
		})
		.done(function(result)
		{
			document.getElementById('lblUsuario').innerHTML = result;
			// Esse serviço está em outro Javascript
			buscaRanking();
		})
		.fail(function(){
			alert( "Erro na busca do Serviço, contate o desenvolvedor.");
		});		  
	  }
      /******************************************************************
	    LOGIN DEEZER 
	  */	  
	  function loginDeezer()
	  {
		try{
			DZ.init(
			{
				appId: '156431',
				channelUrl: 'http://ouvidoperfeito.besaba.com/new/informacao.php',
				player:
				{
					onload: loginEfetuado
				}
			});	
		}catch(e){
			alert("Ocorreu um problema, verifique se você tem um login no Deezer.Erro:"+e); 
		}	
	  } 
	  function loginEfetuado()
	  {
		alert('Login Efetuado');		  
	  } 