<template>
  <div class="sign-card">
    <div class="sign-point">
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
        <div class="point">{{ signPoint }}</div>
        <div class="style-sub-text">我的积分</div>
      </div>
      <div class="btn">
        <van-popover
          v-model="signPopover"
          placement="top"
          theme="dark"
          trigger="click"
        >
          <div class="pop-content">签到领积分+15</div>
          <template #reference>
            <van-button class="default-btn" size="small" @click="onSign">
              签到
            </van-button>
          </template>
        </van-popover>
      </div>
    </div>
  </div>
</template>

<script>
import { toDateFormat } from "@/filters/timeFormat";
const ONE_DAY = 1000 * 3600 * 24;

export default {
  name: "signCard",
  data() {
    return {
      signPoint: 4000,
      signPopover: false,
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
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      /*let dataList = await API();
      dataList.forEach(item => {
        this.signList.push({
          id: 1,
          active: true,
          time: toDateFormat(, "MM-dd"),
          showPopover: false,
          popContent: "无排班"
        });
      });*/
    },
    onSign() {}
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
</style>
