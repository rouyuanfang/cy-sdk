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

export default async function request(options: Options) {
    uni.showLoading({
        mask: true
    });
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
    const res: any = await uni.request({
        url: `${path || baseUrl}${url}`,
        method,
        header,
        data,
        ...rest,
    }).catch(e => {
        uni.hideLoading();
        return uni.showToast({
            icon: "none",
            title: e.errMsg
        });
    }).finally(() => {
        uni.hideLoading();
    });

    const response: Response = {
        // ok: res.data.code === 0,
        // header: res.header,
        data: res.data
    };
    if (response.data.data?.token) {
        Token.set(response.data.data?.token);
    }
    if (response.data.code === ERROR.INVALID_TOKEN) {
        uni.showModal({
            title: "提示",
            content: "登录已失效，请重新登录",
            confirmText: "去登录",
            success(res) {
                if (res.confirm) {
                    uni.navigateTo({
                        url: "/pages/login/login"
                    });
                }
            }
        });
    }
    if (response.data.code === ERROR.INTERNAL_ERROR) {
        return uni.showToast({
            icon: "none",
            title: response.data.msg
        });
    }
    if (res.data.code === 200) {
        return response;
    }
}
/* export async function interpreter(
    request: Promise<Response>,
    options = {
        showLoading: true,
        ignores: []
    }
) {
    const { showLoading, ignores } = options;

    if (showLoading) {
        uni.showLoading({
            mask: true
        });
    }
    return request
        .then(response => {
            const { data } = response;
            // 接口没有返回data
            // if (!data) {
            //   throw new Error(ApiError.API_NOT_RESPONSE);
            // }

            // 接口code不为200
            // if (!ok) {
            //     // const isIgnoreError =
            //     //   typeof ignores === "string" || ignores.includes(data.error_code);
            //     throw new ApiError(response, data.message);
            // }

            return [null, data.data, response];
        })
        .catch(error => {
            return [error, null, null];
        })
        .finally(() => {
            if (showLoading) {
                uni.hideLoading();
            }
        });
} */