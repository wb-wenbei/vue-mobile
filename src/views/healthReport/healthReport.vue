<template>
  <div class="health-report">
    <div class="report-btn">
      <van-button block round class="default-btn" @click="toReport">
        今日健康情况上报
      </van-button>
    </div>
    <div class="style-title report-title">历史记录</div>
    <page-list :api="pageAPI" :params="params">
      <template #default="{ item }">
        <div class="common-card">
          <div class="item-title">— {{ item.time || "2020-01-02" }} —</div>
          <div class="item-list">
            <div v-for="l in list" :key="l.id" class="list-item">
              <div class="point"></div>
              <div class="title">{{ l.title }}</div>
              <div class="result">{{ item[l.key] || "正常" }}</div>
            </div>
          </div>
        </div>
      </template>
    </page-list>
  </div>
</template>

<script>
import { pageAPI } from "@/api/healthReport";
import PageList from "@/components/pageList";

export default {
  name: "HealthReport",
  components: { PageList },
  data() {
    return {
      pageAPI,
      params: {},
      list: [
        { id: 1, title: "心跳、是否有不是或者异常", key: "" },
        { id: 2, title: "呼吸、是否有不适或者急促现象", key: "" },
        { id: 3, title: "是否存在发烧、咳嗽等现象", key: "" },
        { id: 4, title: "今日体温", key: "" },
        { id: 5, title: "头部，是否有不适或者异常", key: "" },
        { id: 6, title: "四肢，是否有不适或者异常", key: "" },
        { id: 7, title: "内脏，是否有不适或者异常", key: "" }
      ]
    };
  },
  methods: {
    toReport() {
      this.$router.push("/healthReport/report");
    }
  }
};
</script>

<style scoped lang="less">
.health-report {
  padding: 0 @padding-md;

  .report-btn {
    padding: @padding-xs 0;
  }

  .report-title {
    text-align: left;
  }

  .common-card {
    .item-title {
      text-align: center;
      font-weight: bold;
      margin-bottom: @margin-xs;
    }

    .list-item {
      display: flex;
      align-items: center;
      padding: @padding-base 0;
      font-size: @font-size-sm;

      .point {
        height: 8px;
        width: 8px;
        border-radius: 4px;
        background: @blue;
        margin-right: @margin-md;
      }

      .title {
        flex: 1;
        min-width: 0;
        text-align: left;
        color: @gray-6;
      }

      .result {
        color: @blue;
      }
    }
  }
}
</style>
