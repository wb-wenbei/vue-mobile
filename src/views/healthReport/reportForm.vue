<template>
  <div class="report-form">
    <van-form @submit="onSubmit">
      <template v-if="!disabled">
        <div v-for="(l, index) in list" :key="l.id" class="form-item">
          <div class="form-title">
            {{ index + 1 }}、{{ l.title }}
            <span v-if="l.required"
              >(<span class="required">*</span> 必填)</span
            >
          </div>
          <van-radio-group v-model="l.answer">
            <van-radio
              v-for="op in l.questionnaireOptionDtoList"
              :key="op.id"
              :name="op.id"
              icon-size="16px"
            >
              {{ op.name }}
            </van-radio>
          </van-radio-group>
        </div>
      </template>
      <div class="message" v-else>{{ message }}</div>
      <div class="form-item">
        <van-button
          v-if="!disabled"
          block
          round
          class="default-btn"
          native-type="submit"
          :loading="loading"
          :disabled="disabled"
          loading-type="spinner"
        >
          上报
        </van-button>
        <van-button
          v-else
          block
          round
          class="default-btn"
          native-type="button"
          @click="goBack"
        >
          返回
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {
  getQuestionnaireAPI,
  submitQuestionnaireAPI
} from "@/api/healthReport";

const QUESTION_NAIRE_ID = 1; // 健康问卷

export default {
  name: "ReportForm",
  data() {
    return {
      loading: false,
      disabled: true,
      message: "您今天已经上报过信息了",
      list: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      getQuestionnaireAPI({ questionnaireId: QUESTION_NAIRE_ID })
        .then(res => {
          this.list = res;
          this.disabled = false;
        })
        .catch(err => {
          this.disabled = true;
          this.message = err;
        });
    },
    onSubmit() {
      if (!this.checkForm(this.list)) {
        this.$toast.fail("请填写完整后提交！");
        return;
      }
      this.loading = true;
      let titleOptionDtoList = [];
      this.list.forEach(item => {
        titleOptionDtoList.push(
          Object.assign({}, item, { answer: [item.answer] })
        );
        item.answer = [item.answer];
      });
      submitQuestionnaireAPI({
        questionnaireId: QUESTION_NAIRE_ID,
        titleOptionDtoList: titleOptionDtoList
      })
        .then(() => {
          this.$toast.success("上报成功！");
          this.$router.push("/healthReport");
        })
        .catch(err => {
          this.$toast.fail("上报失败！");
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    checkForm(data) {
      let result = true;
      data.forEach(item => {
        if (item.required && !item.answer && item.answer !== 0) {
          result = false;
        }
      });
      return result;
    },
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style scoped lang="less">
.report-form {
  background: #ffffff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
  border-radius: @border-radius-lg;
  margin: 70px @margin-md @margin-md;
  padding: @padding-sm;
  min-height: 60px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: -65px;
    left: 0;
    height: 70px;
    width: 100%;
    background: url("../../assets/images/health_report_bg.png") center / cover
      no-repeat;
  }

  .required {
    color: @red;
  }

  .message {
    padding: @padding-md 0;
    text-align: center;
    font-size: 16px;
    color: @gray-6;
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
