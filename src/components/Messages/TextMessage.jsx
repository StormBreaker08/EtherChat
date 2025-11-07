const TextMessage = ({ content, isSent, timestamp }) => {
  return (
    <div className={`message ${isSent ? 'sent' : 'received'}`}>
      <p>{content}</p>
      <span className="timestamp">{new Date(timestamp).toLocaleTimeString()}</span>
    </div>
  );
};

export default TextMessage;