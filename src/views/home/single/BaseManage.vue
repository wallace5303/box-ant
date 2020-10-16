<template>
  <page-header-wrapper
    :title="false"
    :breadcrumb="false"
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="handleTabChange"
  >
    <router-view />
  </page-header-wrapper>
</template>

<script>
const getActiveKey = (path) => {
  switch (path) {
    case '/manage/website':
      return '1'
    case '/manage/webtype':
      return '2'
    default:
      return '1'
  }
}
export default {
  name: 'BaseManage',
  data () {
    return {
      tabList: [
        { key: '1', tab: '网址' },
        { key: '2', tab: '分类' }
      ],
      tabActiveKey: '1',
      noTitle: false
    }
  },
  created () {
    this.tabActiveKey = getActiveKey(this.$route.path)

    this.$watch('$route', (val) => {
      this.tabActiveKey = getActiveKey(val.path)
    })
  },
  methods: {
    handleTabChange (key) {
      this.tabActiveKey = key
      switch (key) {
        case '1':
          this.$router.push('/manage/website')
          break
        case '2':
          this.$router.push('/manage/webtype')
          break
        default:
          this.$router.push('/home')
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-page-header-footer {
  margin-top: 0px;
}
/deep/ .ant-page-header {
  padding: 5px 24px;
}
</style>
