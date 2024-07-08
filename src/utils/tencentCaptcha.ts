declare global {
    interface Window {
        /** TencentCaptcha */
        TencentCaptcha: Record<string, any>;
    }
}

export default function captcha() {
    try {
        return new Promise((resolve, reject) => {
            const captchaId = "190901371";
            // 腾讯滑块验证码appid生成一个滑块验证码对象
            const captcha = new window.TencentCaptcha(captchaId, function (res: any) {
                if (res.ret === 0) {
                    // state.disabled = true;
                    // state.getCodeText = "发送中..."; //发送验证码
                    // codeMsg(res);
                    resolve(res);
                } else {
                    reject(null);
                }
            });
            // // 滑块显示
            captcha.show();
        });
        // return
    } catch (error) {
        console.log(error);
    }
}
