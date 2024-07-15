/*********************************************************************
 * @module Task
 * @version 1.0.0
 *********************************************************************/

import React, { useState } from 'react';
import { Box, Checkbox, Stack, Text, Button, Input, IconButton, useColorModeValue } from '@chakra-ui/react';
import { FaTrashCan } from "react-icons/fa6";
import { useTask, Task as TaskType } from 'hooks/useTask';

interface TaskProps {
  tasks: TaskType[];
}

const Task: React.FC<TaskProps> = ({ tasks: initialTasks }) => {
  const { tasks, toggleTaskCompletion, addTask, deleteTask } = useTask(initialTasks);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask('');
    }
  };

  const taskBgColor = useColorModeValue('blackAlpha.100', 'blackAlpha.200');
  const taskTextColor = useColorModeValue('black', 'white');
  const taskIconColor = useColorModeValue('black', 'white');

  return (
    <Box  p={4}>
      <Box mb={4}>
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
        <Box key={task.id} py={"1"} px={"3"} borderWidth="1px" borderRadius="lg" mb={2} bg={taskBgColor}>
          <Stack direction="row" alignItems="center">
            <Checkbox
              isChecked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <Text as={task.completed ? 'del' : 'span'} fontSize="md" color={taskTextColor}>{task.text}</Text>
            <IconButton
              aria-label="Delete task"
              icon={<FaTrashCan />}
              size="sm"
              onClick={() => deleteTask(task.id)}
              ml="auto"
              bg="transparent"
              color={taskIconColor}
              _hover={{
                color: 'red.500',
              }}
            />
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export { Task };

