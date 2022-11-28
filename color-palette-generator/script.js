const colorInput = document.querySelector('.color-input')
const selectMode = document.querySelector('.select-mode')
const colorContainer = document.querySelector('.color-container')
const getColorBtn = document.querySelector('.get-color-btn')

let colorsArr = []
let selectedColor = colorInput.value.slice(1)
let selectedMode = selectMode.value

function getColor(e) {
  selectedColor = e.target.value.slice(1)
  return selectedColor
}

function getMode(e) {
  selectedMode = e.target.value
  return selectedMode
}

colorInput.addEventListener('change', getColor)
selectMode.addEventListener('change', getMode)

getColorBtn.addEventListener('click', function () {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${selectedMode}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      colorsArr = data.colors
      renderColors()
    })
})

function renderColors() {
  let colorsHtml = ''

  colorsArr.map((color, i) => {
    colorsHtml += `
        <div 
          class='color-block' 
          id=${i + 1} 
          style='background-color:${color.hex.value}'>
          <p>${color.hex.value}</p>
        </div>
        <h3 
          class='hex-code' 
          id=${i + 1}>${color.hex.value}
        </h3>
      `
  })
  colorContainer.innerHTML = colorsHtml
  copyHexToClipboard()
}

function copyHexToClipboard() {
  const colorBlock = [...document.getElementsByClassName('color-block')]
  console.log(colorBlock)

  colorBlock.forEach((el) => {
    el.addEventListener('click', () => {
      navigator.clipboard
        .writeText(el.textContent)
        .then(() => alert(`'${el.textContent}' copied to the clipboard`))
        .catch(() => alert('copy failed'))
    })
  })
}