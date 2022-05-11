import Notes from "./classes/Notes.js";
import View from "./classes/View.js";

const app = document.getElementById("app");
const view = new View(app, {
  onAddNote() {
    console.log("Note has been added.");
  },
  onNoteEdit(newTitle, newContent) {
    console.log("Note has been edited.", newTitle, newContent);
  },
});