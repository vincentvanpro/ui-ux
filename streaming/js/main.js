let loginBtn = document.getElementById("loginBtn");
let accountBtn = document.getElementById("accountBtn");

if(loginBtn) {
loginBtn.onclick = function openLoginPage() {
        location.href = "login.html";
    };
}

if(accountBtn) {
document.getElementById("accountBtn").onclick = function openAccount() {
        location.href = "account.html";
    };
}


function setPictureYellow() {
    document.getElementById("profile-dropdown-pic").src = '../images/icons/yellow profile icon.png'
}

function setPictureWhite() {
    document.getElementById("profile-dropdown-pic").src = '../images/icons/white profile icon.png'
}
