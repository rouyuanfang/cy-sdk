/**
 *@returns 手机号正则
 */
export const phoneRegEx = /^1[3-9]\d{9}$/;

/**
 * @returns 手机号分割函数 ****
 */
export const phoneSplit = (value: string) => {
    if (!phoneRegEx.test(value)) {
        return value;
    }
    const phone = value.toString();
    const VISIBLE_DIGITS = 3; // 前三位可见
    const HIDDEN_DIGITS = 4; // 后四位可见

    const visiblePart = phone.toString().substring(0, VISIBLE_DIGITS);
    const hiddenPart = "*".repeat(phone.length - VISIBLE_DIGITS - HIDDEN_DIGITS);
    const visibleEnd = phone.substring(phone.length - HIDDEN_DIGITS);

    return `${visiblePart}${hiddenPart}${visibleEnd}`;
};
