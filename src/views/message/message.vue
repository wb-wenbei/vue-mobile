<template>
  <div class="message-content">
    <page-list :api="pageAPI" :params="params">
      <template #default="{ item }">
        <message-item :data="item" @iconClick="rowClick"></message-item>
      </template>
    </page-list>
  </div>
</template>

<script>
import PageList from "@/components/pageList";
import MessageItem from "./components/messageItem";

import { pageAPI } from "@/api/message";
export default {
  name: "message",
  components: { PageList, MessageItem },
  data() {
    return {
      pageAPI,
      params: {}
    };
  },
  methods: {
    rowClick(data) {
      this.$router.push({ path: "/message/detail", query: { id: data.id } });
    }
  }
};
</script>

<style scoped lang="less">
.message-content {
  padding: 0 @padding-md;
}
</style>
