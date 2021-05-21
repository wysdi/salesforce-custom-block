require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');
let Alpine = require('alpinejs');
const Handlebars = require("handlebars");

var SDK = require('blocksdk');
var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy

const template = require('./block.handlebars')

function cardApp() {
    return {
        optionsVisible: false,
        search: "",
        formData: {},
        selectedOption : {},
        events: [],
        initApp(){
            this.fetchEvents();
            this.$watch('selectedOption', value => {
                this.formData = Object.assign({}, value)
                this.onChange()
            } )
        },
        filteredOptions() {
            return this.events.filter((option) => {
                let lowerName = option.name.toLowerCase();
                return lowerName.includes(this.search.toLowerCase());
            });
        },
        fetchEvents(){
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then(data => {
                    this.events = data
                })

        },
        onSelected(event){
            this.selectedOption = event;
            this.optionsVisible = false;
            this.search = ''
        },
        isEmpty(obj) { return Object.keys(obj).length === 0; },
        onChange(){
            const { name, email, phone, address } = this.formData;
            sdk.setContent(template({ name, email, phone, address  }));
            sdk.setData(JSON.parse(JSON.stringify(this.formData)));
        }
    };
}

sdk.getData(function (data) {

    document.getElementById('workspace').__x.$data.formData = data
    document.getElementById('workspace').__x.$data.selectedOption = data

});


window.cardApp = cardApp;