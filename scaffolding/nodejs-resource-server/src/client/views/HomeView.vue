<script setup lang="ts">
import TutorialForm from '@/components/TutorialForm.vue'
import TutorialDataService from '@/services/TutorialDataService'
import type Tutorial from '@/types/Tutorial'
import type { RowClickArg } from '@/types/Tutorial'
import type ResponseData from '@/types/ResponseData'

const tutorials = ref<Tutorial[]>([])
const currentTutorial = ref<Tutorial>({
  id: null,
  title: '',
  description: '',
  published: false,
})
const currentIndex = ref(-1)
const title = ref('')
const loadingStatus = ref(false)

const columnData = ref([
  {
    field: 'title',
    width: '98%',
    showOverflowTooltip: { position: ['bottom-end'] },
    showHeadOverflowTooltip: true,
    headRender: () => h('h2', 'Tutorials List'),
  },
])

const orientation = ref('horizontal')
const splitBarSize = '2px'
// splitter pane input
const size = ref('30%')
const minSize = ref('20%')

// modal
const visible = ref(false)
const handleRemoveAll = () => {
  visible.value = true
}
const hidden = () => {
  visible.value = false
}

const retrieveTutorials = () => {
  loadingStatus.value = true
  TutorialDataService.getAll()
    .then((response: ResponseData) => {
      tutorials.value = response.data
      console.log(response.data)
    })
    .catch((e: Error) => {
      console.log(e)
    })
    .finally(() => {
      loadingStatus.value = false
    })
}

const refreshList = () => {
  retrieveTutorials()
  currentTutorial.value = {} as Tutorial
  currentIndex.value = -1
}

const setActiveTutorial = (tutorial: RowClickArg) => {
  const { row, renderRowIndex } = tutorial
  console.log(row, renderRowIndex)
  currentTutorial.value = row
  console.log(currentTutorial.value)
  currentIndex.value = renderRowIndex
}

const removeAllTutorials = () => {
  loadingStatus.value = true
  TutorialDataService.deleteAll()
    .then((response: ResponseData) => {
      console.log(response.data)
      refreshList()
    })
    .catch((e: Error) => {
      console.log(e)
    })
    .finally(() => {
      loadingStatus.value = false
      hidden()
    })
}

const searchTitle = () => {
  loadingStatus.value = true
  TutorialDataService.findByTitle(title.value)
    .then((response: ResponseData) => {
      tutorials.value = response.data
      setActiveTutorial({} as RowClickArg)
      console.log(response.data)
    })
    .catch((e: Error) => {
      console.log(e)
    })
    .finally(() => {
      loadingStatus.value = false
    })
}

const rowClass = (rowData: Tutorial, rowIndex: number) => {
  return rowIndex === currentIndex.value ? 'active' : ''
}

onMounted(() => {
  retrieveTutorials()
})
</script>

<template>
  <main>
    <div
      class="container flex-center-all flex-column"
      v-loading="loadingStatus"
    >
      <div class="flex-center-all search-box">
        <d-input v-model="title" placeholder="Search by title">
          <template #append>
            <d-button icon="search" @click="searchTitle"></d-button>
          </template>
        </d-input>
      </div>
      <section class="content-box">
        <d-splitter
          :orientation="orientation"
          :splitBarSize="splitBarSize"
          style="height: 100%"
        >
          <template v-slot:DSplitterPane>
            <d-splitter-pane
              collapseDirection="before"
              :size="size"
              :minSize="minSize"
              :collapsible="true"
            >
              <d-data-grid
                class="list-table"
                :data="tutorials"
                :columns="columnData"
                :row-class="rowClass"
                @row-click="setActiveTutorial"
                fix-header
                header-bg
                shadow-type
              >
                <template #empty>
                  <div>暂无数据</div>
                </template>
              </d-data-grid>
            </d-splitter-pane>
            <d-splitter-pane minSize="15%">
              <div class="pane-content">
                <div v-if="currentTutorial.id || currentTutorial.id === 0">
                  <h2>Tutorials</h2>
                  <TutorialForm
                    :currentTutorial="currentTutorial"
                    :status="'review'"
                  />

                  <router-link :to="'/tutorials/' + currentTutorial.id">
                    <d-button variant="solid"> Edit </d-button></router-link
                  >
                </div>
                <div v-else class="pane-content flex-items-center">
                  <i class="icon icon-arrow-left-o"></i>Please click on a
                  Tutorial...
                </div>
              </div>
            </d-splitter-pane>
          </template>
        </d-splitter>
      </section>
      <d-row
        v-if="tutorials.length"
        align="middle"
        justify="start"
        class="delete-box"
      >
        <d-col :span="24">
          <d-button variant="solid" color="danger" @click="handleRemoveAll">
            Remove All
          </d-button>
        </d-col>
      </d-row>
    </div>
    <d-modal v-model="visible" title="Are you sure?">
      <p>Do you want to delete all data? This action is irreversible.</p>
      <template #footer>
        <div class="flex-around" style="padding: 1rem 0">
          <d-button @click="hidden">Cancel</d-button>
          <d-button variant="solid" color="danger" @click="removeAllTutorials"
            >OK</d-button
          >
        </div>
      </template>
    </d-modal>
  </main>
</template>
<style>
main {
  .container {
    padding-left: 2rem;
  }
  .search-box {
    height: 4rem;
    width: 100%;
  }
  .content-box {
    flex: 1;
    width: 100%;
  }
  .list-table {
    max-height: 20rem;
  }
  .pane-content {
    padding: 0 1rem;
    height: 100%;
  }
  .form {
    padding-top: 2rem;
  }
  .delete-box {
    height: 4rem;
    width: 100%;
  }
  .list-table .active {
    background-color: var(--devui-list-item-hover-bg, #f2f2f3);
  }
}
@media (min-width: 1024px) {
  main {
    .container {
      height: 100vh;
    }
    .list-table {
      max-height: calc(100vh - 8rem);
    }
  }
}
</style>
