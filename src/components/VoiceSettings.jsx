import React from "react";

export default function VoiceSettings(props) {
  // accept multiple prop name variants to avoid caller breakage
  const isOpen = props.showVoiceSettings ?? props.isOpen ?? false;
  const setOpen = props.setShowVoiceSettings || props.onClose || (() => {});
  const selected = (props.selectedVoiceFilter ?? props.selected) || null;
  const setSelected = props.setSelectedVoiceFilter || props.onSelect || (() => {});

  if (!isOpen) return null;

  return (
    <div className="voice-settings">
      <h3>Voice Filters</h3>
      <div className="filters">
        {["clean", "robot", "alien", "none"].map((f) => (
          <button
            key={f}
            onClick={() => setSelected(f)}
            className={f === selected ? "active" : ""}
          >
            {f}
          </button>
        ))}
      </div>
      <button onClick={() => setOpen(false)}>Close</button>
    </div>
  );
}