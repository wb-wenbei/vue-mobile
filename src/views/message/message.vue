<template>
  <div class="message-content">
    <page-list ref="page-list" :api="pageAPI" :params="params">
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
      params: { isWeb: false }
    };
  },
  watch: {
    "$store.state.noticeType": {
      immediate: true,
      handler(v) {
        this.params.isQueryNotRead = v === 1;
        if (this.$refs["page-list"]) {
          this.$refs["page-list"].onRefresh();
        }
      }
    }
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
  background: white;

  ::v-deep {
    .common-card {
      margin: 0 @margin-md;
      border-bottom: 1px solid @gray-4;
      box-shadow: none;
      border-radius: 0;
      padding: @padding-md 0;
    }
  }
}
</style>
