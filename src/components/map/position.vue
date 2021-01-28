<template>
  <div class="position-content">
    <van-cell is-link>
      <template #icon>
        <van-icon :name="editIcons.position" size="20px" />
      </template>
      <template #title>
        <span class="custom-title">{{ address }}</span>
      </template>
      <template #right-icon>
        <van-icon :name="editIcons.edit" size="20px" @click="mapShow = true" />
      </template>
    </van-cell>
    <van-popup v-model="mapShow" :style="{ height: '100%', width: '100%' }">
      <div class="map-content">
        <div class="header"></div>
        <div class="map" id="position-map"></div>
        <van-button
          class="btn"
          size="small"
          type="primary"
          @click="mapShow = false"
        >
          完成
        </van-button>
        <div class="address-picker">
          <van-picker :columns="addressList" @change="onConfirm" />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import AMap from "AMap";

export default {
  name: "position",
  props: {
    value: {},
    location: { type: Boolean, default: true } // true:开启定位,false:不开启定位
  },
  data() {
    return {
      editIcons: {
        edit: require("@/assets/icons/edit@3x.png"),
        position: require("@/assets/icons/address.png")
      },
      mapShow: true,
      showPicker: false,
      map: null,
      center: [],
      marker: null,
      address: "",
      addressList: []
    };
  },
  watch: {
    address(v) {
      if (v !== "未获取到位置信息，请手动选择") {
        this.$emit("getAddress", v);
      }
    }
  },
  created() {
    let userInfo = this.$store.state.userInfo;
    if (userInfo && userInfo.location) {
      this.center = [userInfo.location.lng, userInfo.location.lat];
    }
    if (this.value && this.value.lng && this.value.lat) {
      this.center = [this.value.lng, this.value.lat];
    }
  },
  mounted() {
    this.loadMap();
  },
  methods: {
    loadMap() {
      this.map = new AMap.Map("position-map", {
        zoom: 15,
        resizeEnable: true
      });
      if (this.center && this.center.length) {
        this.map.setCenter(this.center);
      }
      this.center = this.map.getCenter();
      this.marker = new AMap.Marker({
        position: this.center
      });
      this.map.add(this.marker);
      this.map.on("mapmove", this.mapMove);
      this.map.on("moveend", this.mapMoveEnd);

      if (this.location) {
        this.getPosition();
      }
    },
    getPosition() {
      AMap.plugin("AMap.Geolocation", () => {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 5000,
          buttonOffset: new AMap.Pixel(10, 20),
          zoomToAccuracy: true,
          useNative: true,
          buttonPosition: "RB"
        });

        this.map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", data => {
          this.center = data.position;
          this.mapMoveEnd();
        });
        AMap.event.addListener(geolocation, "error", data => {
          this.$toast("无法获取您的位置：" + JSON.stringify(data));
        });
      });
    },
    getAddress(position) {
      AMap.plugin("AMap.Geocoder", () => {
        let geocoder = new AMap.Geocoder({
          city: "010"
        });
        geocoder.getAddress(position, (status, result) => {
          if (status === "complete" && result.info === "OK") {
            this.address = result.regeocode.formattedAddress;
            this.addressList = [
              { text: this.address, value: this.address, location: position }
            ];
          } else {
            this.address = "未获取到位置信息，请手动选择";
          }
        });
        this.mapSearch(this.center);
      });
    },
    mapSearch(cpoint) {
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        let placeSearch = new AMap.PlaceSearch({
          pageSize: 10,
          pageIndex: 1,
          extensions: "base",
          autoFitView: true
        });

        placeSearch.searchNearBy("", cpoint, 200, (status, result) => {
          if (status === "complete" && result.info === "OK") {
            let addressList = [];
            result.poiList.pois.forEach(v => {
              if (v.address) {
                addressList.push({
                  text: v.address,
                  value: v.address,
                  location: v.location
                });
              }
            });
            this.addressList = [...this.addressList, ...addressList];
            this.showPicker = true;
          }
        });
      });
    },
    mapMove() {
      this.center = this.map.getCenter();
      this.marker.setPosition(this.center);
    },
    mapMoveEnd() {
      this.getAddress(this.center);
      this.marker.setAnimation("AMAP_ANIMATION_DROP");
      this.$emit("input", this.center);
    },
    onConfirm(v, data) {
      this.showPicker = false;
      this.address = data.value;
      this.center = data.location;
      this.marker.setPosition(this.center);
      this.marker.setAnimation("AMAP_ANIMATION_DROP");
      this.$emit("input", this.center);
    },
    getWebPosition() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.$toast(
              "位置：" + position.coords.latitude + position.coords.longitude
            );
          },
          err => {
            this.$toast("位置err：" + err.message);
          }
        );
      } else {
        this.$toast("地理位置服务不可用");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.map-content {
  height: 100%;
  position: relative;
  overflow: hidden;

  .header {
    height: 26px;
    background: @gradient-green;
  }

  .map {
    height: calc(100% - 250px);
    width: 100%;
  }

  .btn {
    position: absolute;
    top: 40px;
    right: 20px;
  }

  .address-picker {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 230px;
  }
}

::v-deep {
  .van-cell__title {
    padding: 0 8px;
    text-align: left;
  }
}
</style>
