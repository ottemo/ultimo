/**
 *  commonUtilService interaction service
 */
angular.module("commonModule")

    .service("commonUtilService", function () {

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
                date = new Date(parts[1], parts[2] - 1, parts[3], parts[4], parts[5], parts[6]);
            }

            return date;
        };

        /**
         * Converts product options set from an object to an array
         * Gets an option key from original object
         * and assigns key value to the new <key> field in option
         *
         * @param options {Object}
         * @returns {Array}
         */
        function processProductOptions(options) {
            // Iterate over all product options and convert to an array
            var result = _.map(options, function(option, optionKey) {

                // Add key for each option
                option.key = optionKey;

                // Iterate over child options
                option.options = _.map(option.options, function(childOption, childOptionKey) {
                    // Add a key
                    childOption.key = childOptionKey;

                    return childOption;
                });

                // Sort child options
                option.options = _.sortBy(option.options, 'order');

                // Add a css Class to an option
                option.cssClass = _.kebabCase('option-' + option.label);

                return option;
            });

            // Sort the options by the order
            result = _.sortBy(result, 'order');

            return result;
        }

        /**
         * Returns a label of selected product option
         * @param {Object} option
         * @returns {string}
         */
        function getOptionLabel (option) {
            // If option is a field return option value
            if (option.type === 'field') {
                return option.value;

                // If option is a multi-select return a list of labels
            } else if (option.type === 'multi_select') {
                return _.map(option.options, 'label').join(', ');

                // In other cases (select, radio, subscription select)
            } else {

                // When it's a subscription select there is a full list of child options
                // So we need to pick up the only one child option which have selected key
                // And we need the same when it's a regular select or a radio
                return _.find(option.options, {'key': option.value}).label;
            }
        }

        return {
            clone: cloneObj,
            getMessage: getMessage,
            getDate: getDate,
            processProductOptions: processProductOptions,
            getOptionLabel: getOptionLabel
        };
    }
);