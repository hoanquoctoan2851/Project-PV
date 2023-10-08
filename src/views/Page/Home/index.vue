<template>
  <div class="wrap-home-page w-full flex justify-center">
    <div
      class="wrap-home-page__main w-full max-w-[1200px] grid grid-cols-12 rounded-lg shadow-lg min-h-[500px]"
    >
      <div class="col-span-3 border-r border-solid border-white-01 p-8">
        <MenuLeft
          :tree-data="treeData"
          @fetchFilter="fetchFilter"
          :total-capacity="totalSize"
        ></MenuLeft>
      </div>
      <div class="col-span-9 p-8">
        <div class="w-full">
          <TableImage :data-table="listDataDisplay"></TableImage>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MenuLeft from '@/components/home/MenuLeft.vue'
import TableImage from '@/components/home/TableImage.vue'
import { onMounted, ref } from 'vue'

export default {
  name: 'HomePage',
  components: {
    MenuLeft,
    TableImage
  },
  setup() {
    const listDataDisplay = ref([])
    const totalSize = ref(0)
    const treeData = ref([
      {
        id: 1,
        name: 'Uploads',
        children: [
          {
            id: 10,
            name: 'Images',
            children: [
              {
                id: 101,
                name: 'Seasandiego.jpg',
                url: 'https://assets.site-static.com/userFiles/2597/image/2023/CARDIFF_BY_THE_SEA/5-23-2023_1__reasons-why-cardiff-by-the-sea-san-diego-great-place-to-live/9_Reasons_Why_Cardiff-by-the-Sea_San_Diego_.jpg',
                type: 'image/jpg',
                dimmension: '2000x2000',
                size: '763300',
                photo_by: 'Admin'
              },
              {
                id: 102,
                name: 'iMactwin.png',
                url: 'https://i.insider.com/60e4cb0d22d19400191c957c?width=1000&format=jpeg&auto=webp',
                type: 'image/png',
                dimmension: '2000x2000',
                size: '640200',
                photo_by: 'Apple'
              },
              {
                id: 103,
                name: 'hustlecup.jpg',
                url: 'https://images.deliveryhero.io/image/fd-ph/LH/kmph-hero.jpg',
                type: 'image/jpg',
                dimmension: '2000x2000',
                size: '100400',
                photo_by: 'Admin'
              },
              {
                id: 104,
                name: 'MS-Surface.jpg',
                url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4OXzi?ver=3a58',
                type: 'image/jpg',
                dimmension: '2000x2000',
                size: '113200',
                photo_by: 'Admin'
              },
              {
                id: 105,
                name: 'Famoustower.jpg',
                url: 'https://www.worldfamousthings.com/wp-content/uploads/2018/01/Leaning-Tower-of-Pisa-Italy.jpg',
                type: 'image/jpg',
                dimmension: '2000x2000',
                size: '763300',
                photo_by: 'Admin'
              }
            ]
          },
          {
            id: 20,
            name: 'Document',
            children: []
          },
          {
            id: 30,
            name: 'Videos',
            children: [
              {
                id: 301,
                name: 'GODZILLA MINUS ONE Official Trailer',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019',
                type: 'video/mp4',
                dimmension: '2000x2000',
                size: '763300',
                photo_by: 'Admin'
              },
              {
                id: 302,
                name: 'Marvel Studios’ Loki Season 2 | October 6 on Disney+',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019',
                type: 'video/mp4',
                dimmension: '2000x2000',
                size: '763300',
                photo_by: 'Admin'
              },
              {
                id: 303,
                name: 'THE BOY AND THE HERON | Official Teaser Trailer',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019',
                type: 'video/mp4',
                dimmension: '2000x2000',
                size: '763300',
                photo_by: 'Admin'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'Sources',
        children: []
      },
      {
        id: 3,
        name: 'Shared',
        children: []
      }
    ])

    function filterFilesByTargetIdAndPhotoBy(arr, targetId, targetPhotoByArray, search) {
      const result = []

      function filterFiles(arr, parentIds) {
        for (const item of arr) {
          const currentIds = [...parentIds, item.id]
          if (item.id === targetId) {
            if (item.children) {
              const childFiles = filterFilesAtLeafNodes(item.children)
              if (search) {
                result.push(
                  ...childFiles.filter(
                    (file) =>
                      targetPhotoByArray.includes(file.photo_by) && file.name.includes(search)
                  )
                )
              } else {
                result.push(
                  ...childFiles.filter((file) => targetPhotoByArray.includes(file.photo_by))
                )
              }
            } else {
              result.push(item)
            }
          } else if (item.children && item.children.length > 0) {
            filterFiles(item.children, currentIds)
          }
        }
      }

      function filterFilesAtLeafNodes(arr) {
        const files = []
        for (const item of arr) {
          if (item.children && item.children.length > 0) {
            const childFiles = filterFilesAtLeafNodes(item.children)
            files.push(...childFiles)
          } else {
            files.push(item)
          }
        }
        return files
      }

      filterFiles(arr, [])
      return result
    }

    const fetchFilter = (value) => {
      listDataDisplay.value = filterFilesByTargetIdAndPhotoBy(
        treeData.value,
        value.folderId,
        value.photoBy,
        value.search
      ).map((item) => {
        item['key'] = item.id
        item.size = (item.size / 1024).toFixed(2)
        return item
      })
    }

    const calculateTotalSizeNode = (node) => {
      let totalSize = 0

      function calculateSizeRecursive(node) {
        if (node.children && node.children.length > 0) {
          for (const child of node.children) {
            if (child.size) {
              totalSize += parseInt(child.size, 10)
            }
            calculateSizeRecursive(child)
          }
        }
      }

      calculateSizeRecursive(node)
      return totalSize
    }

    const totalSizeData = () => {
      treeData.value.forEach((item) => {
        totalSize.value += calculateTotalSizeNode(item)
      })
    }
    onMounted(() => {
      totalSizeData()
    })

    return { treeData, listDataDisplay, totalSize, fetchFilter }
  }
}
</script>
<style lang="scss">
.wrap-home-page__main {
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
</style>
