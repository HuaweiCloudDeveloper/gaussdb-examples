<script setup lang="ts">
import type Tutorial from '@/types/Tutorial'
const props = defineProps<{
  currentTutorial: Tutorial
  status: string
}>()

const tutorialData = ref({ ...props.currentTutorial })

const rules = {
  title: [
    { required: true, message: 'Please input the title', trigger: 'blur' },
  ],
  description: [
    {
      required: true,
      message: 'Please input the description',
      trigger: 'blur',
    },
  ],
}

const formRef = ref()

const validateForm = () => {
  return new Promise((resolve, reject) => {
    formRef.value
      .validate()
      .then(() => {
        resolve(true)
      })
      .catch((error: any) => {
        reject(error)
      })
  })
}

const clearValidate = () => {
  formRef.value.clearValidate()
}

const resetFields = () => {
  formRef.value.resetFields()
}

// 监视 props 的变化以更新本地数据
watch(
  () => props.currentTutorial,
  newVal => {
    console.log('newVal', newVal)
    tutorialData.value = { ...newVal }
  },
)

defineExpose({
  formRef,
  validateForm,
  clearValidate,
  resetFields,
  tutorialData
})
</script>

<template>
  <d-form
    :data="tutorialData"
    ref="formRef"
    :rules="rules"
    class="form"
    :disabled="status === 'review'"
  >
    <d-form-item
      field="title"
      label="Title"
      help-tips="This is the tutorial title."
    >
      <d-input v-model="tutorialData.title" />
    </d-form-item>
    <d-form-item field="description" label="Description">
      <d-textarea v-model="tutorialData.description" />
    </d-form-item>
    <d-form-item field="published" label="Status">
      <d-radio-group direction="row" v-model="tutorialData.published">
        <d-radio :value="true">Published</d-radio>
        <d-radio :value="false">Pending</d-radio>
      </d-radio-group>
    </d-form-item>
  </d-form>
</template>

<style scoped></style>
