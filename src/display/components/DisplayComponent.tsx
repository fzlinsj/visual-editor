import { parseJSONData, randomString } from "@/utils";
import { Component, defineComponent } from "vue";
import { DataConfig } from "../config/DataConfig";
import { Node } from "@antv/x6";
import { ElMessage } from 'element-plus'

export const getDisplayComponent = (cpt: Component, nodeData: any, refType: any): Component => {
    return defineComponent({
        inject: ['getNode'],
        data() {
            return {
                value: "",
                style: {},
                data: {},
                eventData:[],
                id: randomString(8),
                dataConfig: new DataConfig(nodeData, refType)
            }
        },
        mounted() {

            const node: Node.Properties = (this as any).getNode() as Node.Properties;
            const data = node.store.data.data || {};
            console.log('display.mounted.data', data)
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

                //console.log('onMount eventData is ', jsonData.eventData)

                this.eventData = jsonData.eventData.eventData;

                //console.log('this eventData is ', this.eventData)

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


            handleNodeEvent(eventType: string){

                if(!this.eventData){
                    return;
                }

                if(this.eventData.length == 0){
                    return;
                }
                this.eventData.forEach((eventParam: any) => {
                    if(eventParam.eventType === eventType){
                        switch(eventParam.eventType){
                            case 'click'://单击
                            break;
                            case 'dblClick'://双击
                            break;
                            case 'pressDown'://按下
                            break;   
                            case 'upSpring'://弹起
                            break;   
                            case 'moveIn'://鼠标移入
                            break;  
                            case 'moveOut'://鼠标移出
                            break;   

                        }

                        
                    }
                });

            },
            onclick(value: any){
                this.handleNodeEvent('upSpring');
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
                    onclick={this.onclick}
                    isDisplay={true}
                    />
            )
        }
    })
}