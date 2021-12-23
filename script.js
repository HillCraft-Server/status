// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYfy4S9QKgTvyF5mbcikc0ksBf_xKWh-c",
  authDomain: "hillcraft.firebaseapp.com",
  databaseURL: "https://hillcraft-default-rtdb.firebaseio.com",
  projectId: "hillcraft",
  storageBucket: "hillcraft.appspot.com",
  messagingSenderId: "2010313930",
  appId: "1:2010313930:web:3fb0ac738bd4e044aaf033"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);



// Get posts from the database
get(ref(database, "status/")).then(function(snapshot) {
    // If the data is empty, show a message
    if (snapshot.val() === null) {
        document.getElementById("feed").innerHTML = '<div class="noposts">Status updates from HillCraft will appear here.</div>';
        return;
    }

    // Display the posts with the newest posts at the top
    document.getElementById("feed").innerHTML = Object.values(snapshot.val()).reverse().map(post => {
        let date = new Date(post.timestamp);

        return `<div class="post">
            <h1 class="title">${post.title}</h1>
            <p class="content">${post.content}</p>
            <p class="timestamp">Posted on ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
        </div>`;
    }).join("");
});

// Automatic ping readout
const pingReadout = document.getElementById("ping");

fetch("https://api.mcsrvstat.us/2/hillcraft.mcraft.pro").then(response => response.json()).then(data => {
    pingReadout.innerHTML = data.online ? "Online" : "Offline";
    pingReadout.classList.add(data.online ? "online" : "offline");
});