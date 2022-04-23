<template>
  <div class="header-wrapper p-3">
    <form class="header-form flex" @submit.prevent="getRrequest">
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

      <Button
        @click="saveRequest"
        class="rounded-r-none rounded-l-none Options__item"
        >save</Button
      >
      <Button class="button rounded-l-none"> Send </Button>
    </form>
  </div>

  <SaveRequestModal v-if="isShowModal" @close="closeModal" />
</template>

<script>
import Input from "../UI/Input.vue";
import Select from "../UI/Select.vue";
import Button from "../UI/Button.vue";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { defineComponent } from "vue";
import { Mutations } from "../../store/mutations";
import SaveRequestModal from "./SaveRequestModal.vue";

export default defineComponent({
  components: {
    Input,
    Select,
    Button,
    SaveRequestModal,
  },

  data() {
    return {
      url: "",
      method: "GET",
      isShowModal: false,
    };
  },

  mounted() {
    this.url = this.getNotActiveRequest?.url || "";
    this.method = this.getNotActiveRequest?.method || "GET";
  },

  methods: {
    ...mapMutations([`${Mutations.SET_NOT_ACTIVE_REQUEST}`]),
    ...mapActions(["getRrequest"]),

    saveRequest() {
      if (this.url.trim()) {
        this.openModal();
      }
    },

    openModal() {
      this.isShowModal = true;
    },

    closeModal() {
      this.isShowModal = false;
    },

    setMethod(method) {
      this.method = method;
    },

    setUrl(url) {
      this.url = url;
    },

    saveNotActiveRequest() {
      const request = {
        ...this.getNotActiveRequest,
        url: this.url,
        method: this.method,
      };
      this[Mutations.SET_NOT_ACTIVE_REQUEST](request);
    },
  },

  computed: {
    ...mapGetters(["getNotActiveRequest"]),
    ...mapState(["httpMethods"]),
  },

  watch: {
    url: {
      handler() {
        this.saveNotActiveRequest();
      },
    },
    method: {
      handler() {
        this.saveNotActiveRequest();
      },
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
