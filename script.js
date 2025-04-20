const students = [
    { id: 1, name: "Vignesh R", grade: "A", phone: "98765-43210", attendance: 95, department: "CSE" },
    { id: 2, name: "Rohith S", grade: "B+", phone: "87654-32109", attendance: 88, department: "IT" },
    { id: 3, name: "Gokul M", grade: "A-", phone: "76543-21098", attendance: 92, department: "ECE" },
    { id: 4, name: "Abishragav K", grade: "A+", phone: "65432-10987", attendance: 98, department: "CSE" },
    { id: 5, name: "Mohankumar P", grade: "B", phone: "54321-09876", attendance: 85, department: "MECH" },
    { id: 6, name: "Boobesh V", grade: "A", phone: "43210-98765", attendance: 94, department: "IT" },
    { id: 7, name: "Praveen Kumar", grade: "B-", phone: "99887-76654", attendance: 82, department: "ECE" },
    { id: 8, name: "Vignesh Kumar", grade: "A", phone: "88776-65543", attendance: 96, department: "CSE" },
    { id: 9, name: "Gokul Raj", grade: "C+", phone: "77665-54432", attendance: 78, department: "MECH" },
    { id: 10, name: "Rohith Kumar", grade: "B+", phone: "66554-43321", attendance: 89, department: "IT" }
];

const studentList = document.getElementById("studentList");
const searchInput = document.getElementById("searchInput");
const filterContainer = document.createElement("div");
filterContainer.className = "filter-container";

// Create department filter
const departmentFilter = document.createElement("select");
departmentFilter.innerHTML = `
    <option value="">All Departments</option>
    <option value="CSE">CSE</option>
    <option value="IT">IT</option>
    <option value="ECE">ECE</option>
    <option value="MECH">MECH</option>
`;

// Create sort options
const sortSelect = document.createElement("select");
sortSelect.innerHTML = `
    <option value="name">Sort by Name</option>
    <option value="grade">Sort by Grade</option>
    <option value="attendance">Sort by Attendance</option>
    <option value="department">Sort by Department</option>
`;

filterContainer.appendChild(departmentFilter);
filterContainer.appendChild(sortSelect);
document.querySelector(".container").insertBefore(filterContainer, studentList);

const gradeValues = {
    'A+': 12, 'A': 11, 'A-': 10,
    'B+': 9, 'B': 8, 'B-': 7,
    'C+': 6, 'C': 5, 'C-': 4,
    'D+': 3, 'D': 2, 'F': 1
};

function renderStudents(filter = "", department = "", sortBy = "name") {
    studentList.innerHTML = "";
    
    let filtered = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(filter.toLowerCase()) ||
                            student.grade.toLowerCase().includes(filter.toLowerCase()) ||
                            student.phone.includes(filter) ||
                            student.department.toLowerCase().includes(filter.toLowerCase());
        
        const matchesDepartment = department === "" || student.department === department;
        
        return matchesSearch && matchesDepartment;
    });

    filtered.sort((a, b) => {
        switch(sortBy) {
            case "grade":
                return gradeValues[b.grade] - gradeValues[a.grade];
            case "attendance":
                return b.attendance - a.attendance;
            case "department":
                return a.department.localeCompare(b.department);
            default:
                return a.name.localeCompare(b.name);
        }
    });

    if (filtered.length === 0) {
        studentList.innerHTML = '<div class="no-results">No students found</div>';
        return;
    }

    filtered.forEach(student => {
        const div = document.createElement("div");
        div.className = "student-card";
        
        const gradeClass = student.grade.includes('A') ? 'excellent' :
                          student.grade.includes('B') ? 'good' :
                          student.grade.includes('C') ? 'average' : 'needs-improvement';
        
        div.innerHTML = `
            <div class="student-header">
                <strong>${student.name}</strong>
                <span class="department-badge">${student.department}</span>
            </div>
            <div class="student-details">
                <span class="grade ${gradeClass}">Grade: ${student.grade}</span>
                <span class="phone">📱 ${student.phone}</span>
            </div>
            <div class="attendance-container">
                <div class="attendance-bar">
                    <div class="attendance-fill" style="width: ${student.attendance}%"></div>
                    <span class="attendance-text">Attendance: ${student.attendance}%</span>
                </div>
            </div>
        `;
        
        div.addEventListener('click', () => {
            div.classList.toggle('expanded');
        });
        
        studentList.appendChild(div);
    });
}

searchInput.addEventListener("input", e => {
    renderStudents(e.target.value, departmentFilter.value, sortSelect.value);
});

departmentFilter.addEventListener("change", e => {
    renderStudents(searchInput.value, e.target.value, sortSelect.value);
});

sortSelect.addEventListener("change", e => {
    renderStudents(searchInput.value, departmentFilter.value, e.target.value);
});

// Initial render
renderStudents();