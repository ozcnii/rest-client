<template>
  <prism-editor
    class="my-editor rounded-md"
    v-model="body"
    :highlight="highlighter"
    line-numbers
  />
</template>

<script>
import { defineComponent } from "vue";
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-json";
import { mapGetters, mapMutations } from "vuex";

export default defineComponent({
  components: {
    PrismEditor,
  },

  beforeMount() {
    // const body = this.getBody;
    // if (body) {
    //   this.body = body;
    // }
  },

  data() {
    return {
      body: "{}",
    };
  },
  methods: {
    highlighter(body) {
      return highlight(body, languages.json);
    },

    saveBody() {
      this.setBody(this.body);
      localStorage.setItem("body", JSON.stringify(this.body));
    },

    ...mapMutations(["setBody"]),
  },

  watch: {
    body: {
      handler() {
        this.saveBody();
      },
      deep: true,
    },
  },

  computed: {
    ...mapGetters(["getBody"]),
  },
});
</script>

<style>
.my-editor {
  background-color: var(--second-bg-color);
  color: #ccc;
  font-family: Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
