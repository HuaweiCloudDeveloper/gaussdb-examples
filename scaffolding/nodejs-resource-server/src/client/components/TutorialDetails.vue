<script setup lang="ts">
import type Tutorial from '@/types/Tutorial'
import TutorialForm from './TutorialForm.vue'
import TutorialDataService from '@/services/TutorialDataService'
import type ResponseData from '@/types/ResponseData'

const currentTutorial = ref<Tutorial>({
  id: null,
  title: '',
  description: '',
  published: false,
})
const message = ref('')
const router = useRouter()
const route = useRoute()
const loadingStatus = ref(false)

const getTutorial = (id: string) => {
  loadingStatus.value = true
  TutorialDataService.get(id)
    .then((response: ResponseData) => {
      currentTutorial.value = Object.assign({}, response.data)
      console.log(response.data, currentTutorial)
    })
    .catch((e: Error) => {
      console.log(e)
    })
    .finally(() => {
      loadingStatus.value = false
    })
}

const updatePublished = (status: boolean) => {
  const data = {
    id: currentTutorial.value.id,
    title: currentTutorial.value.title,
    description: currentTutorial.value.description,
    published: status,
  }
  loadingStatus.value = true
  TutorialDataService.update(currentTutorial.value.id, data)
    .then((response: ResponseData) => {
      console.log(response.data)
      currentTutorial.value = Object.assign({}, currentTutorial.value, { published : status})
      message.value = 'The status was updated successfully!'
    })
    .catch((e: Error) => {
      console.log(e)
    })
    .finally(() => {
      loadingStatus.value = false
    })
}

const updateTutorial = () => {
  loadingStatus.value = true
  TutorialDataService.update(currentTutorial.value.id, currentTutorial.value)
    .then((response: ResponseData) => {
      console.log(response.data)
      message.value = 'The tutorial was updated successfully!'
    })
    .catch((e: Error) => {
      console.log(e)
    })
    .finally(() => {
      loadingStatus.value = false
    })
}

const deleteTutorial = () => {
  loadingStatus.value = true
  TutorialDataService.delete(currentTutorial.value.id)
    .then((response: ResponseData) => {
      console.log(response.data)
      router.push({ name: 'home' })
    })
    .catch((e: Error) => {
      console.log(e)
    })
    .finally(() => {
      loadingStatus.value = false
    })
}

onMounted(() => {
  getTutorial(route.params.id as string)
})
</script>

<template>
  <div class="flex-center-all submit-form" v-loading="loadingStatus">
    <div class="form-box" v-if="currentTutorial.id ||currentTutorial.id===0 ">
      <TutorialForm :current-tutorial="currentTutorial" :status="'edit'" />
      <d-row>
        <d-button
          class="btn"
          icon="unpublish"
          color="secondary"
          v-if="currentTutorial.published"
          @click="updatePublished(false)"
          variant="solid"
        >
          UnPublish
        </d-button>
        <d-button
          class="btn"
          icon="publish-new"
          v-else
          variant="solid"
          @click="updatePublished(true)"
        >
          Publish</d-button
        >
        <d-button
          class="btn"
          icon="delete"
          variant="solid"
          color="danger"
          @click="deleteTutorial"
        >
          Delete
        </d-button>
        <d-button
          class="btn"
          icon="update"
          variant="solid"
          @click="updateTutorial"
        >
          Update
        </d-button>
      </d-row>
    </div>

    <div v-else-if="!loadingStatus">
      <br />
      <p>Please click on a Tutorial...</p>
    </div>
  </div>
</template>

<style scoped>
.form-box {
  width: 100%;
}
.btn {
  margin: 0 0.5rem;
}
</style>
