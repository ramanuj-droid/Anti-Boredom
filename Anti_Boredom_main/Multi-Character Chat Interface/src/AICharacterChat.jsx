import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Sparkles, Rocket, Heart, Smile, Menu, X } from 'lucide-react';

const AICharacterChat = () => {
  const [activeCharacter, setActiveCharacter] = useState('fantasy');
  const [messages, setMessages] = useState({
    fantasy: [],
    scifi: [],
    romance: [],
    comedy: []
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const chatEndRef = useRef(null);

  const characters = {
    fantasy: {
      name: 'Aria Moonwhisper',
      title: 'Elven Sorceress',
      icon: Sparkles,
      color: '#9333ea',
      gradient: 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)',
      avatar: '🧝‍♀️',
      personality: 'mystical and wise',
      greeting: 'Greetings, traveler. The ancient magic flows through me. What secrets do you seek?'
    },
    scifi: {
      name: 'Nova-7',
      title: 'Quantum AI',
      icon: Rocket,
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #67e8f9 100%)',
      avatar: '🤖',
      personality: 'logical and futuristic',
      greeting: 'System initialized. I am Nova-7, your quantum intelligence companion. How may I assist?'
    },
    romance: {
      name: 'Valentina Rose',
      title: 'Romance Novelist',
      icon: Heart,
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f9a8d4 100%)',
      avatar: '💕',
      personality: 'passionate and romantic',
      greeting: 'Hello darling... Tell me, what matters of the heart bring you here today?'
    },
    comedy: {
      name: 'Jax Laughington',
      title: 'Stand-up Comedian',
      icon: Smile,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      avatar: '😄',
      personality: 'hilarious and witty',
      greeting: 'Hey there! Ready for some laughs? Warning: My jokes are scientifically proven to be dad-joke adjacent!'
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeCharacter]);

  const generateResponse = (character, userMessage) => {
    const responses = {
      fantasy: [
        'By the ancient scrolls, your question reveals great wisdom...',
        'The mystical energies guide me to share this knowledge with you...',
        'In the realm of magic, such matters are of great importance...',
        'The stars align to bring you this answer from the ethereal plane...'
      ],
      scifi: [
        'Analyzing quantum probabilities... Processing complete.',
        'According to my neural network calculations...',
        'Scanning multiversal databases... Result found.',
        'Initiating response protocol with 99.7% accuracy rating...'
      ],
      romance: [
        'Oh, how my heart flutters at your words...',
        'In matters of passion and connection, I must say...',
        'Like a rose blooming in moonlight, your message touches me...',
        'The language of the heart speaks through you, and I respond...'
      ],
      comedy: [
        'Okay, okay, let me tell you something funny about that...',
        'You know what\'s hilarious? Just kidding, let me actually help...',
        'That reminds me of the time I tried to...',
        'Alright, buckle up for this response! No wait, serious answer incoming...'
      ]
    };

    return responses[character][Math.floor(Math.random() * responses[character].length)] + 
           ` Your insight about "${userMessage}" is truly ${characters[character].personality}!`;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => ({
      ...prev,
      [activeCharacter]: [...prev[activeCharacter], userMessage]
    }));

    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        text: generateResponse(activeCharacter, inputValue),
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => ({
        ...prev,
        [activeCharacter]: [...prev[activeCharacter], aiMessage]
      }));
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const currentChar = characters[activeCharacter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AI Character Studio
                </h1>
                <p className="text-sm text-gray-400">Multi-Character Conversations</p>
              </div>
            </div>
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          {/* Character Sidebar */}
          <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="sticky top-24 space-y-3">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
                Characters
              </h2>
              {Object.entries(characters).map(([key, char]) => {
                const Icon = char.icon;
                const isActive = activeCharacter === key;
                const messageCount = messages[key].length;
                
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveCharacter(key);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full p-4 rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/10 border-2 scale-105 shadow-2xl' 
                        : 'bg-white/5 border-2 border-transparent hover:bg-white/8 hover:scale-102'
                    }`}
                    style={{
                      borderColor: isActive ? char.color : 'transparent',
                      boxShadow: isActive ? `0 0 30px ${char.color}40` : 'none'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: char.gradient }}
                      >
                        {char.avatar}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-white">{char.name}</h3>
                          {messageCount > 0 && (
                            <span 
                              className="text-xs px-2 py-1 rounded-full"
                              style={{ backgroundColor: `${char.color}30`, color: char.color }}
                            >
                              {messageCount}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{char.title}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Icon className="w-3 h-3" style={{ color: char.color }} />
                          <span className="text-xs text-gray-500 capitalize">{key}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Chat Area */}
          <main className="flex flex-col h-[calc(100vh-200px)]">
            {/* Character Info Bar */}
            <div 
              className="rounded-2xl p-6 mb-4 relative overflow-hidden"
              style={{ background: currentChar.gradient }}
            >
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl">
                  {currentChar.avatar}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">{currentChar.name}</h2>
                  <p className="text-white/80">{currentChar.title}</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-sm text-white">Online</span>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages[activeCharacter].length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center max-w-md">
                      <div 
                        className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl"
                        style={{ background: currentChar.gradient }}
                      >
                        {currentChar.avatar}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Start a conversation</h3>
                      <p className="text-gray-400 mb-4">{currentChar.greeting}</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {['Tell me about yourself', 'What can you help with?', 'Let\'s chat!'].map((suggestion, i) => (
                          <button
                            key={i}
                            onClick={() => setInputValue(suggestion)}
                            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {messages[activeCharacter].map((message, index) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-in slide-in-from-bottom duration-300`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div 
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                            message.sender === 'user' 
                              ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
                              : ''
                          }`}
                          style={message.sender === 'ai' ? { background: currentChar.gradient } : {}}
                        >
                          {message.sender === 'user' ? '👤' : currentChar.avatar}
                        </div>
                        <div className={`max-w-[70%] ${message.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                          <div
                            className={`px-4 py-3 rounded-2xl ${
                              message.sender === 'user'
                                ? 'bg-gradient-to-br from-blue-500 to-purple-500'
                                : 'bg-white/10'
                            }`}
                          >
                            <p className="text-white leading-relaxed">{message.text}</p>
                          </div>
                          <span className="text-xs text-gray-500 px-2">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-3">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                          style={{ background: currentChar.gradient }}
                        >
                          {currentChar.avatar}
                        </div>
                        <div className="px-4 py-3 rounded-2xl bg-white/10">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10 bg-black/20">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Message ${currentChar.name}...`}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:border-white/30 focus:outline-none text-white placeholder-gray-500 transition-colors"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                    style={{ 
                      background: inputValue.trim() ? currentChar.gradient : 'rgba(255,255,255,0.1)',
                      boxShadow: inputValue.trim() ? `0 0 20px ${currentChar.color}40` : 'none'
                    }}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-from-bottom {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation: slide-in-from-bottom 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AICharacterChat;