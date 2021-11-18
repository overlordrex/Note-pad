const title = document.getElementById("title");
const content = document.getElementById("content");

let shelf;

class Note{
    constructor(title,content,time){
        this.title = title;
        this.content = content
        this.time = time
        this.id = Math.random()
    }
}

document.querySelector(".add-btn").addEventListener("click", function(){
    document.querySelector(".notepad-container").classList.add("active")
    title.value =""
    content.value =""
    title.focus()
})

document.querySelector(".clear").addEventListener("click", function(){
    title.value =""
    content.value =""
    title.focus()
})

document.querySelector(".back").addEventListener("click", function(){
    document.querySelector(".notepad-container").classList.remove("active")
})

document.querySelector(".font").addEventListener("click", function(){
    document.querySelector("#title").classList.toggle("font")
    document.querySelector("#content").classList.toggle("font")
})

function addZero(num) {
    return num < 10 ? `0${num}` : num;
}


document.querySelector(".save").addEventListener("click", function(){
    const today =  new Date()
    
     const month = today.getMonth()
     const months = ["January","Febuary","March","April","May","June","July","August","September","Octorber","November","December"]
    
     const day = today.getDate();

     const year = today.getFullYear()

     const hour = addZero(today.getHours())
     
     const minutes = addZero(today.getMinutes())

     const prepend = hour>=12 ? "PM" : "AM"

     const time = `${months[month]} ${day},${year}. ${hour}:${minutes} ${prepend}`


    if(title.value.length > 0 || content.value.length > 0){
        const newNote = new Note(title.value,content.value,time)
        const note = `
        <div class="note">
            <span hidden>${newNote.id}</span>
            <small>${time}</small>
            <h4>${title.value}</h4>
            <p>${content.value}</p>
            <button class="fas fa-trash-alt delete btn"></button> 
            <button class="fas fa-edit edit btn"></button>
        </div>
        `;
        
        document.querySelector(".note-container").innerHTML += note
        document.querySelector(".notepad-container").classList.remove("active")
        

        if(localStorage.getItem("bookstore")=== null){
            shelf = []
            console.log(shelf);
        }else{
            shelf = JSON.parse(localStorage.getItem("bookstore"))
        }

        shelf.push(newNote)
        localStorage.setItem("bookstore",JSON.stringify(shelf))

        console.log(newNote);
       
    }else{
        alert("unable to save an empty note")
        
    }
    

    addEvent()
    

})

function removeNoteStorage(id){
    let notes = JSON.parse(localStorage.getItem("bookstore"));

    notes.forEach((note,index)=>{
        if(note.id === id){
            notes.splice(index,1)
        }
        
        localStorage.setItem("bookstore",JSON.stringify(notes))
    })
}

function addEvent(){
    //DELETE BTN
    document.querySelectorAll(".delete").forEach(btn => {
        btn.addEventListener("click",function(e){
            const targetBtn = e.target;
            const targetNote = targetBtn.parentElement;
            const id = document.querySelector(".note span").innerHTML;
            if(confirm("this note will be permanently deleted")){
                targetNote.remove()
                removeNoteStorage(Number(id))
            }
            
        })
    })

    //EDIT BTN
    document.querySelectorAll(".edit").forEach(btn => {
        btn.addEventListener("click", function(e){
            document.querySelector(".notepad-container").classList.add("active")
            const targetBtn = e.target;
            const targetNote = targetBtn.parentElement
            targetNote.remove()
            
            const noteTitle = targetNote.querySelector("h1").innerHTML
            const noteContent = targetNote.querySelector("p").innerHTML
            // targetNote.remove()
            title.value = noteTitle
            content.value = noteContent
            
            
        })
    })
}

document.addEventListener("DOMContentLoaded",function(){

    let notes = JSON.parse(localStorage.getItem("bookstore"));


    notes.forEach(pad => {
        const note = `
        <div class="note">
            <span hidden>${pad.id}</span>
            <small>${pad.time}</small>
            <h4>${pad.title}</h4>
            <p>${pad.content}</p>
            <button class="fas fa-trash-alt delete btn"></button> 
            <button class="fas fa-edit edit btn"></button>
        </div>
        `;
        
        document.querySelector(".note-container").innerHTML += note
    });

    document.querySelectorAll(".delete").forEach(btn => {
        btn.addEventListener("click",function(e){
            const targetBtn = e.target;
            const targetNote = targetBtn.parentElement;
            const id = document.querySelector(".note span").innerHTML;
            if(confirm("this note will be permanently deleted")){
                targetNote.remove()
                removeNoteStorage(Number(id))
            }
            
        })
    })

    document.querySelectorAll(".edit").forEach(btn => {
        btn.addEventListener("click", function(e){
            document.querySelector(".notepad-container").classList.add("active")
            const targetBtn = e.target;
            const targetNote = targetBtn.parentElement
            targetNote.remove()
            
            const noteTitle = targetNote.querySelector("h1").innerHTML
            const noteContent = targetNote.querySelector("p").innerHTML
            // targetNote.remove()
            title.value = noteTitle
            content.value = noteContent
            
            
        })
    })
   
})