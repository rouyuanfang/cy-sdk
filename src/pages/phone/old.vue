<template>
    <view class="password pd40">
        <view class="top">
            <view class="title">验证原手机号</view>
        </view>
        <up-form :model="form" :rules="rules" labelPosition="top" labelWidth="66" ref="uFormRef">
            <up-form-item prop="phone">
                <up-input v-model="form.phone" :maxlength="11" placeholder="请输入手机号" />
            </up-form-item>
            <up-form-item prop="code">
                <up-input v-model="form.code" :maxlength="6" placeholder="请输入验证码">
                    <template #suffix>
                        <up-code :seconds="60" ref="uCodeRef" @change="codeChange"></up-code>
                        <up-text @click="getCode" color="#6861FF" :text="tips"></up-text>
                    </template>
                </up-input>
            </up-form-item>
            <up-button @click="submit" :throttleTime="1000" color="#6861FF">提交</up-button>
        </up-form>
    </view>
</template>

<script setup lang="ts">
import captcha from "@/utils/tencentCaptcha";
import { getOldPhoneCode, oldPhoneComfirm } from "@/api/login";
import { phoneRegEx } from "@/utils";
import { ref } from 'vue';
// #ifdef H5
import "@/lib/TCaptcha";
// #endif

interface FormProps {
    phone: string
    code: string
}

const form = ref<FormProps>({
    phone: '',
    code: ''
});

const uFormRef = ref();
const tips = ref('');
const uCodeRef = ref();

const rules = {
    phone: [
        {
            required: true,
            message: '请输入手机号',
            trigger: ['change', 'blur'],
        },
        {
            validator: (rule: any, value: string, callback: Function) => {
                return phoneRegEx.test(value);//返回true或者false
            },
            message: '手机号码不正确',
            trigger: ['change', 'blur'],
        }
    ],
    code: [
        {
            required: true,
            message: '请输入验证码',
            trigger: ['blur'],
        },
    ]
};

const codeChange = (text: string) => {
    tips.value = text;
};

const getCode = async () => {
    if (form.value.phone === "") {
        return uni.showToast({
            icon: "none",
            title: "手机号不能为空"
        });
    }
    if (!phoneRegEx.test(form.value.phone)) {
        return uni.showToast({
            icon: "none",
            title: "手机号码不正确"
        });
    }
    if (uCodeRef.value.canGetCode) {
        await getOldPhoneCode()
        // form.value.code = res.data.data.code
        uCodeRef.value.start();
    } else {
        return uni.showToast({
            icon: "none",
            title: "倒计时结束后再发送"
        });
    }
};

function submit() {
    uFormRef.value.validate().then(async (valid: boolean) => {
        if (valid) {
            // uni.$u.toast('校验通过')
            // #ifdef H5
            const isOK: any = await captcha();
            if (isOK) {
                const res: any = await oldPhoneComfirm(
                    form.value.code,
                )
                uni.navigateTo({
                    url: "/pages/phone/new?comfirmToken=" + res.data.confirmToken
                });

            } else {
                return uni.showToast({
                    icon: "none",
                    title: "校验失败"
                });
            }
            // #endif
        }
    }).catch(() => {
        return uni.showToast({
            icon: "none",
            title: "校验失败"
        });
    });
}

</script>

<style lang="scss" scoped>
.top {
    text-align: center;

    .title {
        font-size: 24px;
        padding-bottom: 8px;
    }
}

::v-deep .u-form-item__body__right__message {
    color: #D9534F;
}

uni-button {
    margin-top: 34px;
}
</style>