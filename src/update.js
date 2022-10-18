const load_dict = require("./load_dict")
const dict = require("./dict")

get_elem = (name) => document.getElementById(name)

const update = () => {
    dict.update_dict()
    load_dict.update_page()
}

module.exports = {update, get_elem}