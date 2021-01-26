<template>
  <div class="common-card" @click="rowClick(data)">
    <div class="item-content">
      <div class="content-title">
        <div class="item-image"></div>
        <div class="style-title">
          {{ data.articleTitle || "环卫大队门口集合" }}
        </div>
        <div class="style-sub-text">{{ data.createTime | formatDateTime }}</div>
      </div>
      <div class="content-detail">
        {{ data.description || "环卫大队门口集合，各位同事今天下午有事通知" }}
      </div>
    </div>
    <div class="item-icon" @click.stop="iconClick(data)">
      <svg-icon class="image-icon" :icon-class="iconClass" />
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageItem",
  props: {
    data: {},
    iconClass: { type: String, default: "arrow" }
  },
  methods: {
    iconClick(data) {
      this.$emit("iconClick", data);
    },
    rowClick(data) {
      this.$router.push({ path: "/message/detail", query: { id: data.id } });
    }
  }
};
</script>

<style scoped lang="less">
.common-card {
  overflow: hidden;
  display: flex;
  align-items: center;

  .item-image {
    height: 18px;
    width: 18px;
    background: url("../../../assets/icons/通知@3x.png") center / cover
      no-repeat;
    margin-right: @margin-base;
  }

  .item-content {
    min-width: 0;
    flex: 1;
    padding: 0 @padding-xs;

    .content-title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .style-title {
        flex: 1;
        min-width: 0;
        font-size: 14px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: @padding-xs;
      }
    }

    .content-detail {
      font-size: @font-size-sm;
      color: @gray-6;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-top: @padding-xs;
    }
  }

  .item-icon {
    .image-icon {
      font-size: 18px;
      color: @gray-6;
    }
  }
}
</style>
