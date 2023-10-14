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

                <!-- 打开网页 -->

                <el-form-item label="网页类型" v-if="formData.actionType=='openWeb'">
                    <el-select v-model="formData.webPage" placeholder="请选择类型">
                    <el-option
                        v-for="item in webPage"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="外部网址" v-if="formData.actionType=='openWeb'&&formData.webPage=='externalPage'">
                    <el-input type="text" v-model="formData.externalPage"></el-input>
                </el-form-item>

                <el-form-item label="选可视化" v-if="formData.actionType=='openWeb'&&formData.webPage=='innerPage'">
                    <el-select filterable v-model="formData.visualizationId" placeholder="选择可视化">
                        <el-option v-for="item in visualizationOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>

                <el-form-item label="是否弹窗" v-if="formData.actionType=='openWeb'">
                    <el-switch v-model="formData.isPagePopUp" />
                </el-form-item>

                <el-form-item label="自动关闭" v-if="formData.actionType=='openWeb'">
                    <el-switch v-model="formData.isPageAutoClose" />
                </el-form-item>

                <el-form-item label="页面宽度" v-if="formData.actionType=='openWeb'&&formData.webPage=='externalPage'">
                    <el-input type="number" v-model="formData.pageWidth"></el-input>
                </el-form-item>

                <el-form-item label="页面高度" v-if="formData.actionType=='openWeb'&&formData.webPage=='externalPage'">
                    <el-input type="number" v-model="formData.pageHeight"></el-input>
                </el-form-item>

                <el-form-item label="页面标题" v-if="formData.actionType=='openWeb'&&formData.webPage=='externalPage'">
                    <el-input type="text" v-model="formData.pageTitle"></el-input>
                </el-form-item>

                <!-- 设置变量 -->

                <!-- 显示或隐藏元素 -->
                <el-form-item label="显示元素" v-if="formData.actionType=='showOrHideElement'">
                    <el-select
                    v-model="formData.showElement"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                    placeholder="选择要显示的元素层级"
                    style="width: 240px"
                    >
                    <el-option
                    v-for="item in showLayerIndexOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                    </el-select>
                </el-form-item>
                <el-form-item label="隐藏元素" v-if="formData.actionType=='showOrHideElement'">
                    <el-select
                    v-model="formData.hideElement"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                    placeholder="选择要隐藏的元素层级"
                    style="width: 240px"
                    >
                    <el-option
                    v-for="item in hideLayerIndexOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                    </el-select>
                </el-form-item>

            </el-form>
        </el-collapse-item>
    </el-collapse>
</template>

<script setup lang="ts">
import { ref, reactive, watch, toRaw, onMounted, watchEffect } from "vue";
import { Delete } from '@element-plus/icons-vue'
import VisualAPI from "@/api/visual";
import { useBaseEventData } from '../useBaseEventData'


const props = defineProps({
    index: Number,
    data: Object,
    cellList: {
      type: Array,
      default: () => ([])
    }
});
const emit = defineEmits(["delete", 'change']);
const activeNames = ref<string[]>(['style']);

const visualizationOptions = ref<any>([]);
const showLayerIndexOption = ref<any>([]);
const hideLayerIndexOption = ref<any>([]);

// const formData = reactive({
//     eventType: 'upSpring',
//     actionType:'openWeb',
//     webPage:'externalPage',
//     externalPage:'',
//     isPagePopUp:true,
//     isPageAutoClose:true,
//     pageWidth:100,
//     pageHeight:100,
//     pageTitle:'',
//     visualizationId:'',
//     showElement:[] as any[],
//     hideElement:[] as any[],
// })  

let { 
    formData 
} = useBaseEventData();



const eventPotions = reactive([
    { value: 'onClick', label: '单击' },
    { value: 'onDblClick', label: '双击' },
    { value: 'onMouseDown', label: '按下' },
    { value: 'onMouseUp', label: '弹起' },
    { value: 'onMouseEnter', label: '鼠标移入' },
    { value: 'onMouseLeave', label: '鼠标移出' },

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

const webPage= reactive([
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
    //formData.eventType = val.eventType || "";
   
    Object.assign(formData,val);


}, { deep: true, immediate: true });


/**
 * 获取项目列表
 * @returns 
 */
 async function getJsonDataById() {
    console.log('enter getJsonDataById')
    return new Promise((resolve, reject) => {
        VisualAPI.getJsonDataById({current_page: 1, per_page: 10000})
            .then(({ data: result }) => {

                //console.log('getJsonDataById result',result)
                if (result.code === 200) {


                    const { data } = result.data;
                    const options = data.map((item: any) => ({ value: item.id, label: item.dashboard_name }))
                    resolve(options)
                }
            })

    })
}

function getCanShowCellIdList(){

    const options = props.cellList.map((item: any) => ({ value: item.view.cell.zIndex, label: item.view.cell.zIndex }));
    let filterOptions = options.filter(function (n) {
        return !formData.hideElement.includes(parseInt(n.label))
    })
    console.log('getCanShowCellIdList filterOptions',filterOptions)
    return filterOptions;

}

function getCanHideCellIdList(){
    const options = props.cellList.map((item: any) => ({ value: item.view.cell.zIndex, label: item.view.cell.zIndex }));
    let filterOptions = options.filter(function (n) {
        return !formData.showElement.includes(parseInt(n.label))
    })
    console.log('getCanHideCellIdList filterOptions',filterOptions)
    return filterOptions;
}

onMounted(async () => {
    visualizationOptions.value = await getJsonDataById();
  
});


watch(() => formData.actionType, async (value) => {

    if(value === 'showOrHideElement'){
        showLayerIndexOption.value = getCanShowCellIdList();
        hideLayerIndexOption.value = getCanHideCellIdList();
    }

    
}, { immediate: true });

watch(() => formData.showElement, async (value) => {

    hideLayerIndexOption.value = getCanHideCellIdList();


}, { immediate: true });

watch(() => formData.hideElement, async (value) => {

    showLayerIndexOption.value = getCanShowCellIdList();


}, { immediate: true });


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