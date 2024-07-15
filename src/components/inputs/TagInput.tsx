/**
 * @module TagInput
 * @description Input for adding tags
 */
import React, { useState } from 'react';
import { Input, Box, IconButton, Tag, TagLabel, TagCloseButton, Wrap } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

/**
 * @typedef TagInputProps
 * @property {string[]} tags - The list of tags
 * @property {(tags: string[]) => void} setTags - Function to set tags
 */
type TagInputProps = {
  tags: string[];
  setTags: (tags: string[]) => void;
};

/**
 * Input for adding tags
 * @param {TagInputProps} props - The component properties
 */
const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <Box>
      <Input
        placeholder="Add a tag"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addTag()}
        bg="white"
        boxShadow="md"
        textColor="black" 
        _placeholder={{ color: 'gray.500' }}      
      />
      <IconButton icon={<AddIcon />} onClick={addTag} marginTop={2} aria-label={''} />
      <Wrap spacing={2} marginTop={2}>
        {tags.map(tag => (
          <Tag key={tag} size="sm" borderRadius="full" variant="solid" colorScheme="blue" boxShadow="md">
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton onClick={() => removeTag(tag)} />
          </Tag>
        ))}
      </Wrap>
    </Box>
  );
};

export { TagInput };
