<template>
  <div style="height:100%">
    <el-row style="margin-bottom: 10px">
        <el-radio-group v-model="formData.bindType">
          <el-radio v-for="item in bindOptions" :label="item.value" size="small">{{ item.label}}</el-radio>
        </el-radio-group>
    </el-row>
    <el-row style="height:100%">
        <!-- 静态数据 -->
        <el-input v-if="formData.bindType==='static'" :rows="20" type="textarea" v-model="formData.static"></el-input>
        <!-- 动态数据 -->
        <el-form-item v-else-if="formData.bindType==='dynamic'" style="width:100%">
          <el-input :rows="2" type="textarea" v-model="formData.dynamic"></el-input>
        </el-form-item>
        <!-- 设备数据 -->
        <div class="w-full" v-else-if="formData.bindType==='device'" >
          <slot></slot>
        </div>
        
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: [String, Object],
      default: () => ({})
    }
  },
  data() {
    return {
      formData: {
        bindType: 'static',
        static: "文本"
      },
      bindOptions: [
        { value: 'static', label: '静态数据' }, 
        { value: 'dynamic', label: '动态数据'}, 
        { value: 'device', label: '设备数据'}
      ]
    }
  },
  watch: {
    formData: {
      handler(val) {
        this.$emit("onChange", {
          data: { bindType: this.bindType, ...val }
        });
      },
      deep: true
    },
    data: {
      handler(val) {
        console.log('text.data', val)
        if (JSON.stringify(val) !== "{}") {
          this.formData = JSON.parse(JSON.stringify(val));
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    // if (JSON.stringify(this.data) !== "{}") {
    //   this.formData = JSON.parse(JSON.stringify(this.data));
    // }
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
.el-radio.el-radio--small {
  margin-right: 10px
}
</style>