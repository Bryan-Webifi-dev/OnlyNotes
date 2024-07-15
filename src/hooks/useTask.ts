import { useState } from 'react';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const useTask = (initialTasks: Task[]) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

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

  return {
    tasks,
    toggleTaskCompletion,
    addTask,
  };
};

export { useTask };

