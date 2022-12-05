function add_click_listeners() {
    const tag_buttons = document.getElementsByClassName("tag-button")
    const page_buttons = document.getElementsByClassName("select-page-button")
    for(let elem of tag_buttons) {

        elem.addEventListener("click", () => {
            
            dc.style.borderTopRightRadius = "0px"
            dc.style.borderTopLeftRadius = "0px"
            dc.style.marginTop = "0px"

            const id = elem.parentNode.dataset.id;
    
            close_menu()
            load_page.deload_page()
            
            dict.change_selected_tag(id)
            update.update()
    
            if(elem.value != "any") {
                selected_tag_indicator.style.display = "inherit"
                selected_tag_indicator.innerText = `Kategorie: ${elem.value}`
            } else {
                selected_tag_indicator.style.display = "none"
            }
    
            document.getElementById("tag-selector").value = elem.value
        })

        
    }
    
    const dc = get_elem("dictionary")

    for(let btn of page_buttons) {
        


        btn.addEventListener("click", () => {
            close_menu()
                
            if(btn.value == "sv") {
                load_page.load_directory()
                return
            }

            const id = btn.parentNode.dataset.id;
            
            
            load_page.load_page(btn.innerText, id)

            dc.style.borderTopRightRadius = "10px"
            dc.style.borderTopLeftRadius = "10px"
            dc.style.marginTop = "30px"

            selected_tag_indicator.style.display = "none"

        })
         
    }

}

add_click_listeners()


module.exports = add_click_listeners