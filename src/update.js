const load_dict = require("./load_dict")
const dict = require("./dict")

get_elem = (name) => document.getElementById(name)

const update = () => {

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    if(dict.update_dict()) {
        delay(10).then(() => {
            dict.update_dict()
            load_dict.update_page()
        })
    } else {
        dict.update_dict()
        load_dict.update_page()
    }
}

module.exports = {update, get_elem}