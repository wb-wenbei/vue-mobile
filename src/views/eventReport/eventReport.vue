<template>
  <div class="event-report">
    <div class="common-card search">
      <van-field
        v-model="params.address"
        center
        clearable
        placeholder="请输入地址搜索"
      >
        <template #button>
          <van-button
            class="default-btn border-radius-md"
            size="mini"
            type="primary"
            icon="search"
            @click="search"
          >
            筛选
          </van-button>
        </template>
      </van-field>
    </div>
    <page-list ref="page-list" :api="getIssuesToHandleAPI" :params="params">
      <template #default="{ item }">
        <event-item :data="item" :is-finished="params.isFinished"></event-item>
      </template>
    </page-list>
    <div class="report-btn" @click.stop="toReport">
      <div class="report-icon"></div>
    </div>
  </div>
</template>

<script>
import { getIssuesToHandleAPI } from "@/api/eventReport";
import PageList from "@/components/pageList";
import EventItem from "./components/eventItem";

export default {
  name: "EventReport",
  components: { PageList, EventItem },
  data() {
    return {
      getIssuesToHandleAPI,
      params: {
        lng: "",
        lat: "",
        isFinished: false,
        facilityType: "",
        issueClassifyId: "",
        address: "",
        assignToOthersByMe: false // 我上报并且分配给别人的
      }
    };
  },
  watch: {
    "$store.state.eventType": {
      immediate: true,
      handler(v) {
        this.params.isFinished = v !== 1;
        if (this.$refs["page-list"]) {
          this.$refs["page-list"].onRefresh();
        }
      }
    },
    "$store.state.position": {
      immediate: true,
      handler(v) {
        this.params.lng = v.lng;
        this.params.lat = v.lat;
      }
    }
  },
  methods: {
    search() {
      this.$refs["page-list"].onRefresh();
    },
    toReport() {
      this.$router.push({ path: "/eventReport/eventAdd" });
    }
  }
};
</script>

<style scoped lang="less">
.event-report {
  position: relative;
  padding: 0 @padding-md;

  .report-btn {
    position: fixed;
    bottom: 66px;
    right: 16px;
    width: 54px;
    height: 54px;
    background: @gradient-green;
    border-radius: 28px;
    display: flex;
    justify-content: center;
    align-items: center;

    .report-icon {
      width: 28px;
      height: 28px;
      background: url("../../assets/icons/camera.png") center / cover;
    }
  }

  .report-btn:active {
    background: #129b9b;
  }
}
.select-content {
  border-radius: 4px;
  border: 1px solid white;
  display: flex;

  .select-item {
    height: 26px;
    line-height: 28px;
    font-size: 16px;
    padding: 0 12px;
    font-weight: bold;
    color: white;
    background: transparent;

    &.active {
      color: @blue;
      background: white;
    }
  }
}
.search {
  margin-bottom: 0;
  min-height: 40px;
  padding: @padding-base @padding-sm;

  ::v-deep {
    .van-field {
      padding: 0;
    }

    .van-field__control {
      background: @gray-2;
      border-radius: 12px;
      padding: 0 @padding-xs;
    }
    .van-button {
      margin-bottom: 4px;
    }
  }
}
</style>
