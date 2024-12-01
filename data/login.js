let users = JSON.parse(localStorage.getItem("users")) || [];
let userId = localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')) : 1;
function saveToUser() {
  localStorage.setItem("users", JSON.stringify(users));
}
function saveToUserId() {
  localStorage.setItem('userId', userId);
}
export function clearInputs() {
  document.getElementById("phone").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirmPassword").value = "";
}
export function clearInputLogin() {
  document.getElementById("userPhone").value = "";
  document.getElementById("userPassword").value = "";
}
export function sign() {
  const signBtn = document.querySelector(".js-sign");
  const body = document.querySelector("body");
  const registerForm = document.getElementById("registerForm");
  const turnOfForm = document.getElementById("closeBtn");
  body.style.overflowY = "auto";
  registerForm.style.visibility = "hidden";
  signBtn.addEventListener("click", () => {
    body.style.overflowY = "hidden";
    registerForm.style.visibility = "visible";
  });
  turnOfForm.addEventListener("click", () => {
    body.style.overflowY = "auto";
    registerForm.style.visibility = "hidden";
    const remind = document.querySelector(".remind");
    remind.style.display = "none";
    clearInputs();
    
  });
  const signConfirmBtn = document.querySelector(".js-sign-confirm");
  signConfirmBtn.addEventListener("click", (event) => {
    let test = false;
    event.preventDefault();
    const phone = document.getElementById("phone").value;
    const passWord = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const remind = document.querySelector(".remind");
    remind.style.display = "none";
    users.forEach((user) => {
      if (phone === user.phoneUser) {
        test = true;
      }
    });
    if (!test) {
      if (passWord.length >= 6 && passWord === confirmPassword) {
        users.push({
          id : userId, 
          phoneUser: phone,
          passWordUser: passWord,
        });
        userId++;
        saveToUserId();
        console.log(users);
        saveToUser();
        signConfirmBtn.innerHTML = `
           <img src="image_book_special/Rolling@1x-1.0s-200px-200px.gif" >
          `;
        remind.style.display = "none";

        setTimeout(() => {
          signConfirmBtn.innerHTML = `
              <span>Đăng kí</span>
             `;
          clearInputs();
          body.style.overflowY = "auto";
          registerForm.style.visibility = "hidden";
        }, 2000);
      }
    } else {
      remind.style.display = "block";
      registerForm.style.overflow = 'hidden';
    }
  });

}
export function login() {
  const loginForm = document.getElementById("loginForm");
  const turnOfForm1 = document.getElementById("closeBtn1");
  const loginBtn = document.querySelector(".js-login");
  const body = document.querySelector("body");
  loginForm.style.visibility = "hidden";
  loginBtn.addEventListener("click", () => {
    body.style.overflowY = "hidden";
    loginForm.style.visibility = "visible";
  });
  turnOfForm1.addEventListener("click", () => {
    body.style.overflowY = "auto";
    loginForm.style.visibility = "hidden";
    clearInputLogin();
  });
  const loginConfirmBtn = document.querySelector(".js-login-confirm");
  loginConfirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let testLogin = false;
    const userPhone = document.getElementById("userPhone").value;
    const userPassword = document.getElementById("userPassword").value;
    users.forEach((user) => {
      if (userPhone === user.phoneUser && userPassword === user.passWordUser) {
        testLogin = true;
      }
    });
    if (testLogin) {
      const face = document.querySelector(".container-user");
      const HTMLface = `
        <i class="fa-solid fa-bell"></i>
        <div class="container-face">
            <img src="image_book_special/user.jpg">
            <i class="fa-solid fa-right-from-bracket js-log-out"></i>
        </div>
      `;
      alert("đăng nhập thành công!");
      localStorage.setItem("isLoggedIn", "true");
      clearInputLogin();
      loginForm.style.visibility = "hidden";
      body.style.overflowY = "auto";
      face.innerHTML = HTMLface;
      const logOut = document.querySelector(".js-log-out");
      logOut.addEventListener("click", () => {
        const HTMLlog = `
          <div class="sign js-sign">
              Đăng kí
          </div>  
          <div class="login js-login">
              Đăng nhập
          </div>
        `;
        face.innerHTML = HTMLlog;
        window.location.reload();
        localStorage.removeItem("isLoggedIn");
      });
    }
  });
}

export function checkAfterlogin() {
  const userTest = localStorage.getItem("isLoggedIn") === "true";
  if (userTest) {
    const face = document.querySelector(".container-user");
    const HTMLuser = `
            <i class="fa-solid fa-bell"></i>
            <div class="container-face">
                <img src="image_book_special/user.jpg">
                <i class="fa-solid fa-right-from-bracket js-log-out"></i>
            </div>
          `;
    face.innerHTML = HTMLuser;
    const logOut1 = document.querySelector(".js-log-out");
    logOut1.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      window.location.reload();
    });
  }
}