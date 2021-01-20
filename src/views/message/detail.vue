<template>
  <div class="message-detail">
    <div class="common-card">
      <div class="style-title">环卫大队门口集合</div>
      <div class="style-sub-title">2020-01-01 08:20</div>
      <div class="content">
        样例文案：太的科技（上海太的信息科技有限公司）是国内专业的物联网
      </div>
    </div>
  </div>
</template>

<script>
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
      this.data = {};
    }
  }
};
</script>

<style scoped lang="less">
.message-detail {
  padding: 0 @padding-md;

  .common-card {
    & > .style-title {
      margin-bottom: @margin-xs;
    }

    & > .style-sub-title {
      margin-bottom: @margin-xs;
    }
  }
}
</style>
