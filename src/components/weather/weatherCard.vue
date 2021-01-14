<template>
  <div id="he-plugin-standard"></div>
</template>

<script>
export default {
  name: "hWeather",
  mounted() {
    this.load();
  },
  methods: {
    load() {
      window.WIDGET = {
        CONFIG: {
          layout: 1,
          width: "400", //通过css 样式覆盖宽度达到适配效果
          height: "126",
          background: 1,
          dataColor: "FFFFFF",
          borderRadius: 5,
          modules: "10",
          key: "42e0b4f842e0402c9ec66a1ea0726d3b"
        }
      };

      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0";
      document.getElementsByTagName("head")[0].appendChild(script);
    }
  }
};
</script>
