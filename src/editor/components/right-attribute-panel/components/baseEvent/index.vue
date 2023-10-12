<template>
    <div style="height:100%">
      <!-- 项目 -> 分组(绑定分组) -->
      <el-row style="height:100%">
          <!-- 设备数据 -->
          <div class="w-full" >
            <el-button style="width:100%" @click="addEventData">新增事件</el-button>
            <div class="device-container overflow-y-auto overflow-x-auto" >
                <div v-for="(event, index) in eventData" >
                  <EventSelector :index="index" :data="event" :cell-list="cellList" @delete="handleDeleteEvent" @change="handleChangeEventData"/>
                </div>
            </div>
            
          </div>
          
      </el-row>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, onMounted, getCurrentInstance, toRaw, watch } from "vue";
  import { ElMessageBox } from 'element-plus'
  import EventSelector from "./components/EventSelector.vue";
  import { useBaseEventData } from './useBaseEventData'


  const props = defineProps({
    data: {
      type: [Object],
      default: () => ({})
    },
    cellList: {
      type: Array,
      default: () => ([])
    }
  })


  let { 
      formData
  } = useBaseEventData();
  
  const emit = defineEmits(["onChange"]);

  const eventData = ref<any>([
    formData
  ]

  )

  onMounted(() => {
    
  })

  const addEventData =()=>{
    eventData.value.push(formData)

  }

  watch(() => props.data, (val) => {
    console.log('baseData.data', JSON.stringify(val))
    if (JSON.stringify(val) !== "{}" && val.eventData) {
        eventData.value = JSON.parse(JSON.stringify(val.eventData));
        console.log('eventData.value',eventData)
    } else {
        eventData.value = [
        formData
      ]
    }
  }, {deep: true, immediate: true});
  
  
  watch(eventData, (value) => {
    console.log('baseData.device', value)
    emit('onChange', { eventData: { bindType: 'event', eventData: toRaw(eventData.value) }})
  }, {deep: true});
  
  const handleChangeEventData = (data: any) => {

    eventData.value.splice(data.index, 1, data);

    console.log('evnetData:'+JSON.stringify(eventData))
  }
  
  /**
   * 删除设备
   * @param id 
   */
  const handleDeleteEvent = (index: number) => {
    // if (eventData.value.length === 1) {
    //   ElMessageBox.alert('至少保留一个设备', '提示', {})
    //   return
    // }
    const callback = (action: any, instance: any) => {
      if (action === 'confirm') {
        eventData.value.splice(index, 1)
      }
    }
    ElMessageBox.confirm('是否确认删除该事件？', '确认删除', {callback}, null)
  }
      
  </script>
  
  <style lang="scss" scoped>
  .device-container {
    width: 100%;
    height: calc(100vh - 200px);
  }
  </style>