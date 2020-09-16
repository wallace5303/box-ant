<template>
  <div>
    <a-row :gutter="24">
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card
          class="project-list"
          :loading="loading"
          style="margin-bottom: 24px;"
          :bordered="false"
          title="常用"
          :body-style="{ padding: 0 }">
          <!-- <a slot="extra">全部项目</a> -->
          <div>
            <a-card-grid style="width:12.5%;" class="project-card-grid" :key="i" v-for="(item, i) in projects">
              <a-card :bordered="false" :body-style="{ padding: 0 }">
                <a-card-meta >
                  <div slot="title" class="card-title">
                    <a-avatar size="small" :src="item.cover"/>
                    <a>{{ item.title }}</a>
                  </div>
                </a-card-meta>
              </a-card>
            </a-card-grid>
          </div>
        </a-card>

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
      this.$http.get('/list/search/projects')
        .then(res => {
          this.projects = res.result && res.result.data
          this.loading = false
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
