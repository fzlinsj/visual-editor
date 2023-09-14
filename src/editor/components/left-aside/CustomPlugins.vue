<template>
  <el-dialog v-model="dialogVisible" title="上传图形" width="50%" >
    <el-form ref="ruleFormRef" :model="formData" :rules="formRules" label-width="120">
      <el-form-item label="输入分类名称" prop="plugin_name">
        <el-input v-model="formData.plugin_name"></el-input>
      </el-form-item>
      <el-form-item label="上传图片" prop="files">
        <el-upload ref="uploadRef" class="upload-container" action="" :file-list="formData.files" :multiple="true"
          list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
          :auto-upload="false" :on-change="handleChange">
          <template #trigger>
            <el-button type="primary">选择图片</el-button>
          </template>
        </el-upload>
        <el-dialog v-model="previewDialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit(ruleFormRef)">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import PluginAPI from '@/api/plugin'
import { FormInstance, UploadInstance } from "element-plus";
import { ref, reactive, computed, watch } from "vue";
import type { UploadProps, UploadUserFile } from 'element-plus'
import { message } from '@/utils';
const dialogVisible = ref<Boolean>(false);
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

watch(() => props.visible, (val) => {
  dialogVisible.value = val;
})
const emit = defineEmits(['update:visible', 'submit'])
watch(dialogVisible, (val) => {
  emit('update:visible', val)
})

const formData = reactive({
  plugin_name: '',
  files: []
})
const ruleFormRef = ref<FormInstance>()
const formRules = reactive({
  plugin_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' }
  ],
  files: [
    { required: true, message: '请选择图片', trigger: 'blur' }
  ]
})

const handleChange = (file: any, uploadFiles: any) => {
  formData.files = uploadFiles;
}

const dialogImageUrl = ref('')
const previewDialogVisible = ref(false)
/**
 * 图片预览
 */
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile: any) => {
  dialogImageUrl.value = uploadFile.url!
  previewDialogVisible.value = true
}
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

/**
 * 提交上传
 */
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const fd = new FormData()
      formData.files.forEach((item: any) => {
        fd.append('files', item.raw)
      })
      fd.append('plugin_name', formData.plugin_name);

      console.log("==upload fd info:",fd)

      PluginAPI.uploadPicPlugins(fd)
        .then(({ data: result }) => {
          if (result.code === 200) {
            dialogVisible.value = false;
            resetForm(formEl);
            emit('submit')
            message.success('上传成功');
          } else {
            message.error('上传失败');
          }
          
        })
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<style lang="scss" scoped>
.upload-container {
  text-align: left;
  height: 400px;
  overflow-y: auto;
}
</style>