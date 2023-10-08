<template>
  <div class="comp-menu-left">
    <div class="pb-6 border-separate">
      <button class="comp-menu-left__button h-12 rounded-lg w-full text-neutral-0">
        Import documents
      </button>
    </div>
    <div class="comp-menu-left__progress py-6 flex flex-col gap-2 border-separate">
      <div class="flex flex-row justify-between">
        <span>Storage</span>
        <a class="font-light underline hover:underline">Change plan</a>
      </div>
      <a-progress :percent="calcPercentage" :show-info="false" />
      <span
        ><span class="text-primary-color font-medium">{{ calcPercentage }}% </span
        ><span class="text-neutral-1000 font-medium">used of {{ TOTAL_VOLUME / GB }}GB</span></span
      >
    </div>
    <div class="comp-menu-left__search py-6 flex flex-col gap-3 border-separate">
      <div class="flex flex-row justify-between">
        <span>Search</span>
      </div>
      <a-input
        class="h-10 !rounded"
        placeholder="e.g, image.png"
        :search="true"
        v-model:value="state.search"
      >
        <template #suffix>
          <SearchOutlined></SearchOutlined>
        </template>
      </a-input>
    </div>
    <div class="comp-menu-left__menu py-6 flex flex-col gap-3 border-separate">
      <div class="flex flex-row justify-between">
        <span>Folders</span>
        <a class="font-light underline hover:underline">New folder</a>
      </div>
      <div class="w-full">
        <TreeNode
          :keyFolder="state.folderActive"
          :folder="treeData"
          @fetchFolderActive="fetchFolderActive"
        ></TreeNode>
      </div>
    </div>
    <div class="comp-menu-left__options py-6 flex flex-col gap-3 border-separate">
      <div class="flex flex-row justify-between">
        <span>Members</span>
        <a class="font-light underline hover:underline" @click="handleSelectAll">Select all</a>
      </div>
      <a-checkbox-group
        v-model:value="state.checkedList"
        :options="plainOptions"
        class="!flex !flex-col gap-2"
      />
    </div>
  </div>
</template>
<script>
import { SearchOutlined } from '@ant-design/icons-vue'
import { computed, ref, reactive, watch, onMounted } from 'vue'
import TreeNode from '@/components/home/TreeNode.vue'

const GB = 1073741824
const TOTAL_VOLUME = 2 * GB
export default {
  name: 'CompMenuLeft',
  components: {
    SearchOutlined,
    TreeNode
  },
  props: {
    treeData: {
      type: Array,
      default: () => []
    },
    totalCapacity: {
      type: Number,
      default: 0
    }
  },
  emits: ['fetchFilter'],
  setup(prop, { emit }) {
    const plainOptions = ['Apple', 'Admin']
    const state = reactive({
      search: '',
      indeterminate: true,
      checkAll: false,
      checkedList: ['Apple', 'Admin'],
      folderActive: 1
    })

    const calcPercentage = computed(() => {
      return (((prop.totalCapacity * 1024) / TOTAL_VOLUME) * 100).toFixed(2)
    })

    const handleSelectAll = () => {
      state.checkedList = plainOptions
    }
    const fetchFolderActive = (value) => {
      state.folderActive = value
    }
    watch(
      () => [state.folderActive, state.checkedList, state.search],
      () => {
        emit('fetchFilter', {
          search: state.search,
          folderId: state.folderActive,
          photoBy: state.checkedList
        })
      }
    )

    onMounted(() => {
      emit('fetchFilter', {
        search: state.search,
        folderId: state.folderActive,
        photoBy: state.checkedList
      })
    })
    return {
      state,
      plainOptions,
      calcPercentage,
      TOTAL_VOLUME,
      GB,
      fetchFolderActive,
      handleSelectAll
    }
  }
}
</script>
<style lang="scss">
.comp-menu-left__button {
  background: linear-gradient(180deg, #457bff 0%, #366bea 100%);
}

.border-separate {
  @apply border-b border-solid border-white-01;
}
</style>
