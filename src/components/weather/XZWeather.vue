<template>
  <div id="tp-weather-widget"></div>
</template>

<script>
export default {
  name: "XZWeather",
  created() {
    this.load();
  },
  methods: {
    load() {
      (function(a, h, g, f, e, d, c, b) {
        b = function() {
          d = h.createElement(g);
          c = h.getElementsByTagName(g)[0];
          d.src = e;
          d.charset = "utf-8";
          d.async = 1;
          c.parentNode.insertBefore(d, c);
        };
        a["SeniverseWeatherWidgetObject"] = f;
        a[f] ||
          (a[f] = function() {
            (a[f].q = a[f].q || []).push(arguments);
          });
        a[f].l = +new Date();
        if (a.attachEvent) {
          a.attachEvent("onload", b);
        } else {
          a.addEventListener("load", b, false);
        }
      })(
        window,
        document,
        "script",
        "SeniverseWeatherWidget",
        "//cdn.sencdn.com/widget2/static/js/bundle.js?t=" +
          parseInt((new Date().getTime() / 100000000).toString(), 10)
      );
      window.SeniverseWeatherWidget("show", {
        flavor: "bubble",
        location: "WTW3SJ5ZBJUY",
        geolocation: true,
        language: "zh-Hans",
        unit: "c",
        theme: "auto",
        token: "70c00750-5b13-4d31-ae6f-5ad7e1e6f6e0",
        hover: "always",
        container: "tp-weather-widget"
      });
    }
  }
};
</script>
