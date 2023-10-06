<template>
    <el-collapse v-model="activeNames">
        <el-collapse-item title="样式" name="style">
            <el-form v-model="formData" label-width="80px" label-position="left">
                <el-form-item label="按钮尺寸">
                    <el-select v-model="formData.size" placeholder="请选择按钮尺寸">
                    <el-option
                        v-for="item in sizeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="按钮类型">
                    <el-select v-model="formData.btnType" placeholder="请选择按钮类型">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="朴素按钮">
                    <el-switch v-model="formData.isPlain" />
                </el-form-item>

                <el-form-item label="圆角">
                    <el-switch v-model="formData.isRound" />
                </el-form-item>

                <el-form-item label="圆形">
                    <el-switch v-model="formData.circle" />
                </el-form-item>

                <el-form-item label="使用图标">
                    <el-switch v-model="formData.useIcon" />
                </el-form-item>

                <el-form-item label="图标" v-if="formData.useIcon">
                    <ElIconPicker v-model="formData.icon"></ElIconPicker>
                </el-form-item>

            </el-form>
        </el-collapse-item>
    </el-collapse>
</template>
  
<script setup lang="ts">

import { ref,reactive,watch, watchEffect} from 'vue'
import ElIconPicker from "@/editor/components/common/el-icon-picker.vue"

const activeNames = ref<String>('style');

const formData = reactive({
    fontSize: 20,
    color: '#000000',
    backgroundColor: '',
    borderWidth: 0,
    borderColor: '#000000',
    btnType:'primary',
    isPlain:false,
    isRound:false,
    size:'large',
    circle:false,
    useIcon:false,
    icon:''
})  

const options = reactive([
    { value: 'primary', label: '主要按钮' },
    { value: 'success', label: '成功按钮' },
    { value: 'info', label: '信息按钮' },
    { value: 'warning', label: '警告按钮' },
    { value: 'danger', label: '危险按钮' },
])  

const sizeOptions = reactive([
    { value: 'large', label: '大' },
    { value: 'default', label: '中' },
    { value: 'small', label: '小' },
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
    emit("onChange", {
        style: { ...val, fontSize: val.fontSize + 'px', borderWidth: val.borderWidth + 'px' }
    });

}, { deep: true })

watch(props.data, (val) => {

    console.log('text.Attribute.watch.data', val)
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