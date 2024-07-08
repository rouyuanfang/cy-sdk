export default class ApiError extends Error {
    public static API_NOT_RESPONSE = "接口没有相应任何内容";
  
    public static API_RESPONSE_ERROR = "接口返回错误信息";
    result: any;
    error_code: any;
    error_message: any;
  
    /**
     * @param response 请求响应体
     * @param message 错误信息，无特殊情况请使用类错误信息
     */
    constructor(
      public readonly response: any,
      message = ApiError.API_RESPONSE_ERROR
    ) {
      super(message ?? response.data.message);
  
      this.result = response.data ?? null;
      this.error_code = response.data?.error_code ?? null;
      this.error_message = response.data?.message ?? null;
    }
  }
  