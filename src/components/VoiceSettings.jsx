import React from 'react';
import { useState } from 'react';
import { voiceFilters } from '../constants/voiceFilters';

const VoiceSettings = ({ selectedVoiceFilter, setSelectedVoiceFilter }) => {
  return (
    <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <span className="w-4 h-4" />
            Voice Filter Settings
          </h3>
          <button 
            onClick={() => setShowVoiceSettings(false)}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Close
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {voiceFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedVoiceFilter(filter.id)}
              className={`p-4 rounded-lg border-2 transition text-left ${
                selectedVoiceFilter === filter.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-1">{filter.icon}</div>
              <div className="font-medium text-sm text-gray-800">{filter.label}</div>
              <div className="text-xs text-gray-500">{filter.desc}</div>
            </button>
          ))}
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            💡 Voice filters protect your identity by modifying your voice characteristics in real-time
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceSettings;