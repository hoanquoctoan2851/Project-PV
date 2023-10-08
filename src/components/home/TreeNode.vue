<template>
  <div v-for="item in folder" :key="item.name" class="flex flex-col gap-1">
    <div
      :class="[
        'flex px-2 flex-row gap-1.5 rounded-[6px] w-full items-center py-1 cursor-pointer',
        keyFolder === item.id ? 'bg-[#EAF1FF]' : '',
        item.size ? ' justify-between' : ''
      ]"
      @click="toggle(item.id)"
    >
      <div class="flex-row flex items-center text-neutral-1000 font-medium gap-1.5">
        <div
          v-if="!item.size"
          :class="[
            'flex-row flex items-center font-medium gap-1.5',
            keyFolder === item.id ? 'text-primary-color' : 'text-neutral-1000 '
          ]"
        >
          <CaretUpOutlined
            :class="['!text-lg mt-[3px]', listFolderActive.includes(item.id) ? '' : 'rotate-90']"
          ></CaretUpOutlined>
          <FolderOpenOutlined
            class="!text-xl"
            v-if="listFolderActive.includes(item.id)"
          ></FolderOpenOutlined>
          <FolderOutlined class="!text-xl" v-else></FolderOutlined>
        </div>
        <div v-else class="w-6 h-6 flex">
          <img :src="item.url" class="m-auto aspect-[3/2]" alt="" />
        </div>
        <a-tooltip :title="item.name">
          <span
            :class="[
              'line-clamp-1 font-medium mt-1',
              keyFolder === item.id ? '!text-primary-color' : 'text-neutral-1000 ',
              item.size ? 'max-w-[100%]' : 'max-w-[70%]'
            ]"
            >{{ item.name }}</span
          >
        </a-tooltip>
      </div>
      <div
        v-if="!item.size"
        :class="[
          keyFolder === item.id ? 'bg-primary-color' : 'bg-slate-300',
          'min-w-[16px] h-4 rounded flex'
        ]"
      >
        <span
          class="m-auto text-xs"
          :class="keyFolder === item.id ? '!text-white' : 'text-neutral-1000'"
          >{{ item.children?.length }}</span
        >
      </div>
    </div>
    <ul v-if="listFolderActive.includes(item.id) && item.children?.length" class="pl-6">
      <tree-node
        :keyFolder="keyFolder"
        :folder="item.children"
        :key="item.id + 'child'"
        @fetchFolderActive="fetchFolderActive"
      >
      </tree-node>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
import { FolderOutlined, CaretUpOutlined, FolderOpenOutlined } from '@ant-design/icons-vue'

export default {
  props: {
    folder: Array,
    keyFolder: null
  },
  components: {
    FolderOutlined,
    FolderOpenOutlined,
    CaretUpOutlined
  },
  emits: ['fetchFolderActive'],
  setup(prop, { emit }) {
    const open = ref(false)
    const listFolderActive = ref([1])
    const folderActive = ref(1)
    const toggle = (key) => {
      if (listFolderActive.value.includes(key)) {
        listFolderActive.value = listFolderActive.value.filter((item) => item !== key)
      } else {
        listFolderActive.value.push(key)
      }
      folderActive.value = key
      emit('fetchFolderActive', folderActive.value)
    }

    const fetchFolderActive = (key) => {
      emit('fetchFolderActive', key)
    }
    // onMounted(() => {
    //   emit('fetchFolderActive', folderActive.value )
    // })
    return {
      open,
      listFolderActive,
      toggle,
      fetchFolderActive,
      folderActive
    }
  }
}
</script>

<style scoped>
/* Add your CSS styles here */
</style>
