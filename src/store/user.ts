import { defineStore } from "pinia";
import { computed, ref } from "vue";

interface UserProps {
    [property: string]: any;
}

export const useUserInfo = defineStore("userInfo", () => {
    const userInfo = ref<UserProps>({
    });
    const updateUserInfo = (info: UserProps) => {
        userInfo.value = info;
    };
    const getUserInfo = () => {
        console.log(userInfo.value);
    };
    const resetUserInfo = () => {
        userInfo.value = {
        };
    };

    return{
        userInfo,
        getUserInfo,
        updateUserInfo,
        resetUserInfo
    }
})