const VoiceMessage = ({ audioData, filter, isPlaying, onPlay, onPause }) => {
  return (
    <div className="voice-message">
      <audio src={audioData} controls onPlay={onPlay} onPause={onPause}>
        Your browser does not support the audio element.
      </audio>
      <div className="voice-filter">
        <span>Filter: {filter}</span>
      </div>
    </div>
  );
};

export default VoiceMessage;