<!-- 画布属性 -->
<template>
    <el-form label-width="80px" label-position="left">

        <!-- <el-form-item label="尺寸:">
            <el-row :gutter="10">
                <el-col :span="12" ><el-input type="number" v-model="formData.size.width"></el-input></el-col>
                <el-col :span="12"><el-input type="number" v-model="formData.size.height"></el-input></el-col>
            </el-row>
        </el-form-item> -->

        <el-form-item label="背景颜色:">
            <tp-color-picker v-model="formData.backgroundColor"></tp-color-picker>
            <!-- <el-color-picker v-model="formData.backgroundColor" /> -->
        </el-form-item>
        
        <!-- <el-form-item label="背景图片:"> -->
            <!-- <el-input  v-model="formData.backgroundImage" onclick="showCustomPlugins"></el-input> -->
            <!-- <el-button class="custom-button" @click="showCustomPlugins">自定义图形</el-button> -->
        <!-- </el-form-item> -->

        <el-form-item label="背景图片:">
            <!-- <div class="image">
                <el-image src="https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg">
                    <template #error>
                        <div class="image-slot">
                        <el-icon><icon-picture /></el-icon>
                        </div>
                    </template>
                </el-image>
            </div> -->
            <div class="album-image-list">
                <gallery-item
                :data=imageData
                :key="1111"
                @submit="handleItemSubmit"
                @view="handleClick(0)">
                <template #tags>
                  <div class="album-tags">
                    <el-tag class="tags-edit" size="small" effect="dark" type="primary">
                      <el-icon @click="selectClick"><Select/></el-icon>
                      <el-icon style="margin-left: 10px;" @click="delClick"><Delete/></el-icon>
                    </el-tag>
                  </div>
                </template>
              </gallery-item>
            </div>
        </el-form-item> 

        <el-form-item label="显示网格:">
            <el-switch v-model="formData.showGrid" />
        </el-form-item>

        <el-form-item v-if="formData.showGrid" label="网格大小:">
            <el-input v-model="formData.gridSize"></el-input>
        </el-form-item>

        <el-form-item label="显示标尺:">
            <el-switch v-model="formData.showRuler" />
        </el-form-item>

        <el-form-item label="图标测试:">
            <ElIconPicker v-model="icon"></ElIconPicker>
        </el-form-item>

        <!-- <el-form-item label="页面宽度:">
            <el-input-number v-model="formData.size.width" @change="handleChange" :min="1" :max="2000" label="页面宽度"></el-input-number>
        </el-form-item> -->
    </el-form>
  
    <ImageSelect v-model:visible="imageSelectDialogVisible" @submit="imageSelectSubmit"/>
</template>

<script setup lang="ts">
import { ref, reactive, watch,Ref,onMounted} from "vue";
import { Picture as IconPicture,Edit as IconEdit,Select,Delete, TrophyBase} from '@element-plus/icons-vue'
import ImageSelect from "../../common/ImageSelect.vue";
import GalleryItem from '@/editor/components/common/gallery-item.vue'
import { ImageInter } from '@/editor/components/common/interface';
import { CanvasConfig } from "@/editor/config"
import { Background } from "@antv/x6/lib/registry/background";
import { json } from "stream/consumers";
import ElIconPicker from "@/editor/components/common/el-icon-picker.vue"

const icon = ref<string>('');

const imageSelectDialogVisible = ref(false);
const showCustomPlugins = () => {
  imageSelectDialogVisible.value = true;
}

const handleChange = (value: number) => {
  console.log(value)
}

const imageSelectSubmit = (item:ImageInter) => {

    console.log('img select:'+JSON.stringify(item))

    imageData.value.img_preview_url = item.img_preview_url;
    imageData.value.img_url = item.img_url;
    //formData.backgroundImage = item.img_url;

    if(typeof(item.img_preview_url)==='string'){
        
        formData.backgroundImage = item.img_preview_url as string
    }
    
    console.log('====formData:',formData)

}

const selectClick=()=>{

    showCustomPlugins();
}

const delClick=()=>{
    console.log('enter delClick')
    formData.backgroundImage = ""
    imageData.value.img_preview_url = "";
    imageData.value.img_url = "";
}

const imageData: Ref<ImageInter> = ref(
    { 
    id: '0',
    // 图片名称
    img_name: 'string',
    // 图片宽度
    img_width: 150,
    // 图片高度
    img_height: 150,
    // 图片url
    img_url: '',
    // 图片预览地址
    img_preview_url: '',
    // 图片大小
    img_size: 123456,
    // 排序值
    // sort?: number
    // 是否选中
    checked: false,
    // 创建时间
    createdAt: '',
    // 更新时间
    updatedAt:'',

    file_url:'',
    }
)

const listGet = () => {

}

const handleItemSubmit = (e: { type: string, data: ImageInter }) => {

}

const handleClick = (index: number) => {

}

const editItemTag = (data: ImageInter) => {
  
    
}

const initFormData=()=>{

    const canvasConfig: ICanvasConfig = CanvasConfig.getInstance();

    canvasConfig.setRenderJsonCallback((json:any)=>{


        formData.showGrid = json.graph.showGrid;
        formData.gridSize = json.graph.gridSize;
        formData.showRuler = json.graph.showRuler;
        formData.backgroundColor = json.graph.background.color;

        formData.backgroundImage = json.graph.background.image;

        imageData.value.img_preview_url = formData.backgroundImage;

        imageData.value.img_url = formData.backgroundImage;
    
        console.log('===initFormData',formData)


    })

   

}

onMounted(() => {
    initFormData();
});


const activeNames = ref("ruler");
const formData = reactive({
    showGrid: true,
    gridSize: 10,
    backgroundColor: "#F2F7FA",
    backgroundImage: "",
    showRuler: true,
    size: {
        width: 1920,
        height: 1080
    }
})
const emit = defineEmits(["onChange"]);
watch(formData, (newVal) => {

    console.log('formData change',formData)

    emit('onChange', newVal)
}, { deep: true })
</script>

<style scoped>
.image .el-image {
  padding: 0 5px;
  max-width: 200px;
  max-height: 200px;
  width: 200px;
  height: 200px;
}

.image .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
.image .image-slot .el-icon {
  font-size: 30px;
}
.album-image-list {
    flex: 1;
    padding-top: 10px;
    .el-row {
    width: 100%;
    height: 100%;
    align-content: flex-start;
    }
    .el-col {
    padding: 10px;
    }
    .album-tags {
        position: absolute;
        left: 5px;
        bottom: 30%;
        width: 100%;
        z-index: 3;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        .el-tag {
            margin-bottom: 5px;
            + .el-tag {
            margin-left: 5px;
            }
        }
        .tags-edit {
            display: none;
        }
    }
    .gallery-item:hover {
        .tags-edit {
            display: inline-flex;
        }
    }
}
</style>