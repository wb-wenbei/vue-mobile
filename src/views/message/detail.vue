<template>
  <div class="message-detail">
    <div class="style-title">
      {{ data.articleTitle || "--" }}
    </div>
    <div class="style-sub-title">{{ data.createTime | formatDateTime }}</div>
    <div class="content" v-html="data.articleContent"></div>
  </div>
</template>

<script>
import { pageAPI, articleIsReadAPI } from "@/api/message";

export default {
  name: "detail",
  data() {
    return {
      readTimeout: null,
      data: {}
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      let id = this.$route.query.id;
      pageAPI({ isWeb: false, page: 1, pageSize: 10, id: id }).then(res => {
        this.data = res.data[0];
        this.isRead();
      });
    },
    isRead() {
      this.readTimeout = setTimeout(() => {
        let id = this.$route.query.id;
        articleIsReadAPI({ articleId: id });
      }, 3000);
    }
  },
  beforeDestroy() {
    if (this.readTimeout) {
      clearTimeout(this.readTimeout);
    }
  }
};
</script>

<style scoped lang="less">
.message-detail {
  padding: @padding-md;

  & > .style-title {
    margin-bottom: @margin-xs;
  }

  & > .style-sub-title {
    margin-bottom: @margin-xs;
  }

  .content {
    text-align: left;
  }
}
</style>
