
import React from 'react';
import { MessageSquare, Shield, Zap, Users, Lock } from 'react-feather';

const HomeView = ({ createRoom, joinRoom, inputRoomCode, setInputRoomCode }) => (
  <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
    <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-blue-600 p-4 rounded-full">
          <MessageSquare className="w-10 h-10 text-white" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">EtherChat</h1>
      <p className="text-center text-gray-600 mb-8">Private peer-to-peer messaging. No servers. No tracking.</p>
      
      <div className="space-y-4">
        <button 
          onClick={createRoom}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
        >
          Create New Room
        </button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <input 
            type="text" 
            placeholder="Enter room code (e.g., ABC-123-XYZ)"
            value={inputRoomCode}
            onChange={(e) => setInputRoomCode(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === 'Enter' && joinRoom()}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={joinRoom}
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Join Room
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="text-center p-3">
          <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-xs text-gray-600 font-medium">End-to-End Encrypted</p>
        </div>
        <div className="text-center p-3">
          <Zap className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-xs text-gray-600 font-medium">Peer-to-Peer Direct</p>
        </div>
        <div className="text-center p-3">
          <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-xs text-gray-600 font-medium">100% Anonymous</p>
        </div>
        <div className="text-center p-3">
          <Lock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-xs text-gray-600 font-medium">No Data Stored</p>
        </div>
      </div>
    </div>
  </div>
);

export default HomeView;