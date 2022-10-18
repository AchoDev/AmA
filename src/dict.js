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

    dictionary.sort(function(a, b) {
        var textA = a.sp.toUpperCase();
        var textB = b.sp.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

}

const change_selected_letter = (letter) => selected_letter = letter

function append_to_dict(word) {
    

    dictionary = JSON.parse(rawData())
    dictionary.push(word)

    fs.writeFile("dictionary.json", JSON.stringify(dictionary, null, 4), (err) => {
        if (err) {
            alert("error\n\n" + err)
        }
    })

    update_dict()
}

update_dict()

module.exports = {append_to_dict, update_dict, get_dictionary, change_selected_letter}
