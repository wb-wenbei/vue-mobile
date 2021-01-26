<template>
  <div>
    <!-- 待处理 -->
    <div class="common-card" v-if="!isFinished">
      <div class="header">
        <div>
          {{ data.issueTypeName }}
          <!--<van-tag
            v-if="data.postponeApplyState || data.postponeApplyState === 0"
            :type="tagType[data.postponeApplyState]"
            plain
            primary
          >
            {{ tagName[data.postponeApplyState] }}
          </van-tag>-->
        </div>
      </div>
      <div class="body">
        <ul class="content" @click="detail(data.id, data.distance)">
          <li>
            <span
              class="time"
              style="color: #FC4F52;"
              v-if="data.remainingSeconds > 0"
            >
              <img :src="require('@/assets/icons/time@3x.png')" alt="" />
              超{{ Math.abs(data.remainingSeconds / 3600).toFixed(1) }}h</span
            >
            <span class="time" style="color: #2DB95F" v-else>
              <img :src="require('@/assets/icons/time@3x.png')" alt="" />
              剩{{ Math.abs(data.remainingSeconds / 3600).toFixed(1) }}h
            </span>
            <span class="distance" v-if="data.distance + ''">
              <img :src="require('@/assets/icons/address.png')" alt="" />
              距您{{ data.distance | distance }}
            </span>
            <span class="distance" v-else>无法获取距离</span>
          </li>
          <li>
            <div class="address">{{ data.address }}</div>
          </li>
          <li>
            <span class="handleTime">{{
              data.createTime | formatDateTime
            }}</span>
            <span class="facilityType">{{ data.facilityTypeName }}</span>
          </li>
        </ul>

        <!-- 距离小于100 -->
        <div
          class="img-box"
          v-if="
            data.distance <= 100 &&
              (employeeId == data.ownerId ||
                (data.ownerId == null && data.issueOrgId == orgId))
          "
        >
          <span
            v-if="
              Math.ceil(
                (data.createTime +
                  data.timeLimilation * 3600 * 1000 -
                  new Date().getTime()) /
                  (3600 * 1000)
              ) < 0
            "
            >超时</span
          >
          <span v-else style="visibility:hidden"></span>
          <span>处理前</span>
          <span>去处理</span>
          <div class="img">
            <img :src="data.imageUrls[0]" @click="preview(data.imageUrls[0])" />
          </div>
          <div
            @click="handleClick(data.id)"
            class="img-default"
            style="background: #4A90E2"
          >
            <div class="img-default-icon"></div>
          </div>
        </div>
        <!-- 距离小于100非自己处理 -->
        <div
          class="img-box"
          v-else-if="
            data.distance <= 100 &&
              (employeeId != data.ownerId ||
                (data.ownerId != null && data.issueOrgId != orgId))
          "
        >
          <span
            v-if="
              Math.ceil(
                (data.createTime +
                  data.timeLimilation * 3600 * 1000 -
                  new Date().getTime()) /
                  (3600 * 1000)
              ) < 0
            "
            >超时</span
          >
          <span v-else style="visibility:hidden"></span>
          <span>处理前</span>
          <span>去处理</span>
          <div class="img">
            <img :src="data.imageUrls[0]" @click="preview(data.imageUrls[0])" />
          </div>
          <div class="img-default" style="background-color:#D9D9D9">
            <div class="img-default-icon"></div>
          </div>
        </div>
        <!-- 距离大于100 或者无法获取距离 -->
        <div
          class="img-box"
          v-else-if="data.distance > 100 || !(data.distance + '')"
        >
          <span
            v-if="
              Math.ceil(
                (data.createTime +
                  data.timeLimilation * 3600 * 1000 -
                  new Date().getTime()) /
                  (3600 * 1000)
              ) < 0
            "
            >超时</span
          >
          <span v-else style="visibility:hidden"></span>
          <span>处理前</span>
          <span>去处理</span>
          <div class="img">
            <img :src="data.imageUrls[0]" @click="preview(data.imageUrls[0])" />
          </div>
          <div class="img-default" style="background-color:#D9D9D9">
            <div class="img-default-icon"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 已完成 -->
    <div class="common-card" v-if="isFinished">
      <div class="header">
        <div>{{ data.issueTypeName }}</div>
      </div>
      <div class="body">
        <ul class="content" @click="detail(data.id, data.distance)">
          <li class="handleTimed">
            {{ data.handleTime | formatDateTime }}已处理
          </li>
          <li>
            <div class="address">{{ data.address }}</div>
          </li>
          <li>
            <span class="handleTime">{{
              data.createTime | formatDateTime
            }}</span>
            <span class="facilityType">{{ data.facilityTypeName }}</span>
          </li>
        </ul>
        <div class="img-box">
          <span style="visibility:hidden"></span>
          <span>处理前</span>
          <span>处理后</span>
          <div class="img">
            <img :src="data.imageUrls[0]" @click="preview(data.imageUrls[0])" />
          </div>
          <div class="img" style="margin-left: 8px">
            <img
              :src="data.handledImageUrls[0]"
              @click="preview(data.handledImageUrls[0])"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";

export default {
  props: {
    data: {
      require: true,
      type: Object
    },
    isFinished: null
  },
  data() {
    return {
      tagType: {
        0: "primary",
        1: "danger",
        2: "success"
      },
      tagName: {
        0: "延时申请中",
        1: "延时申请已驳回",
        2: "延时申请已通过"
      },
      isTrue: "camera-icon",
      clock: "",
      form: {
        applicantMinutes: "",
        applicationReason: "",
        issueId: null
      },
      subList: [{ name: "key" }],
      infoList: [
        { label: "组织机构", value: "", name: "orgName" },
        { label: "编号", value: "", name: "code" },
        { label: "备注", value: "", name: "description" },
        { label: "采集人", value: "", name: "gatherer" },
        { label: "采集时间", value: "", name: "gatherTime" }
      ],
      icon: {},
      imgSrc: [
        require("@/assets/icons/edit@3x.png"),
        require("@/assets/icons/delete@3x.png"),
        require("@/assets/icons/address.png")
      ],
      typeStyle: null,
      showPopup: false,
      employeeId: this.$store.state.userInfo.employeeId,
      orgId: this.$store.state.userInfo.orgId
    };
  },
  methods: {
    handleClick(id) {
      this.$router.push({
        path: `/eventReport/eventHandle/${id}`,
        params: { id }
      });
    },
    detail(id, distance) {
      if (this.isFinished) {
        this.$router.push({
          path: `/eventReport/eventDetail/${id}`,
          params: { id }
        });
      } else {
        if (distance == null) {
          distance = -1;
        }
        this.$router.push({
          path: `/eventReport/eventHandleDetail/${id}/${distance}`,
          params: { id, distance }
        });
      }
    },
    preview(images) {
      images && ImagePreview([images]);
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  line-height: 20px;
}
.content {
  flex: 1;
  margin-top: 8px;
  width: 82px;

  .time {
    font-size: 11px;
    vertical-align: middle;
    display: inline-block;

    img {
      display: inline-block;
      height: 14px;
      width: 14px;
      vertical-align: text-bottom;
    }
  }
  .handleTimed {
    background-color: @blue;
    color: #fff;
    border-radius: 2px;
    padding: 0 8px;
    font-size: 10px;
    display: inline-block;
    height: 16px;
  }
  .handleTime,
  .facilityType {
    height: 14px;
    border: 1px solid #d9d9d9;
    font-size: 10px;
    line-height: 14px;
    padding: 2px;
    color: #999999;
  }
  .distance {
    font-size: 11px;
    color: #007aff;
    line-height: 16px;
    padding-left: 10px;
    vertical-align: middle;
    display: inline-block;

    img {
      display: inline-block;
      height: 14px;
      width: 14px;
      vertical-align: text-bottom;
    }
  }
  .facilityType {
    margin-left: 4px;
  }
  .address {
    color: #999999;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  li {
    font-size: 14px;
    justify-content: space-between;
    label {
      color: #969799;
    }
  }
}

.content li:nth-child(3) {
  margin-top: 9px;
}
.content li:nth-child(2) {
  margin-top: 8px;
}
.camera-icon {
  cursor: pointer;
  background: #d9d9d9;
  height: 54px;
  width: 54px;
  color: #fff;
  text-align: center;
  padding-bottom: 18px;
}

.camera-icon.clock {
  background-color: #4a90e2;
}
.body {
  display: flex;
  text-align: left;

  .img-box {
    position: relative;
    display: flex;

    span:nth-child(1) {
      width: 36px;
      height: 18px;
      border-radius: 5px 0 8px 0;
      background: -webkit-linear-gradient(left, #ff1a1a, #ff5e00);
      font-size: 10px;
      color: #fff;
      display: inline-block;
      text-align: center;
      position: absolute;
      left: 0;
    }
    span:nth-child(2) {
      width: 54px;
      height: 18px;
      display: inline-block;
      text-align: center;
      position: absolute;
      left: 0;
      bottom: 20px;
      font-size: 10px;
      color: #fff;
      background: rgba(0, 0, 0, 0.65);
      border-radius: 0 0 5px 5px;
    }

    span:nth-child(3) {
      width: 54px;
      height: 18px;
      display: inline-block;
      text-align: center;
      position: absolute;
      right: 0;
      bottom: 20px;
      font-size: 10px;
      color: #fff;
      background: rgba(0, 0, 0, 0.65);
      border-radius: 0 0 5px 5px;
    }

    .img-default {
      height: 54px;
      width: 54px;
      margin-left: 8px;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;

      .img-default-icon {
        height: 28px;
        width: 28px;
        background: url("../../../assets/icons/camera.png") center / cover;
      }
    }

    .svgDaka {
      display: inline-block;
      height: 54px;
      width: 54px;
      text-align: center;
      line-height: 98px;
    }

    .img {
      height: 54px;
      width: 54px;

      img {
        height: 54px;
        width: 54px;
        border-radius: 4px;
      }
    }
  }
}
.footer {
  margin-bottom: 5px;
  margin-top: 10px;
  text-align: left;
}
.icon-box {
  i {
    &:first-child {
      margin-right: 10px;
    }
  }
}

.bar {
  position: relative;
  &::before {
    position: absolute;
    left: 0;
    top: -2px;
    width: 24px;
    height: 24px;
    content: "";
  }
  text-align: justify;
  padding-left: 24px;
  font-size: 14px;
  color: #c8c9cc;
}
.address {
  &::before {
    background: url("../../../assets/icons/address@3x.png") no-repeat left top;
    background-size: 24px;
  }
}
.remark {
  &::before {
    background: url("../../../assets/icons/remark@3x.png") no-repeat left center;
    background-size: 24px;
  }
}
</style>
