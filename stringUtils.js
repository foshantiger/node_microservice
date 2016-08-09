function init(options) {
    function charToNumber(char) {
        return char.charCodeAt(0) - 96;
    }

    function StringUtils() {

    }

    var stringUtils = new StringUtils();

    stringUtils.contains = function(a, b) {
        return a.indexOf(b) > -1;
    }

    stringUtils.stringToOrdinal = function(str) {
        var result = ""
        for (var i = 0, len = str.length; i < len; i++) {
            result += charToNumber(str[i]);
        }
        return result;
    }
    
    return stringUtils;
}

module.exports = init;