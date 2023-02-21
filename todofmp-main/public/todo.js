 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
//  import { getAuth,signOut,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
 import { getDatabase,ref,set,push,onChildAdded,remove } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
    apiKey: "AIzaSyDbddT7EA6DLBOIV1aaeB12TFh4SOQcnGM",
    authDomain: "todo-app-bbc96.firebaseapp.com",
    databaseURL: "https://todo-app-bbc96-default-rtdb.firebaseio.com",
    projectId: "todo-app-bbc96",
    storageBucket: "todo-app-bbc96.appspot.com",
    messagingSenderId: "896556301106",
    appId: "1:896556301106:web:24bb91c69dd121c44ef52b",
    measurementId: "G-VQZVP9T4JE"
  };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
//  const auth = getAuth();

 const db = getDatabase();

 let arr= []
 let ediId ;
 var refere;
 var obj;
var inp = document.getElementById("inp")
var parent = document.getElementById("parent")

window.addDa = function(){
    
    if(ediId){
        
         obj = {
            task:inp.value,
            id:ediId
        }
        console.log(obj)
        console.log(ediId)
        refere =   ref(db,`task/${obj.id}`)
        ediId =''

    }else{
        obj = {
            task:inp.value,
         
        }
        const keyrefer = ref(db,`task/`)
        obj.id = push(keyrefer).key
        
         refere = ref(db,`task/${obj.id}`)
        }
        set(refere,obj)
        inp.value = ''
        getDa()
}
    
window.render = function(){
console.log(arr)
        parent.innerHTML = ''
    arr.forEach( (data) => {
       
        parent.innerHTML += `<ul class="container text-center bg-black fs-5 text-white border"> 
             <li  >${data.task} <br> <button onclick="EdDa('${data.id}','${data.task}')"  class="btn btn-primary">Edit</button> <button onclick="delData('${data.id}')" class="btn btn-primary">Delete</button> </li>
             </ul>`
    })
}

window.delData = function(e){
    console.log(e)
    if(arr.length == ""){
        console.log("no data in firebase ")
        parent.innerHTML = ""
    }else{
        const del =  ref(db,`task/${e}`)
        remove(del)
        getDa()
        console.log(arr)
    }
}

window.EdDa = function(id,tsk){
    console.log(id,tsk)
    inp.value = tsk
    ediId = id
}

window.getDa = function(){
    arr = []
    const refer = ref(db,`task`)
    onChildAdded(refer, (data)=>{
        console.log(data.val())
        arr.push(data.val())
render()
console.log(arr)

    })
}