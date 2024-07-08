<template>
  <up-form :model="form" :rules="rules" labelPosition="top" labelWidth="66" ref="uFormRef">
    <up-form-item prop="password">
      <up-input v-model="form.password" :maxlength="16" :type="type" placeholder="请输入设置密码">
        <template #suffix>
          <up-icon @click="toggleP" :name="pName"></up-icon>
        </template>
      </up-input>
    </up-form-item>
    <up-form-item prop="cPassword">
      <up-input v-model="form.cPassword" :maxlength="16" :type="type" placeholder="请输入确认密码">
        <template #suffix>
          <up-icon @click="toggleCp" :name="cpName"></up-icon>
        </template>
      </up-input>
    </up-form-item>
    <up-button @click="submit" :throttleTime="1000" color="#6861FF">提交</up-button>
    <up-text text="请输入6~16个字符，至少由字母、数字、特殊符号中的两种组成"></up-text>
  </up-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface FormProps {
  password: string
  cPassword: string
}

const form = ref<FormProps>({
  password: '',
  cPassword: ''
});

const pName = ref<string>('eye-fill')
const cpName = ref<string>('eye-fill')
const type = ref<string>('password')

const rules = {
  password: [
    {
      required: true,
      message: '请输入设置密码',
      min: 6,
      trigger: ['blur'],
    },
  ],
  cPassword: [
    {
      required: true,
      message: '请输入确认密码',
      min: 6,
      trigger: ['blur'],
    },
  ],
};

function toggleP() {
  pName.value = pName.value==='eye-off'?'eye-fill':'eye-off'
  type.value =  type.value==='text'?'password':'text'
}
function toggleCp() {
  cpName.value = cpName.value==='eye-off'?'eye-fill':'eye-off'
  type.value =  type.value==='text'?'password':'text'
}
function submit() {

}
</script>

<style lang="scss" scoped></style>