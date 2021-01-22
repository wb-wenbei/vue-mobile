<template>
  <section class="event-handle">
    <div class="report-body">
      <van-cell-group>
        <van-field
          class="report-desc"
          v-model="editData.description"
          type="textarea"
          clearable
          :border="false"
          :autosize="{ minHeight: 80 }"
          placeholder="请输入"
        />
        <upload-img v-model="imageUrl" capture="camera" />
        <position v-model="position" @getAddress="getAddress"></position>
      </van-cell-group>
    </div>
    <div class="edit-footer btn-bottom">
      <van-button
        round
        type="primary"
        @click="submitHandle(true)"
        :loading="loading"
        block
        :disabled="disabled"
      >
        提交
      </van-button>
    </div>
  </section>
</template>

<script>
import Position from "@/components/map/position.vue";
import UploadImg from "@/components/form/uploadImg.vue";

import { issueToHandleAPI } from "@/api/issue";

export default {
  components: {
    Position,
    UploadImg
  },
  data() {
    return {
      imageUrl: "",
      position: {},
      editData: {
        imageUrls: []
      },
      loading: false,
      disabled: true
    };
  },
  watch: {
    position: {
      deep: true,
      handler(v) {
        this.editData.lng = v.lng;
        this.editData.lat = v.lat;
      }
    },
    imageUrl: {
      handler(v) {
        this.editData.imageUrls = [v];
      }
    },
    editData: {
      deep: true,
      handler(v) {
        if (v.issueId && v.lng && v.lat && v.description && v.imageUrls) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      }
    }
  },
  created() {
    let questionId = window.location.href;
    let index = questionId.lastIndexOf("/");
    questionId = questionId.substring(index + 1, questionId.length);
    this.editData.issueId = questionId;
  },
  methods: {
    getAddress(address) {
      if (address) {
        this.editData.address = address;
      }
    },
    submitHandle() {
      this.loading = true;
      issueToHandleAPI(this.editData)
        .then(() => {
          this.$toast.success("操作成功");
          this.$router.back();
        })
        .catch(err => {
          this.$toast.fail(err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.upload-img {
  padding: 10px 10px 8px 15px;
  position: relative;
  &::after {
    content: " ";
    position: absolute;
    pointer-events: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    left: 15px;
    right: 0;
    bottom: 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    border-bottom: 1px solid #ebedf0;
  }
}
.position {
  padding: 12px 20px;
}

.edit-footer {
  margin: @margin-md;
}
</style>
