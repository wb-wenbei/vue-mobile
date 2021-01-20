<template>
  <div class="report-form">
    <van-form @submit="onReport">
      <div v-for="(l, index) in list" :key="l.id" class="form-item">
        <div class="form-title">{{ index + 1 }}、{{ l.title }}</div>
        <van-radio-group v-model="form[l.key]">
          <van-radio
            v-for="op in l.options"
            :key="op.id"
            :name="op.id"
            icon-size="16px"
          >
            {{ op.name }}
          </van-radio>
        </van-radio-group>
      </div>

      <div class="form-item">
        <van-button
          block
          class="default-btn border-radius-md"
          native-type="submit"
          :loading="loading"
          loading-type="spinner"
        >
          上报
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { reportAPI } from "@/api/healthReport";
export default {
  name: "ReportForm",
  data() {
    return {
      loading: false,
      form: {
        key_1: 1,
        key_2: 1,
        key_3: 1,
        key_4: 2,
        key_5: 1,
        key_6: 1,
        key_7: 1
      },
      list: [
        {
          id: 1,
          title: "心跳、是否有不是或者异常",
          key: "key_1",
          options: [
            { id: 1, name: "正常" },
            { id: 2, name: "不适" }
          ]
        },
        {
          id: 2,
          title: "呼吸、是否有不适或者急促现象",
          key: "key_2",
          options: [
            { id: 1, name: "正常" },
            { id: 2, name: "急促" },
            { id: 3, name: "困难" }
          ]
        },
        {
          id: 3,
          title: "是否存在发烧、咳嗽等现象",
          key: "key_3",
          options: [
            { id: 1, name: "有" },
            { id: 2, name: "没有" }
          ]
        },
        {
          id: 4,
          title: "今日体温",
          key: "key_4",
          options: [
            { id: 1, name: "低烧（<36℃）" },
            { id: 2, name: "正常（36℃<38℃）" },
            { id: 3, name: "发烧（>38℃）" }
          ]
        },
        {
          id: 5,
          title: "头部，是否有不适或者异常",
          key: "key_5",
          options: [
            { id: 1, name: "正常" },
            { id: 2, name: "不适" }
          ]
        },
        {
          id: 6,
          title: "四肢，是否有不适或者异常",
          key: "key_6",
          options: [
            { id: 1, name: "正常" },
            { id: 2, name: "不适" }
          ]
        },
        {
          id: 7,
          title: "内脏，是否有不适或者异常",
          key: "key_7",
          options: [
            { id: 1, name: "正常" },
            { id: 2, name: "不适" }
          ]
        }
      ]
    };
  },
  methods: {
    onReport() {
      this.loading = true;
      reportAPI(this.form)
        .then(() => {
          this.$toast.success("上报成功！");
          this.$router.push("/healthReport");
        })
        .catch(err => {
          this.$toast.success("上报失败！");
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped lang="less">
.report-form {
  background: #ffffff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
  border-radius: @border-radius-lg;
  margin: 60px 0 @margin-md;
  padding: @padding-sm;
  min-height: 60px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: -50px;
    left: 0;
    height: 60px;
    width: 100%;
    background: url("../../assets/images/health_report_bg.png") center / cover
      no-repeat;
  }

  .form-item {
    padding: @padding-xs;

    .form-title {
      text-align: left;
      margin-bottom: @margin-sm;
    }

    ::v-deep {
      .van-radio {
        padding: @padding-base @padding-sm;
      }
    }
  }
}
</style>
