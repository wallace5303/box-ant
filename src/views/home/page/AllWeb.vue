<template>
  <div>
    <standard-form-row title="" block style="padding-bottom: 11px;">
      <a-radio-group v-model="status" @change="handleChangeType(status)">
        <a-radio-button value="wsid">最新</a-radio-button>
        <a-radio-button value="col_times">收藏最多</a-radio-button>
        <a-radio-button value="sort">推荐</a-radio-button>
      </a-radio-group>
      <a-input-search style="margin-left: 16px; width: 272px;" @search="handleSearch"/>
    </standard-form-row>
    <a-card
      style="margin-top: 0px"
      :bordered="true"
      title="">
      <!-- <div slot="extra" style="margin-left: initial">
        <a-radio-group v-model="status" @change="handleChangeType(status)">
          <a-radio-button value="wsid">最新</a-radio-button>
          <a-radio-button value="col_times">收藏最多</a-radio-button>
          <a-radio-button value="sort">推荐</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" @search="handleSearch"/>
      </div> -->
      <div class="operate">
        <a-button type="dashed" style="width: 100%">添加后 - 在“我的”查看</a-button>
      </div>
      <a-list :loading="loading" size="large" :pagination="paginationOpt">
        <a-list-item :key="index" v-for="(item, index) in webList" style="padding-top: 10px;padding-bottom: 10px;">
          <a-list-item-meta :description="item.desc">
            <a-avatar
              style="color: #f56a00;backgroundColor:#fff"
              slot="avatar"
              size="default"
              shape="square"
              :src="item.img"
              icon="tag">
            </a-avatar>
            <a slot="title">{{ item.name }}</a>
          </a-list-item-meta>
          <div class="list-times">
            <div class="list-content-item">
              <a-icon type="star-o" style="margin-right: 8px" />
              <span>{{ item.col_times }}</span>
            </div>
          </div>
          <div class="list-view">
            <div class="list-content-item">
              <a :href="item.url" target="_blank">查看</a>
            </div>
          </div>
          <div class="list-view">
            <a @click="handleEdit(item)">添加</a>
          </div>
        </a-list-item>
        <span />
      </a-list>
      <web-form
        ref="webSaveModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk"
      />
    </a-card>
  </div>
</template>

<script>
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import WebForm from './modules/WebSaveForm'
import { outApi } from '@/api/main'
import { StandardFormRow } from '@/components'

export default {
  name: 'StandardList',
  components: {
    WebForm,
    StandardFormRow
  },
  data () {
    return {
      token: null,
      webList: {},
      webPageList: {},
      paginationOpt: {
        current: 1,
        total: 0,
        pageSize: 10,
        'show-quick-jumper': true,
        onChange: (current) => {
          this.paginationOpt.current = current
          this.queryParam.page = current
          this.getAllWebs()
        }
      },
      loading: true,
      // 查询参数
      queryParam: {
        page: 1,
        type2: 0,
        sort: 'wsid', // wsid sort col_times
        desc: ''
      },
      status: 'wsid',
      visible: false,
      confirmLoading: false,
      mdl: null
    }
  },
  mounted () {
    this.getAllWebs()
    this.getToken()
  },
  methods: {
    getToken () {
      this.token = storage.get(ACCESS_TOKEN)
    },
    handleSearch (value) {
      this.queryParam.sort = 'wsid'
      this.queryParam.page = 1
      this.queryParam.desc = value
      this.getAllWebs()
    },
    handleChangeType (status) {
      this.status = status
      this.queryParam.sort = status
      this.queryParam.page = 1
      this.queryParam.desc = ''
      this.getAllWebs()
    },
    handleEdit (record) {
      if (!this.token) {
        this.$message.error('请登录')
        return false
      }
      this.visible = true
      this.mdl = {
        id: record.wsid,
        name: record.name,
        url: record.url
      }
    },
    getAllWebs () {
      const params = {
        out_url: 'allWebSites',
        method: 'POST',
        data: {
          sort: this.queryParam.sort,
          desc: this.queryParam.desc,
          page: this.queryParam.page,
          type2: this.queryParam.type2
        }
      }
      outApi(params).then(res => {
        this.loading = false
        if (res.code !== 0) {
          return
        }
        this.webPageList = res.data && res.data.list
        this.webList = this.webPageList.data
        this.paginationOpt.total = this.webPageList.total
        this.paginationOpt.pageSize = this.webPageList.per_page
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
      // console.log('webInfo', webInfo)
      const form = this.$refs.webSaveModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        console.log('allweb values:', values)
        if (!errors) {
          const saveMySiteParams = {
            out_url: 'saveMySite',
            method: 'POST',
            data: {
              wsid: values.wsid,
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
.ant-avatar-lg {
    width: 48px;
    height: 48px;
    line-height: 48px;
}
.list-times {
  width: 10%;
  text-align: left;
}
.list-view {
  width: 10%;
  text-align: center;
}
.list-content-item {
    color: rgba(0, 0, 0, .45);
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;
    span {
        line-height: 20px;
    }
    p {
        margin-top: 4px;
        margin-bottom: 0;
        line-height: 22px;
    }
}
</style>
