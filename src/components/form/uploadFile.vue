<template>
  <van-field
    name="uploader"
    v-model="pickerValue"
    :required="required"
    :rules="[{ required: required, message: '请上传文件' }]"
    :label="label"
  >
    <template #input>
      <van-uploader
        :after-read="afterRead"
        @delete="deleteFile"
        v-model="fileList"
        v-bind="$attrs"
        v-on="$listeners"
        :multiple="multiple"
        :max-count="maxCount"
      >
        <van-button size="small" color="#3cb8a2">上传文件</van-button>
      </van-uploader>
    </template>
  </van-field>
</template>

<script>
import axios from "axios";

const BASE_URL = process.env.VUE_APP_BASE_API || "";

export default {
  name: "uploadFile",
  props: {
    value: {},
    label: { type: String, default: "上传文件" },
    url: {
      type: String,
      default: "/api-customer/zuul/dig-construction/uploadFile"
    },
    maxCount: { type: Number, default: 3 },
    multiple: { type: Boolean, default: true },
    required: { type: Boolean, default: false }
  },
  data() {
    return {
      pickerValue: "",
      fileList: []
    };
  },
  watch: {
    value() {
      this.load();
    }
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      if (Array.isArray(this.value)) {
        this.fileList = this.value;
      } else {
        if (this.value) {
          this.fileList = [{ url: this.value }];
        } else {
          this.fileList = [];
        }
      }
    },
    async afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";
      this.upLoaderImg(file.file)
        .then(res => {
          file.status = "success";
          if (this.maxCount === 1) {
            this.$emit("input", res.data.url);
            this.pickerValue = res.data.url;
          } else {
            this.fileList[this.fileList.length - 1] = Object.assign(
              this.fileList[this.fileList.length - 1],
              res.data
            );
            this.$emit("input", this.fileList);
            this.pickerValue = JSON.stringify(this.fileList);
          }
        })
        .catch(err => {
          file.status = "failed";
          file.message = "上传失败";
          this.$emit("error", err);
        });
    },
    deleteFile(file) {
      if (this.maxCount === 1) {
        this.$emit("input", "");
      } else {
        this.fileList.forEach((v, index) => {
          if (file.url === v.url) {
            this.fileList.splice(index, 1);
          }
        });
        this.$emit("input", this.fileList);
      }
    },
    upLoaderImg(file) {
      let params = new FormData();
      params.append("file", file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          token: this.$store.state.token
        }
      };
      return new Promise((resolve, reject) => {
        axios
          .post(BASE_URL + this.url, params, config)
          .then(res => {
            if (res && res.data && res.data.code === 200) {
              resolve(res.data);
            } else {
              reject(res.data);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
</script>

<style scoped>
.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
</style>
