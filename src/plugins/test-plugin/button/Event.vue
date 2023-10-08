<template>
    <div style="height:100%">
    <el-row style="height:100%">
        <div class="w-full">
          <slot></slot>
        </div>
    </el-row>
  </div>
</template>
  
<script setup lang="ts">

import { ref,reactive,watch, watchEffect} from 'vue'
import ElIconPicker from "@/editor/components/common/el-icon-picker.vue"
import { json } from 'stream/consumers';

const activeNames = ref<String>('event');

const formData = reactive({
    eventType: 'upSpring',
    actionType:'animation',
    externalPage:'',
    isPagePopUp:true,
    isPageAutoClose:true,
    pageWidth:100,
    pageHeight:100,
    pageTitle:'',


})  

const eventPotions = reactive([
    { value: 'click', label: '单击' },
    { value: 'dblClick', label: '双击' },
    { value: 'pressDown', label: '按下' },
    { value: 'upSpring', label: '弹起' },
    { value: 'moveIn', label: '鼠标移入' },
    { value: 'moveOut', label: '鼠标移出' },

])
const actionPotions = reactive([
    { value: 'openWeb', label: '打开网页' },
    { value: 'setVariable', label: '设置变量' },
    { value: 'showOrHideElement', label: '显示或隐藏元素' },
    { value: 'script', label: '脚本' },
    { value: 'deviceView', label: '设备视图' },
    { value: 'callApi', label: '调用API' },
    { value: 'animation', label: '动画' }

])

const webPotions= reactive([
    { value: 'innerPage', label: '内部页面' },
    { value: 'externalPage', label: '外部页面' },
])


const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(["onChange"]);
watch(formData, (val) => {
    // 当自定义属性改变时，传递给Main.vue的style属性
    console.log('watch formData data change',JSON.stringify(val) )
    emit("onChange", {
        event: { }
    });

}, { deep: true })

watch(props.data, (val) => {

    console.log('wathc props.data change', val)
    const jsonStr = JSON.stringify(val);
    if (jsonStr !== '{}') {
        const jsonObj = JSON.parse(jsonStr);
        jsonObj.fontSize = jsonObj.fontSize?.toString().replace("px", "")
        jsonObj.borderWidth = jsonObj.borderWidth?.toString().replace("px", "")
        Object.assign(formData, jsonObj);

    }

}, { deep: true,immediate:true })


</script>
  
<style lang="scss" scoped></style>