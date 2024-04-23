/**
 * Lớp util xử lý string
 */
export const StringUtil = {
    /**
     * Kiểm tra xem giá trị đưa vào có phải string hay không.
     * @param {string} value
     * @returns {boolean} value là string thì return true, ngược lại là false
     */
    isString: (value) => {
        return value && (typeof value === "string" || value instanceof String);
    },
};
