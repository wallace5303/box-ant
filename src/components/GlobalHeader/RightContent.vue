<template>
  <div :class="wrpCls">
    <span class="user">
      <a-icon type="user" style="margin-right:5px;"/>
      <span>{{ currentUser.name }}</span>
    </span>
    <!-- <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" /> -->
    <!-- <select-lang :class="prefixCls" /> -->
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
import SelectLang from '@/components/SelectLang'
import { mapGetters } from 'vuex'

export default {
  name: 'RightContent',
  components: {
    AvatarDropdown,
    SelectLang
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showMenu: true,
      currentUser: {}
    }
  },
  computed: {
    ...mapGetters(['username', 'avatar']),
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.currentUser = {
        name: this.username === 'guest' ? '未登录' : this.username,
        avatar: this.avatar
      }
    }, 100)
  }
}
</script>
<style lang="less" scoped>
.user {
  margin-right: 10px;
}
</style>
