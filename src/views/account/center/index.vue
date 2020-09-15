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
          <article-page v-if="noTitleKey === 'article'"></article-page>
          <app-page v-else-if="noTitleKey === 'app'"></app-page>
          <project-page v-else-if="noTitleKey === 'project'"></project-page>
          <web-page v-else-if="noTitleKey === 'web'"></web-page>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'
import { AppPage, ArticlePage, ProjectPage, WebPage } from './page'

import { mapGetters } from 'vuex'

export default {
  components: {
    RouteView,
    PageView,
    AppPage,
    ArticlePage,
    ProjectPage,
    WebPage
  },
  data () {
    return {
      tabListNoTitle: [
        {
          key: 'article',
          tab: '文章'
        },
        {
          key: 'app',
          tab: '应用'
        },
        {
          key: 'project',
          tab: '项目'
        },
        {
          key: 'web',
          tab: '网站'
        }
      ],
      noTitleKey: 'app'
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
