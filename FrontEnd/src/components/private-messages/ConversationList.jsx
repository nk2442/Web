import ConversationItem from './ConversationItem';

// Liste des conversations privées
// Affiche les différentes conversations de l'utilisateur
function ConversationList({ conversations, loading, selectedId, onSelect }) {
  // Affiche un indicateur de chargement si nécessaire
  if (loading) {
    return <div className="loading">Loading conversations...</div>;
  }
  
  return (
    <div className="conversation-list">
      <h3>Your Conversations</h3>
      
      {conversations.length === 0 ? (
        <p>No conversations yet</p>
      ) : (
        <ul>
          {conversations.map(conversation => (
            <ConversationItem 
              key={conversation.id} 
              conversation={conversation} 
              isSelected={selectedId === conversation.id}
              onClick={() => onSelect(conversation.id)} 
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ConversationList;