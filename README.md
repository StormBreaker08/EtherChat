# WebRTC Chat Application

This project is a WebRTC-based chat application that allows users to communicate anonymously through text and voice messages. The application is designed to be peer-to-peer, ensuring that no data is stored on servers and that all communications are encrypted.

## Features

- **Anonymous Messaging**: Users can create or join chat rooms without revealing their identities.
- **Text and Voice Messaging**: Supports both text messages and voice recordings with real-time voice filters.
- **End-to-End Encryption**: All messages are encrypted to ensure privacy.
- **Peer-to-Peer Connection**: Utilizes WebRTC for direct communication between users.

## Project Structure

```
webrtc-chat-app
├── src
│   ├── components
│   │   ├── HomeView.jsx
│   │   ├── WaitingView.jsx
│   │   ├── ChatView.jsx
│   │   ├── MessageInput.jsx
│   │   ├── VoiceSettings.jsx
│   │   └── Messages
│   │       ├── MessageList.jsx
│   │       ├── TextMessage.jsx
│   │       ├── VoiceMessage.jsx
│   │       └── SystemMessage.jsx
│   ├── hooks
│   │   └── useWebRTC.js
│   ├── utils
│   │   └── webrtc.js
│   ├── constants
│   │   └── voiceFilters.js
│   ├── context
│   │   └── WebRTCContext.js
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd webrtc-chat-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

## Usage

- Create a new room or join an existing one using the room code.
- Send text messages or record voice messages using the provided interface.
- Adjust voice settings to apply different filters to your voice messages.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.