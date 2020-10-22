<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
    </template>
  </global-footer>
</template>

<script src="http://sdk.talkingdata.com/app/h5/v1?appid=9B17DB57120D465B9DF500EA876CC6D5&vn=box&vc=1.0.0"></script>
<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
