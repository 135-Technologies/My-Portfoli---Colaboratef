const na_me = prompt("Enter Name");
var messageInput = document.getElementById('message-input');
var audioInput = document.getElementById('audio-input');
var muda = new Date();
var hou = muda.getHours;
window.onload = function () {
  // Set the focus on the input element
  messageInput.focus();
  messageInput.value = na_me + ": ";
};
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD4lx6Je-fD-DdBYCm8NqNoo_ShE5qZdTs",
    authDomain: "nale-bc514.firebaseapp.com",
    databaseURL: "https://nale-bc514-default-rtdb.firebaseio.com",
    projectId: "nale-bc514",
    storageBucket: "nale-bc514.appspot.com",
    messagingSenderId: "577549937802",
    appId: "1:577549937802:web:5008463f47f321fb139173",
    measurementId: "G-9BQ5L3ZC16"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  
  // Reference to the Firebase database
  var database = firebase.database();
  
  // Reference to the chat messages
  var chatMessagesRef = database.ref('chatMessages');
  // Function to send a message
  function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var audioInput = document.getElementById('audio-input');
     var lesh = na_me;
  
    var message = messageInput.value.trim();
    var audioFile = audioInput.files[0];
  
    if (message !== '' || audioFile) {
      var timestamp = Date.now();
      var data = {
        message: message,
        timestamp: timestamp
      };
  
      // Upload audio file if available
      if (audioFile) {
        var storageRef = firebase.storage().ref('audio/' + timestamp);
        var task = storageRef.put(audioFile);
  
        task.on('state_changed',
          function progress(snapshot) {
            // Handle progress
          },
          function error(err) {
            console.error('Error uploading audio:', err);
          },
          function complete() {
            // Get the audio file URL after upload completes
            storageRef.getDownloadURL().then(function (audioUrl) {
              data.audioUrl = audioUrl;
              chatMessagesRef.push(data);
            });
          }
        );
      } else {
        chatMessagesRef.push(data);
      }
  
      // Clear input fields
      messageInput.value = lesh + ': >> ' ;
      audioInput.value = '';
    }
  }
  
  // Display chat messages in real-time
  chatMessagesRef.on('child_added', function (snapshot) {
    var messageData = snapshot.val();
    displayMessage(messageData);
  });
  
  // Function to display a message
  function displayMessage(data) {
    var chatMessages = document.getElementById('chat-messages');
    var messageDiv = document.createElement('div');
    messageDiv.className = 'message';
  
    var messageContent = '<p>' + (data.message || '') + '</p>';
    if (data.audioUrl) {
      messageContent += '<audio controls><source src="' + data.audioUrl + '" type="audio/mpeg"></audio>';
    }
  
    messageDiv.innerHTML = messageContent;
    chatMessages.appendChild(messageDiv);
    // Scroll to the bottom of the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
 

  // Execute a function when the user presses a key on the keyboard
window.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("lesh").click();
  }
});
