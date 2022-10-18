const fs = require("fs");

const path = "dictionary.json"

const rawData = () => {
    return fs.readFileSync(path, 'utf-8', (err, data) => {
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
    } catch(err) {

    }


    if (selected_letter != "any") {
        for(let i = 0; i < dictionary.length; i++){
            if(dictionary[i].sp.charAt(0).toUpperCase() != selected_letter) {
                dictionary.splice(i, 1)
                i--
            }
        }
    }



    if (selected_tag != "any") {
        for(let i = 0; i < dictionary.length; i++){

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
    fs.writeFile("dictionary.json", JSON.stringify(dictionary, null, 4), (err) => {
        if (err) {
            alert("error\n\n" + err)
        }
    })
}

const compare = (obj1, obj2) => JSON.stringify(obj1) == JSON.stringify(obj2)

function edit_dict(word, new_word) {
    dictionary = JSON.parse(rawData())
    dictionary.forEach((element, index, arr) => {
        console.log(element)
        if(compare(element, word)) {
            arr[index] = new_word
            console.warn("FOUND ONE")
        }
    });

    console.log(word)

    write()
}

update_dict()

module.exports = {append_to_dict, update_dict, get_dictionary, change_selected_letter, change_selected_tag, edit_dict}
