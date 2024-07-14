// src/components/TagInput.tsx

import React, { useState } from 'react';
import { Input, Box, IconButton, Tag, TagLabel, TagCloseButton, Wrap } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

type TagInputProps = {
  tags: string[];
  setTags: (tags: string[]) => void;
};

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
      />
      <IconButton icon={<AddIcon />} onClick={addTag} marginTop={2} aria-label={''} />
      <Wrap spacing={2} marginTop={2}>
        {tags.map(tag => (
          <Tag key={tag} size="sm" borderRadius="full" variant="solid" colorScheme="blue">
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton onClick={() => removeTag(tag)} />
          </Tag>
        ))}
      </Wrap>
    </Box>
  );
};

export default TagInput;
