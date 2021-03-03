/* eslint-disable */
/**
* @file utils
* @author yangtianjiao(yangtianjiao@baidu.com)
* @time 18.06.06
*/
import config from './config';
import http from './http';
export default {
    // 空函数
    noop() {},
    /**
     * 新开窗口
     * @param {string} path 路由地址
     * @return {boolean} 无实义
     */
    openPage(path) {
        if (!path) {
            return false;
        }
        let fixedPath = window.location.href.split('#')[0];
        window.open(fixedPath + '#' + path);
    },
    /**
     * 关闭窗口并刷新父窗口
     * @param {string} path 路由地址
     */
    closePage() {
        window.close();
        opener.location.reload();
    },
    /**
     * 判断是否是数组
     * @param {Array} arr 待判断参数
     * @return {boolean}  是否
     */
    isArray(arr) {
        if (Array.isArray) {
            return Array.isArray(arr);
        }
        return Object.prototype.toString.call(arr) === '[object Array]';
    },
    /**
     * 判断是否是对象
     * @param {Object} obj 待判断参数
     * @return {boolean}  是否
     */
    isObj(obj) {
        return typeof obj === 'object';
    },
    /**
     * 判断是否是arr字符串
     * @param {string} str 待判断参数
     * @return {boolean}  是否
     */
    isArrStr(str) {
        try {
            let obj = JSON.parse(str);
            if (this.isArray(obj)) {
                return true;
            }
            else {
                return false;
            }
        } catch (e) {
            return false;
        }
    },
    /**
     * 判断是否是空对象
     * @param {Object} obj 待判断参数
     * @return {boolean}  是否
     */
    isEmptyObject(obj) {
        for (let key in obj) {
            return false;
        }
        return true;
    },
    /**
     * 处理表单数据，把级联型array转换为string
     * @param {Object} formData 处理前的参数
     * @return {Object} formaData
     */
    handleFormData(formData) {
        for (let key in formData) {
            if (this.isArray(formData[key])) {
                formData[key] = formData[key].length ? formData[key].pop() : '';
            }
            if (this.isObj(formData[key])) {
                formData[key] = JSON.stringify(formData[key]);
            }
        }
        return formData;
    },
    /**
     * 取当前状态值对应文本
     * @param {number} status 状态码
     * @return {string}       对应文本显示
     */
    getStatusText(status) {
        if (status === undefined || status === null) {
            return '';
        }
        let curStatus = config['APPLYSTATUS'].filter(item => {
            return item.value === +status;
        })[0];
        return curStatus ? curStatus.text : '';
    },
    /**
     * 提示
     * @param {Object} me 当前实例
     * @param {string} msg 提示内容
     * @param {string} type 提示类型
     * @param {Function} callback 回调
     * @param {boolean} isHtml 是否使用html
     *
     * @return {Function} 封装的alert实例
     */
    alert(me, msg, type, callback, isHtml) {
        return me.$alert(msg, '提示', {
            type,
            callback,
            dangerouslyUseHTMLString: isHtml || false
        });
    },
    /**
     * 错误弹窗
     *
     * @param {Object} me vue 实例
     * @param {*} res catch 的报错信息
     * @param {*} msg 默认的报错提示
     *
     * @return {Object} 封装的alert实例
     */
    alertErr(me, res, msg = '服务器开小差了～') {
        if (this.isArrStr(res.message)) {
            res.message = JSON.parse(res.message);
            let message = '<div>';
            message += res.message.join('<br>');
            message += '</div>';
            return this.alert(me, message || `${msg}`, 'error', this.noop, true);
        }
        return this.alert(me, res.message || `${msg}`, 'error');
    },
    /**
     * loading
     * @param {Object} me 当前实例
     * @param {string} msg 提示内容
     *
     * @return {Function} 封装的loading实例
     */
    loading(me, msg) {
        return me.$loading({
            lock: true,
            text: msg || '加载中···'
        });
    },
    isWebSite(website) {
        /* eslint-disable*/
        const reg = /^(?=^.{3,255}$)(http(s)?:\/\/)(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/;
        return reg.test(website);
    },
    isTel(tel) {
        // const reg = /^\d{7,8}$/;
        const reg = /^\+?0\d{2,3}\d{7,8}$/g;
        return reg.test(tel);
    },
    isPhone(phone) {
        const reg = /^1[3456789]\d{9}$/;
        return reg.test(phone);
    },
    isEmail(str) {
        /* eslint-disable*/
        const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        return reg.test(str);
    },
    /**
     * 格式化时间
     *
     * @param {Object} date 日期对象
     * @param {string} fmt 格式
     * @return {string} value
     */
    formatDate(date, fmt) {
        var o = {
            'M+': date.getMonth() + 1,
            // 日
            'd+': date.getDate(),
            // 小时
            'h+': date.getHours(),
            // 分
            'm+': date.getMinutes(),
            // 秒
            's+': date.getSeconds(),
            // 季度
            'q+': Math.floor((date.getMonth() + 3) / 3),
            // 毫秒
            'S': date.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            }
        }
        return fmt;
    },
    /**
     `* 复制对象
     *
     * @param {Object} to 复制对象基础
     * @param {Object} from 复制来源
     * @return {Object} 返回合并后的对象
     */
    extend(to, from) {
        for (const key in from) {
            if (from.hasOwnProperty(key)) {
                to[key] = from[key];
            }
        }
        return to;
    },
    /**
     * 局部复制对象
     *
     * @param {Object} to 复制对象基础
     * @param {Object} from 复制来源
     * @return {Object} 返回合并后的对象
     */
    extendPart(to, from) {
        for (const key in to) {
            if (from.hasOwnProperty(key)) {
                to[key] = from[key];
            }
        }
        return to;
    },
    /**
     * 将map转换成Array
     *
     * @param {Object} from 复制来源
     * @return {Object} 返回Array类型数据
     */
    intotheArray(from, type) {
        if (from) {
            let objValueArr = Object.values(from);
            let obj = Object.keys(from).map((item, index) => {
                let itemObj = {};
                itemObj.value = +item;
                itemObj.label = objValueArr[index];
                return itemObj;
            });
            if (type) {
                let objList = obj.map(item => {
                     if(type === 'getText') {
                         return item.label;
                     }
                     else {
                         return +item.value;
                     }
                 });
                 return objList;
             }
             else {
                 return obj;
             }
        }
        else {
            return [];
        }
    },
    intotheMap(from) {
        // let objValueArr = Object.values(from);
        let obj = from.map((item, index) => {
            let val = item.key + ':' + item.value;
            return val;
        });
        return obj;
    },
    // 获取cookie
    getCookie(name) {
        let arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        return (arr=document.cookie.match(reg))?unescape(arr[2]) : '';
    },
    /**
     * log 埋点方法
     * @param {string} pageId 页面id
     * @param {string} eventKey 自定义事件key
     * @param {Object} otherParams 其他参数，比如self等，详情见http://agroup.baidu.com/cop_fe/md/article/1748809
     */
    log(pageId, eventKey, otherParams = {}) {
        console.log(navigator.platform);
        let osMap = {
            'Win32': 3,
            'MacIntel': 4
        }
        let params = {
            pageId,
            eventKey,
            time: new Date().getTime(),
            env: 'WEB',
            osType: osMap[navigator.platform] || '',
            referrer: document.referrer || '',
            browser: this.getBrowserCore(),
            notVersion: true,
            ...otherParams
        };
        for (let key in params) {
            params[key] = encodeURIComponent(params[key]);
        }
        http.request('/crm/web/eventracking/databury.gif', {
            params,
            type: 'GET'
        }).catch(() => {});
    },
    // 获取浏览器信息
    getBrowserCore() {
        const userAgent = navigator.userAgent;
        const isOpera = userAgent.indexOf('Opera') > -1;
        if (isOpera) {
            return 'Opera';
        }
        if (userAgent.indexOf('Firefox') > -1) {
            return 'Firefox';
        }
        if (userAgent.indexOf('Chrome') > -1) {
            return 'Chrome';
        }
        if (userAgent.indexOf('Safari') > -1) {
            return 'Safari';
        }
        if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
            return 'IE';
        }
        return 'others';
    },
    getLocaltonParam() {
        let name = ''
        let value = '';
        let obj = {};
        let str = location.href;
        let num = str.indexOf("?");
        str = str.substr(num + 1);
        let arr = str.split("&");
        for (let i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                obj[name] = value;
            }
        }
        return obj;
    }
};