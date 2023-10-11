import { reactive, ref } from "vue";

export const useBaseEventData = () => {
    
    const formData = reactive({
        eventType: 'upSpring',
        actionType:'openWeb',
        webPage:'externalPage',
        externalPage:'',
        isPagePopUp:true,
        isPageAutoClose:true,
        pageWidth:100,
        pageHeight:100,
        pageTitle:'',
        visualizationId:'',
        showElement:[] as any[],
        hideElement:[] as any[],
    })  
   
    return {
        formData,
    }
}