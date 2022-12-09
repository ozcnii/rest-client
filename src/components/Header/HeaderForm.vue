<template>
  <div class="header-wrapper p-3">
    <WithActiveRequest v-if="requestStore.activeRequest" />
    <WithoutActiveRequest v-else />
  </div>
</template>

<script lang="ts" setup>
import { useRequestStore } from "@/store/request";

import WithActiveRequest from "@/components/Header/WithActiveRequest.vue";
import WithoutActiveRequest from "@/components/Header/WithoutActiveRequest.vue";

const requestStore = useRequestStore();
</script>
