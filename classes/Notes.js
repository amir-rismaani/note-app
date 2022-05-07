import Storage from "./Storage.js";

const notes = [
  {
    id: 1,
    title: "برنامه هفتگی",
    content: "محتوای برنامه هفتگی",
    updated: "2022-05-05T14:38:25.551Z",
  },
  {
    id: 2,
    title: "جلسات",
    content: "محتوای جلسات",
    updated: "2022-05-05T14:42:30.282Z",
  },
  {
    id: 3,
    title: "پروژه‌ها",
    content: "محتوای پروژه‌ها",
    updated: "2022-05-05T14:44:04.457Z",
  },
  {
    id: 4,
    title: "توسعه فردی",
    content: "محتوای توسعه فردی",
    updated: "2022-05-05T14:48:39.931Z",
  },
];

export default class Notes {
  static getAllNotes() {
    const noteItems = Storage.get("notes") || notes || [];
    return noteItems.sort((a, b) => {
      return new Date(a.updated) < new Date(b.updated) ? 1 : -1;
    });
  }

  static save(noteItem) {
    const notes = this.getAllNotes();
    const existNote = notes.find((note) => note.id === noteItem.id);
    const updateDate = new Date();
    if (existNote) {
      existNote.title = noteItem.title;
      existNote.content = noteItem.content;
      existNote.updated = updateDate.toISOString();
    } else {
      noteItem.id = updateDate.getTime();
      noteItem.updated = updateDate.toISOString();
      notes.unshift(noteItem);
    }

    Storage.set("notes", notes);
  }

  static delete(noteItem) {
    const notes = this.getAllNotes();
    const filterdNotes = notes.filter((note) => note.id !== noteItem.id);

    Storage.set("notes", filterdNotes);
  }
}
