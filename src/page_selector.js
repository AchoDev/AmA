
let current_page = 0

let change_current_page = (page) => current_page = page
let get_current_page = () => current_page
let append_page = (num) => current_page += num

module.exports = { change_current_page, get_current_page, append_page }