<template>
  <div class="credits-content">
    <div class="credits-card">
      <div class="card-header">
        <div class="credits"><span>4000</span> 积分</div>
        <div class="credits-btn">
          <van-button size="mini" color="white" @click="toExchange">
            积分兑换
          </van-button>
        </div>
      </div>
      <div class="card-status">
        <div class="button">
          <div class="button-content">
            {{ detail.hasReport ? "已签到" : "未签到" }}
          </div>
        </div>
      </div>
      <div class="card-description">
        今日{{ detail.hasReport ? "已签到" : "未签到" }}，目前项目排名{{
          detail.sort
        }}
      </div>
    </div>
    <div class="common-card">
      <page-list :api="pageAPI" :params="params">
        <template #default="{ item }">
          <div class="credit-item">
            <div class="item-header">
              <div>
                {{ item.time || "08:04:33" }} {{ item.title || "上班签到" }}
              </div>
              <div class="header-right">+15积分</div>
            </div>
            <div class="item-date style-sub-text">
              {{ item.date || "2020-01-02" }}
            </div>
          </div>
        </template>
      </page-list>
    </div>
  </div>
</template>

<script>
import { pageAPI } from "../../api/credits";
import PageList from "@/components/pageList";

export default {
  name: "Credits",
  components: { PageList },
  data() {
    return {
      pageAPI,
      params: {},
      detail: {
        credits: 4000,
        hasReport: true,
        sort: 142
      }
    };
  },
  methods: {
    toExchange() {
      this.$router.push({ path: "/credits/exchange" });
    }
  }
};
</script>

<style scoped lang="less">
.credits-content {
  .credits-card {
    color: white;
    background: @gradient-green;
    padding: @padding-sm @padding-md;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .credits {
        span {
          font-size: @font-size-lg;
          font-weight: bold;
        }
      }

      .credits-btn {
        button {
          background: transparent !important;
          border-radius: @border-radius-md;
        }
      }
    }

    .card-status {
      display: flex;
      justify-content: center;
      margin: @margin-sm;

      .button {
        height: 110px;
        width: 110px;
        padding: 10px;
        border-radius: 55px;
        background: rgba(255, 255, 255, 0.3);
        color: @blue;
        font-size: @font-size-xl;
        font-weight: bold;

        .button-content {
          height: 90px;
          width: 90px;
          border-radius: 45px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.9);
        }
      }
    }
  }

  .common-card {
    margin: @margin-sm @margin-md;

    .credit-item {
      margin-bottom: @margin-sm;

      .item-header {
        display: flex;
        justify-content: space-between;
        padding: @padding-base 0;

        .header-right {
          color: @orange;
        }
      }

      .item-date {
        text-align: right;
      }
    }
  }
}
</style>
