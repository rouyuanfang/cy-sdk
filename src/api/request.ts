import { BASE_URL_PROD, BASE_URL_TEST, APPID } from "@/config";
import ERROR from "@/config/errorCode";
import { Token } from "@/utils/cache";
import ApiError from "./apiError";

interface Response {
    // ok: boolean;
    // header: any;
    data: {
        code: number;
        msg: string;
        error?: string;
        data: any;
    };
}
type Options = {
    path?: string;
    url?: string;
    isToken?: boolean;
    header?: {
        Authorization?: string;
        "Content-Type"?: string;
        "X-APP-ID"?: string;
        token?: string;
    };
    method?: UniApp.RequestOptions["method"];
    params?: string | AnyObject | ArrayBuffer;
    data?: string | AnyObject | ArrayBuffer;
};

const baseUrl =
    import.meta.env.MODE !== "development" ? BASE_URL_PROD : BASE_URL_TEST;

export default function request(options: Options) {
    let {
        path = "",
        url,
        isToken = true,
        method = "GET",
        header = {
            "X-APP-ID": APPID,
        },
        data = {},
        ...rest
    } = options;

    if (isToken) {
        // header["token"] = Token.get();
        header["Authorization"] = Token.get();
    }
    // uni.showLoading({ title: '加载中',mask: true })
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${path || baseUrl}${url}`,
            method,
            header,
            data,
            ...rest,
            success: (response: any) => {
                // console.log('s', response);
                const res: Response = { data: response.data }
                if (res.data.code === 200) {
                    uni.showToast({
                        icon: "none",
                        title: res.data.msg
                    });
                    resolve(res.data)
                } else {
                    reject();
                    uni.showToast({
                        icon: "none",
                        title: res.data.error || res.data.msg
                    });
                    return false
                }
            },
            fail: (response) => {
                console.log('f', response);
            },
            complete: (response: any) => {
                // uni.hideLoading();
                // console.log('c', response);
            },

        })
    })
}