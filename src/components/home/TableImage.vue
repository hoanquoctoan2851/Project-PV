<template>
  <a-table
    class="table-display-image"
    :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
    :columns="columns"
    :data-source="dataTable"
    :pagination="false"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'url'">
        <span>{{ column.title }}</span>
      </template>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'url'">
        <div class="w-[280px] h-[100px] relative rounded-lg group overflow-hidden cursor-pointer">
          <img class="object-cover w-full h-full" :src="record.url" :alt="record.name" />
          <div
            class="absolute opacity-0 flex group-hover:opacity-100 w-full h-full top-0 right-0 left-0 bottom-0"
          >
            <div
              class="flex flex-row items-center m-auto relative gap-2 overflow-hidden rounded-2xl px-4 py-2"
            >
              <span class="text-body-1 !text-white z-10 relative">Enlarge</span>
              <ExpandAltOutlined class="!text-white z-10 relative" />
              <div
                class="absolute top-0 left-0 bottom-0 bg-neutral-100 opacity-70 right-0 w-full h-full"
              ></div>
            </div>
          </div>
          <div
            class="absolute transition-all opacity-0 flex group-hover:opacity-40 bg-primary-color w-full h-full top-0 right-0 left-0 bottom-0"
          ></div>
        </div>
      </template>
      <template v-if="column.key === 'name'">
        <p class="text-neutral-1000 text-body-3 font-medium">{{ record.name }}</p>
      </template>
      <template v-if="column.key === 'dimmension'">
        <p class="text-neutral-1000 text-body-3 font-medium">{{ record.dimmension }}</p>
      </template>
      <template v-if="column.key === 'size'">
        <p class="text-neutral-1000 text-body-3 font-medium">{{ record.size }}kB</p>
      </template>
    </template>
  </a-table>
</template>
<script>
import { computed, reactive } from 'vue'
import { ExpandAltOutlined } from '@ant-design/icons-vue'
export default {
  components: {
    ExpandAltOutlined
  },
  props: {
    dataTable: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup() {
    const columns = [
      {
        title: 'Select all',
        dataIndex: 'url',
        key: 'url'
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length
      },
      {
        title: 'Dimmension',
        dataIndex: 'dimmension',
        key: 'dimmension',
        sorter: (a, b) => a.dimmension.length - b.dimmension.length
      },
      {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
        sorter: (a, b) => a.size - b.size
      }
    ]
    const state = reactive({
      selectedRowKeys: []
    })
    const hasSelected = computed(() => state.selectedRowKeys.length > 0)
    const onSelectChange = (selectedRowKeys) => {
      state.selectedRowKeys = selectedRowKeys
    }
    return {
      state,
      onSelectChange,
      hasSelected,
      columns
    }
  }
}
</script>
<style lang="scss">
.table-display-image {
  .ant-table-thead {
    .ant-table-cell {
      background: white !important;
    }
  }

  .ant-table-tbody > tr > td,
  .ant-table-thead > tr > th {
    border-bottom: unset;
  }
}
</style>
