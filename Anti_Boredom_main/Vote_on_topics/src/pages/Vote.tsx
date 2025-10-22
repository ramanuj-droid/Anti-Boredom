import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import OptionCard from '@/components/OptionCard';
import { Topic, Question } from '@/types/vote';
import { questions, topicInfo } from '@/data/questions';
import { saveVote, getVoteForQuestion, calculateResults } from '@/utils/storage';
import { toast } from 'sonner';

const Vote = () => {
  const { topic } = useParams<{ topic: Topic }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [results, setResults] = useState<Record<string, number>>({});

  const topicQuestions = topic ? questions[topic] : [];
  const currentQuestion = topicQuestions[currentQuestionIndex];
  const topicData = topic ? topicInfo[topic] : null;

  useEffect(() => {
    if (!topic || !topicQuestions.length) {
      navigate('/');
      return;
    }

    // Check if user has already voted on this question
    const existingVote = getVoteForQuestion(currentQuestion.id);
    if (existingVote) {
      setSelectedOption(existingVote);
      setHasVoted(true);
      loadResults();
    } else {
      setSelectedOption(null);
      setHasVoted(false);
      setResults({});
    }
  }, [topic, currentQuestionIndex, navigate]);

  const loadResults = () => {
    const calculatedResults = calculateResults(currentQuestion.id, currentQuestion.options.length);
    setResults(calculatedResults);
  };

  const handleVote = (optionId: string) => {
    if (hasVoted) return;

    setSelectedOption(optionId);
    saveVote({
      questionId: currentQuestion.id,
      selectedOptionId: optionId,
    });
    setHasVoted(true);
    loadResults();
    
    toast.success('Vote recorded!', {
      description: 'Your vote has been saved successfully.',
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < topicQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      toast.success('All done!', {
        description: 'You\'ve completed all questions in this topic!',
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  if (!topic || !currentQuestion || !topicData) {
    return null;
  }

  const getPercentage = (optionId: string): number => {
    return results[optionId] || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Topics
          </Button>
          
          <div className="text-center">
            <div className="mb-2 text-4xl">{topicData.emoji}</div>
            <h2 className="text-xl font-bold text-foreground">{topicData.name}</h2>
          </div>

          <div className="w-32 text-right text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {topicQuestions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-gradient-primary transition-all duration-500"
            style={{ width: `${((currentQuestionIndex + 1) / topicQuestions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl animate-fade-in">
            {currentQuestion.question}
          </h1>
          {!hasVoted && (
            <p className="text-muted-foreground animate-fade-in">
              Select one option to see the results
            </p>
          )}
        </div>

        {/* Options Grid */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {currentQuestion.options.map((option, index) => (
            <div
              key={option.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'backwards' }}
            >
              <OptionCard
                option={option}
                index={index}
                isSelected={selectedOption === option.id}
                hasVoted={hasVoted}
                percentage={getPercentage(option.id)}
                onSelect={() => handleVote(option.id)}
              />
            </div>
          ))}
        </div>

        {/* Navigation */}
        {hasVoted && (
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentQuestionIndex === topicQuestions.length - 1}
              className="gap-2 bg-gradient-primary"
            >
              Next Question
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vote;
