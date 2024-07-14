document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('note');
    const saveBtn = document.getElementById('saveBtn');
    const categorySelect = document.getElementById('categorySelect');
    const newCategoryInput = document.getElementById('newCategory');
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    const savedNotesContainer = document.getElementById('savedNotes');
    const emptyState = document.getElementById('emptyState');
  
    addCategoryBtn.addEventListener('click', () => {
      const newCategory = newCategoryInput.value.trim();
      if (newCategory) {
        addCategoryToStorage(newCategory);
        newCategoryInput.value = '';
        displayCategories();
      }
    });
  
    saveBtn.addEventListener('click', () => {
      const note = noteInput.value.trim();
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
        chrome.storage.sync.set({ notes }, displaySavedNotes);
      });
    }
  
    function removeNoteFromStorage(index) {
      chrome.storage.sync.get('notes', (data) => {
        const notes = data.notes || [];
        notes.splice(index, 1);
        chrome.storage.sync.set({ notes }, displaySavedNotes);
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
        if (notes.length === 0) {
          emptyState.style.display = 'block';
        } else {
          emptyState.style.display = 'none';
          notes.forEach((noteObj, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note-item');
            noteElement.innerHTML = `
              <span class="note-category">${noteObj.category}:</span>
              <span class="note-content">${noteObj.note}</span>
              <span class="note-remove" data-index="${index}">✖</span>
            `;
            savedNotesContainer.appendChild(noteElement);
          });
  
          document.querySelectorAll('.note-remove').forEach(btn => {
            btn.addEventListener('click', (event) => {
              const index = event.target.getAttribute('data-index');
              removeNoteFromStorage(index);
            });
          });
        }
      });
    }
  
    displayCategories();
    displaySavedNotes();
  });
  