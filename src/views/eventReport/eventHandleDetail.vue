<template>
  <div class="event-handle-detail">
    <div class="main">
      <div class="content">
        <div class="title">{{ issue.description }}</div>
        <div class="img">
          <li v-for="(item, index) in issue.imageUrls" :key="index">
            <img :src="item" @click="preview(item)" />
          </li>
        </div>
        <div class="address">{{ issue.address }}</div>
      </div>
      <van-cell-group>
        <van-cell title="设施类型" :value="issue.facilityTypeName"></van-cell>
        <van-cell title="问题分类" :value="issue.issueTypeName"></van-cell>
        <van-cell title="上报人" :value="issue.reporterName"></van-cell>
        <van-cell
          title="上报时间"
          :value="issue.createTime | formatDateTime"
        ></van-cell>
        <van-cell
          title="处理截止时间"
          :value="issue.deadLine | formatDateTime"
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
    <van-popup
      v-model="dialogVisible"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-form @submit="comfirm" class="no-handle-form">
        <van-field
          v-model="content"
          rows="3"
          autosize
          label="原因"
          type="textarea"
          placeholder="不能处理原因"
          :rules="[{ required: true, message: '请填不能处理原因' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-popup>
    <div
      class="btn-bottom issue-footer"
      v-if="
        employeeId == issue.ownerId ||
          (issue.ownerId == null && issue.issueOrgId == orgId)
      "
    >
      <van-button round @click="showDialog" class="report-btn unableHandle"
        >不能处理</van-button
      >
      <!--<van-button
        round
        @click.stop="applyDelay(issue)"
        v-if="issue.deadLine > new Date().getTime()"
        >延时申请</van-button
      >-->
      <van-button
        v-if="distance > 100"
        disabled="disabled"
        round
        type="primary"
        @click="goToHandle(issue.id)"
        class="report-btn"
        >去处理</van-button
      >
      <van-button
        v-else
        round
        type="primary"
        @click="goToHandle(issue.id)"
        class="report-btn"
        >去处理</van-button
      >
    </div>
    <!-- 延时弹窗 -->
    <van-popup
      v-model="showPopup"
      :close-on-click-overlay="false"
      :style="{ width: '85%' }"
    >
      <van-form @submit="onSubmit">
        <van-field
          type="number"
          :min="0"
          v-model="form.applicantMinutes"
          :rules="[{ required: true, message: '请填写时长' }]"
          label="延时时长"
        >
          <template #right-icon>
            分钟
          </template>
        </van-field>
        <van-field
          v-model="form.applicationReason"
          type="textarea"
          label="申请理由"
          :rules="[{ required: true, message: '请填写申请理由' }]"
        />
        <div style="margin: 16px;text-align: center">
          <van-button type="primary" native-type="submit" size="small">
            申请
          </van-button>
          <van-button
            plain
            type="primary"
            size="small"
            @click="showPopup = false"
          >
            取消
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import { issueDetailAPI, notToHandleAPI } from "@/api/issue";
import { ImagePreview } from "vant";
import { createIssuePostponeAPI } from "@/api/issue";

export default {
  data() {
    return {
      dialogVisible: false,
      content: "",
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
        handledImageUrls: []
      },
      form: {
        applicantMinutes: "",
        applicationReason: "",
        issueId: null
      },
      employeeId: this.$store.state.userInfo.employeeId,
      orgId: this.$store.state.userInfo.orgId,
      showPopup: false,
      issueId: null,
      distance: null
    };
  },
  created() {
    let href = window.location.href;
    let distanceIndex = href.lastIndexOf("/");
    let distance = href.substring(distanceIndex + 1, href.length);

    let hrefWithoutDistance = href.substring(0, distanceIndex);
    let issueIdIndex = hrefWithoutDistance.lastIndexOf("/");
    let issueId = hrefWithoutDistance.substring(
      issueIdIndex + 1,
      hrefWithoutDistance.length
    );

    if (distance == -1) {
      distance = null;
    }
    this.distance = distance;
    this.issueId = issueId;
    this.queryDetail(this.issueId);
  },
  methods: {
    applyDelay(issue) {
      console.log(issue);
      this.form = {};
      this.form.issueId = issue.id;
      this.showPopup = true;
    },
    queryDetail(issueId) {
      let parameters = { id: issueId };
      issueDetailAPI(parameters).then(res => {
        this.issue = res;
      });
    },
    goToHandle(id) {
      this.$router.push({
        path: `/eventReport/eventHandle/${id}`,
        params: { id }
      });
    },
    comfirm() {
      let data = {
        description: this.content,
        issueId: this.issueId
      };

      if (this.content === "") {
        this.$toast("请输入不能处理的理由");
      } else {
        notToHandleAPI({ data })
          .then(() => {
            this.content = "";
            this.$toast.success(`提交成功！`);
            this.$router.push({ name: "issue" });
          })
          .catch(err => {
            this.$toast.fail(err);
          })
          .finally(() => {
            this.dialogVisible = false;
          });
      }
    },
    onSubmit() {
      createIssuePostponeAPI(this.form)
        .then(() => {
          this.$toast.success(`申请成功，待审核中...`);
          this.$router.push("/issue");
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.showPopup = false;
        });
    },
    showDialog() {
      this.dialogVisible = true;
      this.content = "";
    },
    preview(images) {
      images && ImagePreview([images]);
    }
  }
};
</script>
<style lang="less" scoped>
.event-handle-detail {
  text-align: left;
}

.issue-footer {
  display: flex;
  padding: @padding-md 0;
  button {
    flex: 1;
    margin: 0 @margin-md;
  }
}
.main {
  background-color: #fff;

  .content {
    padding: 8px 16px;

    .title {
      height: 60px;
      margin-bottom: 8px;
    }

    .address {
      font-size: 14px;
      color: #333333;
      height: 36px;
      line-height: 48px;
    }
  }

  .van-panel__header {
    padding: 0;
  }

  .img {
    background-color: #fff;
    overflow: hidden;

    li {
      float: left;
      list-style: none;
      margin-right: 12px;

      img {
        width: 64px;
        height: 64px;
        display: block;
      }
    }
  }
}
.no-handle-form {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
