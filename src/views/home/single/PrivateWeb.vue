<template>
  <div>
    <standard-form-row title="" block style="padding-bottom: 11px;">
    <a-button type="default" style="margin-right:10px;">
        添加
    </a-button>
    </standard-form-row>
    <a-card
      v-if="token"
      style="width:100%"
      :bordered="false"
    >
      <a-spin :spinning="loading"/>
      <a-row :gutter="24">
        <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <div>
            <a-card
              :key="wtid"
              :loading="loading"
              v-for="(webs, wtid) in webList"
              class="project-list"
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
                        <a v-if="web.url" :href="web.url" target="_blank">{{ web.name }}</a>
                        <a @click="handleAdd()" v-else>{{ web.name }}</a>
                      </div>
                    </a-card-meta>
                  </a-card>
                </a-card-grid>
              </div>
            </a-card>
          </div>
        </a-col>
      </a-row>
      <web-form
        ref="webSaveModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        :category="category"
        @cancel="handleCancel"
        @ok="handleOk"
      />
    </a-card>
  </div>

</template>

<script>
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { Radar, StandardFormRow } from '@/components'
import { outApi } from '@/api/main'
import WebForm from './modules/WebSaveForm'
const DataSet = require('@antv/data-set')

export default {
  name: 'Web',
  components: {
    PageHeaderWrapper,
    WebForm,
    Radar,
    StandardFormRow
  },
  data () {
    return {
      token: null,
      loading: true,
      webList: {},
      visible: false,
      confirmLoading: false,
      mdl: null,
      category: 2
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    this.getToken()
    this.getMySites()
  },
  methods: {
    getToken () {
      this.token = storage.get(ACCESS_TOKEN)
    },
    handleAdd () {
      this.visible = true
    },
    getMySites () {
      if (!this.token) {
        return false
      }
      const params = {
        out_url: 'mySites',
        method: 'POST',
        data: {
          category: this.category
        }
      }
      outApi(params).then(res => {
        this.loading = false
        if (res.code !== 0) {
          return false
        }
        this.webList = res.data
        }).catch(err => {
          console.log('err:', err)
        })
    },
    handleCancel () {
      this.visible = false
      this.confirmLoading = false
      const form = this.$refs.webSaveModal.form
    },
    handleOk () {
      const form = this.$refs.webSaveModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          const saveMySiteParams = {
            out_url: 'saveSite',
            method: 'POST',
            data: {
              type: values.type,
              name: values.name,
              url: values.url,
              sort: 0
            }
          }
          outApi(saveMySiteParams).then(res => {
            this.confirmLoading = false
            if (res.code !== 0) {
              this.$message.info('添加失败')
              return
            }
              this.visible = false
              this.$message.info('添加成功')
              this.getMySites()
            }).catch(err => {
              console.log('err:', err)
            })
        } else {
          this.confirmLoading = false
        }
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
