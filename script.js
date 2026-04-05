document.addEventListener('DOMContentLoaded', () => {
    const notesGrid = document.getElementById('notes-grid');
    const newNoteBtn = document.getElementById('new-note-btn');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    function renderNotes() {
        notesGrid.innerHTML = '';
        if (notes.length === 0) {
            notesGrid.innerHTML = '<p>Заметок пока нет. Создайте первую!</p>';
            return;
        }
        notes.forEach((note, index) => {
            const noteEl = document.createElement('div');
            noteEl.className = 'note-card';
            noteEl.innerHTML = `
                        <h2>${note.title || 'Без названия'}</h2>
                        <p>${note.text.slice(0, 100)}${note.text.length > 100 ? '...' : ''}</p>
                    `;
            noteEl.onclick = () => {
                localStorage.setItem('editingIndex', index);
                window.location.href = 'note.html';
            };
            notesGrid.appendChild(noteEl);
        });
    }

    newNoteBtn.onclick = () => {
        localStorage.removeItem('editingIndex');
        window.location.href = 'note.html';
    };

    renderNotes();
});