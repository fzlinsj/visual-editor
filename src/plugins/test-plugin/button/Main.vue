<template>
    <div :style="myStyle" style="width:100%;height:100%;overflow-y: auto" @dblclick="handleDBClick">
        <!-- <span v-if="mode==='view'" :style="{ 'color': myStyle.color }">{{ textValue }}</span>
        <el-input id="inputRef" ref="inputRef" style="width:100%;height:100%" v-if="mode==='edit'" v-model="textValue" @blur="onChange" @keyup.enter.native="onChange"></el-input> -->
        
        <el-button 
        :type="myStyle.btnType" 
        :round ="myStyle.isRound"
        :size = "myStyle.size"
        :circle = "myStyle.circle"
        :plain="myStyle.isPlain">
        {{ textValue}}
      </el-button>
    
    </div>
</template>

<script>
import { styleData } from './default'

export default {
  props: {
    value: {
      type: [String, Object],
      default: '文本'
    },
    style: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      myStyle: styleData,
      textValue: '文本',
      mode: "view"
    }
  },
  watch: {
    style: {
      handler: function (val, oldVal) {
        console.log('text.Main.style', val, oldVal)
        if (JSON.stringify(val) === "{}") return;
        this.myStyle = val;
      },
      immediate: true,
      deep: true
    },
    value: {
      handler: function(val) {
        console.log( val,"9892832913218")
        if (!val) {
          this.textValue = "文本";
        } else {
          this.textValue = val;
        }
        console.log('text.Main.value', this.textValue)
      },
      immediate: true
    }
  },
  methods: {
    handleDBClick(e) {
      this.mode = "edit";
      this.$nextTick(() => {
        this.$refs.inputRef.focus();
      })
    },
    onChange() {
      console.log("text.onChange", this.textValue)
      this.mode = "view";
      this.$emit("onChange", {
          data: { bindType: "static", static: this.textValue }
        });
    }
  }
}
</script>
<style lang="scss" scoped></style>