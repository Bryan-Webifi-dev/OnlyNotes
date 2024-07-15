/*********************************************************************
 * @module Popup
 * @version 1.0.0
 *********************************************************************/
import React, { useState } from 'react';
import { ChakraProvider, Box, Heading, Stack, Button, Wrap, Tag } from '@chakra-ui/react';
import theme from '../theme';
import { NoteList, NoteModal, Menu, Task, CustomTabs, SearchBar } from 'components';
import { usePopup } from 'hooks';

/**
 * Popup component
 * @return {React.FC} Popup component
 */
const Popup: React.FC = () => {
  const {
    notes,
    saveNote,
    updateNote,
    removeNote,
    tasks,
    size,
    changeSize,
    selectedTags,
    toggleTagSelection,
    filteredNotes,
    handleNoteClick,
    handleCreateNote,
    selectedNote,
    isOpen,
    onClose,
    isCreating,
  } = usePopup();
  const [currentTab, setCurrentTab] = useState<string>('notes');

  return (
    <ChakraProvider theme={theme}>
      <Box padding={3} width={size.width} height={size.height} minWidth="400px" borderRadius="md">
        <Stack direction="row" alignItems="stretch" justifyContent="space-between" w="100%">
          <Stack direction="row" spacing={6} alignItems="center" justifyContent="space-between" w="100%">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              marginTop={4}
            >
              <CustomTabs
                currentTab={currentTab}
                onTabChange={setCurrentTab}
                noteCount={filteredNotes.length}
                taskCount={tasks.length}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={4}
              marginBottom={4}
            >
              <Button onClick={handleCreateNote} colorScheme="blue" size="sm">
                Create Note
              </Button>
              <Menu 
                changeSize={changeSize}
              />
            </Stack>
          </Stack>
        </Stack>
        {currentTab === 'notes' && (
          <>
            <Wrap spacing={2} marginTop={1}>
              {Array.from(new Set(notes.flatMap(note => note.tags))).map(tag => (
                <Tag
                  key={tag}
                  size="sm"
                  borderRadius="full"
                  variant="solid"
                  colorScheme={selectedTags.includes(tag) ? "blue" : "gray"}
                  cursor="pointer"
                  onClick={() => toggleTagSelection(tag)}
                >
                  {tag}
                </Tag>
              ))}
            </Wrap>
            <Box marginTop={1}>
              <NoteList notes={filteredNotes} onNoteClick={handleNoteClick} />
            </Box>
            <NoteModal
              saveNote={saveNote}
              updateNote={(oldNote, newNote, tags) => updateNote(oldNote, newNote, tags)}
              deleteNote={() => removeNote(selectedNote!.note, selectedNote!.tags)}
              note={selectedNote?.note}
              tags={selectedNote?.tags}
              isOpen={isOpen}
              onClose={onClose}
            />
            {isCreating && (
              <NoteModal
                saveNote={saveNote}
                updateNote={(oldNote, newNote, tags) => updateNote(oldNote, newNote, tags)}
                deleteNote={() => {}}
                isOpen={isOpen}
                onClose={onClose}
              />
            )}
          </>
        )}
        {currentTab === 'tasks' && (
          <Task tasks={tasks} />
        )}
        <Box
          position="absolute"
          bottom={4}
          left={4}
          color="gray.500"
          textAlign="left"
        >
          <Heading size="md">OnlyNotes</Heading>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Popup;
