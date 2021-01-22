import Vue from "vue";
import "./timeFormat";

Vue.filter("percent", (v, dot = 1) => {
  if (v == null || v === "") {
    return "--";
  }
  return (Number(v) * 100).toFixed(dot) + "%";
});

Vue.filter("distance", value => {
  if (!value && value !== 0) {
    return "--";
  }
  if (value > 1000) {
    return (value = parseFloat(value / 1000).toFixed(1) + "km");
  }
  if (value < 1000) {
    return (value = parseFloat(value).toFixed(0) + "m");
  }
});
