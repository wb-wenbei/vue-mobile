<template>
  <div class="home">
    <home-header :title="title" :leftArrow="false"></home-header>
    <div class="content">
      <div class="card"></div>
      <div class="card"></div>
      <div class="card">
        <div class="card-title style-title">员工关爱</div>
        <van-grid :border="false" :column-num="4">
          <van-grid-item v-for="menu in menus" :key="menu.id" :to="menu.link">
            <div class="menu-content" :style="{ background: menu.bgColor }">
              <svg-icon class="menu-icon" :icon-class="menu.icon" />
            </div>
            <div class="style-sub-title">{{ menu.title }}</div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <home-footer></home-footer>
  </div>
</template>

<script>
import HomeHeader from "@/components/header/header";
import HomeFooter from "@/components/footer/footer";
export default {
  name: "Home",
  components: { HomeHeader, HomeFooter },
  data() {
    return {
      title: "中航环卫",
      menus: [
        {
          id: 1,
          title: "健康上报",
          icon: "jiaosequanxian",
          link: "/healthReport",
          bgColor: "#F49541"
        },
        {
          id: 2,
          title: "积分兑换",
          icon: "jiaosequanxian",
          link: "/exchange",
          bgColor: "#F9C644"
        },
        {
          id: 3,
          title: "卫情上报",
          icon: "jiaosequanxian",
          link: "/eventReport",
          bgColor: "#28B893"
        }
      ]
    };
  }
};
</script>

<style scoped lang="less">
.home {
  height: 100%;
  padding-top: 46px;
  padding-bottom: 50px;
  background: #f2f2f2;

  .content {
    padding: 0 16px;
    height: 100%;
    overflow: auto;
  }

  .card {
    background: #ffffff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    margin: 16px 0;
    min-height: 60px;

    .card-title {
      text-align: left;
      padding: 16px;
    }

    .menu-content {
      width: 50px;
      height: 50px;
      padding: 8px;
      border-radius: 8px;
      margin-bottom: 8px;
      font-weight: bold;

      .menu-icon {
        width: 100%;
        height: 100%;
        color: white;
      }
    }

    ::v-deep {
      .van-grid-item__content {
        padding-top: 0;
      }
    }
  }
}
</style>
