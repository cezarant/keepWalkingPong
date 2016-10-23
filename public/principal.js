$(function() {
  var FADE_TIME = 150; // ms  
  var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

  // Initialize variables
  var $window = $(window);
  var $usernameInput = $('#txtLogin'); // Input for username
  var $messages = $('.messages'); // Messages area
 
  var $btnSubir = $('#btnSubir');
  var $btnDescer = $('#btnDescer');

  var $loginPage = $('.login.page'); // The login page
  var $chatPage = $('.chat.page'); // The chatroom page
  // Prompt for setting a username
  var username;
  var connected = false;
  var typing = false;
  var lastTypingTime;
  var $currentInput = $usernameInput.focus();

  var socket = io();

  function addParticipantsMessage (data) {
    var message = '';
    if (data.numUsers === 1) {
      message += "there's 1 participant";
    } else {
      message += "there are " + data.numUsers + " participants";
    }
    log(message);
  }

  function ativarMonitoramento()
  {
	$chatPage.show();	  
	$loginPage.fadeOut();
  }  
  // Sets the client's username
  function setUsername() {
    username = cleanInput($usernameInput.val().trim());    
    if (username) 
	{
      $loginPage.fadeOut();
      
      $loginPage.off('click');      
      socket.emit('add user', username);
    }
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
    // Don't fade the message in if there is an 'X was typing'
    var $typingMessages = getTypingMessages(data);
    options = options || {};
    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }

    var $usernameDiv = $('<span class="username"/>')
      .text(data.username)
      .css('color', getUsernameColor(data.username));
    var $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message);

    var typingClass = data.typing ? 'typing' : '';
    var $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($usernameDiv, $messageBodyDiv);

    addMessageElement($messageDiv, options);
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
  function getUsernameColor (username) 
  {
    // Compute hash code
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
       hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }
  
  $window.keydown(function (event) 
  {
    // Auto-focus the current input when a key is typed
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }
    }
  });

  $btnSubir.on('click',function()
  {
	subir();  
  });
  
  $btnDescer.on('click',function()
  {
	descer();  
  });
  
  $loginPage.click(function() 
  {
    $currentInput.focus();
  });
  
  socket.on('login', function (data)
  {
    connected = true;
    // Display the welcome message
    var message = "Welcome to Socket.IO Chat – ";
    log(message, {
      prepend: true
    });
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'new message', update the chat body
  socket.on('new message', function (data)
  {
    addChatMessage(data);
  });

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', function (data) {
    log(data.username + ' joined');
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', function (data) {
    log(data.username + ' left');
    addParticipantsMessage(data);
    removeChatTyping(data);
  });
  /****************************************************************/
  /** Socket functions  */
  socket.on('subir', function (data)
  {
     alteraStatus(data,'Subindo barra'); 
  });  
  socket.on('descer', function (data)
  {
    alteraStatus(data,'Descendo barra'); 
  });
  function alteraStatus(data,statusOfBar) 
  {    
    data.message = statusOfBar;
    addChatMessage(data);
  }
  // Removes the visual chat typing message
  function mostraDescendo(data) 
  {
    getTypingMessages(data).fadeOut(function () {
      $(this).remove();
    });
  }  
  /****************************************************************/
  
  socket.on('typing', function (data)
  {
    addChatTyping(data);
  });
  
  socket.on('stop typing', function (data) {
    removeChatTyping(data);
  });
});
