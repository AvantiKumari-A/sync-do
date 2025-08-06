import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Flag } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  dueDate?: string;
  category: string;
}

interface CalendarViewProps {
  tasks: Task[];
}

const CalendarView = ({ tasks }: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getTasksForDate = (day: number) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.filter(task => task.dueDate === dateStr);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-task-urgent';
      case 'high': return 'bg-task-high';
      case 'medium': return 'bg-task-medium';
      case 'low': return 'bg-task-low';
      default: return 'bg-muted';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + (direction === 'next' ? 1 : -1), 1));
  };

  const days = getDaysInMonth(currentDate);
  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <CalendarIcon className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Calendar</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => navigateMonth('prev')}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="min-w-[160px] text-center">
            <h3 className="font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
          </div>
          <Button variant="outline" size="icon" onClick={() => navigateMonth('next')}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card className="p-4 bg-gradient-card border-0 shadow-task">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const dayTasks = day ? getTasksForDate(day) : [];
            const hasUrgentTasks = dayTasks.some(task => task.priority === 'urgent' && !task.completed);
            
            return (
              <div
                key={index}
                className={`min-h-[80px] p-2 rounded-xl border transition-all duration-200 ${
                  day
                    ? `bg-background hover:bg-muted/50 cursor-pointer ${
                        isToday(day) ? 'ring-2 ring-primary bg-primary/5' : ''
                      }`
                    : ''
                }`}
              >
                {day && (
                  <>
                    <div className={`text-sm font-medium mb-1 ${
                      isToday(day) ? 'text-primary' : hasUrgentTasks ? 'text-task-urgent' : 'text-foreground'
                    }`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {dayTasks.slice(0, 2).map(task => (
                        <div
                          key={task.id}
                          className={`text-xs p-1 rounded-md ${getPriorityColor(task.priority)} text-white truncate ${
                            task.completed ? 'opacity-50 line-through' : ''
                          }`}
                        >
                          {task.title}
                        </div>
                      ))}
                      {dayTasks.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayTasks.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Upcoming Tasks */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Upcoming Tasks</h3>
        {tasks.filter(task => task.dueDate && !task.completed).length === 0 ? (
          <Card className="p-6 text-center bg-gradient-card border-0">
            <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No upcoming tasks</p>
          </Card>
        ) : (
          tasks
            .filter(task => task.dueDate && !task.completed)
            .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
            .slice(0, 5)
            .map(task => (
              <Card key={task.id} className="p-4 bg-gradient-card border-0 shadow-task">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
                          {task.category}
                        </Badge>
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  <Flag className={`w-4 h-4 ${
                    task.priority === 'urgent' ? 'text-task-urgent' :
                    task.priority === 'high' ? 'text-task-high' :
                    task.priority === 'medium' ? 'text-task-medium' : 'text-task-low'
                  }`} />
                </div>
              </Card>
            ))
        )}
      </div>
    </div>
  );
};

export default CalendarView;