document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('note');
    const saveBtn = document.getElementById('saveBtn');
    const categorySelect = document.getElementById('categorySelect');
    const newCategoryInput = document.getElementById('newCategory');
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    const savedNotesContainer = document.getElementById('savedNotes');
  
    addCategoryBtn.addEventListener('click', () => {
      const newCategory = newCategoryInput.value;
      if (newCategory) {
        addCategoryToStorage(newCategory);
        newCategoryInput.value = '';
        displayCategories();
      }
    });
  
    saveBtn.addEventListener('click', () => {
      const note = noteInput.value;
      const category = categorySelect.value;
      if (note && category) {
        saveNoteToStorage(note, category);
        noteInput.value = '';
        displaySavedNotes();
      }
    });
  
    function addCategoryToStorage(category) {
      chrome.storage.sync.get('categories', (data) => {
        const categories = data.categories || [];
        if (!categories.includes(category)) {
          categories.push(category);
          chrome.storage.sync.set({ categories });
        }
      });
    }
  
    function saveNoteToStorage(note, category) {
      chrome.storage.sync.get('notes', (data) => {
        const notes = data.notes || [];
        notes.push({ note, category });
        chrome.storage.sync.set({ notes });
      });
    }
  
    function displayCategories() {
      chrome.storage.sync.get('categories', (data) => {
        const categories = data.categories || [];
        categorySelect.innerHTML = '';
        categories.forEach((category) => {
          const option = document.createElement('option');
          option.value = category;
          option.textContent = category;
          categorySelect.appendChild(option);
        });
      });
    }
  
    function displaySavedNotes() {
      chrome.storage.sync.get('notes', (data) => {
        const notes = data.notes || [];
        savedNotesContainer.innerHTML = '';
        notes.forEach((noteObj) => {
          const noteElement = document.createElement('div');
          noteElement.textContent = `${noteObj.category}: ${noteObj.note}`;
          savedNotesContainer.appendChild(noteElement);
        });
      });
    }
  
    displayCategories();
    displaySavedNotes();
  });
  