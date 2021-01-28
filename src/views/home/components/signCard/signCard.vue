<template>
  <div class="sign-card">
    <div class="sign-point" v-if="showLine">
      <div
        v-for="item in signList"
        :key="item.id"
        class="sign-item"
        :class="item.active ? 'active' : ''"
      >
        <van-popover
          v-model="item.showPopover"
          placement="top"
          theme="dark"
          trigger="click"
        >
          <div class="pop-content">{{ item.popContent }}</div>
          <template #reference>
            <div class="sign-item-point"></div>
          </template>
        </van-popover>
        <div class="sign-item-content">{{ item.time }}</div>
      </div>
    </div>
    <div class="sign-detail">
      <div class="point">
        <div class="point">{{ signPoint.totalIntegral }}</div>
        <div class="style-sub-text">我的积分</div>
      </div>
      <div class="point">
        <div class="point">{{ signPoint.usableIntegral }}</div>
        <div class="style-sub-text">今日可领</div>
      </div>
      <div class="point">
        <div class="point">{{ signPoint.haveAccessToIntegral }}</div>
        <div class="style-sub-text">今日已领</div>
      </div>
      <div class="btn">
        <van-popover
          v-model="signPopover"
          placement="top"
          theme="dark"
          trigger="click"
        >
          <div v-if="disabled" class="pop-content">{{ tips }}</div>
          <template #reference>
            <van-button
              class="default-btn"
              size="small"
              :loading="loading"
              :disabled="disabled"
              loading-type="spinner"
              @click="onSign"
            >
              签到
            </van-button>
          </template>
        </van-popover>
      </div>
    </div>
    <van-dialog
      v-model="showSuccess"
      :show-confirm-button="false"
      className="sign-success"
    >
      <div class="common-card">
        <div class="sign-title">恭喜您，签到成功</div>
        <div class="sign-sub-title">上报健康情况即可再获得积分</div>
        <div>
          <van-button
            round
            color="#ee0a24"
            class="sign-btn"
            size="small"
            @click="showSuccess = false"
          >
            返 回
          </van-button>
        </div>
      </div>
      <div class="sign-image">
        <div class="sign-score">+5</div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { allowSignInAPI, signInAPI } from "@/api/credits";

import { toDateFormat } from "@/filters/timeFormat";

const ONE_DAY = 1000 * 3600 * 24;

export default {
  name: "signCard",
  props: {
    showLine: { type: Boolean, default: false },
    position: { type: Object }
  },
  data() {
    return {
      signPoint: {
        totalIntegral: 0,
        usableIntegral: 0,
        haveAccessToIntegral: 0
      },
      disabled: true,
      loading: true,
      tips: "",
      signPopover: false,
      showSuccess: false,
      signList: [
        {
          id: 1,
          active: true,
          time: toDateFormat(Date.now() - 2 * ONE_DAY, "MM-dd"),
          showPopover: false,
          popContent: "无排班"
        },
        {
          id: 2,
          active: false,
          time: toDateFormat(Date.now() - ONE_DAY, "MM-dd"),
          showPopover: false,
          popContent: "无排班"
        },
        {
          id: 3,
          active: true,
          time: "今天",
          showPopover: false,
          popContent: "无排班"
        },
        {
          id: 4,
          active: false,
          time: "明天",
          showPopover: false,
          popContent: "有排班"
        },
        {
          id: 5,
          active: false,
          time: toDateFormat(Date.now() + 2 * ONE_DAY, "MM-dd"),
          showPopover: false,
          popContent: "有排班"
        }
      ]
    };
  },
  watch: {
    position: {
      deep: true,
      handler() {
        this.allowSign();
      }
    }
  },
  methods: {
    allowSign() {
      this.loading = true;
      allowSignInAPI(this.position)
        .then(res => {
          this.signPoint = res;
          switch (res.signInStatus) {
            case 1:
              this.disabled = false;
              break;
            case 2:
              this.disabled = true;
              this.tips = "无法签到！";
              break;
            case 3:
              this.disabled = true;
              this.tips = "已签到！";
              break;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onSign() {
      signInAPI({ location: this.position })
        .then(() => {
          this.showSuccess = true;
          this.allowSign();
        })
        .catch(err => {
          this.$toast.fail("签到失败：" + err);
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="less">
.sign-card {
  .sign-point {
    display: flex;
  }

  .sign-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .sign-item:nth-child(1n + 2)::before {
    content: "";
    position: absolute;
    width: calc(100% - 10px);
    height: 1px;
    top: 9px;
    right: calc(50% + 5px);
    background: @blue;
  }

  .sign-item:nth-child(1n + 4)::before {
    background: @gray-6;
  }

  .sign-item-point {
    height: 10px;
    width: 10px;
    position: relative;
    border-radius: 5px;
    border: 1px solid @gray-6;
    margin: @margin-base 0;
  }

  .active .sign-item-point {
    border: 1px solid @blue;
  }

  .active .sign-item-point::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    height: 4px;
    width: 4px;
    border-radius: 3px;
    background: @blue;
  }

  .sign-item-content {
    font-size: @font-size-sm;
    margin-bottom: @margin-xs;
    color: @gray-6;
  }

  .sign-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: @padding-xs @padding-lg;

    .point {
      font-size: 24px;
    }

    .default-btn {
      padding: 0 @padding-md;
      border-radius: @border-radius-md;
    }
  }
}

.pop-content {
  font-size: @font-size-xs;
  padding: 2px 6px 4px;
}

::v-deep {
  .van-popover__content {
    border-radius: 0;
  }
}

.sign-success {
  padding: 0;
  background: transparent;

  .common-card {
    height: 340px;
    margin: 12px;
    padding-top: 240px;

    .sign-title {
      font-size: @font-size-xl;
      font-weight: bold;
      color: @red;
      padding-bottom: @padding-base;
    }

    .sign-sub-title {
      font-size: @font-size-md;
      color: @gray-6;
      padding-bottom: @padding-xs;
    }

    .sign-btn {
      padding: @padding-base @padding-lg;
    }
  }

  .sign-image {
    position: absolute;
    top: 12px;
    height: 260px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("../../../../assets/images/sign_success.png") center /
      contain no-repeat;

    .sign-score {
      font-size: 48px;
      color: #fcce30;
      padding-top: 56px;
    }
  }
}
</style>
