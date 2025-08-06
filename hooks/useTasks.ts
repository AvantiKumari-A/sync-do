import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, TaskFormData } from '@/types/task';

const STORAGE_KEY = 'tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      console.log('Loading tasks from storage...');
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        console.log('Loaded tasks from storage:', parsedTasks.length);
        setTasks(parsedTasks);
      } else {
        console.log('No tasks found in storage');
        setTasks([]);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async (updatedTasks: Task[]) => {
    try {
      console.log('Saving tasks to storage:', updatedTasks.length);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
      console.log('Tasks saved to storage, updating state...');
      setTasks(updatedTasks);
      console.log('State updated with new tasks');
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const createTask = async (taskData: TaskFormData): Promise<string> => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = [...tasks, newTask];
    await saveTasks(updatedTasks);
    return newTask.id;
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, ...updates } : task
    );
    await saveTasks(updatedTasks);
  };

  const deleteTask = async (id: string) => {
    console.log('Deleting task:', id);
    console.log('Current tasks before deletion:', tasks.length);
    const updatedTasks = tasks.filter(task => task.id !== id);
    console.log('Tasks after deletion:', updatedTasks.length);
    await saveTasks(updatedTasks);
    console.log('Task deletion completed');
  };

  const toggleTaskStatus = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      await updateTask(id, { 
        status: task.status === 'open' ? 'complete' : 'open' 
      });
    }
  };

  const getTaskById = (id: string): Task | undefined => {
    return tasks.find(task => task.id === id);
  };

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    getTaskById,
    loadTasks,
  };
}