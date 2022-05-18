import Notes from "./Notes.js";
import View from "./View.js";

export default class App {
  constructor(root) {
    this.view = new View(root, this.#handlers());
    this.notes = [];
    this.activeNote = null;
    this.#refreshNotes();
  }

  #refreshNotes() {
    // Set notes
    this.notes = Notes.getAllNotes();
    this.view.updateNoteLists(this.notes);

    // Set active note
    this.view.notesInputContainerVisibility(this.notes.length > 0);
    this.activeNote = this.notes[0];
    this.view.updateActiveNote(this.activeNote);
  }

  #handlers() {
    const _this = this;
    return {
      onAddNote() {
        const newNote = {
          title: "یک عنوان اضافه کنید...",
          content: "یک محتوا اضافه کنید...",
        };
        Notes.save(newNote);
        _this.#refreshNotes();
      },
      onNoteEdit(newTitle, newContent) {
        _this.activeNote.title = newTitle;
        _this.activeNote.content = newContent;
        Notes.save(_this.activeNote);
        _this.#refreshNotes();
      },
      onNoteSelect(noteId) {
        _this.activeNote = _this.#getNoteById(noteId);
        _this.view.updateActiveNote(_this.activeNote);
      },
      onNoteDelete(noteId) {
        console.log("Note has been deleted.", noteId);
      },
    };
  }

  #getNoteById(id) {
    return this.notes.find((note) => note.id == id);
  }
}
