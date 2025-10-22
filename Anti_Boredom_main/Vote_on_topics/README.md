# Vote on Topics

A modern, interactive voting application built with React, Vite, TypeScript, and Tailwind CSS. Users can vote on various topics including Food, Technology, Memes, Politics, and Geography.

![Vote on Topics](https://img.shields.io/badge/React-18.3.1-blue) ![Vite](https://img.shields.io/badge/Vite-Latest-purple) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-cyan)

## 🚀 Features

- **5 Topic Categories**: Food, Technology, Memes, Politics, and Geography
- **20 Questions per Topic**: Each category contains 20 carefully curated questions
- **Interactive Voting**: Click on options to cast your vote
- **Real-time Results**: See vote percentages immediately after voting
- **Progress Tracking**: Visual progress bar shows how many questions you've answered
- **Local Storage**: All votes are saved locally in your browser
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradients, smooth animations, and hover effects
- **Navigation**: Easy navigation between questions with Previous/Next buttons

## 📋 Topics & Questions

### 🍔 Food (20 questions)
Vote on your favorite foods, cuisines, desserts, and more! Questions include favorites like:
- Fast food preferences
- Breakfast choices
- Dessert selections
- Cooking methods
- And 16 more food-related questions!

### 💻 Technology (20 questions)
Share your tech preferences on:
- Smartphone brands
- Operating systems
- Programming languages
- Social media platforms
- And 16 more tech-related questions!

### 😂 Memes (20 questions)
Pick your favorite internet culture moments:
- Classic memes
- Meme formats
- Reaction memes
- TikTok trends
- And 16 more meme-related questions!

### 🗳️ Politics (20 questions)
Express your political opinions on:
- Government systems
- Economic policies
- Healthcare approaches
- Environmental policies
- And 16 more political questions!

### 🌍 Geography (20 questions)
Vote on locations around the world:
- Favorite cities
- Natural wonders
- Continents
- Landmarks
- And 16 more geography questions!

## 🛠️ Technology Stack

- **React 18.3.1**: Modern React with hooks and functional components
- **Vite**: Lightning-fast build tool and dev server
- **TypeScript**: Type-safe code for better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Router DOM**: Client-side routing
- **Shadcn/ui**: Beautiful, accessible component library
- **Lucide React**: Modern icon library
- **Sonner**: Toast notifications for user feedback
- **Local Storage**: Browser storage for vote persistence

## 📁 Project Structure

```
vote-on-topics/
├── src/
│   ├── components/
│   │   ├── ui/              # Shadcn UI components
│   │   ├── TopicCard.tsx    # Topic selection card component
│   │   └── OptionCard.tsx   # Voting option card with progress bar
│   ├── data/
│   │   └── questions.ts     # All questions for all topics (100 total)
│   ├── pages/
│   │   ├── Home.tsx         # Home page with topic selection
│   │   ├── Vote.tsx         # Voting page with questions
│   │   └── NotFound.tsx     # 404 error page
│   ├── types/
│   │   └── vote.ts          # TypeScript type definitions
│   ├── utils/
│   │   └── storage.ts       # Local storage utilities
│   ├── App.tsx              # Main app component with routing
│   ├── index.css            # Global styles and design tokens
│   └── main.tsx             # App entry point
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── package.json             # Dependencies and scripts
```

## 🎨 Design System

The app uses a carefully crafted design system with:

### Color Palette
- **Primary**: Purple gradient (HSL 265, 85%, 58%)
- **Secondary**: Pink gradient (HSL 320, 90%, 65%)
- **Accent**: Orange (HSL 35, 100%, 62%)
- **Background**: Light purple gradient
- **Option Colors**: 4 distinct colors for voting options

### Animations
- **fade-in**: Smooth entrance animations
- **scale-in**: Gentle scaling effect
- **fill-bar**: Animated progress bars
- **hover effects**: Interactive hover states

### Components
- **TopicCard**: Displays topic with emoji, name, and description
- **OptionCard**: Shows voting option with image, name, and percentage bar
- **Progress Bar**: Tracks question completion
- **Navigation Buttons**: Previous/Next question navigation

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vote-on-topics
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 💾 Data Storage

All votes are stored in the browser's local storage using a structured format:

```typescript
{
  votes: [
    {
      questionId: 'food-1',
      selectedOptionId: 'f1-2'
    },
    // ... more votes
  ]
}
```

- Votes persist across browser sessions
- Each question can only have one vote
- Previous votes are automatically overwritten
- No backend required - everything runs client-side


## 🧪 Testing

The app includes:
- TypeScript for type safety
- ESLint for code quality
- Responsive design testing across devices

