<template>
  <div class="event-report">
    <div class="common-card search">
      <van-field
        v-model="params.title"
        center
        clearable
        placeholder="请输入名称搜索"
      >
        <template #button>
          <van-button
            class="default-btn"
            size="mini"
            type="primary"
            icon="search"
          >
            筛选
          </van-button>
        </template>
      </van-field>
    </div>
    <page-list :api="pageAPI" :params="params">
      <template #default="{ item }">
        <div class="common-card">
          {{ item.id }}
        </div>
      </template>
    </page-list>
  </div>
</template>

<script>
import { pageAPI } from "@/api/eventReport";
import PageList from "@/components/pageList";

export default {
  name: "EventReport",
  components: { PageList },
  data() {
    return {
      pageAPI,
      params: {
        type: 1
      }
    };
  },
  watch: {
    "$store.state.eventType": {
      immediate: true,
      handler(v) {
        this.params.type = v;
      }
    }
  }
};
</script>

<style scoped lang="less">
.event-report {
  padding: 0 @padding-md;
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
