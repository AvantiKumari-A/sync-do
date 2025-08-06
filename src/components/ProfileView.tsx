import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, Trophy, Target, Clock } from "lucide-react";

const ProfileView = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <User className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Profile</h2>
      </div>

      {/* Profile Info */}
      <Card className="p-6 bg-gradient-card border-0 shadow-task">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold">John Doe</h3>
            <p className="text-muted-foreground">Productivity Enthusiast</p>
            <Badge variant="secondary" className="mt-1">Premium Member</Badge>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">john.doe@example.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Member since January 2024</span>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-gradient-card border-0 shadow-task">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">127</p>
              <p className="text-sm text-muted-foreground">Tasks Completed</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-card border-0 shadow-task">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">89</p>
              <p className="text-sm text-muted-foreground">Focus Sessions</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileView;