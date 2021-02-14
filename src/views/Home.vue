<template>
  <div class="home">
    <List msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import List from '../components/List.vue' // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    List
  }
})
</script>
