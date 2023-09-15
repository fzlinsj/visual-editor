import axios from "./interceptor/http"

export default {

    /**
     * 批量上传自定义图形
     * @param data 
     * @returns 
     */
    uploadPicPlugins: (data: any) => {
        return axios.request({
            url: 'tp_vis_files/up',
            method: 'post',
            data
        })
    },

    /**
     * 获取自定义图形
     * @param data 
     */
    getPicPlugins: (data: any) => {
        return axios.request({
            url: 'tp_vis_plugin/list',
            method: 'post',
            data
        })
    },


    /**
     * 上传插件、图片等
     * @param data 
     * @returns 
     */
    uploadPlugin: (data: any) => {
        return axios.request({
            url: '/file/up',
            method: 'post',
            data
        })
    },


    /**
     * 从TP对象列表
     * @param data 
     * @returns 
     */
    getObjectList: (data: any) => {
        return axios.request({
            url: '/file/list',
            method: 'post',
            data
        })
    },


    /**
     * 从TP获取插件列表
     * @param data 
     * @returns 
     */
    getPluginList: (data: any) => {
        return axios.request({
            url: '/tp_local_vis_plugin/list',
            method: 'post',
            data
        })
    },

    /**
     * 插件URL存入TP
     * @param data 
     * @returns 
     */
    addPlugintoTP: (data: any) => {
        return axios.request({
            url: '/tp_local_vis_plugin/add',
            method: 'post',
            data
        })
    },

    /**
     * 从TP删除插件
     * @param data 
     * @returns 
     */
    delPluginfromTP: (data: any) => {
        return axios.request({
            url: '/tp_local_vis_plugin/del',
            method: 'post',
            data
        })
    },

    getPlugin: (url: string) => {
        return axios.request({
            url,
            method: 'post'
        })
    }
}