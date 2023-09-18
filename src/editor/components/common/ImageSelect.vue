<template>
  <el-dialog v-model="dialogVisible" title="图片选择" width="50%" >
      <div class="album-images">
        <div class="album-image-header">
          <div class="album-actions">
            <el-button type="success" icon="UploadFilled" style="margin-right: 5px;" @click="showPlugins">去上传</el-button>
          </div>
        </div>
        <div class="album-image-content">
          <div class="album-image-list" v-loading="list.loading">
            <el-row v-if="list.data.length">
              <template v-for="(item, index) in list.data" :key="'gallery-item' + index">
                <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
                  <gallery-item
                  :data="item"
                  :remove="true"
                  :images="list.data.map(item => item.img_preview_url)"
                  @reload="listGet"
                  :key="list.page + '-' + index"
                  @submit="handleItemSubmit"
                  @view="handleClick(index)">
                  <template #tags>
                    <div class="album-tags">
                      <el-tag class="tags-edit" size="small" effect="dark" type="primary">
                        
                        <el-icon @click="preViewClick(index)"><View/></el-icon>
                        <el-icon style="margin-left: 10px;" @click="selectClick(index)"><Select/></el-icon>
                        <el-icon style="margin-left: 10px;" @click="delClick(index)"><Delete/></el-icon>
                      </el-tag>
                    </div>
                  </template>
                </gallery-item>
                </el-col>
              </template>
            </el-row>
            <div class="empty-data" v-else>
              <el-empty description="暂无数据"></el-empty>
            </div>
          </div>
          <pagination
            :key="list.page"
            v-model:page="list.page"
            v-model:size="list.size"
            :total="list.total"
            :page-sizes="[18, 36, 72, 100]"
            @change="listGet"/>
        </div>
    </div>
  </el-dialog>
  <UploadImg v-model:visible="uploadImgDialogVisible" @submit="uploadImgSubmit"/>
</template>

<script setup lang="ts">

import { ref,Ref, reactive, computed, watch,onActivated, onMounted } from "vue";
import { ImageInter,ListInter } from './interface';
import GalleryItem from '@/editor/components/common/gallery-item.vue'
import {Select,Delete,View} from '@element-plus/icons-vue'
import pagination from './pagination.vue' 
import { useCopyText, useCtxInstance} from '@/editor/hooks/global';
import { PluginAPI } from "@/api";
import { dateFormat } from "@/utils";
import UploadImg from "./uploadImg.vue";

const localUrl = import.meta.env.VITE_BASE_URL || document.location.origin;


// ========================================自定义图片=============================================
const uploadImgDialogVisible = ref(false);
const showPlugins = () => {
  uploadImgDialogVisible.value = true;
}

const uploadImgSubmit = () => {

  console.log("=====uploadImgSubmit")
  listGet();

}
// ========================================自定义图片=============================================

const ctx = useCtxInstance()
const dialogVisible = ref<Boolean>(false);
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

watch(() => props.visible, (val) => {
  dialogVisible.value = val;
})
const emit = defineEmits(['update:visible', 'submit'])
watch(dialogVisible, (val) => {
  emit('update:visible', val)
})

// 列表数据
const list: ListInter<ImageInter> = reactive({
  page: 1,
  size: 18,
  total: 0,
  loading: false,
  filters: {
    tag: '全部',
    img_name: ''
  },
  data: []
})

const listGet = () => {
  list.loading = true
  PluginAPI.getObjectList({
    current_page: list.page,
    per_page: list.size,
  }).then(({ data: result }) => {

    console.log("==result",result)


    const getPicUrl = (fileUrl: String) => {
        if (fileUrl.startsWith('.')) {
            return localUrl + fileUrl.slice(1);
        }
        return localUrl;
    }
    list.total = result.data.total
    list.data = result.data.data.map((item): any => {

      // 图片名称
      item.img_name = item.file_name
      // 图片宽度
      item.img_width = 250
      // 图片高度
      item.img_height = 250
      // 图片url
      item.img_url = getPicUrl(item.file_url)
      // 图片预览地址
      item.img_preview_url=getPicUrl(item.file_url)
      // 图片大小
      item.img_size = item.file_size
      // 排序值
      // sort?: number
      // 是否选中
      item.checked = true
      // 创建时间
      item.createdAt=dateFormat(item.create_time)
      // 更新时间
      item.updatedAt=dateFormat(item.create_time)

      
      return item
    })
    list.loading = false
  })



}
const handleItemSubmit = (e: { type: string, data: ImageInter }) => {

}

const handleClick = (index: number) => {

  

}




const selectClick=async (index: number)=>{

  console.log('selectclick inde:',index)

  let { data: result } = await PluginAPI.getPicPlugins({ current_page: 1, per_page: 9999 })

  console.log('response Data result: ',JSON.stringify(result) )

  if (result.code === 200) {


  }



}

const preViewClick=(index: number)=>{

  ctx.$viewerApi({
    options: {
      initialViewIndex: index
    },
    images: list.data.map(item => item.img_preview_url)
  })

}

const delClick=(index: number)=>{


}

const getTagType = (tag:any) => {
  if (tag === '已完结') {
    return 'danger'
  }
  if (tag === '连载') {
    return 'success'
  }
  return 'default'
}
// 更新图片的标签
const editItemTag = (data: ImageInter) => {

}

// 激活页
onActivated(() => {
  console.log("=====entre onActivated")
})


const initImg=()=>{

  console.log('enter ititImg')
  list.loading = false;
  list.total = 180;
  for(var i=0;i<18;i++){

    var item={ 
      id: i+'',
      // 图片名称
      img_name: 'string'+i,
      // 图片宽度
      img_width: 250,
      // 图片高度
      img_height: 250,
      // 图片url
      img_url: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      // 图片预览地址
      img_preview_url: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      // 图片大小
      img_size: 123456,
      // 排序值
      // sort?: number
      // 是否选中
      checked: true,
      // 创建时间
      createdAt: '2020-10-01 11:00:00',
      // 更新时间
      updatedAt:'2020-10-01 11:00:00',
    }

    list.data.push(item);


  }

  console.log('list info:',list)


  console.log('exit ititImg')

}



onMounted(()=>{
  
  listGet();

})

</script>

<style lang="scss" scoped>
.album-images {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  .album-image-header {
    width: calc(100% + 19px + 19px);
    height: 50px;
    flex-shrink: 0;
    background-size: 100% auto;
    background-position: center center;
    margin-top: -19px;
    margin-right: -19px;
    padding: 20px 3%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    color: #fff;
    // box-shadow: 0px 1px 10px #0000001a;
    .album-actions {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 10px 20px;
    }
    .album-actions-footer {
      position: absolute;
      bottom: -35px;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      padding: 0 5px;
      .el-button {
        height: 30px;
      }
    }
    .album-title {
      font-size: 28px;
      margin-bottom: 0.2rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .album-desc {
      font-size: 18px;
      margin-bottom: 0.2rem;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      display: -webkit-box;
    }
    .album-meta-line {
      line-height: 2;
      font-size: 16px;
      display: flex;
      align-items: center;
      span {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        .el-icon {
          margin-right: 5px;
        }
        &.divider {
          width: 1px;
          margin: 0 10px;
        }
      }
    }
  }
  .album-image-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    .album-image-filter {
      flex-shrink: 0;
      margin: 40px 0 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .filter-input {
        width: 748px;
        .el-input__wrapper {
          box-shadow: 0 0 0 1px #409eff inset;
        }
        .el-input-group__append {
          background: #409eff;
          box-shadow: none;
          border: 1px solid #409eff;
          border-left: none;
          color: #fff;
        }
      }
      .filter-tags {
        width: 748px;
        font-size: 14px;
        margin-top: 8px;
        display: flex;
        flex-wrap: wrap;
        color: rgba($color: #000000, $alpha: 0.65);
        span:first-child {
          margin-right: 5px;
        }
        .filter-tag-item {
          padding: 0 8px;
          cursor: pointer;
          margin-bottom: 8px;
          &.active {
            background: #409eff;
            color: #fff;
            border-radius: 4px;
            font-size: 12px;
            padding: 2px 5px;
          }
        }
      }
    }
    .album-image-list {
      flex: 1;
      padding-top: 10px;
      .el-row {
        width: 100%;
        height: 100%;
        align-content: flex-start;
      }
      .el-col {
        padding: 10px;
      }
      .album-tags {
        position: absolute;
        left: 5px;
        bottom: 30%;
        width: 100%;
        z-index: 3;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        .el-tag {
          margin-bottom: 5px;
          + .el-tag {
            margin-left: 5px;
          }
        }
        .tags-edit {
          display: none;
        }
      }
      .gallery-item:hover {
        .tags-edit {
          display: inline-flex;
        }
      }
    }
    .pagination {
      margin: 5px 0 10px;
    }
  }
  .empty-data {
    width: 100%;
    height: 100%;
    .el-empty {
      width: 100%;
      height: 100%;
    }
  }
}
</style>