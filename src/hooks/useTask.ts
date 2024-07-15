import { useState, useEffect } from 'react';
import { getStorageData, setStorageData } from '../utils/storage';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const useTask = (initialTasks: Task[]) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    getStorageData('tasks', (data) => {
      if (data) setTasks(data);
    });
  }, []);

  useEffect(() => {
    setStorageData('tasks', tasks);
  }, [tasks]);

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = (text: string) => {
    const newTask: Task = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return {
    tasks,
    toggleTaskCompletion,
    addTask,
    deleteTask,
  };
};

export { useTask };

