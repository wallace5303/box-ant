<template>
  <a-form @submit="handleSubmit" :form="form">
    <a-form-item
      label="类型"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-select v-decorator="['type', {initialValue:1}]">
        <a-select-option :value="1">常用</a-select-option>
        <a-select-option :value="2">专业</a-select-option>
        <a-select-option :value="3">娱乐</a-select-option>
        <a-select-option :value="4">游戏</a-select-option>
        <a-select-option :value="5">阅读</a-select-option>
        <a-select-option :value="6">旅行</a-select-option>
        <a-select-option :value="7">交友</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="名称"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['name', {rules:[{required: true, message: '请填写名称'}]}]" />
    </a-form-item>

    <a-form-item
      label="地址"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['url', {rules:[{required: true, message: '请填写地址'}]}]" />
    </a-form-item>
  </a-form>
</template>

<script>
import pick from 'lodash.pick'

const fields = ['type', 'name', 'url']

export default {
  name: 'WebForm',
  props: {
    webInfo: {
      type: Object,
      default: null
    }
    // type: 1,
    // name: '',
    // url: ''
  },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    this.webInfo && this.form.setFieldsValue(pick(this.webInfo, fields))
    // this.name = this.webInfo.name
    // this.url = this.webInfo.url
  },
  methods: {
    onOk () {
      console.log('监听了 modal ok 事件')
      return new Promise(resolve => {
        resolve('111')
      })
    },
    onCancel () {
      console.log('监听了 modal cancel 事件')
      return new Promise(resolve => {
        resolve(true)
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      console.log('aaa')
      this.visible = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
        }
      })
    }
  }
}
</script>
