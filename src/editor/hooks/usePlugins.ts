import { PluginAPI } from "@/api";
import { PluginConfig } from "../config";
import * as Common from "@/common";
import { getDropPicComponent } from '../components/canvas-editor/DropPicComponent';
import { getPicAttrComponent } from '../components/right-attribute-panel/components/PicAttr';
import { useStencil } from ".";
import tpPlugin from '@/plugins/tp-plugin';
import Plugins from  "@/plugins";
/**
 * @author cxs
 * @date 2023-04-28
 * @update 2023-05-24
 * @description 加载插件
 * @returns 
 */
export const usePlugins = (): any => {

    const localUrl = import.meta.env.VITE_BASE_URL || document.location.origin;
    const { initStencil } = useStencil();
    // 通过jsonData里的插件url加载插件
    // 官方插件
    // plugins.tpPlugin = { default: tpPlugin }
    const loadPlugins = (
        _callback: Function, 
        options: { mode: 'editor' | 'display'} = { mode: 'editor'}
        ): void => {
        const localPlugins: any = <any>Plugins;
        console.log('loadPlugins', localPlugins)
        
        let remotePlugins: Record<string, any> = {};
        const baseUrl = localUrl.replace(/:\d+/, "");

        PluginAPI.getPluginList({ current_page: Common.DEFAULT_API_CURRENT_PAGE, per_page: Common.DEFAULT_API_PER_PAGE })
            .then(({ data: result }) => {
                const data = result.data.data as any[];
                Promise.all(data.map(p => {
                    const pluginUrl = p.plugin_url.startsWith('.') ? p.plugin_url.slice(1) : p.plugin_url;
                    return System.import(`${baseUrl}${pluginUrl}`);
                })).then(async (modules: any) => {
                    for (let i = 0; i < modules.length; i++) {
                        for (let j = 0; j < modules[i].default.views.length; j++) {
                            const view = modules[i].default.views[j];

                            if(view!=null){
                                view.plugin = data[i];
                            }
                            
                        }
                        remotePlugins[data[i].id] = modules[i];
                    }
                    for (const pluginName in localPlugins) {
                        // console.log('loadPlugins', plugin, localPlugins[plugin])
                        remotePlugins[pluginName] = { default: localPlugins[pluginName] }
                    }
                    // remotePlugins.tpPlugin = { default: tpPlugin }
                    let result = await getPicPlugins();
                    remotePlugins.picPlugins = result;
                    console.log('PluginAPI.getPluginList', remotePlugins)
                    initPluginConfig(remotePlugins);
                    // 如果是编辑模式，则加载左侧组件列表
                    options?.mode ==='editor' && initStencil(remotePlugins);
                    _callback && _callback();
                })
            })
            .catch((err) => {
                _callback && _callback();
            })
    }

    /**
     * 初始化插件管理器
     * @param plugins 
     */
    const initPluginConfig = (plugins: any): void => {
        const pluginConfig: IPluginConfig = PluginConfig.getInstance(plugins);
        pluginConfig.setPlugins(plugins);
        console.log('plugin.initPluginConfig', pluginConfig, plugins)
        for (const key in plugins) {
            const plugin = plugins[key];
            const { views } = plugin.default;
            views.forEach((view: any) => {
                pluginConfig.addComponent(view.name, view);
            })
        }
    }

    /**
     * 加载自定义图片插件
     * @param plugins 
     */
    const getPicPlugins = async () => {
        let { data: result } = await PluginAPI.getPicPlugins({ current_page: Common.DEFAULT_API_CURRENT_PAGE, per_page: Common.DEFAULT_API_PER_PAGE })
        if (result.code === 200) {
            const data = result.data.data;
            let picPlugins: { default: { views: any[] } } = { default: { views: [] } }
            const getPicUrl = (fileUrl: String) => {
                if (fileUrl.startsWith('.')) {
                    return localUrl + fileUrl.slice(1);
                }
                return localUrl;
            }
            data.forEach((plugin: any) => {
                plugin.files.forEach((file: any) => {
                    const item = {
                        name: plugin.plugin_name + "_" + file.file_name,
                        description: "",
                        group: plugin.plugin_name,
                        icon: getPicUrl(file.file_url),
                        size: { width: 200, height: 200 },
                        Main: getDropPicComponent(getPicUrl(file.file_url)),
                        Attribute: getPicAttrComponent(),
                        Data: null
                    };
                    picPlugins.default.views.push(item);

                })
            });
            return picPlugins;
        } else {
            return [];
        }
    }

    

    return {
        loadPlugins
    }
}

