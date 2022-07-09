let userForm = document.getElementById("userForm");
let userInput = document.getElementById("userInput");
let listGroup = document.getElementsByClassName("list-group")[0];
let btnAll = document.getElementById("btnAll");
let userList;
let dltBtns = document.getElementsByClassName("dlt-btn");
let listGroupiItemS = document.getElementsByClassName("list-group-item");

let userUpdateForm = document.getElementById("userUpdateForm");
let userUpdateInput = document.getElementById("userUpdateInput");

let usersStorage = JSON.parse(localStorage.getItem("userList"));

if (usersStorage) {
    userList = usersStorage;
} else {
    userList = [];
}

userForm.addEventListener("submit", addNewUser);

userUpdateForm.addEventListener("submit", updateElement);

let updateId = null;
function updateElement(e) {
    e.preventDefault();
    userList[updateId] = userUpdateInput.value;
    localStorage.setItem("userList", JSON.stringify(userList));
    listUser();
}

btnAll.addEventListener("click", function () {
    localStorage.clear();
    listUser();
});

function addNewUser(e) {
    e.preventDefault();
    let inputVal = userInput.value;
    userList.push(inputVal);
    userInput.value = "";
    localStorage.setItem("userList", JSON.stringify(userList));
    listUser();
}

function deleteElement(e) {
    let userId = Number(e.target.parentElement.getAttribute("data-id"));
    userList = userList.filter((value, index) => {
        if (index !== userId) {
            return value;
        }
    });
    localStorage.setItem("userList", JSON.stringify(userList));
    listUser();
}

function selectElement(e) {
    let userId = Number(e.target.getAttribute("data-id"));
    userUpdateInput.value = userList[userId];
    updateId = userId;
}

function listUser() {
    listGroup.innerHTML = "";
    userList = JSON.parse(localStorage.getItem("userList")) || [];
    for (let userId in userList) {
        listGroup.innerHTML += `<li data-id="${userId}" class="list-group-item d-flex justify-content-between">${userList[userId]}  <span  class=" dlt-btn btn btn-danger">X</span></li>`;
    }

    for (let dltBtn of dltBtns) {
        dltBtn.addEventListener("click", deleteElement);
    }
    for (let listGroupItem of listGroupiItemS) {
        listGroupItem.addEventListener("click", selectElement);
    }
}

document.cookie = "token=6ads23123e31;expires=08 July 2022 13:19:50 UTC";

document.addEventListener("DOMContentLoaded", listUser);

let openDetailsBtn = document.getElementById("openDetailsBtn");
let details = document.getElementById("details");

openDetailsBtn.addEventListener("click", function () {
    details.style.transition = "1s linear height";
    details.classList.toggle("openDetail");
});
