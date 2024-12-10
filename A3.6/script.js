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

listOfRandomKantons.forEach(kanton => {
    div = document.createElement("div")
    img = document.createElement("img")
    img.src = `img/${kanton}.png`
    container.appendChild(div)
    div.appendChild(img)
});

