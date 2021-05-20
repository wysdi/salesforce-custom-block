require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');
let Alpine = require('alpinejs');

var SDK = require('blocksdk');
var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy

sdk.getData(function (data) {

});



function cardApp() {
    return {
        fields: {
            name: 'ddd',
            email: '',
            message: ''
        },
        cards: [].sort(() => Math.random() - .5),
        submitData() {

            console.log(JSON.stringify(this.fields))
        }

    };
}

window.cardApp = cardApp;