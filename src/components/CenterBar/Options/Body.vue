<template>
  <v-ace-editor v-model:value="body" lang="json" theme="tomorrow_night_bright" class="h-full rounded-md"
    :options="{ useWorker: true }" />
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";
import { Mutations } from "./../../../store/mutations";
import { VAceEditor } from "vue3-ace-editor";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright";

import ace from "ace-builds";
import workerJsonUrl from "ace-builds/src-noconflict/worker-json?url";
ace.config.setModuleUrl("ace/mode/json_worker", workerJsonUrl);

export default defineComponent({
  components: {
    VAceEditor,
  },

  mounted() {
    const body = this.getActiveRequest?.body;
    if (body) this.body = body;
    else {
      const body = this.getNotActiveRequest?.body;
      try {
        if (body)
          this.body = JSON.stringify(JSON.parse(body), null, this.jsonTabSize);
      } catch (error) {
        if (body) this.body = body;
      }
    }
  },

  data() {
    return {
      body: "{}",
      jsonTabSize: 2,
    };
  },

  methods: {
    saveBody() {
      const newRequest = {
        ...this.getActiveRequest,
        body: this.body,
      };

      this[Mutations.SAVE_REQUEST](newRequest);
      this[Mutations.SET_ACTIVE_REQUEST](newRequest);
    },

    saveNotActiveRequestBody() {
      const request = { ...this.getNotActiveRequest, body: this.body };
      this[Mutations.SET_NOT_ACTIVE_REQUEST](request);
    },

    ...mapMutations([
      `${Mutations.SAVE_REQUEST}`,
      `${Mutations.SET_ACTIVE_REQUEST}`,
      `${Mutations.SET_NOT_ACTIVE_REQUEST}`,
    ]),
  },

  watch: {
    body: {
      handler() {
        if (this.getActiveRequest) this.saveBody();
        else this.saveNotActiveRequestBody();
      },
    },
    getActiveRequest: {
      handler(value) {
        const body = value?.body;
        if (body) this.body = body;
        try {
          if (body)
            this.body = JSON.stringify(
              JSON.parse(body),
              null,
              this.jsonTabSize
            );
        } catch (error) {
          if (body) this.body = body;
        } finally {
          if (!body) this.body = "{}";
        }
      },
      deep: true,
    },
  },

  computed: {
    ...mapGetters(["getActiveRequest", "getNotActiveRequest"]),
  },
});
</script>
