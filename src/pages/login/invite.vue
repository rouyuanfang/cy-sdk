<template>
    <up-input v-model="form.code" placeholder="请输入邀请码">
        <!-- <template #suffix>
            <up-row>
                <up-image src="https://cdn.uviewui.com/uview/album/1.jpg" :width="50" :height="50"
                    shape="circle"></up-image>
                <up-text text="zhangsan"></up-text>
            </up-row>
        </template> -->
    </up-input>
    <up-button @click="submit" :throttleTime="1000" color="#6861FF">提交</up-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface FormProps {
    code: string
}

const form = ref<FormProps>({
    code: '',
});
function submit() {

}
</script>

<style lang="scss" scoped></style>