(function (define) {
    "use strict";

    /**
     *  HTML top page header manipulation stuff
     */
    define(["common/init"], function (commonModule) {

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
                var cloneObj, getMessage, getMessageByCode;

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

                return {
                    "clone": cloneObj,
                    "getMessage": getMessage
                };
            }
        );

        return commonModule;
    });

})(window.define);