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
            username,password,accountType
        }
    });
}