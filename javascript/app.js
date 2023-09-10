import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase,ref, set, on, db } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAwjKy5ClbmrTitJtdBKQw1LrSvjO-tKU8",
    authDomain: "form-c01d0.firebaseapp.com",
    databaseURL: "https://form-c01d0-default-rtdb.firebaseio.com",
    projectId: "form-c01d0",
    storageBucket: "form-c01d0.appspot.com",
    messagingSenderId: "579555458528",
    appId: "1:579555458528:web:29ddf37ba9a0962593bf85",
    measurementId: "G-3ZSQS81CMZ"}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct")

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");

const userFullName = document.getElementById("userFullName");
const formBlog = document.getElementById("formBlog");
const title = document.getElementById("title");
const blogBody = document.getElementById("blogBody");
const blogList = document.getElementById("blogList");
const logoutBtn = document.getElementById("logoutBtn");


const returnBtn = document.getElementById("return-btn");

let email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;

createacctbtn.addEventListener("click", function() {
    let isVerified = true;

  signupEmail = signupEmailIn.value;
  confirmSignupEmail = confirmSignupEmailIn.value;
  if(signupEmail != confirmSignupEmail) {
      window.alert("Email fields do not match. Try again.")
      isVerified = false;
  }

  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if(signupPassword != confirmSignUpPassword) {
      window.alert("Password fields do not match. Try again.")
      isVerified = false;
  }
  
  if(signupEmail == null || confirmSignupEmail == null || signupPassword == null || confirmSignUpPassword == null) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }
  
  if(isVerified) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      window.alert("Success! Account created.");
let uniqueId = auth.currentUser.uid;
let userRefrence = ref(database, "users/" + uniqueId);
let obj = {
    email : signupEmailIn.value,
    confirmEmail : confirmSignupEmailIn.value,
    password : signupPasswordIn.value,
    confirmPassword : confirmSignUpPasswordIn.value,
};

set(userRefrence, obj)
    .then((userCredential ) => {
        console.log("Succesfully added data in database", userCredential);
              })


    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      window.alert("Error occurred. Try again.");
    });
  }
});

submitButton.addEventListener("click", function() {
  email = emailInput.value;
  console.log(email);
  password = passwordInput.value;
  console.log(password);

  function directDashboard () {
    auth.onAuthStateChanged (user => {
      if(user) {
        window.location.href = "./dashboard.html"
      }

    })
    directDashboard ();

if(user) {
  userFullName.textContent = user.displayName;
  displayBlogPosts(user.uid);
}
  }

  function displayBlogPosts(userId) {
    const blogPosts = db.ref("blogs").orderByChild("userId").equalTo(userId);
    blogPosts.on("value", snapshot => {
      blogList.innerHTML = "";
      const posts = snapshot.val();
      if (posts) {
       const sorted = Object.keys(posts)
       .map(key => ({id: key, ...posts[key]}))
       .sort((a, b) => b.date - a.date);
       
       sortedPosts.forEach(post => {
        const element = document.createElement("div")
        element.classList.add("blog-post")
        element.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <p>Publish Date: ${post.date.todate().toLocalString()}</p>
        
        <button class="edit-button" data-id"${doc.id}">Edit</button>
        <button class="delete-button" data-id"${doc.id}">Edit</button>
        `;
        blogList.appendChild(element);

        const editBtn = element.querySelector("edit-button")
        const deleteBtn = element.querySelector("delete-button")

        editBtn.addEventListener("click", () => {
          const postId = editBtn.getAttribute("data-id")
          const 
         
        })
       })
      }

    })
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // console.log("Success! Welcome back!");
      // window.alert("Success! Welcome back!");
      window.location.href = "dashboard.html"
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error occurred. Try again.");
      window.alert("Error occurred. Try again.");
    });
});


signupButton.addEventListener("click", function() {
    main.style.display = "none";
    createacct.style.display = "block";
});

returnBtn.addEventListener("click", function() {
    main.style.display = "block";
    createacct.style.display = "none";
});

