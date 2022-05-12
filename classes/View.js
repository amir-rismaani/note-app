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

    const { onAddNote, onNoteEdit } = handler;
    this.onAddNote = onAddNote;
    this.onNoteEdit = onNoteEdit;
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
    const noteElement = `
    <li class="sidebar__note note" data-note-id="${id}">
      <h2 class="note__title">${title}</h2>
      <p class="note__content">
      ${content.length > MAX_LENGTH_CONTENT ? "..." : ""}
      </p>
      <p class="note__meta">${new Date(updated).toLocaleString("fa", {
        dateStyle: "full",
        timeStyle: "short",
      })}</p>
    </li>
    `;
    return noteElement;
  }

  updateNoteLists(notes) {
    const notesContainer = this.root.querySelector(".sidebar__notes");
    notesContainer.innerHTML = "";
    let noteLists = "";
    notes.forEach((note) => {
      noteLists += this.#createNoteElement(note);
    });
    notesContainer.innerHTML = noteLists;
  }
}
