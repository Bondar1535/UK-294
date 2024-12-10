let button1 = document.querySelector('#choose')
let button2 = document.querySelector('#chooseWithAnimation')
let list = document.querySelector('ol')
let listItems = list.querySelectorAll('li')
let randomNum = 0

button1.addEventListener('click', chooseFunc)
button2.addEventListener('click', chooseFuncWithAnimation)

function chooseFunc(){
    document.querySelectorAll('li.activ').forEach((element) =>{element.classList.remove('activ')})
    randomNum = Math.floor(Math.random() * listItems.length)
    listItems[randomNum].classList.add('activ')
}

function chooseFuncWithAnimation(){
    let x = 0
    let interval = setInterval(() =>{
        document.querySelectorAll('li.activ').forEach((element) =>{element.classList.remove('activ')})
        randomNum = Math.floor(Math.random() * listItems.length)
        listItems[randomNum].classList.add('activ')
        if(x++ === 10){
            window.clearInterval(interval)
        }
    },100)
    this.blur()
}