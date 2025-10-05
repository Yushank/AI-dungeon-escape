# 🎮 Dungeon Escape - AI-Powered Text Adventure

![Retro Gaming Style](https://img.shields.io/badge/Style-Retro_Console-green)
![AI Powered](https://img.shields.io/badge/AI-Cerebras_LLM-blue)
![React TypeScript](https://img.shields.io/badge/Stack-React_TypeScript-61dafb)

A retro-styled text adventure game where players must escape a mysterious dungeon through clever choices and puzzle-solving. Powered by Cerebras AI for dynamic storytelling.

## 🎯 Live Demo

_(Add your deployment link here)_

## ✨ Features

- **🤖 AI-Driven Storytelling**: Cerebras LLM generates unique dungeon adventures
- **🎮 Retro Console Aesthetic**: Pixel art style with CRT scanlines
- **⏰ Time-Based Challenge**: 5-minute countdown to escape
- **🔀 Multiple Endings**: Win or lose based on your choices
- **⌨️ Dual Input Methods**: Click options or type custom actions
- **💾 Session Management**: Persistent game state across turns

## 🏗️ Architecture

```
src/
├── components/           # React Components
│   ├── gameWindow.tsx   # Main game interface
│   ├── sceneDisplay.tsx # Story text with typing effect
│   ├── optionWindow.tsx # Interactive choice cards
│   ├── cards.tsx        # Individual option buttons
│   ├── timer.tsx        # Countdown timer with progress
│   └── inputComp.tsx    # Custom text input
├── context/
│   └── GameContext.tsx  # Global game state management
├── pages/
│   ├── home.tsx         # Landing page
│   └── game.tsx         # Game page
backend/
├── routes/
│   └── index.ts         # Express API routes
└── utils/
    └── cerebras.ts      # AI integration
```

## 🚀 How to Play

1. **Start**: Begin trapped in a mysterious dungeon
2. **Explore**: Choose from AI-generated options or type custom actions
3. **Solve**: Find clues, solve puzzles, and avoid dangers
4. **Escape**: Complete the adventure within 5 minutes and 15 turns
5. **Win/Lose**: Multiple endings based on your choices

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 16+
- Cerebras API Key

### Frontend Setup

```bash
# Clone repository
git clone <your-repo-url>
cd dungeon-escape

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Set environment variables
echo "CEREBRAS_API_KEY=your_api_key_here" > .env

# Start backend server
npm run dev
```

## 🔧 Configuration

### Cerebras API Setup

1. Get your API key from [Cerebras Cloud](https://cloud.cerebras.ai)
2. Add to backend `.env` file:

```env
CEREBRAS_API_KEY=csk-your-api-key-here
```

### Game Customization

Edit `SYSTEM_PROMPT` in `cerebras.ts` to modify:

- Game difficulty
- Story tone
- Puzzle complexity
- Win/lose conditions

## 🎮 Game Components

### Scene Display

- Retro terminal-style display
- Typewriter text effect
- White pixel font on black background

### Option Cards

- Fixed-size retro buttons
- Numbered choices (1-2)
- Hover animations and sound effects

### Timer System

- 5-minute countdown
- Color-coded warnings (green → yellow → red)
- Visual progress bar

### Input System

```typescript
// Option selection
await axios.post(`${BACKEND_URL}/api/v1/input`, {
  choice: text,
  sessionId: sessionId,
});

// Custom actions
await axios.post(`${BACKEND_URL}/api/v1/input`, {
  choice: userInput,
  sessionId: sessionId,
});
```

## 🔌 API Endpoints

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| `POST` | `/api/v1/input`       | Submit player choice |
| `POST` | `/api/v1/reset`       | Reset game session   |
| `GET`  | `/api/v1/session/:id` | Get session info     |

## 🤖 AI Integration

The game uses Cerebras Llama 3.1 8B model with custom prompts:

```typescript
const SYSTEM_PROMPT = `You are a dungeon master for an ESCAPE ROOM adventure...
// Critical rules for game balance and player experience
`;
```

**AI Responsibilities:**

- Generate atmospheric scenes
- Create meaningful choices
- Track game progression
- Determine win/lose conditions
- Maintain story consistency

## 🎨 Styling & Theme

- **Font**: Press Start 2P (pixel style)
- **Colors**: Retro terminal (green, amber, white on black)
- **Effects**: CRT scanlines, typewriter animation
- **Layout**: Centered console with side timer

## 🔄 Game Flow

1. **Initialization**: Create session with unique ID
2. **First Turn**: AI generates opening scene
3. **Player Input**: Choose option or type action
4. **AI Processing**: Generate next scene based on choice
5. **State Update**: Update timer, turn count, game status
6. **Repeat**: Until win/lose or time expires

## 🏆 Winning Strategies

- Explore thoroughly but efficiently
- Pay attention to environmental clues
- Manage your time (5-minute limit)
- Think logically about puzzles
- Take calculated risks

## 🐛 Troubleshooting

**Common Issues:**

- "No game data detected" → Check backend connection
- Options not appearing → Verify Cerebras API key
- Timer not starting → Check GameContext initialization

## 📈 Future Enhancements

- [ ] Sound effects and background music
- [ ] Save/load game functionality
- [ ] Multiple dungeon themes
- [ ] Achievement system
- [ ] Mobile responsiveness improvements

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Cerebras for AI API access
- React & TypeScript communities
- Retro gaming inspiration

---

**Ready to escape?** The dungeon awaits your courage and wits! 🗝️
