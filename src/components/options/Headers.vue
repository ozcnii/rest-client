<template>
  <div class="flex grow flex-col gap-3">
    <Button @click="addHeader"> add headers </Button>

    <div v-if="!headers?.length" class="flex justify-center">No headers</div>

    <div class="relative overflow-y-auto h-full w-full">
      <div class="list-wrapper">
        <div class="flex flex-col gap-3 items-center">
          <div v-for="header in headers" :key="header.id">
            <div class="flex gap-3 px-2">
              <Input class="w-5/12" placeholder="header" v-model="header.key" />
              <Input
                class="w-6/12"
                placeholder="value"
                v-model="header.value"
              />
              <Button class="min-w-2/12" @click="deleteHeader(header.id)"
                >x</Button
              >
            </div>
            <div class="mt-3 hr" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "../UI/Input.vue";
import { mapGetters, mapMutations } from "vuex";
import { defineComponent } from "vue";
import Button from "../UI/Button.vue";

export default defineComponent({
  components: {
    Input,
    Button,
  },

  data() {
    return {
      headers: [],
    };
  },

  beforeMount() {
    const headers = this.getHeaders;
    if (headers) {
      this.headers = headers;
    }
  },

  methods: {
    addHeader() {
      this.headers.push({
        key: "",
        value: "",
        id: Date.now(),
      });
    },

    deleteHeader(id) {
      this.headers = this.headers.filter((header) => header.id !== id);
    },
    saveHeaders() {
      this.setHeaders(this.headers);
      localStorage.setItem("headers", JSON.stringify(this.headers));
    },

    ...mapMutations(["setHeaders"]),
  },

  watch: {
    headers: {
      handler() {
        this.saveHeaders();
      },
      deep: true,
    },
  },

  computed: {
    ...mapGetters(["getHeaders"]),
  },
});
</script>

<style scoped>
.list-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
</style>
