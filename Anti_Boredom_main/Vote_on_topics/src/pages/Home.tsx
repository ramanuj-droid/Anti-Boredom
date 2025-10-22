import TopicCard from '@/components/TopicCard';
import { Topic } from '@/types/vote';

const topics: Topic[] = ['food', 'technology', 'meme', 'politics', 'geography'];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="mb-4 bg-gradient-primary bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl lg:text-7xl animate-fade-in">
            Vote on Topics
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl animate-fade-in">
            Choose a topic below and share your opinion! Vote on your favorites and see how others voted.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
          {topics.map((topic, index) => (
            <div
              key={topic}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'backwards' }}
            >
              <TopicCard topic={topic} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
