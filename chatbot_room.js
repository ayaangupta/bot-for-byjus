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
document.getElementById("user_name").innerHTML = "Welcome " + user_name;

function add_room() {
  room_name = document.getElementById("room_name").value;
  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });
  localStorage.setItem("room_name", room_name);
  window.location = "chatbot_page.html"
}

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "messenge_page.html"
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    rooms = snapshot.val();
    for (var Room_name in rooms) {
      console.log("room_name -" + Room_name);
      row = "<div class=''room_name' id=" + Room_name + "onclick='redirectToRoomName(this.id)' >#" + Room_name + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    }
  });
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html"
}

document.addEventListener("DOMContentLoaded", () => {
  getData();
});
