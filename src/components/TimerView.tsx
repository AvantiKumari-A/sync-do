import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Square, RotateCcw, Timer as TimerIcon, Coffee, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type TimerType = 'pomodoro' | 'short-break' | 'long-break';
type TimerStatus = 'idle' | 'running' | 'paused';

const TimerView = () => {
  const [timerType, setTimerType] = useState<TimerType>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [sessions, setSessions] = useState(0);
  const { toast } = useToast();

  const timerConfig = {
    pomodoro: { duration: 25 * 60, label: 'Focus Time', icon: Target, color: 'text-primary' },
    'short-break': { duration: 5 * 60, label: 'Short Break', icon: Coffee, color: 'text-green-600' },
    'long-break': { duration: 15 * 60, label: 'Long Break', icon: Coffee, color: 'text-blue-600' },
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status === 'running' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && status === 'running') {
      // Timer finished
      setStatus('idle');
      if (timerType === 'pomodoro') {
        setSessions(prev => prev + 1);
        toast({
          title: "Pomodoro Complete! 🍅",
          description: "Great work! Time for a break.",
        });
      } else {
        toast({
          title: "Break's Over! ⏰",
          description: "Ready to get back to work?",
        });
      }
    }

    return () => clearInterval(interval);
  }, [status, timeLeft, timerType, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = timerConfig[timerType].duration;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const handleStart = () => {
    setStatus('running');
  };

  const handlePause = () => {
    setStatus('paused');
  };

  const handleStop = () => {
    setStatus('idle');
    setTimeLeft(timerConfig[timerType].duration);
  };

  const handleReset = () => {
    setStatus('idle');
    setTimeLeft(timerConfig[timerType].duration);
  };

  const switchTimer = (type: TimerType) => {
    setTimerType(type);
    setTimeLeft(timerConfig[type].duration);
    setStatus('idle');
  };

  const currentConfig = timerConfig[timerType];
  const IconComponent = currentConfig.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <TimerIcon className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Pomodoro Timer</h2>
      </div>

      {/* Timer Type Selector */}
      <div className="flex space-x-2">
        <Button
          variant={timerType === 'pomodoro' ? 'default' : 'outline'}
          size="sm"
          onClick={() => switchTimer('pomodoro')}
          className="rounded-2xl"
        >
          <Target className="w-4 h-4 mr-2" />
          Pomodoro
        </Button>
        <Button
          variant={timerType === 'short-break' ? 'default' : 'outline'}
          size="sm"
          onClick={() => switchTimer('short-break')}
          className="rounded-2xl"
        >
          <Coffee className="w-4 h-4 mr-2" />
          Short Break
        </Button>
        <Button
          variant={timerType === 'long-break' ? 'default' : 'outline'}
          size="sm"
          onClick={() => switchTimer('long-break')}
          className="rounded-2xl"
        >
          <Coffee className="w-4 h-4 mr-2" />
          Long Break
        </Button>
      </div>

      {/* Main Timer */}
      <Card className="p-8 text-center bg-gradient-card border-0 shadow-purple">
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-3">
            <IconComponent className={`w-8 h-8 ${currentConfig.color}`} />
            <h3 className="text-2xl font-bold">{currentConfig.label}</h3>
          </div>

          {/* Timer Display */}
          <div className="space-y-4">
            <div className="text-6xl font-mono font-bold text-primary">
              {formatTime(timeLeft)}
            </div>
            <Progress 
              value={getProgress()} 
              className="h-2 w-full max-w-md mx-auto"
            />
          </div>

          {/* Status Badge */}
          <Badge 
            variant={
              status === 'running' ? 'default' : 
              status === 'paused' ? 'secondary' : 'outline'
            }
            className="text-sm px-4 py-1"
          >
            {status === 'running' ? 'Running' : 
             status === 'paused' ? 'Paused' : 'Ready'}
          </Badge>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-3">
            {status === 'idle' || status === 'paused' ? (
              <Button 
                onClick={handleStart}
                size="lg"
                className="rounded-2xl shadow-purple"
              >
                <Play className="w-5 h-5 mr-2" />
                {status === 'paused' ? 'Resume' : 'Start'}
              </Button>
            ) : (
              <Button 
                onClick={handlePause}
                variant="secondary"
                size="lg"
                className="rounded-2xl"
              >
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </Button>
            )}
            
            <Button 
              onClick={handleStop}
              variant="outline"
              size="lg"
              className="rounded-2xl"
              disabled={status === 'idle'}
            >
              <Square className="w-5 h-5 mr-2" />
              Stop
            </Button>
            
            <Button 
              onClick={handleReset}
              variant="outline"
              size="lg"
              className="rounded-2xl"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-gradient-card border-0 shadow-task">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{sessions}</p>
              <p className="text-sm text-muted-foreground">Sessions Today</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-card border-0 shadow-task">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
              <TimerIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{Math.floor(sessions * 25 / 60)}h {(sessions * 25) % 60}m</p>
              <p className="text-sm text-muted-foreground">Focus Time</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tips */}
      <Card className="p-4 bg-gradient-card border-0 shadow-task">
        <h4 className="font-semibold mb-2">Pomodoro Tips 💡</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Work for 25 minutes with full focus</li>
          <li>• Take a 5-minute break after each session</li>
          <li>• Take a longer 15-30 minute break after 4 sessions</li>
          <li>• Eliminate all distractions during focus time</li>
        </ul>
      </Card>
    </div>
  );
};

export default TimerView;