<template>
  <div class="tc-notes-wrapper">
    <add-new-button @addNote="addNote"/>
    <div class="tc-notes">
      <note v-for="(note, index) in notes" :note="note" :key="index"
            @deleteNote="deleteNote"
            @noteUpdated="noteUpdated"/>
    </div>
  </div>
</template>

<script>
  import AddNewButton from "./AddNewButton";
  import Note from "./Note";
  import notesService from "../services/notes.service";


  export default {
    name: "NotesPage",
    components: {Note, AddNewButton},
    data() {
      return {
        notes: []
      }
    },
    methods: {
      async addNote() {
        const {status, data} = await notesService.create({title: '', body: ''})
        if (status === 201) {
          this.notes.unshift(data);
        }
      },
      async noteUpdated(note) {
  try {
    const response = await notesService.update(note);
    if (response.status === 200) {
      const index = this.notes.findIndex(n => n.id === note.id);
      if (index !== -1) {
        this.notes[index] = response.data;
      }
    }
  } catch (error) {
    
    console.error(error);
  }
},
      async deleteNote(note) {
        const {status} = await notesService.delete(note.id);
        if (status === 204) {
          this.notes.splice(this.notes.indexOf(note), 1);
        }
      }
    },
    async mounted() {
      const {status, data} = await notesService.get('note');
      if (status === 200) {
        this.notes = data;
      }
    }
  }
</script>

<style lang="scss">
  .tc-notes-wrapper {
    padding-top: 30px;

    .tc-notes {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin: 0 auto;
    }
  }
</style>