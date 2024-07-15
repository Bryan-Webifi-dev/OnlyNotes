/*********************************************************************
 * @module Task
 * @version 1.0.0
 *********************************************************************/

import React, { useState } from 'react';
import { Box, Checkbox, Stack, Text, Button, Input } from '@chakra-ui/react';
import { useTask, Task as TaskType } from 'hooks/useTask';

interface TaskProps {
  tasks: TaskType[];
}

const Task: React.FC<TaskProps> = ({ tasks: initialTasks }) => {
  const { tasks, toggleTaskCompletion, addTask } = useTask(initialTasks);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask('');
    }
  };

  return (
    <Box>
      <Box p={4} mb={4}>
        <Stack direction="row" alignItems="center">
          <Input
            placeholder="New task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            mr={2}
          />
          <Button onClick={handleAddTask} colorScheme="blue">Add Task</Button>
        </Stack>
      </Box>
      {tasks.map((task) => (
        <Box key={task.id} p={4} borderWidth="1px" borderRadius="lg" mb={2}>
          <Stack direction="row" alignItems="center">
            <Checkbox
              isChecked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <Text as={task.completed ? 'del' : 'span'} fontSize="md">{task.text}</Text>
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export { Task };
