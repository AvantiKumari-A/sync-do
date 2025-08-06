import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Calendar, Timer, Users } from "lucide-react";

interface WelcomeProps {
  onGetStarted: () => void;
}

const Welcome = ({ onGetStarted }: WelcomeProps) => {
  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Logo and Title */}
        <div className="space-y-4">
          <div className="w-20 h-20 bg-white/20 rounded-3xl mx-auto flex items-center justify-center mb-6 animate-float">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">TASK BUDDY</h1>
          <p className="text-white/80 text-lg">Your ultimate productivity companion</p>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4">
            <div className="flex items-center space-x-3 text-white">
              <CheckCircle className="w-5 h-5" />
              <span>Organize your tasks efficiently</span>
            </div>
          </Card>
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4">
            <div className="flex items-center space-x-3 text-white">
              <Calendar className="w-5 h-5" />
              <span>Track deadlines with calendar</span>
            </div>
          </Card>
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4">
            <div className="flex items-center space-x-3 text-white">
              <Timer className="w-5 h-5" />
              <span>Built-in Pomodoro timer</span>
            </div>
          </Card>
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4">
            <div className="flex items-center space-x-3 text-white">
              <Users className="w-5 h-5" />
              <span>Collaborate with your team</span>
            </div>
          </Card>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={onGetStarted}
          className="w-full bg-white text-primary hover:bg-white/90 font-semibold py-3 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105"
        >
          Get Started
        </Button>

        <p className="text-white/60 text-sm">Join thousands of productive users</p>
      </div>
    </div>
  );
};

export default Welcome;