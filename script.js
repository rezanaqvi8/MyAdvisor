const termSelect = document.getElementById("termSelect");
const yearInput = document.getElementById("yearInput");
const addSemesterButton = document.getElementById("addSemesterButton");
const semesterList = document.getElementById("semesterList");

let semesters = [];

addSemesterButton.addEventListener("click", function () {
    const term = termSelect.value; 
    const year = yearInput.value;

    const termOrder = {
        "Fall": 1, 
        "Spring": 2, 
        "MayX": "3", 
        "Summer I": 4, 
        "Summer II": 5, 
        "Summer": 6
    };

    if (year === "") {
        alert("Please enter a year.");
        return;
    }
    if (year < 2020) {
        alert("Please enter a year later than 2020.");
        return;
    }

    //Check for duplicates
    for (let i = 0; i < semesters.length; i++) 
    {
        if (semesters[i].term === term && semesters[i].year === year) 
        {
            alert("That semester has already been added.");
            return;
        }
    }

    const semester = {
        term: term,
        year: year,
        courses: []
    };

    semesters.push(semester);

    displaySemesters();
});

function displaySemesters() {
    semesterList.innerHTML = "";
    for (let i = 0; i < semesters.length; i++) {
        const semester = semesters[i];

        const semesterBox = document.createElement("div"); 

        semesterBox.innerHTML = `
            <h3>${semester.term} ${semester.year}</h3>
            <p>No Courses Found.</p>
        `;

        semesterList.appendChild(semesterBox);
    }
}