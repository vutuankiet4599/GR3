import { StringUtil } from "./StringUtil";

/**
 * Lớp util xử lý liên quan đến lưu trữ trong local storage
 */
export const LocalStorageUtil = {
    /**
     * Lấy giá trị được lưu trong local storage
     * @param {string} key khóa để lưu giá trị
     * @returns {(any|null)} Giá trị được lưu. Nếu không tồn tại thì trả về null
     */
    get: (key) => {
        let val = JSON.parse(localStorage.getItem(key));
        return val;
    },

    /**
     * Lưu giá trị vào trong local storage
     * @param {string} key khóa để lưu giá trị
     * @param {any} val giá trị được lưu
     * @returns {boolean} Lưu thành công trả ra true, ngược lại là false
     */
    set: (key, val) => {
        if (!val || !StringUtil.isString(key)) {
            return false;
        }

        let stringifyValue = JSON.stringify(val);
        localStorage.setItem(key, stringifyValue);

        return true;
    },

    /**
     * Xóa giá trị được lưu trong local storage
     * @param {string} key khóa để xóa giá trị
     * @returns {boolean} Xóa thành công trả ra true, ngược lại trả ra false
     */
    delete: (key) => {
        if (!StringUtil.isString(key)) {
            return false;
        }

        localStorage.removeItem(key);
        return true;
    },

    /**
     * Xóa toàn bộ giá trị được lưu trong local storage
     */
    reset: () => {
        localStorage.clear();
    },
};
