<template>
  <div :class="wrpCls">
    <span class="user">
      <a-icon type="user" style="margin-right:5px;"/>
      <span v-if="currentUser.username" >{{ currentUser.username }}</span>
      <span v-else >
        <router-link :to="{ name: 'login' }">
          登录
        </router-link>
      </span>
    </span>
    <!-- <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" /> -->
    <!-- <select-lang :class="prefixCls" /> -->
  </div>
</template>

<script>
import storage from 'store'
import { USER_INFO } from '@/store/mutation-types'
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
      currentUser: {
        username: '',
        avatar: ''
      }
    }
  },
  computed: {
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    }
  },
  mounted () {
    this.getUserinfo()
  },
  methods: {
    getUserinfo () {
      const userinfo = storage.get(USER_INFO)
      if (userinfo) {
        this.currentUser = userinfo
      }
    }
  }
}
</script>
<style lang="less" scoped>
.user {
  margin-right: 10px;
}
</style>
