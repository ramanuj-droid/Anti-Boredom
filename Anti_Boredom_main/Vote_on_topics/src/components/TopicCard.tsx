import { Topic } from '@/types/vote';
import { topicInfo } from '@/data/questions';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface TopicCardProps {
  topic: Topic;
}

const TopicCard = ({ topic }: TopicCardProps) => {
  const navigate = useNavigate();
  const info = topicInfo[topic];

  return (
    <Card
      onClick={() => navigate(`/vote/${topic}`)}
      className="group cursor-pointer overflow-hidden border-2 border-border bg-card shadow-card transition-all duration-300 hover:scale-105 hover:shadow-hover"
    >
      <div className="p-8 text-center">
        <div className="mb-4 text-7xl transition-transform duration-300 group-hover:scale-110">
          {info.emoji}
        </div>
        <h3 className="mb-2 text-2xl font-bold text-card-foreground">{info.name}</h3>
        <p className="text-sm text-muted-foreground">{info.description}</p>
      </div>
      <div className="h-2 w-full bg-gradient-primary" />
    </Card>
  );
};

export default TopicCard;
