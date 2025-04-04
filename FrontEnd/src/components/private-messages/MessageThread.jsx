import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';

// Fil de messages d'une conversation privée
// Affiche les messages échangés entre deux utilisateurs
function MessageThread({ conversationId, onSendMessage }) {
  const { user } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  
  // Chargement des messages de la conversation (simulé)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setMessages([
        { id: 1, senderId: 'otherUser', text: 'Hi there!', timestamp: '2024-04-01T10:30:00' },
        { id: 2, senderId: user.login, text: 'Hello, how are you?', timestamp: '2024-04-01T10:31:00' },
        { id: 3, senderId: 'otherUser', text: 'I\'m doing well, thanks for asking', timestamp: '2024-04-01T10:33:00' }
      ]);
      setLoading(false);
    }, 800);
  }, [conversationId, user.login]);
  
  // Gestionnaire pour l'envoi d'un nouveau message
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Ajout du nouveau message au fil de conversation
    const messageData = {
      id: Date.now(),
      senderId: user.login,
      text: newMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, messageData]);
    onSendMessage(newMessage);
    setNewMessage('');
  };
  
  // Formatage de l'heure des messages
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Affichage d'un indicateur de chargement si nécessaire
  if (loading) {
    return <div className="loading">Loading messages...</div>;
  }
  
  return (
    <div className="message-thread">
      {/* Affichage des messages */}
      <div className="thread-messages">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`thread-message ${message.senderId === user.login ? 'sent' : 'received'}`}
          >
            <div className="message-content">{message.text}</div>
            <div className="message-time">{formatTime(message.timestamp)}</div>
          </div>
        ))}
      </div>
      
      {/* Formulaire pour envoyer un nouveau message */}
      <form className="thread-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default MessageThread;