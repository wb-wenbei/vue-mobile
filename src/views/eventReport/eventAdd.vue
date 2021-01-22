<template>
  <div class="event-add-content">
    <div class="form-content">
      <van-cell-group>
        <van-field
          class="report-desc"
          v-model="form.description"
          type="textarea"
          clearable
          :border="false"
          :autosize="{ minHeight: 80 }"
          placeholder="请输入"
        />
        <upload-img v-model="imageUrl" capture="camera" />
        <position v-model="position" @getAddress="getAddress"></position>
        <form-picker
          v-model="form.facilityTypeCode"
          label="设施类型"
          :columns="facilityTypes"
          @change="renderIssueTypes"
        ></form-picker>
        <form-picker
          v-model="form.issueTypeId"
          label="问题分类"
          :columns="issueClassifys"
        ></form-picker>
      </van-cell-group>
    </div>
    <div class="form-footer">
      <van-button
        round
        type="primary"
        @click="saveReport(true)"
        :loading="loading"
        :disabled="disabled"
        class="report-btn myBtn"
      >
        本人处理
      </van-button>
      <van-button
        round
        type="primary"
        @click="saveReport(false)"
        :loading="loading"
        :disabled="disabled"
        class="report-btn"
      >
        上报处理
      </van-button>
    </div>
  </div>
</template>

<script>
import Position from "@/components/map/position.vue";
import UploadImg from "@/components/form/uploadImg.vue";
import FormPicker from "@/components/form/picker.vue";

import {
  getIssuesTypesAPI,
  reportIssueAPI,
  getFacilityTypeAPI
} from "@/api/issue";

export default {
  name: "eventAdd",
  components: {
    Position,
    UploadImg,
    FormPicker
  },
  data() {
    return {
      loading: false,
      disabled: true,
      imageUrl: "",
      form: {},
      facilityTypes: [],
      issueClassifys: [],
      position: {}
    };
  },
  watch: {
    position: {
      deep: true,
      handler(v) {
        this.form.lng = v.lng;
        this.form.lat = v.lat;
      }
    },
    imageUrl: {
      handler(v) {
        this.form.imageUrls = [v];
      }
    },
    form: {
      deep: true,
      handler(v) {
        if (
          v.lng &&
          v.lat &&
          v.address &&
          v.description &&
          v.imageUrls &&
          v.facilityTypeCode &&
          v.issueTypeId
        ) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      }
    }
  },
  created() {
    this.getFacilityTypes();
  },
  methods: {
    getAddress(address) {
      if (address) {
        this.form.address = address;
      }
    },
    getFacilityTypes() {
      getFacilityTypeAPI().then(res => {
        this.facilityTypes = [];
        res.forEach(element => {
          this.facilityTypes.push({ value: element.code, text: element.name });
        });
      });
    },
    renderIssueTypes(facility) {
      this.issueClassifys = [];
      getIssuesTypesAPI({ facilityType: facility.value }).then(res => {
        res.forEach(issueType => {
          this.issueClassifys.push({
            value: issueType.id,
            text: issueType.name
          });
        });
      });
    },
    saveReport(isMain) {
      this.loading = true;
      let submitForm = Object.assign(this.form, { isMy: isMain, source: 2 }); //监督检查
      reportIssueAPI(submitForm)
        .then(() => {
          this.$toast.success("操作成功");
          this.$router.push({ path: "/eventReport" });
        })
        .catch(() => {
          this.$toast.fail("操作失败");
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.position {
  padding: 12px 20px;
}

.form-footer {
  display: flex;
  padding: @padding-md @padding-sm;
}

.report-btn {
  flex: 1;
  margin: 0 @margin-sm;
}

.report-btn.myBtn {
  color: #333333;
  background-color: #fff;
  border: 1px solid #cccccc;
}
</style>
