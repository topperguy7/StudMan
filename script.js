/*------------------Storage Array--------------------------*/
let students = JSON.parse(localStorage.getItem("students")) || [];

/*--------------------Dropdown-----------------------------*/
const features = document.getElementById("features");
const menu = document.querySelector(".dropdown");

features.addEventListener("click", ()=> {
    menu.classList.toggle("show");
});

/*---------------------modal add---------------------------*/
const add = document.getElementById("add");
const addModal = document.querySelector(".add-modal");
const addform = document.getElementById("add-form");

add.addEventListener("click", ()=> {
    addModal.style.display = "block";
    window.alert("to close modal press on the modal edge");
});

addModal.addEventListener("click", (e)=> { 
    if(e.target === addModal){
        addModal.style.display = "none";
    }
});

addform.addEventListener("submit", (e) => {
    e.preventDefault();

    if(addform.checkValidity()){
        const inputs = addform.querySelectorAll("input");

        const student = {
            name: inputs[0].value.trim(),
            email: inputs[1].value.trim(),
            course: inputs[2].value.trim(),
            sgpa: inputs[3].value.trim()
        };

        students.push(student);

        localStorage.setItem("students", JSON.stringify(students));

        window.alert("Data Saved");
        renderTable();

        addModal.style.display = "none";
        addform.reset();
    }
})

/*----------------------modal-del---------------------------*/
const del = document.getElementById("del");
const delModal = document.querySelector(".del-modal");
const delform = document.getElementById("del-form");

del.addEventListener("click", ()=> {
    delModal.style.display = "block";
    window.alert("to close the modal press on the modal edge");
});

delModal.addEventListener("click", (e)=> { 
    if(e.target === delModal){
        delModal.style.display = "none";
    }
});

delform.addEventListener("submit", (e) => {
    e.preventDefault();

    if(delform.checkValidity()){
        const nametodel = delform.querySelector("input[type='text']").value.trim();
        const emailtodel = delform.querySelector("input[type='email']").value.trim();

        const oglength = students.length;

        students = students.filter(student => 
            !(student.name === nametodel && student.email === emailtodel)
        );

        if(students.length === oglength){
            window.alert("no record found");
        }
        else{
            localStorage.setItem("students", JSON.stringify(students));
            window.alert("record deleted succesfully");
        }

        renderTable();
        delModal.style.display = "none";
        delform.reset();
    }
});

/*----------------------------table---------------------------------*/
const tableBtn = document.getElementById("table");
const tablediv = document.getElementById("table-div");
const stuTable = document.getElementById("stu-table");
const tableBody = stuTable.querySelector("tbody");

tableBtn.addEventListener("click", () => {
    tablediv.scrollIntoView();
});

function renderTable() {

    tableBody.innerHTML = "";

    students.forEach(student => {

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        const emailCell = document.createElement("td");
        emailCell.textContent = student.email;

        const courseCell = document.createElement("td");
        courseCell.textContent = student.course;

        const sgpaCell = document.createElement("td");
        sgpaCell.textContent = student.sgpa;

        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(courseCell);
        row.appendChild(sgpaCell);

        tableBody.appendChild(row);
    });
}

renderTable();

/*------------------------------About----------------------------*/
const about = document.getElementById("about");
const aboutdiv = document.getElementById("about-div");

about.addEventListener("click", () => {
    aboutdiv.scrollIntoView();
});

/*---------------------------Dark Mode---------------------------*/
const themebtn = document.getElementById("toggle-theme");
const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){
    document.body.classList.add("dark");
    themebtn.textContent = "☀️";
}

else{
    themebtn.textContent = "🌙";
}

themebtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themebtn.textContent = isDark ? "☀️" : "🌙" ;
    localStorage.setItem("theme", isDark ? "dark" : "light");
});