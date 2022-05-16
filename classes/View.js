export default class View {
  constructor(root, handler) {
    this.root = root;
    this.root.innerHTML = `
        <div class="sidebar">
            <h1 class="sidebar__title">یادداشت</h1>
            <ul class="sidebar__notes">
            </ul>
            <div class="sidebar__action">
            <button class="add-note" type="button">افزودن یادداشت</button>
            </div>
        </div>
        <main id="main">
            <div class="form-group">
            <input
                class="form-control input-title"
                type="text"
                placeholder="عنوان یادداشت"
            />
            <textarea
                class="form-control input-content"
                placeholder="محتوای یادداشت"
            ></textarea>
            </div>
        </main>
    `;

    const { onAddNote, onNoteEdit, onNoteSelect, onNoteDelete } = handler;
    this.onAddNote = onAddNote;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.onNoteDelete = onNoteDelete;
    const addNoteButton = this.root.querySelector(".add-note");
    const inputTitle = this.root.querySelector(".input-title");
    const inputContent = this.root.querySelector(".input-content");

    addNoteButton.addEventListener("click", () => {
      this.onAddNote();
    });

    [inputTitle, inputContent].forEach((input) => {
      input.addEventListener("blur", () => {
        const newInputTitle = inputTitle.value.trim();
        const newInputContent = inputContent.value.trim();
        this.onNoteEdit(newInputTitle, newInputContent);
      });
    });
  }

  #createNoteElement(noteObj) {
    const { id, title, content, updated } = noteObj;
    const MAX_LENGTH_CONTENT = 50;
    return `
      <li class="sidebar__note note" data-note-id="${id}">
        <div class="sidebar__header">
          <h2 class="note__title">${title}</h2>
          <span class="note__trash"><i class="fa fa-trash" aria-hidden="true"></i></span>
        </div>
        <p class="note__content">
        ${
          content.length > MAX_LENGTH_CONTENT
            ? content.substr(0, MAX_LENGTH_CONTENT)
            : content
        }
        ${content.length > MAX_LENGTH_CONTENT ? "..." : ""}
        </p>
        <p class="note__meta">${new Date(updated).toLocaleString("fa", {
          dateStyle: "full",
          timeStyle: "short",
        })}</p>
      </li>
    `;
  }

  updateNoteLists(notes) {
    const notesContainer = this.root.querySelector(".sidebar__notes");
    notesContainer.innerHTML = "";
    let noteLists = "";
    for (const note of notes) {
      noteLists += this.#createNoteElement(note);
    }
    notesContainer.innerHTML = noteLists;

    const noteItems = notesContainer.querySelectorAll(".sidebar__note");
    noteItems.forEach((noteItem) => {
      const noteId = noteItem.dataset.noteId;
      noteItem.addEventListener("click", () => {
        this.onNoteSelect(noteId);
      });

      noteItem
        .querySelector(".note__trash")
        .addEventListener("click", (event) => {
          event.stopPropagation();
          this.onNoteDelete(noteId);
        });
    });
  }

  updateActiveNote(note) {
    console.log(note, note.id);
    const notesElement = this.root.querySelectorAll(".sidebar__note");
    const activeNote = this.root.querySelector(`[data-note-id="${note.id}"]`);
    const inputTitle = this.root.querySelector(".input-title");
    const inputContent = this.root.querySelector(".input-content");

    notesElement.forEach((noteElement) =>
      noteElement.classList.remove("note--active")
    );

    activeNote.classList.add("note--active");
    inputTitle.value = note.title;
    inputContent.value = note.content;
  }
}
