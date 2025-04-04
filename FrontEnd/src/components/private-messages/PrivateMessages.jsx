import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';
import ConversationList from './ConversationList';
import MessageThread from './MessageThread';

// Composant principal pour la messagerie privée
// Permet de visualiser et interagir avec les conversations privées
function PrivateMessages() {
  const { user } = useContext(AppContext);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Chargement initial des conversations (simulé)
  useEffect(() => {
    setTimeout(() => {
      setConversations([
        { id: 1, with: 'John Doe', lastMessage: 'Hello there!', unread: 2 },
        { id: 2, with: 'Jane Smith', lastMessage: 'See you tomorrow', unread: 0 },
        { id: 3, with: 'Mike Johnson', lastMessage: 'Thanks for your help', unread: 1 }
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Sélectionne une conversation et marque ses messages comme lus
  const handleSelectConversation = (id) => {
    setSelectedConversation(id);
    
    // Marquer la conversation comme lue
    setConversations(conversations.map(conv => 
      conv.id === id ? { ...conv, unread: 0 } : conv
    ));
  };
  
  // Gestionnaire pour envoyer un nouveau message
  const handleSendMessage = (text) => {
    // Dans une vraie application, vous enverriez le message à une API
    console.log(`Sending message to conversation ${selectedConversation}: ${text}`);
  };
  
  return (
    <div className="private-messages">
      <h2>Private Messages</h2>
      
      <div className="private-messages-container">
        <ConversationList 
          conversations={conversations} 
          loading={loading}
          selectedId={selectedConversation} 
          onSelect={handleSelectConversation} 
        />
        
        {selectedConversation ? (
          <MessageThread 
            conversationId={selectedConversation} 
            onSendMessage={handleSendMessage} 
          />
        ) : (
          <div className="no-conversation-selected">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PrivateMessages;