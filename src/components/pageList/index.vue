<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      v-bind="$attrs"
      v-on="$listeners"
      :finished="finished"
      :finished-text="finishedText"
      :error-text="errorText"
      @load="onLoad"
    >
      <template v-for="(item, index) in list">
        <div :key="'page_item_' + index" class="list-item">
          <slot v-bind:item="item">
            <van-cell :title="item.name || '--'" />
          </slot>
        </div>
      </template>
    </van-list>
  </van-pull-refresh>
</template>

<script>
export default {
  name: "list",
  props: {
    api: { type: Function },
    params: { type: Object },
    pageSize: { type: Number },
    finishedText: { type: String, default: "没有更多了" },
    errorText: { type: String, default: "加载失败，请重试！" },
    dataFilter: { type: Function }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      pageParams: {
        pageSize: null,
        page: null
      },
      page: {
        pageSize: null,
        totalCount: null,
        currentPage: null
      }
    };
  },
  created() {
    this.pageParams.pageSize = this.pageSize || 10;
  },
  methods: {
    onLoad() {
      this.pageParams.page = this.page.currentPage
        ? this.page.currentPage + 1
        : 1;
      let data = Object.assign(this.pageParams, this.params);
      this.api(data)
        .then(res => {
          if (res) {
            let list = res.data || (Array.isArray(res) ? res : []);
            this.list = [...this.list, ...list];
            if (this.dataFilter && typeof this.dataFilter === "function") {
              this.list = this.dataFilter(this.list);
            }
            this.page.currentPage = res.page;
            this.page.totalCount = res.totalCount;
            this.page.pageSize = res.pageSize;
            if (
              !this.page.pageSize ||
              this.page.currentPage * this.page.pageSize >= this.page.totalCount
            ) {
              this.finished = true;
            }
          } else {
            this.finished = true;
          }

        })
        .catch(() => {
          this.finished = true;
        })
        .finally(() => {
          this.loading = false;
          this.refreshing = false;
        });
    },
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.list = [];
      this.page = {
        pageSize: null,
        totalCount: null,
        currentPage: null
      };
      this.pageParams = {
        pageSize: this.pageSize || 10,
        page: null
      };
      this.onLoad();
    }
  }
};
</script>

<style scoped></style>
