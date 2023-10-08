<template>
    <!-- 设备数据 -->
    <el-collapse v-model="activeNames">
        <el-collapse-item name="device">
            <template #title>
                <div class="flex justify-between w-full items-center">
                    <span>事件 {{ index }}</span>
                    <el-icon class="header-icon mr-3" @click.stop="handleDelete">
                        <Delete />
                    </el-icon>
                </div>
            </template>
            <el-form>
                <el-form-item label="事件类型">
                    <el-select v-model="formData.eventType" placeholder="请选择事件类型">
                    <el-option
                        v-for="item in eventPotions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="动作类型">
                    <el-select v-model="formData.actionType" placeholder="请选择动作类型">
                    <el-option
                        v-for="item in actionPotions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="外部网址">
                    <el-input type="text" v-model="formData.externalPage"></el-input>
                </el-form-item>

                <el-form-item label="弹窗">
                    <el-switch v-model="formData.isPagePopUp" />
                </el-form-item>

                <el-form-item label="自动关闭">
                    <el-switch v-model="formData.isPageAutoClose" />
                </el-form-item>

                <el-form-item label="宽度">
                    <el-input type="number" v-model="formData.pageWidth"></el-input>
                </el-form-item>

                <el-form-item label="高度">
                    <el-input type="text" v-model="formData.pageHeight"></el-input>
                </el-form-item>

                <el-form-item label="标题">
                    <el-input type="text" v-model="formData.pageTitle"></el-input>
                </el-form-item>

            </el-form>
        </el-collapse-item>
    </el-collapse>
</template>

<script setup lang="ts">
import { ref, reactive, watch, toRaw, onMounted, watchEffect } from "vue";
import { Delete } from '@element-plus/icons-vue'
import DeviceAPI from "@/api/device";

const props = defineProps({
    index: Number,
    data: Object
});
const emit = defineEmits(["delete", 'change']);
const activeNames = ref<string[]>(['style']);

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

watch(() => formData, (value) => {
    console.log('watch formData', value)
    emit('change', { index: props.index, ...toRaw(value) })
}, { deep: true })




const options = reactive({
    deviceOptions: <any>[],
    tslOptions: <any>[]
})

watch(() => props.data, async (val: any) => {
    console.log('watch props.data', val)
    if (JSON.stringify(val) === "{}") return;
    // 项目
    formData.eventType = val.eventType || "";
   


}, { deep: true, immediate: true });

onMounted(async () => {
    
});


/**
 * 删除设备
 * @param id 
 */
const handleDelete = (e: any) => {
    e.preventDefault();
    console.log('handleDelete', props.index)
    emit('delete', props.index)
}
</script>

<style lang="scss" scoped>
.header-icon {
    font-size: 16px;
    margin-left: 10px;
    cursor: pointer;
}
</style>