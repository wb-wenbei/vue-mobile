<template>
  <div
    class="form-picker"
    :class="showBottomBorder ? 'show-bottom-border' : ''"
  >
    <van-field
      readonly
      clickable
      name="picker"
      v-model="currentLabel"
      v-bind="$attrs"
      v-on="$listeners"
      :label="label"
      :placeholder="placeholder"
      @click="showPicker = true"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "picker",
  props: {
    value: {},
    columns: {},
    label: { type: String, default: "选择器" },
    placeholder: { type: String, default: "点击选择" },
    showBottomBorder: { type: Boolean, default: true }
  },
  data() {
    return {
      showPicker: false,
      currentValue: "",
      currentLabel: ""
    };
  },
  watch: {
    value() {
      this.load();
    },
    columns: {
      deep: true,
      handler() {
        this.load();
      }
    }
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.currentValue = this.value;
      this.currentLabel = "";
      this.columns.forEach(column => {
        if (column.value === this.value) {
          this.currentLabel = column.text;
        }
      });
    },
    onConfirm(v) {
      this.showPicker = false;
      this.$emit("input", v.value);
      this.$emit("change", v);
    }
  }
};
</script>

<style lang="less">
.form-picker.show-bottom-border {
  .van-cell::after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 16px;
    border-bottom: 1px solid #ebedf0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
</style>
