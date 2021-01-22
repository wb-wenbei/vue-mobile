<template>
  <div class="event-detail">
    <van-tabs v-model="active" sticky :offset-top="40" color="#13A8A8">
      <van-tab title="处理前">
        <div v-if="active === 0">
          <div class="main">
            <div class="content">
              <div class="description">{{ issue.description }}</div>
              <div class="img">
                <li v-for="(item, index) in issue.imageUrls" :key="index">
                  <img :src="item" @click="preview(item)" />
                </li>
              </div>
              <div class="address">{{ issue.address }}</div>
            </div>
            <van-cell-group>
              <van-cell
                title="设施类型"
                :value="issue.facilityTypeName"
              ></van-cell>
              <van-cell
                title="问题分类"
                :value="issue.issueTypeName"
              ></van-cell>
              <van-cell title="上报人" :value="issue.reporterName"></van-cell>
              <van-cell
                title="上报时间"
                :value="issue.createTime | formatDateTime"
              ></van-cell>
              <van-cell
                v-if="issue.historyHandlers"
                title="前处理人"
                :value="issue.historyHandlers"
              ></van-cell>
              <van-cell
                v-if="issue.historyAssingers"
                title="指派人"
                :value="issue.historyAssingers"
              ></van-cell>
            </van-cell-group>
          </div>
        </div>
      </van-tab>
      <van-tab title="处理后">
        <div v-if="active === 1">
          <div class="main">
            <div class="content">
              <div class="description">{{ issue.handleDescription }}</div>
              <div class="img">
                <li
                  v-for="(item, index) in issue.handledImageUrls"
                  :key="index"
                >
                  <img :src="item" @click="preview(item)" />
                </li>
              </div>
              <div class="address">{{ issue.address }}</div>
            </div>
            <van-cell-group>
              <van-cell title="处理人" :value="issue.handlerName"></van-cell>
              <van-cell
                title="处理时间"
                :value="issue.handleTime | formatDateTime"
              ></van-cell>
            </van-cell-group>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { ImagePreview } from "vant";
import { issueDetailAPI } from "@/api/issue";

export default {
  data() {
    return {
      active: null,
      issue: {
        description: null,
        facilityCode: null,
        facilityTypeName: null,
        issueTypeId: null,
        issueTypeName: null,
        reporterId: null,
        reporterName: null,
        createTime: null,
        historyHandlers: null,
        historyAssingers: null,
        imageUrls: [],
        handledImageUrls: [],
        handlerId: null,
        handlerName: null,
        handleTime: null
      }
    };
  },
  created() {
    let questionId = window.location.href;
    let index = questionId.lastIndexOf("/");
    questionId = questionId.substring(index + 1, questionId.length);
    this.issueId = questionId;
    this.queryDetail(this.issueId);
  },
  methods: {
    queryDetail(issueId) {
      issueDetailAPI({ id: issueId }).then(res => {
        this.issue = res;
      });
    },
    preview(images) {
      images && ImagePreview([images]);
    }
  }
};
</script>
<style lang="less" scoped>
.event-detail {
  text-align: left;
}
.main {
  .content {
    padding: 8px 16px 0 16px;
    background-color: #fff;

    .description {
      min-height: 100px;
      color: #333333;
    }

    .img {
      li {
        list-style: none;
        img {
          display: inline-block;
          height: 60px;
          width: 60px;
        }
      }
    }
    .address {
      font-size: 14px;
      height: 44px;
      line-height: 44px;
    }
  }
}
</style>
