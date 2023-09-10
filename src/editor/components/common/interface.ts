/**
 * 图片实体
 */
 export interface ImageInter {
    // 图片id
    id?: string
    // 图片名称
    img_name?: string
    // 图片宽度
    img_width?: number
    // 图片高度
    img_height?: number
    // 文件类型
    mine_type?: string
    // 图片url
    img_url?: string
    // 图片预览地址
    img_preview_url?: string
    // 图片大小
    img_size?: number
    // 存储桶id
    bucket_id?: string
    // 相册id
    album_id?: string
    // 存储桶类型
    bucket_type?: string
    // hash值：用于后续更新时使用
    hash?: string
    // 用户id
    uid?: string
    // 排序值
    // sort?: number
    // 是否选中
    checked?: boolean
    // 创建时间
    createdAt?: string
    // 更新时间
    updatedAt?: string
    // 是否静态更新
    slient?: boolean
    // 排序值
    sort?: number
    // 是否置顶
    top?: boolean | number
    // 标签
    tags?: string[]
    // 原始名称
    img_origin_name?: string
    // 顺序
    order?: number
  }

  export interface TableColumnConfig {
    align: string // 对齐方式：center、left、right
    label: string // 列的标题
    width: string // 列的宽度
    prop: string // 列的字段名
    slot?: string // 是否开启插槽
  }
  
  // 通用表格列表list数据
  export interface ListInter<T, D = any, G = any> {
    page?: number // 页码
    size?: number // 每页显示数量
    total?: number // 总计条数
    loading?: boolean // 加载中
    filters?: { // 筛选条件
      [prop: string]: any
    }
    data: Array<T>
    config?: Array<TableColumnConfig>
    stats?: Array<D>
    versions?: Array<G>
  }
  