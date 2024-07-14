import React, { useState } from 'react';
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, Input, useDisclosure, Box, FormControl, FormLabel, VStack, IconButton, } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
const Menu = ({ categories, addCategory, removeCategory, folders, addFolder, removeFolder }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [newCategory, setNewCategory] = useState('');
    const [newFolder, setNewFolder] = useState('');
    const handleAddCategory = () => {
        if (newCategory.trim()) {
            addCategory(newCategory.trim());
            setNewCategory('');
        }
    };
    const handleAddFolder = () => {
        if (newFolder.trim()) {
            addFolder(newFolder.trim());
            setNewFolder('');
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { onClick: onOpen, size: "sm", fontSize: "sm" }, "Menu"),
        React.createElement(Drawer, { isOpen: isOpen, placement: "right", onClose: onClose },
            React.createElement(DrawerOverlay, null,
                React.createElement(DrawerContent, null,
                    React.createElement(DrawerCloseButton, null),
                    React.createElement(DrawerHeader, null, "Menu"),
                    React.createElement(DrawerBody, { display: "flex", flexDirection: "column", justifyContent: "space-between", height: "calc(100% - 4rem)" },
                        React.createElement(FormControl, null,
                            React.createElement(FormLabel, null, "New Category"),
                            React.createElement(Input, { placeholder: "New category", value: newCategory, onChange: (e) => setNewCategory(e.target.value), bg: "white", boxShadow: "md", textColor: "black", _placeholder: { color: 'gray.500' } }),
                            React.createElement(Button, { onClick: handleAddCategory, marginTop: 2 }, "Add Category")),
                        React.createElement(FormControl, { marginTop: 4 },
                            React.createElement(FormLabel, null, "New Folder"),
                            React.createElement(Input, { placeholder: "New folder", value: newFolder, onChange: (e) => setNewFolder(e.target.value), bg: "white", boxShadow: "md", textColor: "black", _placeholder: { color: 'gray.500' } }),
                            React.createElement(Button, { onClick: handleAddFolder, marginTop: 2 }, "Add Folder")),
                        React.createElement(VStack, { align: "stretch", marginTop: 4, spacing: 4 },
                            React.createElement(Box, null,
                                React.createElement(FormLabel, null, "Categories"),
                                categories.map((category, index) => (React.createElement(Box, { key: index, display: "flex", alignItems: "center", justifyContent: "space-between", padding: 2, borderWidth: "1px", borderRadius: "md", marginTop: 2 },
                                    category,
                                    React.createElement(IconButton, { "aria-label": "Remove category", icon: React.createElement(DeleteIcon, null), size: "sm", colorScheme: "red", onClick: () => removeCategory(index) }))))),
                            React.createElement(Box, { marginTop: 4 },
                                React.createElement(FormLabel, null, "Folders"),
                                folders.map((folder, index) => (React.createElement(Box, { key: index, display: "flex", alignItems: "center", justifyContent: "space-between", padding: 2, borderWidth: "1px", borderRadius: "md", marginTop: 2 },
                                    folder,
                                    React.createElement(IconButton, { "aria-label": "Remove folder", icon: React.createElement(DeleteIcon, null), size: "sm", colorScheme: "red", onClick: () => removeFolder(index) }))))))))))));
};
export default Menu;
