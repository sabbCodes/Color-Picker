const getSchemeBtn = document.getElementById("get-scheme-btn")
const colorMode = document.getElementById("color-mode")
const colorInput = document.getElementById("color-input")
let hasBeenClicked = false


getSchemeBtn.addEventListener("click", function(e){
    let colorsHtml = ""
    if (!hasBeenClicked){
        e.preventDefault()
    const editedHex = colorInput.value.replace("#", "")
    const selectedMode = colorMode.options[colorMode.selectedIndex].text.toLowerCase()


    fetch(`https://www.thecolorapi.com/scheme?hex=${editedHex}&mode=${selectedMode}&count=5`, {method: "GET"})
        .then(res => res.json())
        .then(data => {
            const scheme = data.colors
            const colorsArr = []
            // console.log(scheme.hex.value)
            for (let hexValue of scheme){
                colorsArr.push(hexValue.hex.value)
            }

            colorsArr.forEach(function(color){
                colorsHtml += `
                <div class="colors"  style="background-color: ${color};">
                <p class="hex-code">${color}</p> </div>
                `
                document.getElementById("scheme-stage").innerHTML = colorsHtml
            })
        })

        hasBeenClicked = !hasBeenClicked
    }
})

colorMode.addEventListener("change", function(){
    hasBeenClicked = false
})

colorInput.addEventListener("change", function(){
    hasBeenClicked = false
})
