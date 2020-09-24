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
            :title="webs.title"
            :head-style="{'border-bottom': '0px solid #e8e8e8', padding: 0}"
            :body-style="{padding: 0}">
            <div>
              <a-card-grid class="project-card-grid" :key="i" v-for="(web, i) in webs.list">
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <a-card-meta >
                    <div slot="title" class="card-title">
                      <a-avatar style="color: #f56a00;backgroundColor:#fff" shape="square" size="small" :src="web.img" icon="tag"></a-avatar>
                      <a :href="web.url" target="_blank">{{ web.name }}</a>
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
import { outApi } from '@/api/main'

const DataSet = require('@antv/data-set')

export default {
  name: 'Web',
  components: {
    PageHeaderWrapper,
    Radar
  },
  data () {
    return {
      loading: true,
      webList: {}
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    this.getMySites()
  },
  methods: {
    getMySites () {
      const params = {
        out_url: 'mySites',
        method: 'POST',
        data: {}
      }
      outApi(params).then(res => {
        this.loading = false
        if (res.code !== 0) {
          return
        }
        this.webList = res.data
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
    .project-card-grid {
        width: 12.5%;
      }
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
    .card-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
  }

</style>
