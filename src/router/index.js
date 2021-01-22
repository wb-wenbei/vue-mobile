import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const Layout = () => import("../views/layout/layout");

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/error/403",
    name: "403",
    component: () => import(/* webpackChunkName: "403" */ "../views/error/403")
  },
  {
    path: "/error/404",
    name: "404",
    component: () => import(/* webpackChunkName: "404" */ "../views/error/404")
  },
  {
    path: "/error/500",
    name: "500",
    component: () => import(/* webpackChunkName: "500" */ "../views/error/500")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/login")
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/home",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/home/home"),
        meta: {
          title: "中航环卫",
          code: ""
        }
      },
      {
        path: "/mine",
        name: "Mine",
        component: () =>
          import(/* webpackChunkName: "mine" */ "../views/mine/mine"),
        meta: {
          title: "个人中心",
          code: ""
        }
      },
      {
        path: "/schedule",
        name: "Schedule",
        component: () =>
          import(
            /* webpackChunkName: "schedule" */ "../views/schedule/schedule"
          ),
        meta: {
          title: "查看排班",
          code: ""
        }
      },
      {
        path: "/eventReport",
        name: "EventReport",
        component: () =>
          import(
            /* webpackChunkName: "eventReport" */ "../views/eventReport/eventReport"
          ),
        meta: {
          title: "卫情上报",
          code: "",
          switchHeader: true
        }
      },
      {
        path: "/eventReport/eventAdd",
        name: "eventAdd",
        component: () =>
          import(
            /* webpackChunkName: "eventAdd" */ "../views/eventReport/eventAdd"
          ),
        meta: {
          title: "上报",
          code: ""
        }
      },
      {
        path: "/eventReport/eventDetail/:id",
        name: "EventDetail",
        component: () =>
          import(
            /* webpackChunkName: "eventDetail" */ "../views/eventReport/eventDetail"
          ),
        meta: {
          title: "详情",
          code: ""
        }
      },
      {
        path: "/eventReport/eventHandleDetail/:id/:distance",
        name: "issueDetail",
        component: () =>
          import(
            /* webpackChunkName: "eventHandleDetail" */ "../views/eventReport/eventHandleDetail"
          ),
        meta: {
          title: "详情",
          code: ""
        }
      },
      {
        path: "/eventReport/eventHandle/:id",
        name: "eventHandle",
        component: () =>
          import(
            /* webpackChunkName: "eventHandle" */ "../views/eventReport/eventHandle"
          ),
        meta: {
          title: "处理",
          code: ""
        }
      },
      {
        path: "/healthReport",
        name: "HealthReport",
        component: () =>
          import(
            /* webpackChunkName: "healthReport" */ "../views/healthReport/healthReport"
          ),
        meta: {
          title: "健康上报",
          code: ""
        }
      },
      {
        path: "/healthReport/report",
        name: "HealthReportReport",
        component: () =>
          import(
            /* webpackChunkName: "HealthReportReport" */ "../views/healthReport/reportForm"
          ),
        meta: {
          title: "基本特征",
          code: ""
        }
      },
      {
        path: "/message",
        name: "Message",
        component: () =>
          import(/* webpackChunkName: "message" */ "../views/message/message"),
        meta: {
          title: "消息中心",
          code: ""
        }
      },
      {
        path: "/message/detail",
        name: "MessageDetail",
        component: () =>
          import(
            /* webpackChunkName: "messageDetail" */ "../views/message/detail"
          ),
        meta: {
          title: "消息详情",
          code: ""
        }
      },
      {
        path: "/credits",
        name: "Credits",
        component: () =>
          import(/* webpackChunkName: "credits" */ "../views/credits/credits"),
        meta: {
          title: "积分明细",
          code: ""
        }
      },
      {
        path: "/credits/exchange",
        name: "CreditsExchange",
        component: () =>
          import(
            /* webpackChunkName: "CreditsExchange" */ "../views/credits/exchange"
          ),
        meta: {
          title: "积分兑换",
          code: ""
        }
      }
    ]
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

const whiteList = ["/login", "/error/403", "/error/404", "/error/500"];

router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.path)) {
    next();
    return;
  }
  let token = store.state.token;
  let permission = store.state.permission;
  if (!token || permission.length === 0) {
    next({ path: "/login" });
    return;
  }
  if (
    (permission.length && to.meta.code && permission.includes(to.meta.code)) ||
    to.meta.code === ""
  ) {
    next();
  } else {
    router.push({ path: "/error/403" });
  }
});

export default router;
