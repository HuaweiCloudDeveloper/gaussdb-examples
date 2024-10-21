<script setup lang="ts">
import type Tutorial from '@/types/Tutorial'
import type ResponseData from '@/types/ResponseData'
import TutorialForm from '@/components/TutorialForm.vue'
import TutorialDataService from '@/services/TutorialDataService'
import { NotificationService } from 'vue-devui/notification'

const router = useRouter()
const tutorialForm = ref()
const tutorial = ref<Tutorial>({
  id: null,
  title: '',
  description: '',
  published: false,
})
const submitted = ref(false)
const loadingStatus = ref(false)
const saveTutorial = async () => {
  tutorialForm.value
    .validateForm()
    .then(() => {
      console.log('submit!', tutorialForm.value.tutorialData)
      tutorial.value = Object.assign({}, tutorialForm.value.tutorialData)
      const data = {
        title: tutorial.value.title,
        description: tutorial.value.description,
      }
      loadingStatus.value = true
      console.log(TutorialDataService)
      TutorialDataService.create(data)
        .then((response: ResponseData) => {
          tutorial.value.id = response.data.id
          console.log(response.data)
          submitted.value = true
        })
        .catch((e: Error) => {
          console.log(e)
          NotificationService.open({
            content:
              e.message || 'Some error occurred while creating the Tutorial.',
            type: 'error',
          })
        })
        .finally(() => {
          loadingStatus.value = false
        })
    })
    .catch(() => {
      console.log('nonono')
    })
}
const newTutorial = () => {
  submitted.value = false
  tutorial.value = {} as Tutorial
}
</script>
<template>
  <div class="flex-center-all submit-form" v-loading="loadingStatus">
    <div class="form-box" v-if="!submitted">
      <TutorialForm
        ref="tutorialForm"
        :current-tutorial="tutorial"
        :status="'edit'"
      />
      <d-button variant="solid" type="submit" @click="saveTutorial">
        Submit
      </d-button>
    </div> 
    <div v-else>
      <h4>You submitted successfully!</h4>
      <d-button variant="solid" @click="newTutorial">Add</d-button>
      <d-button style="margin-left: 0.5rem;" @click="()=>{router.push({ name: 'home' })}">Go to Home</d-button>

    </div>
  </div>
</template>

<style>
.submit-form {
  width: 100%;
  margin: 2rem auto;
  padding: 1rem;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.form-box {
  width: 100%;
}
</style>
