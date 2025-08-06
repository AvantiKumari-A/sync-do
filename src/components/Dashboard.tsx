import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Calendar, 
  Timer, 
  Settings, 
  Bell, 
  User,
  CheckCircle2,
  Circle,
  Flag,
  Clock
} from "lucide-react";
import TaskModal from "./TaskModal";
import CalendarView from "./CalendarView";
import TimerView from "./TimerView";
import ProfileView from "./ProfileView";
import SettingsView from "./SettingsView";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  dueDate?: string;
  category: string;
}

const Dashboard = () => {
  const [activeView, setActiveView] = useState('tasks');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Review project proposal', completed: false, priority: 'urgent', dueDate: '2024-01-15', category: 'Work' },
    { id: '2', title: 'Prepare presentation slides', completed: true, priority: 'high', dueDate: '2024-01-16', category: 'Work' },
    { id: '3', title: 'Call dentist for appointment', completed: false, priority: 'medium', dueDate: '2024-01-17', category: 'Personal' },
    { id: '4', title: 'Buy groceries', completed: false, priority: 'low', dueDate: '2024-01-18', category: 'Personal' },
    { id: '5', title: 'Finish reading book', completed: false, priority: 'medium', category: 'Personal' },
  ]);

  const handleAddTask = (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: Date.now().toString() };
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-task-urgent';
      case 'high': return 'bg-task-high';
      case 'medium': return 'bg-task-medium';
      case 'low': return 'bg-task-low';
      default: return 'bg-muted';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <Flag className="w-4 h-4 text-task-urgent" />;
      case 'high': return <Flag className="w-4 h-4 text-task-high" />;
      case 'medium': return <Flag className="w-4 h-4 text-task-medium" />;
      case 'low': return <Flag className="w-4 h-4 text-task-low" />;
      default: return <Flag className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'calendar':
        return <CalendarView tasks={tasks} />;
      case 'timer':
        return <TimerView />;
      case 'profile':
        return <ProfileView />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Good Morning!</h2>
                  <p className="text-muted-foreground">You have {tasks.filter(t => !t.completed).length} tasks pending</p>
                </div>
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                </Avatar>
              </div>

              {/* Search and Add */}
              <div className="flex space-x-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-2xl"
                  />
                </div>
                <Button 
                  onClick={() => setIsTaskModalOpen(true)}
                  className="rounded-2xl shadow-purple"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-gradient-card border-0 shadow-task">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{tasks.filter(t => t.completed).length}</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-card border-0 shadow-task">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{tasks.filter(t => !t.completed).length}</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Task List */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Your Tasks</h3>
              {filteredTasks.length === 0 ? (
                <Card className="p-8 text-center bg-gradient-card border-0">
                  <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No tasks found</p>
                </Card>
              ) : (
                filteredTasks.map((task) => (
                  <Card key={task.id} className="p-4 bg-gradient-card border-0 shadow-task hover:shadow-purple transition-all duration-200">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleTask(task.id)}
                        className="h-8 w-8 rounded-full"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground" />
                        )}
                      </Button>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </p>
                          {getPriorityIcon(task.priority)}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Badge variant="secondary" className="text-xs">
                            {task.category}
                          </Badge>
                          {task.dueDate && (
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {task.dueDate}
                            </span>
                          )}
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="bg-gradient-primary text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Task Buddy</h1>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <Button
            variant={activeView === 'tasks' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('tasks')}
            className={`rounded-2xl whitespace-nowrap ${
              activeView === 'tasks' 
                ? 'bg-white text-primary' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Tasks
          </Button>
          <Button
            variant={activeView === 'calendar' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('calendar')}
            className={`rounded-2xl whitespace-nowrap ${
              activeView === 'calendar' 
                ? 'bg-white text-primary' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Calendar
          </Button>
          <Button
            variant={activeView === 'timer' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('timer')}
            className={`rounded-2xl whitespace-nowrap ${
              activeView === 'timer' 
                ? 'bg-white text-primary' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Timer className="w-4 h-4 mr-2" />
            Timer
          </Button>
          <Button
            variant={activeView === 'profile' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('profile')}
            className={`rounded-2xl whitespace-nowrap ${
              activeView === 'profile' 
                ? 'bg-white text-primary' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </Button>
          <Button
            variant={activeView === 'settings' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('settings')}
            className={`rounded-2xl whitespace-nowrap ${
              activeView === 'settings' 
                ? 'bg-white text-primary' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {renderMainContent()}
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
};

export default Dashboard;