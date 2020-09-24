import storage from 'store'
import { logout } from '@/api/login'
import { outApi } from '@/api/main'
import { ACCESS_TOKEN, USER_INFO } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import dataObj from '@/utils/data'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        const params = {
          out_url: 'login',
          method: 'POST',
          data: userInfo
        }
        outApi(params).then(response => {
          if (response.code !== 0) {
            resolve('error')
            return
          }
          const result = response.data
          storage.set(ACCESS_TOKEN, result.token, 1 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.token)
          storage.set(USER_INFO, result.user_info)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        const userinfo = storage.get(USER_INFO)
        const params = {
          out_url: 'userinfo',
          method: 'POST',
          data: {
            uid: userinfo.uid,
            token: storage.get(ACCESS_TOKEN)
          }
        }
        outApi(params).then(response => {
          if (response.code !== 0) {
            reject(new Error('getInfo: roles must be a non-null array !'))
            return
          }
          const result = response.data
          result.role = dataObj.defaultUser.guest.role
          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', { name: result.username, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
        })
      })
    }

  }
}

export default user
