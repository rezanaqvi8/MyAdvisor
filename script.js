const schoolSelect = document.getElementById("school");
const semesterSection = document.getElementById("semesterSection")
const termSelect = document.getElementById("termSelect");
const yearInput = document.getElementById("yearInput");
const addSemesterButton = document.getElementById("addSemesterButton");
const planSection = document.getElementById("plan");
const semesterList = document.getElementById("semesterList");

schoolSelect.value = "";

const schools = {
    furman: {
        terms: ["Spring", "MayX", "Summer I", "Summer II", "Summer", "Fall"]
    }
}
function loadTerms(school) {
    termSelect.innerHTML = `
        <option value="" selected disabled>Select a term...</option>
    `;

    const terms = schools[school].terms;

    for (let i = 0; i < terms.length; i++) {
        const option = document.createElement("option");

        option.value = terms[i];
        option.textContent = terms[i];

        termSelect.appendChild(option);

    }
}
schoolSelect.addEventListener("change", function () {

    const school = schoolSelect.value;

    if(school === "") {
        semesterSection.hidden = true;
        planSection.hidden = true;
        return;
    }

    semesterSection.hidden = false;
    planSection.hidden = false;
    loadTerms(school);
});

yearInput.value = "";

let semesters = [];

addSemesterButton.addEventListener("click", function () {
    const term = termSelect.value; 
    const year = Number(yearInput.value);

    if(term === "") {
        alert("Please select a term.")
        return;
    }

    if (year === "") {
        alert("Please enter a year.");
        return;
    }

    if (year < 2020) {
        alert("Please enter a year of 2020 or later.");
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

    const terms = schools[schoolSelect.value].terms;

    semesters.sort(function(a, b) {
    if (a.year !== b.year) {
        return a.year - b.year;
    }

    return terms.indexOf(a.term) - terms.indexOf(b.term);
});

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