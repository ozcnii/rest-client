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

      <Button class="button rounded-l-none"> Send </Button>
    </form>
  </div>
</template>

<script>
import Input from "./UI/Input.vue";
import Select from "./UI/Select.vue";
import Button from "./UI/Button.vue";
import { mapState, mapMutations, mapActions } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Input,
    Select,
    Button,
  },

  beforeMount() {
    const url = localStorage.getItem("url");
    if (url) {
      this.setUrl(url);
      this.getRrequest();
    }
  },

  methods: {
    ...mapMutations(["setMethod", "setUrl"]),
    ...mapActions(["getRrequest"]),
  },

  computed: {
    ...mapState(["httpMethods", "method", "url"]),
  },

  watch: {
    url() {
      localStorage.setItem("url", this.url);
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

.header-wrapper {
  z-index: 1;
  background-color: var(--main-bg-color);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
</style>
