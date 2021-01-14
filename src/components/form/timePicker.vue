<template>
  <div class="time-picker">
    <van-field
      readonly
      clickable
      name="datetimePicker"
      :value="currentValue"
      :label="label"
      :placeholder="placeholder"
      @click="showPicker = true"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        type="time"
        :max-hour="maxHour"
        :max-minute="maxMinute"
        :min-hour="minHour"
        :min-minute="minMinute"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "timePicker",
  props: {
    value: {},
    label: { type: String, default: "选择时间" },
    placeholder: { type: String, default: "请选择时间" },
    maxHour: { default: 23 },
    maxMinute: { default: 59 },
    minHour: { default: 0 },
    minMinute: { default: 0 }
  },
  data() {
    return {
      showPicker: false,
      currentValue: ""
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        this.currentValue = v;
      }
    }
  },
  methods: {
    onConfirm(time) {
      this.$emit("input", time);
      this.$emit("change", time);
      this.showPicker = false;
    }
  }
};
</script>

<style scoped></style>
