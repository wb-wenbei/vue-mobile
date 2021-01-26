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
import { pageAPI } from "@/api/message";

export default {
  name: "detail",
  data() {
    return {
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
      });
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
