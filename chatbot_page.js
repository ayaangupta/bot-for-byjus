const firebaseConfig = {
    apiKey: "AIzaSyAAT1WjGwinvcJahUJDe_3SIco9fCH5pF0",
    authDomain: "mychatbot-5a4b2.firebaseapp.com",
    databaseURL: "https://mychatbot-5a4b2-default-rtdb.firebaseio.com",
    projectId: "mychatbot-5a4b2",
    storageBucket: "mychatbot-5a4b2.appspot.com",
    messagingSenderId: "239018216755",
    appId: "1:239018216755:web:07867e7403b7b692aa8246",
    measurementId: "G-5NZ11VSGPT"
  };
  firebase.initializeApp(firebaseConfig);
  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");


  document.addEventListener("DOMContentLoaded", () => {
    console.log("Hello World!");
    getData();
  });

function send(){
    cbt = document.getElementById("cbt").value;

    var postListRef = firebase.database().ref("/"+room_name + "/posts");
    var newPostRef = postListRef.push();
    newPostRef.set({
        // ...
        comment: cbt,
        user: user_name,
        time: Date.now(),
        likes: 0
    });
    document.getElementById("cbt").value = "";
    console.log(cbt);
    getData();
}

function getData(){
    console.log("getData");
    firebase.database().ref("/" + room_name + "/posts").on('value', function (snapshot){
        document.getElementById("output").innerHTML = "";
        console.log(snapshot);
        cult = "";
        snapshot.forEach(function(childSnapshot){
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if(childKey != "purpose"){
                comment = childData.comment;
                user = childData.user;
                likes = childData.likes;
                time = new Date(childData.time).toLocaleString();
                console.log(comment);
                console.log(user);
                console.log(likes);
                console.log(time);
                cult += '<div class="post"><div class="user">'+user+'</div><div class="comment">'+comment+'</div><div class="time">'+ time + '</div></div>';
            }
        })
        document.getElementById("output").innerHTML = cult;
    })
}

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

function go_back(){
    window.location = "chatbot_room.html";
}