module.exports = {
    isNum: function (input) {
        if (!/[0-9]+/.test(input)) return 'That isn\'t a number. Please try again';
        else return true;
    },
    isID: function (input, maxID) {        
        if (parseInt(input) > maxID) return 'That ID doesn\'t exist. Please try again';
        else return true;
    }
};

