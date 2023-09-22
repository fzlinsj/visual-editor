import { CanvasConfig } from "@/editor/config"
/**
 * @author cxs
 * @date 2023-05-25
 * @description 属性面板逻辑
 * @returns 
 */
export const useAttribute = () => {

    const onCanvasAttrChange = (data: any) => {
        const canvasConfig: ICanvasConfig = CanvasConfig.getInstance();
        canvasConfig.showGrid(data.showGrid);
        canvasConfig.setGridSize(data.gridSize);
        canvasConfig.showRuler(data.showRuler);
        const background = {
            color: data.backgroundColor,
            image:data.backgroundImage,
            showImage: false,
            repeat: 'no-repeat',
            position: 'center',
            size: 'cover',
            opacity: 1,
            angle: 20,
        }
        canvasConfig.setBackground(background);
        console.log('onCanvasAttrChange', data, data.showGrid, data.gridSize,data.showRuler)
    }

    return {
        onCanvasAttrChange
    }

}