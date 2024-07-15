import React, { useState } from 'react';
import { ChakraProvider, Box, Heading, Stack, Button, IconButton, Wrap, Tag, Tooltip } from '@chakra-ui/react';
import { NoteList, NoteModal, Settings, Menu, Task, CustomTabs, FolderModal } from 'components';
import { FiFilePlus, FiFolderPlus } from "react-icons/fi";
import theme from '../theme';
import { usePopup } from 'hooks';

const Popup: React.FC = () => {
  const {
    folders,
    addFolder,
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
  const [isFolderModalOpen, setFolderModalOpen] = useState<boolean>(false);

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
              <Tooltip label="Add folder" aria-label="Add folder">
                <IconButton
                  aria-label="Add folder"
                  icon={<FiFolderPlus />}
                  onClick={() => setFolderModalOpen(true)}
                  variant="outline"
                />
              </Tooltip>
              <Tooltip label="Add note" aria-label="Add note">
                <IconButton
                  aria-label="Add note"
                  icon={<FiFilePlus />}
                  onClick={handleCreateNote}
                  variant="outline"
                />
              </Tooltip>
              <Settings changeSize={changeSize} />
              <Menu folders={folders} />
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
              folders={folders}
              saveNote={saveNote}
              updateNote={updateNote}
              deleteNote={() => removeNote(selectedNote!.note, selectedNote!.tags, selectedNote!.folder)}
              note={selectedNote?.note}
              tags={selectedNote?.tags}
              folder={selectedNote?.folder}
              isOpen={isOpen}
              onClose={onClose}
            />
            {isCreating && (
              <NoteModal
                folders={folders}
                saveNote={saveNote}
                updateNote={updateNote}
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
        <FolderModal
          addFolder={addFolder}
          isOpen={isFolderModalOpen}
          onClose={() => setFolderModalOpen(false)}
        />
        <Box
          position="fixed"
          bottom={4}
          right={2}
          color="gray.500"
          bg="whiteAlpha.900"
          width="auto"
          textAlign="right"
          zIndex={999}
          px={2}
        >
          <Heading size="sm">OnlyNotes</Heading>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Popup;
