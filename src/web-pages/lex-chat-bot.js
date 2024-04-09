import React, { useState } from 'react';
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1', // Update with your AWS region
  credentials: new AWS.Credentials(
    {
        accessKeyId: 'ASIAZI2LIZICDCU2R3H6', // Update with your access key ID
        secretAccessKey: 'hYaebq98EUDhNLNhp9I5wvAdq+OcLfe9M8kCGut6', // Update with your secret access key
        sessionToken: 'IQoJb3JpZ2luX2VjEOX//////////wEaCXVzLXdlc3QtMiJHMEUCIQD+a/M1ZN9yHKetj0GLE4xj2p22IQpGQdJ1S1VgVtiXnwIgbxcNhQuQh9l8w1EpHKczTbYjJU+EVMeJ1OWS7JlQJIkqqQIIHhAAGgw2Mzc0MjM2MzQ5NDgiDKpioWqmSHNd01vKXSqGAmBS+Ecu4LORuNYCHQd0eI6JmwkTZgfP5EcjslX1YLbfWWdU9+XdWk1NB4wev6nvnPvbfVYB5F/yKFicN7+e6c5CKCBIkEZ16NjGx95rRnWtHxShVxSKYHp6iTwCGnI0qKbGOjyv7MJSeSomArKE1MDbbRLZz7fppnaXFnrlfTu1XXRHnxtuLsK3M4fPhoz1aOwN4nuR39QW5rowXIbDCU1NZN2Fs9pRrcKpqG7mZlszkwYYAVOBGq02sHgwNKkwFF3OhbMNaQrpgnvZFbJbZswqikT7RsMRoGKv6nxcAsCuSSbW9HX3JjniAym4jo5UM+8ooKnp9O1b4TmkNa0IWlllzPlreiUwh9rWsAY6nQGQnTD8uob4Svl31p2rGxvJP9Z8Ra9TU9onycjPbcbnAJRiokyinGlPIau4YmnU1ePyJQp7E57/PmvqzLcyctdmFbpDeJSOlQQhevcuhFzkyLZAZsJuzgy599hWS+uJpVmnd5SSXvX6QK/3V7XqcRIXhoyPSqiDRAIolYEYvSym9ac/JAt8BxdDne7NPNIy1WvuGREqKeMZz2+SU6Tp' // Use the access token as the session token
    }), // Update with your IAM credentials
});

const lexruntime = new AWS.LexRuntime();

const LexChatbot = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessages = [...messages, { content: inputText, sender: 'user' }];
    setMessages(newMessages);
    setInputText('');

    const params = {
      botAlias: 'jobnestchatbot', // Update with your bot alias
      botName: 'JobNestRepo', // Update with your bot name
      inputText: inputText,
      userId: 'USER_ID', // Optional, but you should have some way to uniquely identify users
    };

    try {
      const response = await lexruntime.postText(params).promise();
      const botMessage = response.message;
      const newMessagesWithBot = [...newMessages, { content: botMessage, sender: 'bot' }];
      setMessages(newMessagesWithBot);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index} style={{ textAlign: message.sender === 'bot' ? 'left' : 'right', margin: '5px' }}>
            <span style={{ backgroundColor: message.sender === 'bot' ? '#f0f0f0' : '#007bff', padding: '5px 10px', borderRadius: '10px', color: message.sender === 'bot' ? '#000' : '#fff' }}>
              {message.content}
            </span>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          style={{ width: '100%', padding: '10px', marginTop: '10px' }}
        />
        <button onClick={sendMessage} style={{ marginTop: '10px' }} className='btn button-style'>Send</button>
      </div>
    </div>
  );
};

export default LexChatbot;