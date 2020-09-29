<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24">
        <a-card
          style="width:100%"
          :bordered="false"
          :tabList="tabListNoTitle"
          :activeTabKey="noTitleKey"
          @tabChange="key => handleTabChange(key, 'noTitleKey')"
        >
          <feed-manage v-if="noTitleKey === 'feed_manage'"></feed-manage>
          <user-center v-else-if="noTitleKey === 'user_center'"></user-center>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'
import { FeedManage, UserCenter } from './page'

import { mapGetters } from 'vuex'

export default {
  components: {
    RouteView,
    PageView,
    FeedManage,
    UserCenter
  },
  data () {
    return {
      tabListNoTitle: [
        {
          key: 'feed_manage',
          tab: '动态管理'
        },
        {
          key: 'user_center',
          tab: '个人中心'
        }
      ],
      noTitleKey: 'user_center'
    }
  },
  computed: {

  },
  methods: {
    handleTabChange (key, type) {
      this[type] = key
    }
  }
}
</script>

<style lang="less" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;
}
</style>
