<template>
  <div class="credits-content">
    <div class="credits-card">
      <div class="card-header">
        <div class="credits">
          <span>{{ detail.totalIntegral }}</span> 积分
        </div>
        <div class="credits-btn">
          <van-button size="mini" color="white" @click="toExchange">
            积分兑换
          </van-button>
        </div>
      </div>
      <div class="card-status">
        <div class="button">
          <div class="button-content">
            {{ detail.isSignIn === 1 ? "已签到" : "未签到" }}
          </div>
        </div>
      </div>
      <div class="card-description">
        今日{{ detail.isSignIn === 1 ? "已签到" : "未签到" }}，
        <span v-if="detail.signInNumber > 0">
          还可签到{{ detail.signInNumber }}次，
        </span>
        目前项目排名{{ detail.rank }}
      </div>
    </div>
    <div class="credit-card">
      <page-list :api="pageAPI" :params="params" :dataFilter="dataFilter">
        <template #default="{ item }">
          <div class="credit-item-date" v-if="item.type === 'date'">
            {{ item.date | formatDate }}
          </div>
          <div v-else class="credit-item">
            <div class="item-header">
              <div>
                {{ item.createTime | formatTime }}
                {{ item.integralTypeName || "--" }}
              </div>
              <div class="header-right">
                <span v-if="item.integralChange > 0">+</span
                >{{ item.integralChange }}积分
              </div>
            </div>
            <!--<div class="item-date style-sub-text">
              {{ item.createTime | formatDate }}
            </div>-->
          </div>
        </template>
      </page-list>
    </div>
  </div>
</template>

<script>
import { pageAPI, getIntegralSumAPI } from "../../api/credits";
import PageList from "@/components/pageList";
import { toDateFormat } from "@/filters/timeFormat";

export default {
  name: "Credits",
  components: { PageList },
  data() {
    return {
      pageAPI,
      params: {},
      detail: {
        rank: 2,
        signInDays: 1,
        signInNumber: 0,
        totalIntegral: 110
      }
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      getIntegralSumAPI().then(res => {
        this.detail = res;
      });
    },
    toExchange() {
      this.$router.push({ path: "/credits/exchange" });
    },
    dataFilter(list) {
      for (let index = 0; index < list.length - 1; index++) {
        if (list[index].type !== "date") {
          if (index === 0) {
            list.unshift({
              type: "date",
              id: "date_" + index,
              date: list[index].createTime
            });
            index++;
          }
          console.log(
            toDateFormat(list[index].createTime),
            toDateFormat(list[index + 1].createTime)
          );
          if (
            toDateFormat(list[index].createTime) !==
            toDateFormat(list[index + 1].createTime)
          ) {
            list.splice(index + 1, 0, {
              type: "date",
              id: "date_" + index,
              date: list[index + 1].createTime
            });
            index++;
          }
        }
      }
      return list;
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

  .credit-card {
    margin: @margin-sm @margin-md;
    background: white;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);

    .credit-item-date {
      padding: @padding-sm @padding-md;
      text-align: left;
      background: rgba(0, 0, 0, 0.05);
      color: @gray-7;
      font-weight: bold;
    }

    .credit-item {
      border-top: 1px solid @gray-3;
      padding: @padding-xs @padding-md;

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
