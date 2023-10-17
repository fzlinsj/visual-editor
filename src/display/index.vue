<template>
  <div id="displayContainer" style="width:100vw;height:100vh">
    <div :id="Common.DEFAULT_DISPLAY_CONTAINER_ID"></div>
    <TeleportContainer />
  </div>
  <div v-if="!isFullScreen" class="display-tools-container" style="position: absolute">
    <!-- <el-button v-if="!isFullScreen" @click="fullScreen">全屏</el-button> -->
    <el-dropdown @command="handleToolsCommand">
      <el-button :icon="More" size="small" round />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="fullScreen">全屏</el-dropdown-item>
          <el-dropdown-item command="fit">自适应</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import * as Common from "@/common";
import { useDisplay } from "./useDisplay"
import { Graph,Edge,Node,ToolsView } from "@antv/x6";
import { getTeleport } from "@antv/x6-vue-shape";
import { parseParams } from "@/utils";
import { CanvasConfig } from "@/editor/config";
import { More }  from "@element-plus/icons-vue";
import {useIs3DMode} from "@/store/modules/is3DStroe";
import { parseJSONData } from "@/utils";


const TeleportContainer = getTeleport();
let { initDisplay, screenName } = useDisplay(Common.DEFAULT_DISPLAY_CONTAINER_ID);
document.title = '可视化查看 - ThingsPanel - ' + screenName.value;
const params = parseParams();
onMounted(() => {
  let jsonData: any = "";
  if (params?.mode === 'preview') {
    jsonData = sessionStorage.getItem(Common.PREVIEW_JSON_DATA_KEY);
    initDisplay(jsonData);
  } else {
    initDisplay(jsonData, params.id);
  }

});

const containerRect = ref({
  width: 1920,
  height: 1080
});

onMounted(() => {
  const resizeObserver = new ResizeObserver(entries => {
    console.log("监听变化", entries[0].contentRect.width, entries[0].contentRect.height)
    const options: ICanvasConfig.Options = {
      screenRect: {
        width: entries[0].contentRect.width,
        height: entries[0].contentRect.height
      }
    }
    CanvasConfig.getDisplayInstance(Common.DEFAULT_DISPLAY_CONTAINER_ID, options).zoomToFit();
  })
  const displayContainer: HTMLElement = <HTMLElement>document.getElementById(Common.DEFAULT_DISPLAY_CONTAINER_ID);
  resizeObserver.observe(displayContainer);
  
  const canvasConfig: ICanvasConfig = CanvasConfig.getDisplayInstance(Common.DEFAULT_DISPLAY_CONTAINER_ID);
  const events: ICellEvents = canvasConfig.getEvents() 
  events.setMountedEventListener((data: any) => {
    console.log("mounted", data)
    // containerRect.value = data.containerRect;
  })

  events.setDBClickEventListener((data:any)=>{

    handleNodeEvent('onDblClick',getEventData(data));

  })
  

})

function getEventData(data:any){

  const node: Node.Properties = data.cell as unknown as Node.Properties;
  const tempData = node.store.data.data || {};
  const jsonData = parseJSONData(tempData.jsonData);
  return jsonData?.eventData?.eventData;
}


function handleToolsCommand(command: string) {
  switch (command) {
    case "fullScreen":
      fullScreen();
      break;
    case "fit":
      const canvasConfig: ICanvasConfig = CanvasConfig.getDisplayInstance(Common.DEFAULT_DISPLAY_CONTAINER_ID);
      canvasConfig.zoomToFit();
      break;
  }
}

let isFullScreen = ref<any>(false);
function fullScreen() {
  if (!isFullScreen.value) {
    document.documentElement.requestFullscreen();
    isFullScreen.value = true;
  }
}
function screenChange() {
  document.fullscreenElement ? isFullScreen.value = true : isFullScreen.value = false
}
document.addEventListener("fullscreenchange", screenChange , true);



function handleShowOrHideElement(showList:[any],hideList:[any]){

  var temp = CanvasConfig.getDisplayInstance()?.getGraph()?.getNodes();
  console.log('nodes list',showList,hideList)
  temp?.forEach((cell: any) => {
      if(showList?.includes(cell.zIndex)){
          console.log('cell zIndex:'+cell.zIndex+' isShow')
          cell.visible = true;
      }

      if(hideList?.includes(cell.zIndex)){
          console.log('cell zIndex:'+cell.zIndex+' isHide')
          cell.visible = false;

      }

  });
};

function handleEvent(params:any){
  if(!params){
      return;
  }
  switch(params.actionType){

      case 'openWeb':
      break;
      case 'setVariable':
      break;
      case 'showOrHideElement':
        handleShowOrHideElement(params.showElement,params.hideElement)
      break;
      case 'script':
      break;
      case 'deviceView':
      break;
      case 'callApi':
      break;
      case 'animation':
      break;    
  }
};


function handleNodeEvent(eventType: string,eventData:any){

  if(!eventData){
      return;
  }
  if(eventData.length == 0){
      return;
  }
  eventData.forEach((eventParam: any) => {
      if(eventParam.eventType === eventType){
          handleEvent(eventParam);
      }
  });
}



</script>

<style lang="scss" scoped>
:deep(.x6-port.x6-port-link) {
  // 隐藏连接桩
  display: none;
}

.display-tools-container {
  position: absolute;
  top: 10px;
  left: 5px;
}
</style>