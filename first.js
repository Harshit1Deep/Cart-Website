// navbar code
const navlist = document.querySelector(".navlist");
console.log(navlist);
const arr = ["Home", "About", "Services", "Contact","Product"];


// Create list items and append to navlist
arr.map((ele) => {
    const li = document.createElement("li");
    li.innerText = ele;
    navlist.appendChild(li);
});

// pop up box
const btn2 = document.querySelector(".btn2"); // changed from "#loginbtn"
const contain = document.querySelector(".contain"); // changed from ".loginform"
const closebtn = document.querySelector(".closebtn"); // changed from ".closed"
console.log(btn2);
console.log(contain);

btn2.addEventListener("click", () => {
    contain.style.display = "flex";
});

closebtn.addEventListener("click", () => {
    contain.style.display = "none";
});

// form handling logic
const userdetails = {
    username: "Sundari",
    uemail: "sundari@gmail.com",
    upassword: "abc1234"
};


const formsubmit = document.querySelector(".formsubmit");
console.log(formsubmit);

const email = document.querySelector(".email");
const password = document.querySelector(".password");
const otpinput = document.querySelector(".otpinput");

console.log(email, password, otpinput);

let otpvalue = "";

// generate OTP on button click
const otpBtn = document.querySelector(".otpinput"); // assumes first .btn1 is Get OTP
otpBtn.addEventListener("click", () => {
    otpvalue = Math.floor(1000 + Math.random() * 9000).toString();
    alert("Your OTP is: " + otpvalue);
});


formsubmit.addEventListener("submit", (event) => {
    event.preventDefault();

    if (email.value === userdetails.uemail && password.value === userdetails.upassword) {
        if (otpinput.value === otpvalue) {
            email.value = "";
            password.value = "";
            otpinput.value = "";
            console.log("Login Successful");
            setTimeout(() => {
                window.location.href = "./dashboard.html";
            }, 1500);
        } else {
            console.log("Invalid otp");
        }
    } else {
        console.log("Invalid credentials");
    }
});

