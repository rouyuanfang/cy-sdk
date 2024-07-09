import request from "./request";

export function getPhoneCode(phone: string) {
    return request({
        url: "/user-center/public/account/sendLoginSms",
        isToken: false,
        method: "POST",
        data: {
            phone
        }
    });
}
export function login(
    username: string,
    password: string,
    accountType: string,
) {
    return request({
        url: "/user-center/public/account/login",
        isToken: false,
        method: "POST",
        data: {
            username, password, accountType
        }
    });
}
export function getOldPhoneCode(
) {
    return request({
        url: "/user-center/account/sendBindingPhoneConfirmSms",
        method: "POST",
    });
}
export function oldPhoneComfirm(
    code: string,
) {
    return request({
        url: "/user-center/account/changeBindingPhoneConfirm",
        method: "POST",
        data: {
            code
        }
    });
}
export function getNewPhoneCode(
    phone: string,
) {
    return request({
        url: "/user-center/account/sendChangeBindingPhoneSms",
        method: "POST",
        data: {
            phone
        }
    });
}
export function newPhoneComfirm(
    code: string,
    newPhone: string,
    confirmToken: string,
) {
    return request({
        url: "/user-center/account/changeBindingPhone",
        method: "POST",
        data: {
            code,
            newPhone,
            confirmToken
        }
    });
}