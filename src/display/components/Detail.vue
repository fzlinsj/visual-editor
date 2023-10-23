<template>
    <el-dialog :title="data.name" v-model="dialogVisible" width="80%" :before-close="handleClose">
        <div v-loading="isLoading">
            <iframe ref="frameRef" style="width: 100%;height: calc(100vh - 200px); border: 0px;margin:0;background: #fff"></iframe>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>

import { ElMessageBox } from 'element-plus'
import { ref, watch,nextTick } from "vue";

const props = defineProps({
    visible: {
      type: Boolean,
      default: false
    },
    url: {
        type: String,
        default: ""
    },
    data: {
        type: Object,
        default: () => ({})
    }
});

const emit = defineEmits(["onClose"]);


const dialogVisible = ref(false);
const isLoading = ref(false);

let frameRef = ref<any>({})

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确定要关闭当前窗体吗?')
    .then(() => {
      done()
      emit('onClose')
    })
    .catch(() => {
      // catch error
    })
}

watch(() => props.visible, (val) => {


    dialogVisible.value = val;


    if (val) {
        isLoading.value = true
        nextTick(() => {
            // const myFrame = frameRef;
            frameRef.value.contentWindow.location = props.url;
            isLoading.value = false
        })
    }



  }, {deep: true, immediate: true});




// export default {
//   components: {},
//   props: {
//     visible: {
//       type: Boolean,
//       default: false
//     },
//     url: {
//         type: String,
//         default: ""
//     },
//     data: {
//         type: Object,
//         default: () => ({})
//     }
//   },
//   data() {
//     return {
//         isLoading: false
//     }
//   },
//   computed: {
//     dialogVisible: {
//         get() {
//             return this.visible
//         },
//         set(val) {
//             this.$emit('update:visible', val)
//         }
//     }
//   },
//   watch: {
//     dialogVisible: {
//         handler(val) {
//             if (val) {
//                 this.isLoading = true
//                 this.$nextTick(() => {
//                     const myFrame = this.$refs.frameRef;
//                     myFrame.contentWindow.location = this.url
//                     this.isLoading = false
//                 })
//             }
//         },
//         immediate: true
//     },
//   },
//   methods: {

//     handleClose(){

//     },



//   }
// }
</script>
<style lang="scss" scoped>
</style>