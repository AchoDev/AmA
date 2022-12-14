let fs = require("fs");


const path = require("path")

const directory = path.resolve(__dirname, "../dictionary.json")

const ignored_letters = ["¡", "¿", "!", "?"]

const search_list = (value) => {

    for(let letter of ignored_letters) {
        if(letter == value) {
            return true
        }
    }
    return false
}

const rawData = () => {
    return fs.readFileSync(directory, 'utf-8', (err, data) => {
        if(err) {
            alert("an error occured\n\n" + err)
            return null;
        }
        return data
    })
}

let selected_letter = "any"
let selected_tag = "any"

let dictionary

const get_dictionary = () => dictionary

function update_dict() {
    
    try {
        dictionary = JSON.parse(rawData())
    } catch(err) {return true}
    
    if (selected_letter != "any") {
        for(let i = 0; i < dictionary.length; i++){

            let dicLetter = dictionary[i].sp.charAt(0).toUpperCase()

            if(search_list(dicLetter)) {
                
                dicLetter = dictionary[i].sp.charAt(1).toUpperCase()
            }
            firstTwo = dictionary[i].sp.substring(0, 2).toUpperCase()

            if(firstTwo.toUpperCase() == "CH" || firstTwo.toUpperCase() == "LL") dicLetter = firstTwo
            if(dicLetter != selected_letter.toUpperCase()) {
                dictionary.splice(i, 1)
                i--
            }
        }
    }

    if (selected_tag != "any") {

        console.log(selected_tag)

        for(let i = 0; i < dictionary.length; i++){
            console.log(dictionary[i].tag)
            if(dictionary[i].tag != selected_tag) {
                dictionary.splice(i, 1)
                i--
            }
        }
    }

    dictionary.sort(function(a, b) {
        var textA = a.sp.toUpperCase();
        var textB = b.sp.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
}

const change_selected_letter = (letter) => selected_letter = letter
const change_selected_tag = (tag) => selected_tag = tag

function append_to_dict(word) {
    dictionary = JSON.parse(rawData())
    dictionary.push(word)

    write()
    update_dict()
}

function write() {
    fs.writeFile(path.resolve(__dirname, "../dictionary.json"), JSON.stringify(dictionary, null, 4), (err) => {
        if (err) {
            alert("error\n\n" + err)
        }
    })
}

const compare = (obj1, obj2) => JSON.stringify(obj1) == JSON.stringify(obj2)

const search_dict = (word, fnc) => {
    dictionary = JSON.parse(rawData())
    dictionary.forEach((element, index, arr) => {
        if(compare(element, word)) {
            fnc(arr, index)
        }
    })
}

function edit_dict(word, new_word) {
    search_dict(word, (arr, index) => {
        arr[index] = new_word
    })
    write()
}

function remove_from_dict(word) {
    search_dict(word, (arr, index) => {
        arr.splice(index, 1)
    })
    write()
}

update_dict()

module.exports = {append_to_dict, update_dict, get_dictionary, change_selected_letter, change_selected_tag, edit_dict, remove_from_dict}
