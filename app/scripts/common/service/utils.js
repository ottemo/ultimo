module.exports = function (commonModule) {

    /**
     * Extends String object
     *
     * @param {string} charlist
     * @returns {string}
     */
    String.prototype.trimLeft = function (charlist) {
        if (typeof charlist === "undefined") {
            charlist = "\\s";
        }

        return this.replace(new RegExp("^[" + charlist + "]+"), "");
    };

    /**
     * Extends String object
     *
     * @param {string} charlist
     * @returns {string}
     */
    String.prototype.trimRight = function (charlist) {
        if (typeof charlist === "undefined") {
            charlist = "\\s";
        }

        return this.replace(new RegExp("[" + charlist + "]+$"), "");
    };

    /**
     * Extends String object
     *
     * @param {string} charlist
     * @returns {string}
     */
    String.prototype.trim = function (charlist) {
        return this.trimLeft(charlist).trimRight(charlist);
    };

    /**
     *  $commonUtilService interaction service
     */
    commonModule.service("$commonUtilService", function () {
            var cloneObj, getMessage, getMessageByCode, getDate;

            cloneObj = function (obj) {
                if (null === obj || "object" !== typeof obj) {
                    return obj;
                }
                var copy = obj.constructor();
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) {
                        copy[attr] = obj[attr];
                    }
                }
                return copy;
            };

            /**
             * Gets message text by code. If message by code not exist, returns default message from  error object
             *
             * @param {object} error - should contain code and default message for error
             * @returns {string}
             */
            getMessageByCode = function (error) {
                var msgList = {};

                return typeof msgList[error.code] !== "undefined" ? msgList[error.code].toString() : error.message;
            };

            /**
             *
             * @param {object} response
             * @param {string} type
             * @param {string} message
             * @param {int} timeout
             */
            getMessage = function (response, type, message, timeout) {
                var messageObj, error;
                messageObj = {};
                error = {};

                if (response !== null && response.error !== null) {
                    messageObj.type = "danger";
                    if (typeof message === "undefined" || message === null) {
                        error = response.error;
                    } else {
                        error = {"code": message, "message": message};
                    }
                } else {
                    messageObj.type = type;
                    error = {"code": message, "message": message};
                }

                messageObj.message = getMessageByCode(error);
                messageObj.timeout = timeout || null;

                return messageObj;
            };

            /**
             * Fix convert date from string to object. Need for Safari, IE
             *
             * @param dateStr
             * @returns {Date}
             */
            getDate = function (dateStr) {
                var parts, date;
                parts = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(Z|(\+|-)(\d{2}?):?(\d{2})?)$/.exec(dateStr);

                if (parts === null) {
                    date = new Date();
                } else {
                    date = new Date(parts[1], parts[2]-1, parts[3], parts[4], parts[5], parts[6]);
                }

                return date;
            };

            return {
                "clone": cloneObj,
                "getMessage": getMessage,
                "getDate": getDate
            };
        }
    );

};
