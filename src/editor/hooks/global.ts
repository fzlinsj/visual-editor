import { getCurrentInstance, nextTick, Ref } from "vue";
import { useClipboard } from '@vueuse/core';

interface Ctx {
    $route?: any
    $notify?: (options: {
      title?: string
      type?: string
      message?: string
      duration?: number
    }) => {}
    $message?: (options: {
      type: string
      message: string
      duration: number
    }) => {}
    $viewerApi: (config: {
      options: {
        url?: string,
        initialViewIndex?: number
      }
      images: string[]
    }) => void
    [prop: string]: any
}

  /**
 * 封装getCurrentInstance，方便能够快速拿到当前实例，并且提供智能提示
 */
export function useCtxInstance () {
    const instance = getCurrentInstance()
    // @ts-ignore
    const ctx: Ctx = instance.proxy
    return ctx
}

/**
 * 使用复制文本
 * @param text 文本
 */
 export function useCopyText (ctx: Ctx, text: string) {
    const { copy, isSupported, copied } = useClipboard({
      source: text,
      legacy: true
    })
    if (isSupported.value) {
      copy(text)
      copied && ctx.$message!({ type: 'success', message: '复制成功', duration: 1000 })
    } else {
      console.log('不支持')
    }
}