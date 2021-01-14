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
        ref="cascader"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @change="onChange"
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
      this.currentLabel = this.getValue(this.columns, this.value);
    },
    getValue(columns, value, index = 0) {
      if (!columns || !columns.length) {
        return "";
      }
      let result = "";
      columns.forEach(column => {
        if (column.value === value[index]) {
          if (value[index + 1]) {
            result =
              column.text +
              "/" +
              this.getValue(column.children, value, index + 1);
          } else {
            result = column.text;
          }
        }
      });
      return result;
    },
    onConfirm(v) {
      this.showPicker = false;
      let arr = [];
      let values = this.$refs.cascader.getValues();
      values.forEach(item => {
        arr.push(item.value);
      });
      this.$emit("input", arr);
    },
    onChange(e) {
      this.$emit("onChange", e);
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
