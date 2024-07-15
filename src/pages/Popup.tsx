/*********************************************************************
 * @module Popup
 * @author Bryan Shea
 * @version 1.0.0
 *********************************************************************/
import React from 'react';
import { ChakraProvider, Box, Heading, Stack, Button, Wrap, Tag } from '@chakra-ui/react';
import theme from '../theme';
import { NoteList, NoteModal, SearchBar, Settings, Menu } from 'components';
import { usePopup } from 'hooks';

/**
 * Popup component
 * @return {React.FC} Popup component
 */
const Popup: React.FC = () => {
  const {
    categories,
    addCategory,
    removeCategory,
    folders,
    addFolder,
    removeFolder,
    notes,
    saveNote,
    updateNote,
    removeNote,
    size,
    colorMode,
    changeSize,
    toggleColorMode,
    searchQuery,
    setSearchQuery,
    selectedTags,
    toggleTagSelection,
    filteredNotes,
    handleNoteClick,
    handleCreateNote,
    selectedNote,
    isOpen,
    onOpen,
    onClose,
    isCreating,
  } = usePopup();

  return (
    <ChakraProvider theme={theme}>
      <Box padding={4} width={size.width} height={size.height} minWidth="400px" minHeight="600px">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Heading size="md" marginBottom={4}>OnlyNotes</Heading>
          <Stack direction="row" spacing={4} marginBottom={4}>
            <Settings changeSize={changeSize} toggleColorMode={toggleColorMode} colorMode={colorMode} />
            <Button onClick={handleCreateNote} colorScheme="blue" size="sm">
              Create Note
            </Button>
            <Menu
              categories={categories}
              addCategory={addCategory}
              removeCategory={removeCategory}
              folders={folders}
              addFolder={addFolder}
              removeFolder={removeFolder}
            />
          </Stack>
        </Stack>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Wrap spacing={2} marginTop={4}>
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
        <Box marginTop={4}>
          <NoteList notes={filteredNotes} onNoteClick={handleNoteClick} />
        </Box>
        <NoteModal
          categories={categories}
          folders={folders}
          saveNote={saveNote}
          updateNote={updateNote}
          deleteNote={() => removeNote(selectedNote!.note, selectedNote!.category, selectedNote!.tags, selectedNote!.folder)}
          note={selectedNote?.note}
          category={selectedNote?.category}
          tags={selectedNote?.tags}
          folder={selectedNote?.folder}
          isOpen={isOpen}
          onClose={onClose}
        />
        {isCreating && (
          <NoteModal
            categories={categories}
            folders={folders}
            saveNote={saveNote}
            updateNote={updateNote}
            deleteNote={() => {}}
            isOpen={isOpen}
            onClose={onClose}
          />
        )}
      </Box>
    </ChakraProvider>
  );
};

export default Popup;
