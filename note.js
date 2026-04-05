document.addEventListener('DOMContentLoaded', () => {
            const titleInput = document.getElementById('note-title');
            const textInput = document.getElementById('note-text');
            const saveBtn = document.getElementById('save-btn');
            const cancelBtn = document.getElementById('cancel-btn');
            const deleteBtn = document.getElementById('delete-btn');

            let notes = JSON.parse(localStorage.getItem('notes')) || [];
            const editingIndex = localStorage.getItem('editingIndex');

            if (editingIndex !== null) {
                const note = notes[editingIndex];
                titleInput.value = note.title;
                textInput.value = note.text;
                deleteBtn.style.display = 'inline-block';
            } else {
                deleteBtn.style.display = 'none';
            }

            saveBtn.onclick = () => {
                const newNote = { title: titleInput.value, text: textInput.value };
                if (editingIndex !== null) {
                    notes[editingIndex] = newNote;
                } else {
                    notes.push(newNote);
                }
                localStorage.setItem('notes', JSON.stringify(notes));
                window.location.href = 'index.html';
            };

            cancelBtn.onclick = () => {
                window.location.href = 'index.html';
            };

            deleteBtn.onclick = () => {
                if (editingIndex !== null) {
                    if (confirm('Удалить заметку?')) {
                        notes.splice(editingIndex, 1);
                        localStorage.setItem('notes', JSON.stringify(notes));
                        window.location.href = 'index.html';
                    }
                }
            };
        });