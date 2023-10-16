import { parseJSONData, randomString } from "@/utils";
import { Component, defineComponent } from "vue";
import { DataConfig } from "../config/DataConfig";
import { Node } from "@antv/x6";
import { ElMessage } from 'element-plus'
import { breakpointsTailwind } from "@vueuse/core";
import {PluginConfig} from "@/editor/config";
import { CanvasConfig } from "@/editor/config";


export const getDisplayComponent = (cpt: Component, nodeData: any, refType: any): Component => {
    return defineComponent({
        inject: ['getNode'],
        data() {
            return {
                value: "",
                style: {},
                data: {},
                id: randomString(8),
                dataConfig: new DataConfig(nodeData, refType),
                eventData:[],
                canvasConfig: CanvasConfig.getDisplayInstance(),
                
            }
        },
        mounted() {


            const node: Node.Properties = (this as any).getNode() as Node.Properties;
            const data = node.store.data.data || {};
            const jsonData = parseJSONData(data.jsonData);
            if (jsonData.style) {
                this.style = { ...jsonData.style }
            }
            if (jsonData.data) {
                this.data = { ...jsonData.data } ;
                if (jsonData.data.bindType === "static") {
                    // 静态数据
                    this.value = jsonData.data.static;
                } else if (jsonData.data.bindType === "dynamic") {
                    // 动态数据
                    // this.value = jsonData.data.dynamic;
                } else if (jsonData.data.bindType === "device") {
                    if (!jsonData.data.deviceData[0].projectId) return;
                    // 设备数据
                    const cb = (value: any) => {
                        this.value = value;
                    }
                    // 设置回调
                    this.dataConfig.setCallback(cb);
                    // 设置设备ID
                    this.dataConfig.setDevicesData(jsonData.data.deviceData)
                    this.dataConfig.setDeviceId(jsonData.data.deviceData[0].deviceId);
                    this.dataConfig.setProperty(jsonData.data.deviceData[0].property);
                    // 启动定时器开始刷新数据
                    this.dataConfig.start();
                }
            }

            if(jsonData.eventData){

                console.log('onMount eventData is ', jsonData.eventData)

                this.eventData = jsonData.eventData.eventData;

                console.log('this eventData is ', this.eventData)

            }

            console.log('display.mounted.this.style', jsonData.data)


        },
        methods: {
            onChange(value: any, _callback: any) {
                const { device, property, switch: switchValue } = value; 
                if (refType === 'switch') {
                    this.dataConfig.setCallback(_callback);
                    this.dataConfig.setValue(switchValue);
                    this.dataConfig.start();
                } else {
                    if (!device || !property) return;
                    this.dataConfig.stop();
                    // 改变了数据入口
                    device && this.dataConfig.setDeviceId(device.deviceId);
                    property && this.dataConfig.setProperty(property);
                    // 重启定时器
                    this.dataConfig.start();
                }
            },

            handleShowOrHideElement(showList:[],hideList:[]){



                var temp = this.canvasConfig?.getGraph()?.getNodes();

                temp?.forEach((cell: any) => {

                cell.visible = false;


                });



             

                console.log('===cellList:',this.cellList)

                // this.cellList.forEach((cell: any) => {

                //     cell.visible = false;

                    
                // });


              





            },

            handleEvent(params:any){

                //console.log('handleEvent',params)
                if(!params){
                    return;
                }
                switch(params.actionType){

                    case 'openWeb':
                    break;
                    case 'setVariable':
                    break;
                    case 'showOrHideElement':
                        this.handleShowOrHideElement(params.showElement,params.hideElement)
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


            },

            
            handleNodeEvent(eventType: string){

                //console.log('eventData:',this.eventData)

                if(!this.eventData){
                    return;
                }

                if(this.eventData.length == 0){
                    return;
                }
                this.eventData.forEach((eventParam: any) => {

                    if(eventParam.eventType === eventType){
                        this.handleEvent(eventParam);

                    }
                });

            }
        },
        render() {
            return (
                <cpt id={this.id} 
                    key={this.id} 
                    value={this.value} 
                    style={this.style} 
                    data={this.data} 
                    onChange={this.onChange}
                    onClick={(value:any)=>{this.handleNodeEvent('onClick')}}
                    onDblclick={(value:any)=>{this.handleNodeEvent('onDblClick')}}
                    onMousedown ={(value:any)=>{this.handleNodeEvent('onMouseDown')}}
                    onMouseup ={(value:any)=>{this.handleNodeEvent('onMouseUp')}}
                    onMouseenter ={(value:any)=>{this.handleNodeEvent('onMouseEnter')}}	
                    onMouseleave={(value:any)=>{this.handleNodeEvent('onMouseLeave')}}
                    isDisplay={true}
                    />
            )
        }
    })
}