// src/components/WaitingView.jsx
import React from 'react';
import { Copy, Check, Share2 } from 'react-feather';

const WaitingView = ({ roomCode, copyRoomCode, shareRoom, copySuccess }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Waiting for Connection...</h2>
          <p className="text-gray-600 text-center mb-6">Share this room code to start chatting</p>
          
          <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
            <p className="text-xs text-gray-600 mb-2 text-center font-medium">ROOM CODE</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-mono font-bold text-blue-600">{roomCode}</span>
              <button 
                onClick={copyRoomCode}
                className="p-3 hover:bg-white rounded-lg transition relative"
              >
                {copySuccess ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5 text-blue-600" />
                )}
              </button>
            </div>
          </div>

          <div className="w-full space-y-3">
            <button 
              onClick={shareRoom}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              <Share2 className="w-4 h-4" />
              Share Room Link
            </button>

            <button 
              onClick={() => { /* Logic to go back */ }}
              className="w-full text-gray-600 hover:text-gray-800 transition py-2"
            >
              Cancel & Go Back
            </button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200 w-full">
            <p className="text-xs text-yellow-800 text-center">
              💡 Your peer needs to enter this code to connect with you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingView;