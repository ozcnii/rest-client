<template>
  <div class="flex grow flex-col gap-3">
    <Button @click="addQueryParam"> add query params </Button>

    <div v-if="!params?.length" class="flex justify-center">
      No query params
    </div>

    <div class="relative overflow-y-auto h-full w-full">
      <div class="list-wrapper">
        <div class="flex flex-col gap-3 items-center">
          <div v-for="param in params" :key="param.id">
            <div class="flex gap-3 px-2">
              <Input class="w-5/12" placeholder="param" v-model="param.key" />
              <Input class="w-6/12" placeholder="value" v-model="param.value" />
              <Button class="min-w-2/12" @click="deleteQueryParam(param.id)"
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
      params: [],
    };
  },

  beforeMount() {
    const params = this.getParams;
    if (params) {
      this.params = params;
    }
  },

  methods: {
    addQueryParam() {
      this.params.push({
        key: "",
        value: "",
        id: Date.now(),
      });
    },

    deleteQueryParam(id) {
      this.params = this.params.filter((param) => param.id !== id);
    },
    saveParams() {
      this.setParams(this.params);
      localStorage.setItem("params", JSON.stringify(this.params));
    },

    ...mapMutations(["setParams"]),
  },

  watch: {
    params: {
      handler() {
        this.saveParams();
      },
      deep: true,
    },
  },

  computed: {
    ...mapGetters(["getParams"]),
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
