<template>
  <div>
    <a-row :gutter="24">
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <div :key="wtid" v-for="(webs, wtid) in webList">
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            :title="webs.type"
            :body-style="{ padding: 0 }">
            <div>
              <a-card-grid style="width:12.5%;" class="project-card-grid" :key="i" v-for="(web, i) in webs.list">
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <a-card-meta >
                    <div slot="title" class="card-title">
                      <a-avatar size="small" :src="web.img"/>
                      <a>{{ web.name }}</a>
                    </div>
                  </a-card-meta>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>
        </div>
      </a-col>
    </a-row>
  </div>

</template>

<script>
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { Radar } from '@/components'

import { getRoleList, getServiceList } from '@/api/manage'
import { webSites } from '@/api/main'

const DataSet = require('@antv/data-set')

export default {
  name: 'AllWeb',
  components: {
    PageHeaderWrapper,
    Radar
  },
  data () {
    return {
      timeFix: timeFix(),

      projects: [],
      loading: true,
      radarLoading: true,
      activities: [],
      teams: [],
      webList: {},

      radarData: []
    }
  },
  computed: {
  },
  created () {
    getRoleList().then(res => {
      // console.log('workplace -> call getRoleList()', res)
    })

    getServiceList().then(res => {
      // console.log('workplace -> call getServiceList()', res)
    })
  },
  mounted () {
    this.getProjects()
  },
  methods: {
    getProjects () {
      webSites({ mobile: 111 }).then(res => {
        if (res.code !== 0) {
          return
        }
        const allSites = res.data && res.data.list
        this.webList = allSites.wtid_1.children
        // console.log('webList:', this.webList)
        this.loading = false
        }).catch(err => {
          console.log('err:', err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
  //@import "./web.less";
  .project-list {
    .card-title {
      font-size: 0;
      a {
        color: rgba(0, 0, 0, 0.85);
        margin-left: 12px;
        line-height: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: top;
        font-size: 14px;

        &:hover {
          color: #1890ff;
        }
      }
    }
  }

</style>
