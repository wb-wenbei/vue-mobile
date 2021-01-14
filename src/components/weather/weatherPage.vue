<template>
  <div id="tp-weather-widget-page"></div>
</template>

<script>
export default {
  name: "WeatherPage",
  mounted() {
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
        location: "WX4FBXXFKE4F",
        geolocation: true,
        language: "zh-Hans",
        unit: "c",
        theme: "auto",
        token: "70c00750-5b13-4d31-ae6f-5ad7e1e6f6e0",
        hover: "always",
        container: "tp-weather-widget-page"
      });
    }
  }
};
</script>

<style scoped lang="less">
#tp-weather-widget-page {
  text-align: left;

  ::v-deep {
    .sc-fBuWsC,
    .dsFvTw {
      width: 100%;
    }
    .sw-ui-brand {
      display: none;
    }

    .bRmqwc {
      width: 70%;
    }

    .sw-card-slim-container {
      width: 100%;
    }

    .dfDWUQ {
      width: 100%;
      left: 0;
      top: 0;
    }
  }
}
</style>
