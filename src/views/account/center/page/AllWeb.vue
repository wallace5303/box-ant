<template>
  <a-card
    style="margin-top: 24px"
    :bordered="false"
    title="推荐站点">

    <div slot="extra">
      <!-- <a-radio-group v-model="status">
        <a-radio-button value="all">全部</a-radio-button>
        <a-radio-button value="processing">进行中</a-radio-button>
        <a-radio-button value="waiting">等待中</a-radio-button>
      </a-radio-group>
      <a-input-search style="margin-left: 16px; width: 272px;" /> -->
    </div>
    <a-list :loading="loading" size="large" :pagination="pagination" @change="handleTableChange">
      <a-list-item :key="index" v-for="(item, index) in webList">
        <a-list-item-meta :description="item.desc">
          <a-avatar slot="avatar" size="large" shape="square" :src="item.img"/>
          <a slot="title">{{ item.name }}</a>
        </a-list-item-meta>
        <div slot="actions">
          <a @click="add(item)">添加</a>
        </div>
        <div class="list-content">
          <div class="list-content-item">
            <a-icon type="like-o" style="margin-right: 8px" />
            <span>100</span>
          </div>
        </div>
      </a-list-item>
    </a-list>
  </a-card>

</template>

<script>
// 演示如何使用 this.$dialog 封装 modal 组件
import TaskForm from './modules/TaskForm'
import Info from './components/Info'
import { outApi } from '@/api/main'

export default {
  name: 'StandardList',
  components: {
    TaskForm,
    Info
  },
  data () {
    return {
      webList: {},
      webPageList: {},
      pagination: {
        current: 1,
        total: 0,
        showTotal: total => `共有 ${total} 条数据`
      },
      loading: true,
      // 查询参数
      queryParam: {
        page: 1,
        type2: ''
      }
    }
  },
  mounted () {
    this.getAllWebs()
  },
  methods: {
    handleTableChange (pagination) {
      console.log('pagination', pagination)
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      this.queryParam.page = pagination.current
      this.queryParam.type2 = pagination.type2
      this.getAllWebs()
    },
    getAllWebs () {
      this.loading = true
      const params = {
        out_url: 'allWebSites',
        method: 'POST',
        data: {
          page: this.queryParam.page,
          type2: this.queryParam.type2
        }
      }
      outApi(params).then(res => {
        if (res.code !== 0) {
          return
        }
        this.webPageList = res.data && res.data.list
        this.webList = this.webPageList.data
        console.log('webList:', this.webList)
        this.pagination.total = this.webPageList.total
        this.loading = false
        }).catch(err => {
          console.log('err:', err)
        })
    },
    edit (record) {
      console.log('record', record)
      this.$dialog(TaskForm,
        // component props
        {
          record,
          on: {
            ok () {
              console.log('ok 回调')
            },
            cancel () {
              console.log('cancel 回调')
            },
            close () {
              console.log('modal close 回调')
            }
          }
        },
        // modal props
        {
          title: '操作',
          width: 700,
          centered: true,
          maskClosable: false
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
