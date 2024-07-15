# OnlyNotes

OnlyNotes is a powerful, user-friendly Chrome extension designed to help you organize your thoughts seamlessly. With features like category and folder management, tag selection, and a clean UI, OnlyNotes makes note-taking and organization effortless.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Categories and Folders**: Organize your notes into categories and folders for easy navigation.
- **Tagging**: Add tags to your notes for better categorization and quick search.
- **Search**: Quickly find notes with a powerful search feature.
- **Dark Mode**: Toggle between light and dark modes for comfortable viewing.
- **Resizable UI**: Adjust the extension size to fit your needs.

## Installation

To install the OnlyNotes extension, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/OnlyNotes.git
   ```

2. **Navigate to the project directory**:
   ```sh
   cd OnlyNotes
   ```

3. **Install dependencies**:
   ```sh
   npm install
   ```

4. **Build the project**:
   ```sh
   npm run build
   ```

5. **Load the extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" by toggling the switch in the top right corner.
   - Click "Load unpacked" and select the `public` directory from the project.

## Usage

After installing the OnlyNotes extension:

1. Click the OnlyNotes icon in the Chrome toolbar to open the popup.
2. Use the "Create Note" button to add new notes.
3. Organize your notes using categories and folders from the settings menu.
4. Use the search bar to quickly find notes.
5. Toggle between light and dark modes using the settings menu.

## Project Structure

The project is structured as follows:

```
- .gitignore
- dist
  - components
    - CategoryDrawer.js
    - index.js
    - inputs
      - index.js
      - SearchBar.js
      - TagInput.js
    - menu
      - index.js
      - Menu.js
    - modals
      - index.js
      - NoteModal.js
    - notes
      - index.js
      - NoteForm.js
      - NoteItem.js
      - NoteList.js
    - settings
      - index.js
      - Settings.js
  - hooks
    - index.js
    - useCategories.js
    - useFolders.js
    - useNotes.js
    - usePopup.js
    - useUIState.js
  - icon.png
  - index.js
  - manifest.json
  - pages
    - Popup.js
  - popup.html
  - theme.js
  - utils
    - storage.js
- public
  - icon.png
  - index.js
  - index.js.LICENSE.txt
  - manifest.json
  - popup.html
- src
  - components
    - index.ts
    - inputs
      - index.ts
      - SearchBar.tsx
      - TagInput.tsx
    - menu
      - index.ts
      - Menu.tsx
    - modals
      - index.ts
      - NoteModal.tsx
    - notes
      - index.ts
      - NoteForm.tsx
      - NoteItem.tsx
      - NoteList.tsx
    - settings
      - index.ts
      - Settings.tsx
  - hooks
    - index.ts
    - useCategories.ts
    - useFolders.ts
    - useNotes.ts
    - usePopup.ts
    - useUIState.ts
  - index.tsx
  - pages
    - Popup.tsx
  - theme.ts
  - utils
    - storage.ts
- tsconfig.json
- webpack.config.js
```

## Development

To contribute to OnlyNotes or set it up for local development:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/OnlyNotes.git
   ```

2. **Navigate to the project directory**:
   ```sh
   cd OnlyNotes
   ```

3. **Install dependencies**:
   ```sh
   npm install
   ```

4. **Start the development server**:
   ```sh
   npm start
   ```

5. **Build the project**:
   ```sh
   npm run build
   ```

### Important Commands

- `npm start`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm test`: Runs the test suite.

## Contributing

We welcome contributions to OnlyNotes! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---
