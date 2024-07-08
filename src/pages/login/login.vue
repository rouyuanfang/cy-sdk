<template>
  <view class="login">
    <view class="form">
      <view class="top">
        <view class="title">登录</view>
        <view class="subTitle">LogIn To Your Account To Continue</view>
      </view>
      <view class="wechat form-input">
        <image mode="aspectFill" src="./wechat.svg" alt="" />
        <view class="title">微信登录</view>
      </view>
      <view class="lines">
        <view class="line"></view>
        <view class="title">手机号码登录</view>
        <view class="line"></view>
      </view>

      <up-form :model="form" :rules="rules" labelPosition="top" labelWidth="66" ref="uFormRef">
        <up-form-item prop="username">
          <up-input v-model="form.username" :maxlength="11" placeholder="请输入手机号" />
        </up-form-item>
        <up-form-item prop="password">
          <up-input v-model="form.password" :maxlength="6" placeholder="请输入验证码">
            <template #suffix>
              <up-code :seconds="60" ref="uCodeRef" @change="codeChange"></up-code>
              <up-text @click="getCode" color="#6861FF" :text="tips"></up-text>
            </template>
          </up-input>
        </up-form-item>
      </up-form>

      <up-button @click="submit" :throttleTime="1000" color="#6861FF">登录</up-button>
      <view class="tip">
        未注册将自动创建账号
      </view>

      <up-checkbox-group v-model="checked">
        <up-checkbox shape="circle" :size="12" :labelSize="12" labelColor="rgba(0, 0, 0, 0.45)"
          label="我已阅读并同意 《服务条款》《隐私政策》" :name="false">
        </up-checkbox>
      </up-checkbox-group>

    </view>
  </view>
  <!-- #ifdef MP-WEIXIN -->
  <t-captcha id="captcha" app-id="190901371" @verify="handlerVerify" @error="handlerError" />
  <!-- #endif -->
</template>

<script setup lang="ts">
import { useUserInfo } from "@/store/user";
import { phoneRegEx } from "@/utils";
import captcha from "@/utils/tencentCaptcha";
import { getPhoneCode, login } from "@/api/login";
import { ref, getCurrentInstance } from 'vue';
// #ifdef H5
import "@/lib/TCaptcha";
// #endif

interface FormProps {
  username: string
  password: string
  accountType: string
}

const tips = ref('');
const uCodeRef = ref();
const uFormRef = ref();
const instance: any = getCurrentInstance();
const checked = ref([])
const { updateUserInfo } = useUserInfo();

const form = ref<FormProps>({
  username: '',
  password: '',
  accountType: 'phone'
});
const rules = {
  username: [
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
  password: [
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
  if (form.value.username === "") {
    return uni.showToast({
      icon: "none",
      title: "手机号不能为空"
    });
  }
  if (!phoneRegEx.test(form.value.username)) {
    return uni.showToast({
      icon: "none",
      title: "手机号码不正确"
    });
  }
  if (uCodeRef.value.canGetCode) {
    await getPhoneCode(form.value.username)
      uni.showToast({
        icon: "none",
        title: "验证码已发送"
      });
      uCodeRef.value.start();
  } else {
    return uni.showToast({
      icon: "none",
      title: "倒计时结束后再发送"
    });
  }
};

const handlerVerify = async (res: any) => {
  if (res) {
    uni.navigateTo({
      url: "/pages/login/password"
    });
  } else {
    return uni.showToast({
      icon: "none",
      title: "校验失败"
    });
  }
}

const handlerError = () => {
  return uni.showToast({
    icon: "none",
    title: "校验失败"
  });
}

function submit() {
  uFormRef.value.validate().then(async (valid: boolean) => {
    if (valid) {
      // uni.$u.toast('校验通过')
      if (checked.value.length === 0) {
        return uni.showToast({
          icon: "none",
          title: "勾选服务条款和隐私政策"
        });
      }

      // #ifdef H5
      const isOK: any = await captcha();
      if (isOK) {
        const res = await login(form.value.username,
          form.value.password, form.value.accountType
        )
        updateUserInfo(res.data.data)
        /* uni.navigateTo({
          url: "/pages/login/password"
        }); */

      } else {
        return uni.showToast({
          icon: "none",
          title: "校验失败"
        });
      }
      // #endif

      // #ifndef H5
      instance.ctx.selectComponent("#captcha").show();
      // #endif


    }
  })
    .catch(() => {
      return uni.showToast({
        icon: "none",
        title: "校验失败"
      });
    });
} 
</script>

<style lang="scss" scoped>
.login {
  padding: 40px;

  .form {
    .top {
      text-align: center;

      .title {
        font-size: 24px;
        padding-bottom: 8px;
      }

      .subTitle {
        color: rgba(0, 0, 0, 0.45);
        font-size: 12px;
        padding-bottom: 38px;
      }
    }

    .wechat {
      justify-content: center;
      color: rgba(0, 0, 0, 0.88);
      font-size: 14px;

      uni-image {
        width: 30px;
        height: 24px;
      }

      .title {
        color: rgba(0, 0, 0, 0.88);
        font-size: 14px;
        padding-left: 10px;
      }
    }

    .lines {
      display: flex;
      align-items: center;
      margin: 40px 0;

      .line {
        /* width: 180px; */
        flex: 1;
        background-color: #FFFFFF;
        border: 1px solid #E1E5F3;
      }

      .title {
        padding: 0 30px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }

    ::v-deep .u-form-item__body__right__message {
      color: #D9534F;
    }
  }

  uni-button {
    margin-top: 34px;
  }

  .tip {
    margin: 14px 0;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
  }
}

.form-input {
  display: flex;
  align-items: center;
  /* width: 504px; */
  height: 56px;
  border-radius: 8px;
  border: 1px solid #E1E5F3;
  outline: none;
}
</style>