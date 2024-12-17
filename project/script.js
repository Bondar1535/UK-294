let url = "http://localhost:88"
let urlTasks = "http://localhost:88/tasks"
let urlJwtSign = "http://localhost:88/auth/jwt/sign"
let urlJwtTasks = "http://localhost:88/auth/jwt/tasks"

let token
function setToken(){
    token = localStorage.getItem("token")
}
setToken()


// let urlCookieLogin = "http://localhost:88/auth/cookie/login"
// let urlCookieLogout = "http://localhost:88/auth/cookie/logout"
// let urlCookieTasks = "http://localhost:88/auth/cookie/tasks"


let signinButton = document.getElementById("signIn")
let signoutButton = document.getElementById("signOut")


window.addEventListener('DOMContentLoaded', async () => {
    signinButton.onclick = async ()=>{
        let response = await fetch(`${urlJwtSign}`, {
            method: "POST",
            body: JSON.stringify({
                email: "v.b@gmail.com",
                password: "m294"
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        let output = await response.json()
        let token = output.token;
        localStorage.setItem("token", `${token}`)
        setToken()
        proceedTasks()
    }

    signoutButton.onclick = ()=>{
        localStorage.removeItem("token")
        setToken()
        proceedTasks()
    }


    async function getTasks() {
        let response = await fetch(urlJwtTasks, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        let output = await response.json();
        return output;
    }

    let tasksContainer = document.getElementById("tasksList")
    async function proceedTasks(){
        tasksContainer.replaceChildren()
        let tasks = await getTasks()
        for(let task of tasks){
            let taskElementCont = document.createElement("div")
            taskElementCont.classList.toggle("taskCont")
            let taskElement = document.createElement("div")
            taskElement.classList.toggle("taskWrapper")
            let taskName = document.createElement("h3")
            let taskStatus = document.createElement("p")
            
            let crudButtons = document.createElement("div");
            crudButtons.classList.toggle("crudButtons")
            let deleteButton = document.createElement("button")
            deleteButton.onclick = () =>{
                deleteTask(task.id)
            }
            deleteButton.classList.toggle("deleteButton")
            deleteButton.textContent = "Delete"

            
            let doneButton = document.createElement("button")
            doneButton.onclick = () =>{
                doneTask(task.id, task.title)
            }
            doneButton.classList.toggle("doneButton")
            doneButton.textContent = "Done"

            taskName.textContent=task.title
            if(task.completed === true){
                taskStatus.textContent = "Gmacht"
            }else{
                taskStatus.textContent = "Nonig gmacht"
            }

            taskElement.append(taskName)
            taskElement.append(taskStatus)
            taskElementCont.append(taskElement)
            crudButtons.append(doneButton)
            crudButtons.append(deleteButton)
            taskElementCont.append(crudButtons)
            tasksContainer.prepend(taskElementCont)
        }
    }
    
    proceedTasks()

    async function deleteTask(taskid){
        await fetch(`${url}/task/${taskid}`, {
            method: "DELETE"
        })
        proceedTasks()
    }
    
    async function doneTask(taskid, tasktitle){
        await fetch(`${url}/tasks`, {
            method: "PUT",
            body: JSON.stringify({
                id: taskid,
                completed: true,
                title: tasktitle
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        proceedTasks()
    }

    let newTaskName = document.getElementById("newTaskName")
    document.addEventListener("submit", async event =>{
        event.preventDefault()
        if(newTaskName.value){
            await fetch(urlJwtTasks, {
                method: "POST",
                body: JSON.stringify({
                    title: newTaskName.value
                }),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            newTaskName.value = ""
            proceedTasks()
        }
    })
});





// let loginButton = document.getElementById("login")
// loginButton.onclick = ()=>{
//     fetch(`${urlCookieLogin}`, {
//         method: "POST",
//         body: JSON.stringify({
//             email: "v.b@gmail.com",
//             password: "m294"
//         }),
//         headers: {
//             'Content-type': 'application/json'
//         }
//     })
// }

// let logoutButton = document.getElementById("logout")
// logoutButton.onclick = ()=>{
//     fetch(`${urlCookieLogout}`, {
//         method: "POST"
//     })
// }


// async function getTasks() {
//     let response = await fetch(urlCookieTasks, {
//         method: "GET",
//         credentials: 'include'
//     })
//     let output = await response.json();
//     return output;
// }

// window.addEventListener('DOMContentLoaded', async () => {
//     let tasksContainer = document.getElementById("tasksList")
//     async function proceedTasks(){
//         tasksContainer.replaceChildren()
//         let tasks = await getTasks()
//         for(let task of tasks){
//             let taskElementCont = document.createElement("div")
//             taskElementCont.classList.toggle("taskCont")
//             let taskElement = document.createElement("div")
//             taskElement.classList.toggle("taskWrapper")
//             let taskName = document.createElement("h3")
//             let taskStatus = document.createElement("p")
            
//             let crudButtons = document.createElement("div");
//             crudButtons.classList.toggle("crudButtons")
//             let deleteButton = document.createElement("button")
//             deleteButton.onclick = () =>{
//                 deleteTask(task.id)
//             }
//             deleteButton.classList.toggle("deleteButton")
//             deleteButton.textContent = "Delete"

            
//             let doneButton = document.createElement("button")
//             doneButton.onclick = () =>{
//                 doneTask(task.id, task.title)
//             }
//             doneButton.classList.toggle("doneButton")
//             doneButton.textContent = "Done"

//             taskName.textContent=task.title
//             if(task.completed === true){
//                 taskStatus.textContent = "Gmacht"
//             }else{
//                 taskStatus.textContent = "Nonig gmacht"
//             }

//             taskElement.append(taskName)
//             taskElement.append(taskStatus)
//             taskElementCont.append(taskElement)
//             crudButtons.append(doneButton)
//             crudButtons.append(deleteButton)
//             taskElementCont.append(crudButtons)
//             tasksContainer.prepend(taskElementCont)
//         }
//     }
    
//     proceedTasks()

//     async function deleteTask(taskid){
//         await fetch(`${url}/task/${taskid}`, {
//             method: "DELETE"
//         })
//         proceedTasks()
//     }
    
//     async function doneTask(taskid, tasktitle){
//         await fetch(`${url}/tasks`, {
//             method: "PUT",
//             body: JSON.stringify({
//                 id: taskid,
//                 completed: true,
//                 title: tasktitle
//             }),
//             headers: {
//                 'Content-type': 'application/json'
//             }
//         })
//         proceedTasks()
//     }

//     let newTaskName = document.getElementById("newTaskName")
//     document.addEventListener("submit", async event =>{
//         event.preventDefault()
//         if(newTaskName.value){
//             await fetch(urlCookieTasks, {
//                 method: "POST",
//                 body: JSON.stringify({
//                     title: newTaskName.value
//                 }),
//                 credentials: 'include',
//                 headers: {
//                     'Content-type': 'application/json'
//                 }
//             })
//             newTaskName.value = ""
//             proceedTasks()
//         }
//     })
// });




// async function getTasks() {
//     let response = await fetch(urlTasks, {
//         method: "GET",
//     })
//     let output = await response.json();
//     return output;
// }

// window.addEventListener('DOMContentLoaded', async () => {
//     let tasksContainer = document.getElementById("tasksList")
//     async function proceedTasks(){
//         tasksContainer.replaceChildren()
//         let tasks = await getTasks()
//         for(let task of tasks){
//             let taskElementCont = document.createElement("div")
//             taskElementCont.classList.toggle("taskCont")
//             let taskElement = document.createElement("div")
//             taskElement.classList.toggle("taskWrapper")
//             let taskName = document.createElement("h3")
//             let taskStatus = document.createElement("p")
            
//             let crudButtons = document.createElement("div");
//             crudButtons.classList.toggle("crudButtons")
//             let deleteButton = document.createElement("button")
//             deleteButton.onclick = () =>{
//                 deleteTask(task.id)
//             }
//             deleteButton.classList.toggle("deleteButton")
//             deleteButton.textContent = "Delete"

            
//             let doneButton = document.createElement("button")
//             doneButton.onclick = () =>{
//                 doneTask(task.id, task.title)
//             }
//             doneButton.classList.toggle("doneButton")
//             doneButton.textContent = "Done"

//             taskName.textContent=task.title
//             if(task.completed === true){
//                 taskStatus.textContent = "Gmacht"
//             }else{
//                 taskStatus.textContent = "Nonig gmacht"
//             }

//             taskElement.append(taskName)
//             taskElement.append(taskStatus)
//             taskElementCont.append(taskElement)
//             crudButtons.append(doneButton)
//             crudButtons.append(deleteButton)
//             taskElementCont.append(crudButtons)
//             tasksContainer.prepend(taskElementCont)
//         }
//     }
    
//     proceedTasks()

//     async function deleteTask(taskid){
//         await fetch(`${url}/task/${taskid}`, {
//             method: "DELETE"
//         })
//         proceedTasks()
//     }
    
//     async function doneTask(taskid, tasktitle){
//         await fetch(`${url}/tasks`, {
//             method: "PUT",
//             body: JSON.stringify({
//                 id: taskid,
//                 completed: true,
//                 title: tasktitle
//             }),
//             headers: {
//                 'Content-type': 'application/json'
//             }
//         })
//         proceedTasks()
//     }

//     let newTaskName = document.getElementById("newTaskName")
//     document.addEventListener("submit", async event =>{
//         event.preventDefault()
//         if(newTaskName.value){
//             await fetch(urlTasks, {
//                 method: "POST",
//                 body: JSON.stringify({
//                     title: newTaskName.value
//                 }),
//                 headers: {
//                     'Content-type': 'application/json'
//                 }
//             })
//             newTaskName.value = ""
//             proceedTasks()
//         }
//     })
// });
