<template>
  <div class="header-wrapper p-3">
    <form class="header-form flex" @submit.prevent="getData">
      <Select
        class="select"
        :options="httpMethods"
        :default="method"
        @input="setMethod"
      />

      <Input
        :modelValue="url"
        @update:modelValue="setUrl"
        class="w-full rounded-r-none rounded-l-none"
        placeholder="URL"
      />

      <div class="flex">
        <Button
          type="button"
          @click="saveRequest"
          class="rounded-r-none rounded-l-none Options__item"
          >save</Button
        >
        <Button
          type="button"
          @click="clearActiveRequest"
          class="rounded-r-none rounded-l-none Options__item"
          >new</Button
        >
      </div>

      <Button class="button rounded-l-none"> Send </Button>
    </form>
  </div>
</template>

<script>
import Input from "../UI/Input.vue";
import Select from "../UI/Select.vue";
import Button from "../UI/Button.vue";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { defineComponent } from "vue";
import { Mutations } from "../../store/mutations";

export default defineComponent({
  components: {
    Input,
    Select,
    Button,
  },

  beforeMount() {
    this.url = this.getActiveRequest.url;
    this.method = this.getActiveRequest.method;
  },

  data() {
    return {
      url: "",
      method: "GET",
    };
  },

  methods: {
    saveRequest() {
      const newRequest = {
        ...this.getActiveRequest,
        method: this.method,
        url: this.url,
      };

      this[Mutations.SAVE_REQUEST](newRequest);
    },

    setMethod(method) {
      this.method = method;
    },

    setUrl(url) {
      this.url = url;
    },

    getData() {
      this.getRrequest();
      this.saveRequest();
    },

    clearActiveRequest() {
      this[Mutations.SET_ACTIVE_REQUEST](null);
    },

    ...mapMutations([
      `${Mutations.SAVE_REQUEST}`,
      `${Mutations.SET_ACTIVE_REQUEST}`,
    ]),
    ...mapActions(["getRrequest"]),
  },

  computed: {
    ...mapGetters(["getActiveRequest"]),
    ...mapState(["httpMethods"]),
  },

  watch: {
    getActiveRequest: {
      handler(value) {
        this.url = value?.url;
        this.method = value?.method;
      },
      deep: true,
    },
  },
});
</script>

<style scoped>
.select {
  width: 20%;
}

.button {
  width: 15%;
  background-color: var(--main-color);
}

.Options__item {
  background-color: var(--second-bg-color);
  border: 1px solid var(--border-color);
}

.header-wrapper {
  z-index: 1;
  background-color: var(--main-bg-color);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
</style>
