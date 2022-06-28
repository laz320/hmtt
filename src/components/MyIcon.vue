<template>
  <div>
    <!-- 54 进行封装 -->
    <i class="toutiao" :class="'toutiao-' + name"></i>
  </div>
</template>

<script>
export default {
  // 54 进行封装
  props: {
    name: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
