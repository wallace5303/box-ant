import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN
}

const locale = {
  'message': '-',
  'menu.home': '动态',
  'menu.feed': '动态',
  'menu.web': '我的',
  'menu.privateweb': '隐私空间',
  'menu.allweb': '推荐站点',
  'menu.manage': '管理',
  'menu.settings': '设置'
}

export default {
  ...components,
  ...locale
}
