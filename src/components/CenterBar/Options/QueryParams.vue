<template>
  <div class="flex grow flex-col gap-3">
    <Button @click="addQueryParam" class="bg-main-color"> add query params </Button>

    <div v-if="!params?.length" class="flex justify-center">No query params</div>

    <div class="relative overflow-y-auto h-full w-full">
      <div class="list-wrapper">
        <div class="flex flex-col gap-3 items-center">
          <div v-for="param in params" :key="param.id">
            <div class="flex gap-3 px-2">
              <Input class="w-5/12" placeholder="param" v-model="param.key" />
              <Input class="w-6/12" placeholder="value" v-model="param.value" />
              <Button class="min-w-2/12 bg-main-color" @click="deleteQueryParam(param.id)"
                >✖</Button
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
import Input from "@/components/UI/Input.vue";
import { mapGetters, mapMutations } from "vuex";
import { defineComponent } from "vue";
import Button from "@/components/UI/Button.vue";
import { Mutations } from "../../../store.old/mutations";
import { nanoid } from "nanoid";

export default defineComponent({
  components: {
    Input,
    Button,
  },

  mounted() {
    const params = this.getActiveRequest?.params;
    if (params) this.params = params;
    else this.params = this.getNotActiveRequest?.params || [];
  },

  data() {
    return {
      params: [],
    };
  },

  methods: {
    addQueryParam() {
      this.params.push({
        key: "",
        value: "",
        id: nanoid(),
      });
    },

    deleteQueryParam(id) {
      this.params = this.params.filter((param) => param.id !== id);
    },

    saveParams() {
      const newRequest = {
        ...this.getActiveRequest,
        params: this.params,
      };
      this[Mutations.SAVE_REQUEST](newRequest);
      this[Mutations.SET_ACTIVE_REQUEST](newRequest);
    },

    saveNotActiveRequestParams() {
      const request = { ...this.getNotActiveRequest, params: this.params };
      this[Mutations.SET_NOT_ACTIVE_REQUEST](request);
    },

    ...mapMutations([
      `${Mutations.SAVE_REQUEST}`,
      `${Mutations.SET_ACTIVE_REQUEST}`,
      `${Mutations.SET_NOT_ACTIVE_REQUEST}`,
    ]),
  },

  watch: {
    params: {
      handler() {
        if (this.getActiveRequest) this.saveParams();
        else this.saveNotActiveRequestParams();
      },
      deep: true,
    },

    getActiveRequest: {
      handler(value) {
        const params = value?.params;
        if (params) this.params = params;
        else this.params = [];
      },
      deep: true,
    },
  },

  computed: {
    ...mapGetters(["getActiveRequest", "getNotActiveRequest"]),
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
