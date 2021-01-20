<template>
  <div class="switch-content">
    <div
      v-for="item in options"
      :key="item.id"
      class="switch-item"
      :class="item.id === value ? 'active' : ''"
      @click="onChange(item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderSwitch",
  props: {
    value: {},
    options: {
      type: Array,
      default() {
        return [
          { id: 1, name: "待处理" },
          { id: 2, name: "已完成" }
        ];
      }
    }
  },
  methods: {
    onChange(item) {
      this.$emit("input", item.id);
      this.$emit("onChange", item);
    }
  }
};
</script>

<style scoped lang="less">
.switch-content {
  border-radius: 4px;
  border: 1px solid white;
  display: flex;

  .switch-item {
    height: 26px;
    line-height: 28px;
    font-size: 16px;
    padding: 0 12px;
    font-weight: bold;
    color: white;
    background: transparent;

    &.active {
      color: @blue;
      background: white;
    }
  }
}
</style>
