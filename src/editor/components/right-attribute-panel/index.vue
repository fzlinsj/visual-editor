<template>
        <ElTabs style="height: 100%;overflow: auto;" v-model="activeName">
            <el-tab-pane style="height: 100%" :label="!isEdge?'外观':'线条样式'" name="attr">
                <!-- 画布样式 -->
                <CanvasAttr v-if="!isNode&&!isEdge" @onChange="onCanvasAttrChange"/>
                <div style="height: 100%" v-if="isNode">
                    <!-- 节点基础样式 -->
                    <BaseAttr :data="nodeData" @onChange="onBaseChange"/>
                    <!-- 自定义样式 -->
                    <component  v-if="attributeCpt" :currentNode='nodeId' :bindData="bindData" :data="attrData" :is="attributeCpt" v-on="actionHandlers" @onChange="onChange" />
                    <BaseNodeAttr v-if="!attributeCpt" :data="nodeData" @onChange="onChange"/>
                </div>

                <!-- 边样式 -->
                <LineAttr v-if="isEdge"   :tools="useTools()" :edgeData="edgeData" :nodeData="nodeData" @onChange="onChange"/>
            </el-tab-pane>
            <!-- 数据绑定 -->
            <el-tab-pane label="数据" name="data" v-if="!isEdge && isNode">
                <component v-if="isNode" :is="dataCpt" :data="bindData"  @onChange="onChange">
                    <!-- 设备数据 -->
                    <BaseData :data="bindData" @onChange="onChange"/>
                </component>
            </el-tab-pane>
            <!-- 组件事件 -->
            <el-tab-pane label="事件" name="compEvent" v-if="!isEdge && isNode && eventCpt">
                <component v-if="isNode" :is="eventCpt" :data="eventData"  @onChange="onChange">
                    <BaseEvent :data="eventData" :cellList='cellList' @onChange="onChange"/>
                </component>
            </el-tab-pane>
            <!-- 图层 -->
            <el-tab-pane label="图层" name="layer">
                <LayerAttr :nodeData='nodeData' :cellList='cellList' :initEvents='initEvents'/>
            </el-tab-pane>
        </ElTabs>
</template>

<script setup lang="ts">
import { useTools } from '@/editor/hooks'

import { ref, onMounted, reactive, watch } from "vue";
import CanvasAttr from "./components/CanvasAttr.vue";
import BaseAttr from "./components/BaseAttr.vue";
import LineAttr from "./components/LineAttr.vue";
import LayerAttr from "./components/LayerAttr.vue";
import BaseData from './components/baseData/index.vue';
import BaseEvent from './components/baseEvent/index.vue';
import BaseNodeAttr from "./components/BaseNodeAttr.vue"
import { useEvents } from "./useEvents"
import { useAttribute } from "./useAttribute"
import { parseJSONData } from '@/utils';

const activeName = ref("attr");
let {
    isNode, attributeCpt, dataCpt,eventCpt,nodeData,edgeData,
    isEdge,nodeId,
    initEvents, onChange, onBaseChange,
    cellList
} = useEvents();
const cellIndex=ref(-1)

// 自定义样式
const attrData = ref<any>({});
// 数据绑定
const bindData = ref<any>({});
//事件数据
const eventData = ref<any>({});



watch(nodeData, (value) => {

    cellIndex.value=-1
    if (!value) return;
    if (!value.data) {
        attrData.value = {};
        bindData.value = {};
        eventData.value ={};
        return;
    }
    const jsonObj = parseJSONData(value.data.jsonData);

    console.log('click watch:'+JSON.stringify(jsonObj))

    attrData.value = {...jsonObj.style};
    bindData.value = {...jsonObj.data};
    eventData.value ={...jsonObj.eventData};

})

let actionHandlers = reactive({})
onMounted(() => {
    initEvents();
});

let {
    onCanvasAttrChange
} = useAttribute();

</script>

<style lang="scss" scoped></style>