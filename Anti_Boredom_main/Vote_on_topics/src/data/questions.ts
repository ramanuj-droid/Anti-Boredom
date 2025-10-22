import { Question, Topic } from '@/types/vote';

export const topicInfo: Record<Topic, { name: string; emoji: string; description: string }> = {
  food: {
    name: 'Food',
    emoji: '🍔',
    description: 'Vote on your favorite foods and cuisines',
  },
  technology: {
    name: 'Technology',
    emoji: '💻',
    description: 'Choose the best tech products and innovations',
  },
  meme: {
    name: 'Memes',
    emoji: '😂',
    description: 'Pick the funniest memes and internet culture',
  },
  politics: {
    name: 'Politics',
    emoji: '🗳️',
    description: 'Share your political preferences and opinions',
  },
  geography: {
    name: 'Geography',
    emoji: '🌍',
    description: 'Vote on countries, cities, and landmarks',
  },
};

export const questions: Record<Topic, Question[]> = {
  food: [
    {
      id: 'food-1',
      question: 'What is your favorite fast food?',
      options: [
        { id: 'f1-1', name: 'Pizza', image: '🍕' },
        { id: 'f1-2', name: 'Burger', image: '🍔' },
        { id: 'f1-3', name: 'Sushi', image: '🍣' },
        { id: 'f1-4', name: 'Tacos', image: '🌮' },
      ],
    },
    {
      id: 'food-2',
      question: 'Best breakfast food?',
      options: [
        { id: 'f2-1', name: 'Pancakes', image: '🥞' },
        { id: 'f2-2', name: 'Eggs & Bacon', image: '🍳' },
        { id: 'f2-3', name: 'Cereal', image: '🥣' },
        { id: 'f2-4', name: 'Croissant', image: '🥐' },
      ],
    },
    {
      id: 'food-3',
      question: 'Favorite dessert?',
      options: [
        { id: 'f3-1', name: 'Ice Cream', image: '🍦' },
        { id: 'f3-2', name: 'Cake', image: '🍰' },
        { id: 'f3-3', name: 'Cookies', image: '🍪' },
        { id: 'f3-4', name: 'Donuts', image: '🍩' },
      ],
    },
    {
      id: 'food-4',
      question: 'Best pizza topping?',
      options: [
        { id: 'f4-1', name: 'Pepperoni', image: '🍕' },
        { id: 'f4-2', name: 'Mushrooms', image: '🍄' },
        { id: 'f4-3', name: 'Pineapple', image: '🍍' },
        { id: 'f4-4', name: 'Extra Cheese', image: '🧀' },
      ],
    },
    {
      id: 'food-5',
      question: 'Favorite beverage?',
      options: [
        { id: 'f5-1', name: 'Coffee', image: '☕' },
        { id: 'f5-2', name: 'Tea', image: '🍵' },
        { id: 'f5-3', name: 'Soda', image: '🥤' },
        { id: 'f5-4', name: 'Juice', image: '🧃' },
      ],
    },
    {
      id: 'food-6',
      question: 'Best snack?',
      options: [
        { id: 'f6-1', name: 'Chips', image: '🥔' },
        { id: 'f6-2', name: 'Popcorn', image: '🍿' },
        { id: 'f6-3', name: 'Candy', image: '🍬' },
        { id: 'f6-4', name: 'Nuts', image: '🥜' },
      ],
    },
    {
      id: 'food-7',
      question: 'Favorite fruit?',
      options: [
        { id: 'f7-1', name: 'Apple', image: '🍎' },
        { id: 'f7-2', name: 'Banana', image: '🍌' },
        { id: 'f7-3', name: 'Strawberry', image: '🍓' },
        { id: 'f7-4', name: 'Watermelon', image: '🍉' },
      ],
    },
    {
      id: 'food-8',
      question: 'Best comfort food?',
      options: [
        { id: 'f8-1', name: 'Mac & Cheese', image: '🧀' },
        { id: 'f8-2', name: 'Soup', image: '🍲' },
        { id: 'f8-3', name: 'Fried Chicken', image: '🍗' },
        { id: 'f8-4', name: 'Pasta', image: '🍝' },
      ],
    },
    {
      id: 'food-9',
      question: 'Favorite cuisine?',
      options: [
        { id: 'f9-1', name: 'Italian', image: '🇮🇹' },
        { id: 'f9-2', name: 'Mexican', image: '🇲🇽' },
        { id: 'f9-3', name: 'Chinese', image: '🇨🇳' },
        { id: 'f9-4', name: 'Japanese', image: '🇯🇵' },
      ],
    },
    {
      id: 'food-10',
      question: 'Best sandwich?',
      options: [
        { id: 'f10-1', name: 'BLT', image: '🥓' },
        { id: 'f10-2', name: 'Club', image: '🥪' },
        { id: 'f10-3', name: 'Grilled Cheese', image: '🧀' },
        { id: 'f10-4', name: 'Submarine', image: '🥖' },
      ],
    },
    {
      id: 'food-11',
      question: 'Favorite condiment?',
      options: [
        { id: 'f11-1', name: 'Ketchup', image: '🍅' },
        { id: 'f11-2', name: 'Mustard', image: '💛' },
        { id: 'f11-3', name: 'Mayo', image: '🥚' },
        { id: 'f11-4', name: 'Hot Sauce', image: '🌶️' },
      ],
    },
    {
      id: 'food-12',
      question: 'Best side dish?',
      options: [
        { id: 'f12-1', name: 'French Fries', image: '🍟' },
        { id: 'f12-2', name: 'Salad', image: '🥗' },
        { id: 'f12-3', name: 'Rice', image: '🍚' },
        { id: 'f12-4', name: 'Mashed Potatoes', image: '🥔' },
      ],
    },
    {
      id: 'food-13',
      question: 'Favorite meat?',
      options: [
        { id: 'f13-1', name: 'Chicken', image: '🐔' },
        { id: 'f13-2', name: 'Beef', image: '🥩' },
        { id: 'f13-3', name: 'Pork', image: '🐷' },
        { id: 'f13-4', name: 'Fish', image: '🐟' },
      ],
    },
    {
      id: 'food-14',
      question: 'Best seafood?',
      options: [
        { id: 'f14-1', name: 'Shrimp', image: '🍤' },
        { id: 'f14-2', name: 'Crab', image: '🦀' },
        { id: 'f14-3', name: 'Lobster', image: '🦞' },
        { id: 'f14-4', name: 'Oysters', image: '🦪' },
      ],
    },
    {
      id: 'food-15',
      question: 'Favorite vegetable?',
      options: [
        { id: 'f15-1', name: 'Broccoli', image: '🥦' },
        { id: 'f15-2', name: 'Carrots', image: '🥕' },
        { id: 'f15-3', name: 'Corn', image: '🌽' },
        { id: 'f15-4', name: 'Peppers', image: '🫑' },
      ],
    },
    {
      id: 'food-16',
      question: 'Best chocolate type?',
      options: [
        { id: 'f16-1', name: 'Milk Chocolate', image: '🍫' },
        { id: 'f16-2', name: 'Dark Chocolate', image: '🍫' },
        { id: 'f16-3', name: 'White Chocolate', image: '🍫' },
        { id: 'f16-4', name: 'Hazelnut', image: '🌰' },
      ],
    },
    {
      id: 'food-17',
      question: 'Favorite cheese?',
      options: [
        { id: 'f17-1', name: 'Cheddar', image: '🧀' },
        { id: 'f17-2', name: 'Mozzarella', image: '🧀' },
        { id: 'f17-3', name: 'Blue Cheese', image: '🧀' },
        { id: 'f17-4', name: 'Parmesan', image: '🧀' },
      ],
    },
    {
      id: 'food-18',
      question: 'Best BBQ item?',
      options: [
        { id: 'f18-1', name: 'Ribs', image: '🍖' },
        { id: 'f18-2', name: 'Brisket', image: '🥩' },
        { id: 'f18-3', name: 'Hot Dogs', image: '🌭' },
        { id: 'f18-4', name: 'Burgers', image: '🍔' },
      ],
    },
    {
      id: 'food-19',
      question: 'Favorite bread?',
      options: [
        { id: 'f19-1', name: 'White Bread', image: '🍞' },
        { id: 'f19-2', name: 'Whole Wheat', image: '🍞' },
        { id: 'f19-3', name: 'Sourdough', image: '🥖' },
        { id: 'f19-4', name: 'Rye', image: '🍞' },
      ],
    },
    {
      id: 'food-20',
      question: 'Best cooking method?',
      options: [
        { id: 'f20-1', name: 'Grilled', image: '🔥' },
        { id: 'f20-2', name: 'Fried', image: '🍳' },
        { id: 'f20-3', name: 'Baked', image: '🔥' },
        { id: 'f20-4', name: 'Steamed', image: '♨️' },
      ],
    },
  ],
  technology: [
    {
      id: 'tech-1',
      question: 'Favorite smartphone brand?',
      options: [
        { id: 't1-1', name: 'Apple', image: '📱' },
        { id: 't1-2', name: 'Samsung', image: '📱' },
        { id: 't1-3', name: 'Google', image: '📱' },
        { id: 't1-4', name: 'OnePlus', image: '📱' },
      ],
    },
    {
      id: 'tech-2',
      question: 'Best operating system?',
      options: [
        { id: 't2-1', name: 'Windows', image: '💻' },
        { id: 't2-2', name: 'macOS', image: '🍎' },
        { id: 't2-3', name: 'Linux', image: '🐧' },
        { id: 't2-4', name: 'Chrome OS', image: '🌐' },
      ],
    },
    {
      id: 'tech-3',
      question: 'Favorite programming language?',
      options: [
        { id: 't3-1', name: 'JavaScript', image: '💛' },
        { id: 't3-2', name: 'Python', image: '🐍' },
        { id: 't3-3', name: 'Java', image: '☕' },
        { id: 't3-4', name: 'C++', image: '⚡' },
      ],
    },
    {
      id: 'tech-4',
      question: 'Best social media platform?',
      options: [
        { id: 't4-1', name: 'Instagram', image: '📸' },
        { id: 't4-2', name: 'Twitter/X', image: '🐦' },
        { id: 't4-3', name: 'TikTok', image: '🎵' },
        { id: 't4-4', name: 'YouTube', image: '📹' },
      ],
    },
    {
      id: 'tech-5',
      question: 'Favorite web browser?',
      options: [
        { id: 't5-1', name: 'Chrome', image: '🌐' },
        { id: 't5-2', name: 'Firefox', image: '🦊' },
        { id: 't5-3', name: 'Safari', image: '🧭' },
        { id: 't5-4', name: 'Edge', image: '🌊' },
      ],
    },
    {
      id: 'tech-6',
      question: 'Best streaming service?',
      options: [
        { id: 't6-1', name: 'Netflix', image: '📺' },
        { id: 't6-2', name: 'Disney+', image: '🏰' },
        { id: 't6-3', name: 'Prime Video', image: '📦' },
        { id: 't6-4', name: 'YouTube', image: '📹' },
      ],
    },
    {
      id: 'tech-7',
      question: 'Favorite gaming console?',
      options: [
        { id: 't7-1', name: 'PlayStation', image: '🎮' },
        { id: 't7-2', name: 'Xbox', image: '🎮' },
        { id: 't7-3', name: 'Nintendo Switch', image: '🎮' },
        { id: 't7-4', name: 'PC Gaming', image: '💻' },
      ],
    },
    {
      id: 'tech-8',
      question: 'Best messaging app?',
      options: [
        { id: 't8-1', name: 'WhatsApp', image: '💬' },
        { id: 't8-2', name: 'Telegram', image: '✈️' },
        { id: 't8-3', name: 'Signal', image: '🔒' },
        { id: 't8-4', name: 'iMessage', image: '💬' },
      ],
    },
    {
      id: 'tech-9',
      question: 'Favorite cloud storage?',
      options: [
        { id: 't9-1', name: 'Google Drive', image: '☁️' },
        { id: 't9-2', name: 'Dropbox', image: '📦' },
        { id: 't9-3', name: 'OneDrive', image: '☁️' },
        { id: 't9-4', name: 'iCloud', image: '☁️' },
      ],
    },
    {
      id: 'tech-10',
      question: 'Best smart home device?',
      options: [
        { id: 't10-1', name: 'Alexa', image: '🔊' },
        { id: 't10-2', name: 'Google Home', image: '🏠' },
        { id: 't10-3', name: 'HomePod', image: '🔊' },
        { id: 't10-4', name: 'Smart Lights', image: '💡' },
      ],
    },
    {
      id: 'tech-11',
      question: 'Favorite laptop brand?',
      options: [
        { id: 't11-1', name: 'MacBook', image: '💻' },
        { id: 't11-2', name: 'Dell', image: '💻' },
        { id: 't11-3', name: 'HP', image: '💻' },
        { id: 't11-4', name: 'Lenovo', image: '💻' },
      ],
    },
    {
      id: 'tech-12',
      question: 'Best music streaming?',
      options: [
        { id: 't12-1', name: 'Spotify', image: '🎵' },
        { id: 't12-2', name: 'Apple Music', image: '🎵' },
        { id: 't12-3', name: 'YouTube Music', image: '🎵' },
        { id: 't12-4', name: 'Amazon Music', image: '🎵' },
      ],
    },
    {
      id: 'tech-13',
      question: 'Favorite headphones?',
      options: [
        { id: 't13-1', name: 'AirPods', image: '🎧' },
        { id: 't13-2', name: 'Sony', image: '🎧' },
        { id: 't13-3', name: 'Bose', image: '🎧' },
        { id: 't13-4', name: 'Beats', image: '🎧' },
      ],
    },
    {
      id: 'tech-14',
      question: 'Best video conferencing?',
      options: [
        { id: 't14-1', name: 'Zoom', image: '💻' },
        { id: 't14-2', name: 'Teams', image: '👥' },
        { id: 't14-3', name: 'Google Meet', image: '📹' },
        { id: 't14-4', name: 'FaceTime', image: '📱' },
      ],
    },
    {
      id: 'tech-15',
      question: 'Favorite smartwatch?',
      options: [
        { id: 't15-1', name: 'Apple Watch', image: '⌚' },
        { id: 't15-2', name: 'Galaxy Watch', image: '⌚' },
        { id: 't15-3', name: 'Fitbit', image: '⌚' },
        { id: 't15-4', name: 'Garmin', image: '⌚' },
      ],
    },
    {
      id: 'tech-16',
      question: 'Best password manager?',
      options: [
        { id: 't16-1', name: '1Password', image: '🔐' },
        { id: 't16-2', name: 'LastPass', image: '🔐' },
        { id: 't16-3', name: 'Bitwarden', image: '🔐' },
        { id: 't16-4', name: 'Dashlane', image: '🔐' },
      ],
    },
    {
      id: 'tech-17',
      question: 'Favorite code editor?',
      options: [
        { id: 't17-1', name: 'VS Code', image: '💻' },
        { id: 't17-2', name: 'Sublime Text', image: '💻' },
        { id: 't17-3', name: 'Atom', image: '💻' },
        { id: 't17-4', name: 'Vim', image: '💻' },
      ],
    },
    {
      id: 'tech-18',
      question: 'Best AI assistant?',
      options: [
        { id: 't18-1', name: 'ChatGPT', image: '🤖' },
        { id: 't18-2', name: 'Claude', image: '🤖' },
        { id: 't18-3', name: 'Gemini', image: '🤖' },
        { id: 't18-4', name: 'Copilot', image: '🤖' },
      ],
    },
    {
      id: 'tech-19',
      question: 'Favorite email client?',
      options: [
        { id: 't19-1', name: 'Gmail', image: '📧' },
        { id: 't19-2', name: 'Outlook', image: '📧' },
        { id: 't19-3', name: 'Apple Mail', image: '📧' },
        { id: 't19-4', name: 'Thunderbird', image: '📧' },
      ],
    },
    {
      id: 'tech-20',
      question: 'Best photo editing app?',
      options: [
        { id: 't20-1', name: 'Photoshop', image: '🎨' },
        { id: 't20-2', name: 'Lightroom', image: '📸' },
        { id: 't20-3', name: 'GIMP', image: '🎨' },
        { id: 't20-4', name: 'Canva', image: '🎨' },
      ],
    },
  ],
  meme: [
    {
      id: 'meme-1',
      question: 'Favorite classic meme?',
      options: [
        { id: 'm1-1', name: 'Doge', image: '🐕' },
        { id: 'm1-2', name: 'Pepe', image: '🐸' },
        { id: 'm1-3', name: 'Grumpy Cat', image: '😾' },
        { id: 'm1-4', name: 'Trollface', image: '😈' },
      ],
    },
    {
      id: 'meme-2',
      question: 'Best meme format?',
      options: [
        { id: 'm2-1', name: 'Drake', image: '🎤' },
        { id: 'm2-2', name: 'Distracted BF', image: '👫' },
        { id: 'm2-3', name: 'Two Buttons', image: '🔘' },
        { id: 'm2-4', name: 'Expanding Brain', image: '🧠' },
      ],
    },
    {
      id: 'meme-3',
      question: 'Favorite reaction meme?',
      options: [
        { id: 'm3-1', name: 'Surprised Pikachu', image: '⚡' },
        { id: 'm3-2', name: 'This is Fine', image: '🔥' },
        { id: 'm3-3', name: 'Press F', image: 'F' },
        { id: 'm3-4', name: 'Big Brain', image: '🧠' },
      ],
    },
    {
      id: 'meme-4',
      question: 'Best animal meme?',
      options: [
        { id: 'm4-1', name: 'Doge', image: '🐕' },
        { id: 'm4-2', name: 'Keyboard Cat', image: '🐱' },
        { id: 'm4-3', name: 'Nyan Cat', image: '🌈' },
        { id: 'm4-4', name: 'Success Kid', image: '👶' },
      ],
    },
    {
      id: 'meme-5',
      question: 'Favorite internet trend?',
      options: [
        { id: 'm5-1', name: 'Ice Bucket', image: '🧊' },
        { id: 'm5-2', name: 'Mannequin', image: '🗿' },
        { id: 'm5-3', name: 'Harlem Shake', image: '💃' },
        { id: 'm5-4', name: 'Bottle Flip', image: '🍾' },
      ],
    },
    {
      id: 'meme-6',
      question: 'Best text meme?',
      options: [
        { id: 'm6-1', name: 'F in Chat', image: 'F' },
        { id: 'm6-2', name: 'Press X', image: 'X' },
        { id: 'm6-3', name: 'OK Boomer', image: '👴' },
        { id: 'm6-4', name: 'No U', image: '🔄' },
      ],
    },
    {
      id: 'meme-7',
      question: 'Favorite video meme?',
      options: [
        { id: 'm7-1', name: 'Rickroll', image: '🎵' },
        { id: 'm7-2', name: 'Coffin Dance', image: '⚰️' },
        { id: 'm7-3', name: 'We are Number One', image: '1️⃣' },
        { id: 'm7-4', name: 'Never Gonna', image: '🎤' },
      ],
    },
    {
      id: 'meme-8',
      question: 'Best SpongeBob meme?',
      options: [
        { id: 'm8-1', name: 'Mocking', image: '🧽' },
        { id: 'm8-2', name: 'Ight Imma', image: '👋' },
        { id: 'm8-3', name: 'Imagination', image: '🌈' },
        { id: 'm8-4', name: 'Confused Mr K', image: '🦀' },
      ],
    },
    {
      id: 'meme-9',
      question: 'Favorite wholesome meme?',
      options: [
        { id: 'm9-1', name: 'Keanu Reeves', image: '😎' },
        { id: 'm9-2', name: 'Bob Ross', image: '🎨' },
        { id: 'm9-3', name: 'Mr Rogers', image: '👔' },
        { id: 'm9-4', name: 'Steve Irwin', image: '🐊' },
      ],
    },
    {
      id: 'meme-10',
      question: 'Best cursed meme?',
      options: [
        { id: 'm10-1', name: 'Cursed Images', image: '👁️' },
        { id: 'm10-2', name: 'Deep Fried', image: '🍳' },
        { id: 'm10-3', name: 'Nuked', image: '☢️' },
        { id: 'm10-4', name: 'Surreal', image: '🌀' },
      ],
    },
    {
      id: 'meme-11',
      question: 'Favorite stonks meme?',
      options: [
        { id: 'm11-1', name: 'Stonks', image: '📈' },
        { id: 'm11-2', name: 'Not Stonks', image: '📉' },
        { id: 'm11-3', name: 'To The Moon', image: '🚀' },
        { id: 'm11-4', name: 'Diamond Hands', image: '💎' },
      ],
    },
    {
      id: 'meme-12',
      question: 'Best wojak variant?',
      options: [
        { id: 'm12-1', name: 'Doomer', image: '😔' },
        { id: 'm12-2', name: 'Chad', image: '💪' },
        { id: 'm12-3', name: 'Soyjak', image: '😮' },
        { id: 'm12-4', name: 'NPC', image: '🤖' },
      ],
    },
    {
      id: 'meme-13',
      question: 'Favorite cringe meme?',
      options: [
        { id: 'm13-1', name: 'Rage Comics', image: '😡' },
        { id: 'm13-2', name: 'Advice Animals', image: '🐺' },
        { id: 'm13-3', name: 'Demotivational', image: '⬛' },
        { id: 'm13-4', name: 'Impact Font', image: 'T' },
      ],
    },
    {
      id: 'meme-14',
      question: 'Best gaming meme?',
      options: [
        { id: 'm14-1', name: 'Git Gud', image: '🎮' },
        { id: 'm14-2', name: 'Press X', image: 'X' },
        { id: 'm14-3', name: 'Fortnite Dance', image: '💃' },
        { id: 'm14-4', name: 'Minecraft', image: '⛏️' },
      ],
    },
    {
      id: 'meme-15',
      question: 'Favorite political meme?',
      options: [
        { id: 'm15-1', name: 'Bernie Mittens', image: '🧤' },
        { id: 'm15-2', name: 'Compass', image: '🧭' },
        { id: 'm15-3', name: 'Auth Right', image: '🟦' },
        { id: 'm15-4', name: 'Lib Left', image: '🟩' },
      ],
    },
    {
      id: 'meme-16',
      question: 'Best TikTok trend?',
      options: [
        { id: 'm16-1', name: 'Renegade', image: '💃' },
        { id: 'm16-2', name: 'Savage', image: '😤' },
        { id: 'm16-3', name: 'WAP', image: '🎵' },
        { id: 'm16-4', name: 'Corn Kid', image: '🌽' },
      ],
    },
    {
      id: 'meme-17',
      question: 'Favorite brain meme?',
      options: [
        { id: 'm17-1', name: 'Galaxy Brain', image: '🌌' },
        { id: 'm17-2', name: 'Small Brain', image: '🧠' },
        { id: 'm17-3', name: 'Big Brain Time', image: '🧠' },
        { id: 'm17-4', name: 'Smooth Brain', image: '🧠' },
      ],
    },
    {
      id: 'meme-18',
      question: 'Best button meme?',
      options: [
        { id: 'm18-1', name: 'Two Buttons', image: '🔘' },
        { id: 'm18-2', name: 'Hard Choice', image: '❓' },
        { id: 'm18-3', name: 'Daily Struggle', image: '😰' },
        { id: 'm18-4', name: 'Sweating', image: '💦' },
      ],
    },
    {
      id: 'meme-19',
      question: 'Favorite chad meme?',
      options: [
        { id: 'm19-1', name: 'Giga Chad', image: '💪' },
        { id: 'm19-2', name: 'Yes', image: '😎' },
        { id: 'm19-3', name: 'Average Fan', image: '🤓' },
        { id: 'm19-4', name: 'Average Enjoyer', image: '😎' },
      ],
    },
    {
      id: 'meme-20',
      question: 'Best meta meme?',
      options: [
        { id: 'm20-1', name: 'Loss', image: '📉' },
        { id: 'm20-2', name: 'Is This?', image: '🦋' },
        { id: 'm20-3', name: 'Meme Man', image: '🗿' },
        { id: 'm20-4', name: 'Deep Lore', image: '📚' },
      ],
    },
  ],
  politics: [
    {
      id: 'pol-1',
      question: 'Most important issue?',
      options: [
        { id: 'p1-1', name: 'Economy', image: '💰' },
        { id: 'p1-2', name: 'Healthcare', image: '🏥' },
        { id: 'p1-3', name: 'Education', image: '📚' },
        { id: 'p1-4', name: 'Environment', image: '🌍' },
      ],
    },
    {
      id: 'pol-2',
      question: 'Best government type?',
      options: [
        { id: 'p2-1', name: 'Democracy', image: '🗳️' },
        { id: 'p2-2', name: 'Republic', image: '🏛️' },
        { id: 'p2-3', name: 'Parliamentary', image: '📜' },
        { id: 'p2-4', name: 'Federal', image: '🏢' },
      ],
    },
    {
      id: 'pol-3',
      question: 'Preferred voting method?',
      options: [
        { id: 'p3-1', name: 'In-Person', image: '🗳️' },
        { id: 'p3-2', name: 'Mail-In', image: '📮' },
        { id: 'p3-3', name: 'Online', image: '💻' },
        { id: 'p3-4', name: 'Early Voting', image: '📅' },
      ],
    },
    {
      id: 'pol-4',
      question: 'Best economic system?',
      options: [
        { id: 'p4-1', name: 'Capitalism', image: '💼' },
        { id: 'p4-2', name: 'Socialism', image: '🤝' },
        { id: 'p4-3', name: 'Mixed Economy', image: '⚖️' },
        { id: 'p4-4', name: 'Free Market', image: '📈' },
      ],
    },
    {
      id: 'pol-5',
      question: 'Top foreign policy?',
      options: [
        { id: 'p5-1', name: 'Diplomacy', image: '🤝' },
        { id: 'p5-2', name: 'Defense', image: '🛡️' },
        { id: 'p5-3', name: 'Trade', image: '🚢' },
        { id: 'p5-4', name: 'Alliances', image: '🌐' },
      ],
    },
    {
      id: 'pol-6',
      question: 'Ideal tax system?',
      options: [
        { id: 'p6-1', name: 'Progressive', image: '📊' },
        { id: 'p6-2', name: 'Flat Tax', image: '📏' },
        { id: 'p6-3', name: 'Consumption', image: '🛒' },
        { id: 'p6-4', name: 'Wealth Tax', image: '💎' },
      ],
    },
    {
      id: 'pol-7',
      question: 'Best energy policy?',
      options: [
        { id: 'p7-1', name: 'Renewable', image: '☀️' },
        { id: 'p7-2', name: 'Nuclear', image: '⚛️' },
        { id: 'p7-3', name: 'Natural Gas', image: '🔥' },
        { id: 'p7-4', name: 'Mixed', image: '🔌' },
      ],
    },
    {
      id: 'pol-8',
      question: 'Preferred healthcare?',
      options: [
        { id: 'p8-1', name: 'Universal', image: '🏥' },
        { id: 'p8-2', name: 'Private', image: '💼' },
        { id: 'p8-3', name: 'Public Option', image: '⚖️' },
        { id: 'p8-4', name: 'Hybrid', image: '🔀' },
      ],
    },
    {
      id: 'pol-9',
      question: 'Education priority?',
      options: [
        { id: 'p9-1', name: 'Public Schools', image: '🏫' },
        { id: 'p9-2', name: 'College Access', image: '🎓' },
        { id: 'p9-3', name: 'Trade Schools', image: '🔧' },
        { id: 'p9-4', name: 'STEM', image: '🔬' },
      ],
    },
    {
      id: 'pol-10',
      question: 'Best immigration policy?',
      options: [
        { id: 'p10-1', name: 'Open Borders', image: '🌐' },
        { id: 'p10-2', name: 'Merit-Based', image: '🎯' },
        { id: 'p10-3', name: 'Refugee Focus', image: '🕊️' },
        { id: 'p10-4', name: 'Balanced', image: '⚖️' },
      ],
    },
    {
      id: 'pol-11',
      question: 'Criminal justice focus?',
      options: [
        { id: 'p11-1', name: 'Rehabilitation', image: '🔄' },
        { id: 'p11-2', name: 'Punishment', image: '⚖️' },
        { id: 'p11-3', name: 'Prevention', image: '🛡️' },
        { id: 'p11-4', name: 'Reform', image: '📋' },
      ],
    },
    {
      id: 'pol-12',
      question: 'Military spending?',
      options: [
        { id: 'p12-1', name: 'Increase', image: '📈' },
        { id: 'p12-2', name: 'Maintain', image: '➡️' },
        { id: 'p12-3', name: 'Decrease', image: '📉' },
        { id: 'p12-4', name: 'Reallocate', image: '🔄' },
      ],
    },
    {
      id: 'pol-13',
      question: 'Climate action priority?',
      options: [
        { id: 'p13-1', name: 'Carbon Tax', image: '💨' },
        { id: 'p13-2', name: 'Green Tech', image: '🔋' },
        { id: 'p13-3', name: 'Regulations', image: '📋' },
        { id: 'p13-4', name: 'International', image: '🌍' },
      ],
    },
    {
      id: 'pol-14',
      question: 'Best welfare system?',
      options: [
        { id: 'p14-1', name: 'Universal Basic', image: '💰' },
        { id: 'p14-2', name: 'Conditional', image: '📝' },
        { id: 'p14-3', name: 'Work Programs', image: '🔨' },
        { id: 'p14-4', name: 'Minimal', image: '📊' },
      ],
    },
    {
      id: 'pol-15',
      question: 'Transportation focus?',
      options: [
        { id: 'p15-1', name: 'Public Transit', image: '🚇' },
        { id: 'p15-2', name: 'Roads', image: '🛣️' },
        { id: 'p15-3', name: 'Rail', image: '🚄' },
        { id: 'p15-4', name: 'Green', image: '🚲' },
      ],
    },
    {
      id: 'pol-16',
      question: 'Internet regulation?',
      options: [
        { id: 'p16-1', name: 'Net Neutrality', image: '🌐' },
        { id: 'p16-2', name: 'Free Market', image: '📈' },
        { id: 'p16-3', name: 'Privacy Laws', image: '🔒' },
        { id: 'p16-4', name: 'Censorship', image: '🚫' },
      ],
    },
    {
      id: 'pol-17',
      question: 'Housing policy?',
      options: [
        { id: 'p17-1', name: 'Rent Control', image: '🏘️' },
        { id: 'p17-2', name: 'Public Housing', image: '🏢' },
        { id: 'p17-3', name: 'Zoning Reform', image: '📍' },
        { id: 'p17-4', name: 'Subsidies', image: '💰' },
      ],
    },
    {
      id: 'pol-18',
      question: 'Drug policy approach?',
      options: [
        { id: 'p18-1', name: 'Legalization', image: '✅' },
        { id: 'p18-2', name: 'Decriminalize', image: '⚖️' },
        { id: 'p18-3', name: 'Medical Only', image: '💊' },
        { id: 'p18-4', name: 'Prohibition', image: '🚫' },
      ],
    },
    {
      id: 'pol-19',
      question: 'Labor rights priority?',
      options: [
        { id: 'p19-1', name: 'Unions', image: '🤝' },
        { id: 'p19-2', name: 'Min Wage', image: '💵' },
        { id: 'p19-3', name: 'Work Hours', image: '⏰' },
        { id: 'p19-4', name: 'Benefits', image: '📊' },
      ],
    },
    {
      id: 'pol-20',
      question: 'Election reform?',
      options: [
        { id: 'p20-1', name: 'Ranked Choice', image: '🔢' },
        { id: 'p20-2', name: 'Term Limits', image: '⏳' },
        { id: 'p20-3', name: 'Campaign Finance', image: '💰' },
        { id: 'p20-4', name: 'Electoral College', image: '🗳️' },
      ],
    },
  ],
  geography: [
    {
      id: 'geo-1',
      question: 'Best continent to visit?',
      options: [
        { id: 'g1-1', name: 'Europe', image: '🇪🇺' },
        { id: 'g1-2', name: 'Asia', image: '🌏' },
        { id: 'g1-3', name: 'Africa', image: '🌍' },
        { id: 'g1-4', name: 'Americas', image: '🌎' },
      ],
    },
    {
      id: 'geo-2',
      question: 'Favorite European city?',
      options: [
        { id: 'g2-1', name: 'Paris', image: '🗼' },
        { id: 'g2-2', name: 'London', image: '🎡' },
        { id: 'g2-3', name: 'Rome', image: '🏛️' },
        { id: 'g2-4', name: 'Barcelona', image: '⚽' },
      ],
    },
    {
      id: 'geo-3',
      question: 'Best Asian destination?',
      options: [
        { id: 'g3-1', name: 'Tokyo', image: '🗾' },
        { id: 'g3-2', name: 'Bangkok', image: '🛕' },
        { id: 'g3-3', name: 'Dubai', image: '🏙️' },
        { id: 'g3-4', name: 'Singapore', image: '🦁' },
      ],
    },
    {
      id: 'geo-4',
      question: 'Favorite US city?',
      options: [
        { id: 'g4-1', name: 'New York', image: '🗽' },
        { id: 'g4-2', name: 'Los Angeles', image: '🎬' },
        { id: 'g4-3', name: 'Miami', image: '🏖️' },
        { id: 'g4-4', name: 'Chicago', image: '🌆' },
      ],
    },
    {
      id: 'geo-5',
      question: 'Best natural wonder?',
      options: [
        { id: 'g5-1', name: 'Grand Canyon', image: '🏜️' },
        { id: 'g5-2', name: 'Niagara Falls', image: '💦' },
        { id: 'g5-3', name: 'Mt. Everest', image: '⛰️' },
        { id: 'g5-4', name: 'Great Barrier', image: '🐠' },
      ],
    },
    {
      id: 'geo-6',
      question: 'Favorite beach destination?',
      options: [
        { id: 'g6-1', name: 'Maldives', image: '🏝️' },
        { id: 'g6-2', name: 'Hawaii', image: '🌺' },
        { id: 'g6-3', name: 'Caribbean', image: '🏖️' },
        { id: 'g6-4', name: 'Bali', image: '🌴' },
      ],
    },
    {
      id: 'geo-7',
      question: 'Best mountain range?',
      options: [
        { id: 'g7-1', name: 'Himalayas', image: '🏔️' },
        { id: 'g7-2', name: 'Alps', image: '⛷️' },
        { id: 'g7-3', name: 'Rockies', image: '⛰️' },
        { id: 'g7-4', name: 'Andes', image: '🏔️' },
      ],
    },
    {
      id: 'geo-8',
      question: 'Favorite desert?',
      options: [
        { id: 'g8-1', name: 'Sahara', image: '🏜️' },
        { id: 'g8-2', name: 'Arabian', image: '🐪' },
        { id: 'g8-3', name: 'Gobi', image: '🏜️' },
        { id: 'g8-4', name: 'Mojave', image: '🌵' },
      ],
    },
    {
      id: 'geo-9',
      question: 'Best river?',
      options: [
        { id: 'g9-1', name: 'Amazon', image: '🌊' },
        { id: 'g9-2', name: 'Nile', image: '🐊' },
        { id: 'g9-3', name: 'Mississippi', image: '🚢' },
        { id: 'g9-4', name: 'Yangtze', image: '🌊' },
      ],
    },
    {
      id: 'geo-10',
      question: 'Favorite island?',
      options: [
        { id: 'g10-1', name: 'Iceland', image: '🇮🇸' },
        { id: 'g10-2', name: 'New Zealand', image: '🇳🇿' },
        { id: 'g10-3', name: 'Madagascar', image: '🦎' },
        { id: 'g10-4', name: 'Japan', image: '🇯🇵' },
      ],
    },
    {
      id: 'geo-11',
      question: 'Best ancient wonder?',
      options: [
        { id: 'g11-1', name: 'Pyramids', image: '🔺' },
        { id: 'g11-2', name: 'Colosseum', image: '🏛️' },
        { id: 'g11-3', name: 'Great Wall', image: '🧱' },
        { id: 'g11-4', name: 'Machu Picchu', image: '⛰️' },
      ],
    },
    {
      id: 'geo-12',
      question: 'Favorite ocean?',
      options: [
        { id: 'g12-1', name: 'Pacific', image: '🌊' },
        { id: 'g12-2', name: 'Atlantic', image: '🌊' },
        { id: 'g12-3', name: 'Indian', image: '🌊' },
        { id: 'g12-4', name: 'Arctic', image: '🧊' },
      ],
    },
    {
      id: 'geo-13',
      question: 'Best forest?',
      options: [
        { id: 'g13-1', name: 'Amazon', image: '🌳' },
        { id: 'g13-2', name: 'Black Forest', image: '🌲' },
        { id: 'g13-3', name: 'Redwood', image: '🌲' },
        { id: 'g13-4', name: 'Boreal', image: '🌲' },
      ],
    },
    {
      id: 'geo-14',
      question: 'Favorite lake?',
      options: [
        { id: 'g14-1', name: 'Baikal', image: '💧' },
        { id: 'g14-2', name: 'Superior', image: '🌊' },
        { id: 'g14-3', name: 'Como', image: '⛵' },
        { id: 'g14-4', name: 'Tahoe', image: '🏔️' },
      ],
    },
    {
      id: 'geo-15',
      question: 'Best volcano?',
      options: [
        { id: 'g15-1', name: 'Vesuvius', image: '🌋' },
        { id: 'g15-2', name: 'Fuji', image: '🗻' },
        { id: 'g15-3', name: 'Kilauea', image: '🌋' },
        { id: 'g15-4', name: 'Etna', image: '🌋' },
      ],
    },
    {
      id: 'geo-16',
      question: 'Favorite capital city?',
      options: [
        { id: 'g16-1', name: 'Washington DC', image: '🇺🇸' },
        { id: 'g16-2', name: 'Berlin', image: '🇩🇪' },
        { id: 'g16-3', name: 'Tokyo', image: '🇯🇵' },
        { id: 'g16-4', name: 'Canberra', image: '🇦🇺' },
      ],
    },
    {
      id: 'geo-17',
      question: 'Best canyon?',
      options: [
        { id: 'g17-1', name: 'Grand Canyon', image: '🏜️' },
        { id: 'g17-2', name: 'Antelope', image: '🦌' },
        { id: 'g17-3', name: 'Fish River', image: '🐟' },
        { id: 'g17-4', name: 'Copper', image: '🏔️' },
      ],
    },
    {
      id: 'geo-18',
      question: 'Favorite landmark?',
      options: [
        { id: 'g18-1', name: 'Eiffel Tower', image: '🗼' },
        { id: 'g18-2', name: 'Taj Mahal', image: '🕌' },
        { id: 'g18-3', name: 'Big Ben', image: '🔔' },
        { id: 'g18-4', name: 'Statue Liberty', image: '🗽' },
      ],
    },
    {
      id: 'geo-19',
      question: 'Best peninsula?',
      options: [
        { id: 'g19-1', name: 'Italy', image: '🇮🇹' },
        { id: 'g19-2', name: 'Iberian', image: '🇪🇸' },
        { id: 'g19-3', name: 'Florida', image: '🐊' },
        { id: 'g19-4', name: 'Arabian', image: '🐪' },
      ],
    },
    {
      id: 'geo-20',
      question: 'Favorite climate?',
      options: [
        { id: 'g20-1', name: 'Mediterranean', image: '☀️' },
        { id: 'g20-2', name: 'Tropical', image: '🌴' },
        { id: 'g20-3', name: 'Temperate', image: '🍂' },
        { id: 'g20-4', name: 'Continental', image: '❄️' },
      ],
    },
  ],
};
