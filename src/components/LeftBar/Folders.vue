<template>
  <div class="grow w-full overflow-y-auto relative">
    <ul class="absolute inset-0">
      <li
        v-for="folder in folders"
        @click="toggleIsOpenFolder(folder.id)"
        :key="folder.id"
        class="px-2"
      >
        <Folder :folder="folder" />
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Folder from "./Folder.vue";

export default defineComponent({
  data() {
    return {
      folders: [
        {
          id: 1,
          name: "users",
          isOpen: false,
          requests: [
            {
              id: Date.now(),
              method: "GET",
              name: "get users",
              url: "https://jsonplaceholder.typicode.com/users",
            },
            {
              id: Date.now(),
              method: "GET",
              name: "get 2 users",
              url: "https://jsonplaceholder.typicode.com/users?_limit=2",
            },
          ],
        },
        {
          id: 2,
          name: "posts",
          isOpen: false,
          requests: [
            {
              id: Date.now(),
              method: "POST",
              name: "get users",
              url: "https://jsonplaceholder.typicode.com/users",
            },
            {
              id: Date.now(),
              method: "PATCH",
              name: "get 2 users",
              url: "https://jsonplaceholder.typicode.com/users?_limit=2",
            },
            {
              id: Date.now(),
              method: "DELETE",
              name: "get 2 users",
              url: "https://jsonplaceholder.typicode.com/users?_limit=2",
            },
          ],
        },
        {
          id: 3,
          name: "todos",
          isOpen: false,
          requests: [
            {
              id: Date.now(),
              method: "POST",
              name: "get users",
              url: "https://jsonplaceholder.typicode.com/users",
            },
            {
              id: Date.now(),
              method: "PATCH",
              name: "get 2 users",
              url: "https://jsonplaceholder.typicode.com/users?_limit=2",
            },
            {
              id: Date.now(),
              method: "DELETE",
              name: "get 2 users",
              url: "https://jsonplaceholder.typicode.com/users?_limit=2",
            },
          ],
        },
        {
          id: 4,
          name: "users",
          isOpen: false,
          requests: [
            {
              id: Date.now(),
              method: "GET",
              name: "get users",
              url: "https://jsonplaceholder.typicode.com/users",
            },
            {
              id: Date.now(),
              method: "GET",
              name: "get 2 users",
              url: "https://jsonplaceholder.typicode.com/users?_limit=2",
            },
          ],
        },
        {
          id: 5,
          name: "posts",
          isOpen: false,
          requests: [
            {
              id: Date.now(),
              method: "POST",
              name: "get users",
              url: "https://jsonplaceholder.typicode.com/users",
            },
            {
              id: Date.now(),
              method: "PATCH",
              name: "get 2 users",
              url: "https://jsonplaceholder.typicode.com/users?_limit=2",
            },
            {
              id: Date.now(),
              method: "DELETE",
              name: "get 2 users",
              url: "https://jsonplaceholder.typicode.com/users?_limit=2",
            },
          ],
        },
        {
          id: 6,
          name: "todos",
          isOpen: false,
          requests: [
            {
              id: Date.now(),
              method: "POST",
              name: "get users",
              url: "https://jsonplaceholder.typicode.com/users",
            },
            {
              id: Date.now(),
              method: "PATCH",
              name: "get 2 users",
              url: "https://jsonplaceholder.typicode.com/users?_limit=2",
            },
            {
              id: Date.now(),
              method: "DELETE",
              name: "get 2 users",
              url: "https://jsonplaceholder.typicode.com/users?_limit=2",
            },
          ],
        },
      ],
    };
  },
  methods: {
    toggleIsOpenFolder(id) {
      const currentFolder = this.folders.find((folder) => folder.id === id);
      currentFolder.isOpen = !currentFolder.isOpen;
    },
  },
  components: { Folder },
});
</script>
