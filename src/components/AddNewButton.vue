<template>
  <button @click="addNote" class="new-note-btn">
     Add your notes here
  </button>

</template>

<script>
export default{
  name: "AddNewButton",
  methods: {
    addNote(){
      this.$emit('addNote');
    }
  }
}
</script>

<style lang="scss">
 .new-note-btn {
    width: 200px;
    display: block;
    margin: 0 auto 20px;
    background-color: #3bfa01;
    padding: 10px 32px;
    border: 1px solid #06f12d;
    font-size: 26px;
    outline: 0;
    transition: all 0.3s;
    cursor: pointer;
    font-family: 'Caveat', cursive;

    &:hover {
      box-shadow: 0 5px 7px rgba(0, 0, 0, 0.1);
    }

    &:active {
      position: relative;
      top: 1px;
    }
  }
</style>