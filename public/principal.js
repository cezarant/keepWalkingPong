$(function() {
  var FADE_TIME = 150; // ms      
  var $window = $(window);  
  var $messages = $('.messages');   
  var $chatPage = $('.chat.page');   
  var username;
  var connected = false;
  var typing = false;
  var lastTypingTime;  
  var bGameAuth = false;  
  var socket = io();
 
  function addParticipantsMessage (data)
  {
    var message = '';
    if (data.numUsers === 1)
	{
      message += "wait other participant";
    } else {
      gameAuth(true); 
	  message += "Game Start!";
    }
    log(message);
  }
  
  socket.on('teste', function (data)
  {
	var $chatPage = $('.chat.page');
	$chatPage.css("background-color","red");	  
  });
  
  
  // If the game is Auth for Start
  function gameAuth(auth)
  {
	  bGameAuth = auth; 
	  if(auth)
		$chatPage.css("background-color","yellow");	
	  else 	
		$chatPage.css("background-color","white");	
  }  
  function ativarMonitoramento()
  {
	$chatPage.show();	
  }  
  
  function sendMessage()
  {
    var message = 'Teste';    
    message = cleanInput(message);    
    if (message && connected)
	{      
      addChatMessage({
        username: username,
        message: message
      });
      // tell server to execute 'new message' and send along one parameter
      socket.emit('new message', message);
    }
  }
  // Log a message
  function log (message, options)
  {
    var $el = $('<li>').addClass('log').text(message);
    addMessageElement($el, options);
  }
  // Adds the visual chat message to the message list
  function addChatMessage (data, options)
  {
	if(bGameAuth)
	{   	  
		// Don't fade the message in if there is an 'X was typing'
		var $typingMessages = getTypingMessages(data);
		options = options || {};
		if ($typingMessages.length !== 0) {
		  options.fade = false;
		  $typingMessages.remove();
		}

		var $usernameDiv = $('<span class="username"/>')
		  .text(data.username)
		  .css('color', '#000000');
		var $messageBodyDiv = $('<span class="messageBody">')
		  .text(data.message);

		var typingClass = data.typing ? 'typing' : '';
		var $messageDiv = $('<li class="message"/>')
		  .data('username', data.username)
		  .addClass(typingClass)
		  .append($usernameDiv, $messageBodyDiv);

		addMessageElement($messageDiv, options);
	}
  }
  // Adds the visual chat typing message
  function addChatTyping (data) 
  {
    data.typing = true;
    data.message = 'is typing';
    addChatMessage(data);
  }
  // Removes the visual chat typing message
  function removeChatTyping (data) {
    getTypingMessages(data).fadeOut(function () {
      $(this).remove();
    });
  }
 
  function addMessageElement (el, options)
  {
    var $el = $(el);    
    if (!options) 
	{
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }  
  function cleanInput (input)
  {
    return $('<div/>').text(input).text();
  }
  /** Up and Down */
  /*****************************************************************************************/
  /** Function to Up the bar */
  function subir()
  {	
	if (connected)    
        socket.emit('subir');
  }
  /** Function to down the bar */
  function descer()
  {
	 if (connected) 	        
        socket.emit('descer');
  }  
  /*****************************************************************************************/    
  function getTypingMessages (data) 
  {
    return $('.typing.message').filter(function (i) {
      return $(this).data('username') === data.username;
    });
  }    
   
  socket.on('login', function (data)
  {
    alert('Chegou usuário'); 
	connected = true;
    // Display the welcome message
    /*var message = "Welcome to Socket.IO Chat – ";
    log(message, {
      prepend: true
    });
    addParticipantsMessage(data);*/
  });

  // Whenever the server emits 'new message', update the chat body
  socket.on('new message', function (data)
  {
    addChatMessage(data);
  });

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', function (data)
  {    
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', function (data) {
    log(data.username + ' left');
    addParticipantsMessage(data);
    removeChatTyping(data);
	gameAuth(false); 
  });
  /****************************************************************/
  /** Socket functions  */
  socket.on('subir', function (data)
  {
     alert('Subir!'); 
	 // alteraStatus(data,'Subindo barra'); 
  });  
  socket.on('descer', function (data)
  {
	  alert('Descer!');     
	//alteraStatus(data,'Descendo barra'); 
  });
  function alteraStatus(data,statusOfBar) 
  {    
    data.message = statusOfBar;
    addChatMessage(data);
  }      
});
