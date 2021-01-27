<template>
  <van-field
    name="uploader"
    v-model="pickerValue"
    :required="required"
    :rules="[{ required: required, message: '请上传图片' }]"
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
        :capture="capture"
        :max-count="maxCount"
      />
    </template>
  </van-field>
</template>

<script>
import axios from "axios";

const BASE_URL = process.env.VUE_APP_BASE_API || "";

export default {
  name: "uploadImg",
  props: {
    value: {},
    label: { type: String, default: "上传图片" },
    url: {
      type: String,
      default: "/api-customer/zuul/dig-construction/uploadFile"
    },
    maxCount: { type: Number, default: 1 },
    multiple: { type: Boolean, default: true },
    required: { type: Boolean, default: false },
    capture: { type: String } //'camera'：只允许调用相机
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
            this.fileList[this.fileList.length - 1] = { url: res.data.url };
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

<style scoped></style>
