let listOfKantons = ['ag','ai','ar','be','bl','bs','fr','ge','gl','gr','ju','lu','ne','nw','ow','sg','sh','so','sz','tg','ti','ur','vd','vs','zg','zh']
let listOfRandomKantons = []
let listOfShuffledRandomKantons = []
let container = document.getElementById('container')

// GET Random 10 Kantons
let randNum = 0
while(listOfRandomKantons.length < 20){
    randNum = Math.floor(Math.random() * 26)
    let newKanton = listOfKantons[randNum]
    if(!listOfRandomKantons.includes(newKanton)){
        listOfRandomKantons.push(newKanton)
        listOfRandomKantons.push(newKanton)
    }
}

listOfRandomKantons.sort(() => 0.5 - Math.random())
id=0
listOfRandomKantons.forEach(kanton => {
    div = document.createElement("div")
    div.classList.toggle("passive")
    div.id = id
    img = document.createElement("img")
    img.src = `img/back1.png`
    container.appendChild(div)
    div.appendChild(img)
    id++
});

let kantons = document.querySelectorAll('#container div')
function startGame(){
    kantons.forEach(element => {
        kantonImgElement = element.querySelector('img')
        kantonImg = kantonImgElement
        if(element.classList.contains('passive')){
            kantonImgElement.src = `img/back1.png`
        }else if(element.classList.contains('active')){
            kantonImgElement = kantonImgElement
        }
    });
}

kantons.forEach(element => {
    element.addEventListener("click", () => {handleKantonsClick(element)})
});

function handleKantonsClick(element){
    element.classList.toggle("passive")
    element.classList.toggle("active")
    kantonName = listOfRandomKantons[element.id]
    console.log(listOfRandomKantons[element.id]);
    img = element.querySelector('img')
    if(element.classList.contains('active')){
        img.src = `img/${kantonName}.png`
    }else if(element.classList.contains('passive')){
        img.src = 'img/back1.png'
    }
}

function handleActivePassive(){

}

window.addEventListener("load", startGame)