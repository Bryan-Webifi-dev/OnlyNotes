// src/components/CategoryDrawer.tsx
import React, { useState } from 'react';
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, Input, useDisclosure, Box, FormControl, FormLabel, VStack, IconButton, } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
const CategoryDrawer = ({ categories, addCategory, removeCategory }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [newCategory, setNewCategory] = useState('');
    const handleAddCategory = () => {
        if (newCategory.trim()) {
            addCategory(newCategory.trim());
            setNewCategory('');
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { onClick: onOpen, leftIcon: React.createElement(AddIcon, null) }, "Manage Categories"),
        React.createElement(Drawer, { isOpen: isOpen, placement: "left", onClose: onClose },
            React.createElement(DrawerOverlay, null,
                React.createElement(DrawerContent, null,
                    React.createElement(DrawerCloseButton, null),
                    React.createElement(DrawerHeader, null, "Manage Categories"),
                    React.createElement(DrawerBody, null,
                        React.createElement(FormControl, null,
                            React.createElement(FormLabel, null, "New Category"),
                            React.createElement(Input, { placeholder: "New category", value: newCategory, onChange: (e) => setNewCategory(e.target.value) }),
                            React.createElement(Button, { onClick: handleAddCategory, marginTop: 2 }, "Add Category")),
                        React.createElement(VStack, { align: "stretch", marginTop: 4 }, categories.map((category, index) => (React.createElement(Box, { key: index, display: "flex", alignItems: "center", justifyContent: "space-between", padding: 2, borderWidth: "1px", borderRadius: "md" },
                            category,
                            React.createElement(IconButton, { "aria-label": "Remove category", icon: React.createElement(DeleteIcon, null), size: "sm", colorScheme: "red", onClick: () => removeCategory(index) })))))))))));
};
export default CategoryDrawer;
