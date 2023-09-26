<template>
    <el-collapse v-model="activeNames">
        <el-collapse-item title="样式" name="style">
            <el-form v-model="formData" label-width="80px" label-position="left">
                <!-- <el-form-item label="字体大小">
                    <el-input type="number" v-model="formData.fontSize"></el-input>
                </el-form-item>

                <el-form-item label="字体颜色">
                    <tp-color-picker v-model="formData.color" />
                </el-form-item>

                <el-form-item label="背景颜色">
                    <tp-color-picker v-model="formData.backgroundColor" />
                </el-form-item>

                <el-form-item label="边框宽度">
                    <el-input type="number" v-model="formData.borderWidth"></el-input>
                </el-form-item>

                <el-form-item label="边框颜色">
                    <tp-color-picker v-model="formData.borderColor" />
                </el-form-item> -->

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

               

            </el-form>
        </el-collapse-item>
    </el-collapse>
</template>
  
<script>
import { styleData } from './default'
import { ref } from 'vue'


export default {
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            activeNames: 'style',
            formData: JSON.parse(JSON.stringify(styleData)),
            options: [
                { value: 'primary', label: '主要按钮' },
                { value: 'success', label: '成功按钮' },
                { value: 'info', label: '信息按钮' },
                { value: 'warning', label: '警告按钮' },
                { value: 'danger', label: '危险按钮' },
            ],
            sizeOptions: [
                { value: 'large', label: '大' },
                { value: 'default', label: '中' },
                { value: 'small', label: '小' },
            ],

        }
    },
    watch: {
        formData: {
            handler(val) {
                // 当自定义属性改变时，传递给Main.vue的style属性
                this.$emit("onChange", {
                    style: { ...val, fontSize: val.fontSize + 'px', borderWidth: val.borderWidth + 'px' }
                });
            },
            deep: true
        },
        data: {
            handler(val) {
                console.log('text.Attribute.watch.data', val)
                const jsonStr = JSON.stringify(val);
                if (jsonStr !== '{}') {
                    const jsonObj = JSON.parse(jsonStr);
                    jsonObj.fontSize = jsonObj.fontSize?.toString().replace("px", "") || styleData.fontSize
                    jsonObj.borderWidth = jsonObj.borderWidth?.toString().replace("px", "") || styleData.borderWidth
                    this.formData = jsonObj;
                } else {
                    this.formData = JSON.parse(JSON.stringify(styleData));
                }
            },
            immediate: true,
            deep: true
        }
    }
}
</script>
  
<style lang="scss" scoped></style>