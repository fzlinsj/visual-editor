<template>
    <el-collapse v-model="activeNames" v-for="(device, index) in eventData" >
        <el-collapse-item title="事件" name="event">
            <el-form v-model="device" label-width="80px" label-position="left">
                <el-form-item label="事件类型">
                    <el-select v-model="device.eventType" placeholder="请选择事件类型">
                    <el-option
                        v-for="item in eventPotions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="动作类型">
                    <el-select v-model="device.actionType" placeholder="请选择动作类型">
                    <el-option
                        v-for="item in actionPotions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="外部网址">
                    <el-input type="text" v-model="device.externalPage"></el-input>
                </el-form-item>
                <el-form-item label="弹窗">
                    <el-switch v-model="device.isPagePopUp" />
                </el-form-item>

                <el-form-item label="自动关闭">
                    <el-switch v-model="device.isPageAutoClose" />
                </el-form-item>

                <el-form-item label="宽度">
                    <el-input type="number" v-model="device.pageWidth"></el-input>
                </el-form-item>

                <el-form-item label="高度">
                    <el-input type="text" v-model="device.pageHeight"></el-input>
                </el-form-item>

                <el-form-item label="标题">
                    <el-input type="text" v-model="device.pageTitle"></el-input>
                </el-form-item>

            </el-form>
        </el-collapse-item>
    </el-collapse>


    <el-button style="width:100%" @click="addDevice" >新增事件</el-button>
    
</template>
  
<script setup lang="ts">

import { ref,reactive,watch, watchEffect} from 'vue'
import ElIconPicker from "@/editor/components/common/el-icon-picker.vue"
import { json } from 'stream/consumers';

const activeNames = ref<String>('event');

const eventData = ref<any>([
  {
    eventType: 'upSpring',
    actionType:'animation',
    externalPage:'',
    isPagePopUp:true,
    isPageAutoClose:true,
    pageWidth:100,
    pageHeight:100,
    pageTitle:''
  }
])


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