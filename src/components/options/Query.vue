<template>
  <div class="flex grow flex-col gap-3">
    <Button @click="addQuery"> add query </Button>

    <div v-if="!queries?.length" class="flex justify-center">
      No query params
    </div>

    <div class="relative overflow-y-auto h-full w-full">
      <div class="query-list-wrapper">
        <div class="flex flex-col gap-3 items-center">
          <div v-for="query in queries" :key="query.id">
            <div class="flex gap-3 px-2">
              <Input class="w-5/12" placeholder="key" v-model="query.key" />
              <Input class="w-6/12" placeholder="value" v-model="query.value" />
              <Button class="min-w-2/12" @click="deleteQuery(query.id)"
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
      queries: [],
    };
  },

  beforeMount() {
    const queries = this.getQueries;
    if (queries) {
      this.queries = queries;
    }
  },

  methods: {
    addQuery() {
      this.queries.push({
        key: "",
        value: "",
        id: Date.now(),
      });
    },

    deleteQuery(id) {
      this.queries = this.queries.filter((query) => query.id !== id);
    },
    saveQueries() {
      this.setQueries(this.queries);
      localStorage.setItem("queries", JSON.stringify(this.queries));
    },

    ...mapMutations(["setQueries"]),
  },

  watch: {
    queries: {
      handler() {
        this.saveQueries();
      },
      deep: true,
    },
  },

  computed: {
    ...mapGetters(["getQueries"]),
  },
});
</script>

<style scoped>
.hr {
  background-color: var(--border-color);
  height: 2px;
}

.query-list-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
</style>
