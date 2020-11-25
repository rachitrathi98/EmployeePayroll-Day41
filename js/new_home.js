let employeePayrollList;

//Event listener when HTML page contents are loaded
window.addEventListener('DOMContentLoaded',(event)=>
    {
        employeePayrollList = GetEmployeeDataLocalStorage();
        document.querySelector('.emp-count').textContent = employeePayrollList.length;
        CreateInnerHTML();
        localStorage.removeItem('EditEmployee');
    }
);

//Get data from local storage
function GetEmployeeDataLocalStorage()
{
    return localStorage.getItem('EmployeePayrollList')?
                    JSON.parse(localStorage.getItem('EmployeePayrollList')):[];
}

//Insert content to the html table using js
function CreateInnerHTML()
{
    const headerHTML = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>"
    let innerHTML = `${headerHTML}`;
    for(const employeePayrollData of employeePayrollList)
    {
        innerHTML = `${innerHTML}       
        <tr>
        <td><img class="profile" alt = "" src="${employeePayrollData._profilePhoto}"></td>
        <td>${employeePayrollData._name}</td>
        <td>${employeePayrollData._gender}</td>
        <td>${GetDepartment(employeePayrollData._department)}</td>
        <td>${employeePayrollData._salary}</td>
        <td>${GetDate(employeePayrollData._startDate)}</td>
        <td>
            <img id="${employeePayrollData._id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
            <img id="${employeePayrollData._id}" onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
        </td>
        </tr>`;
    }
    document.querySelector('#table').innerHTML = innerHTML;
}

//Remove employee from table
function remove(node)
{
    let empData = employeePayrollList.find(emp=>emp._id == node.id);
    if(!empData) return;
    let index = employeePayrollList.map(emp=>emp._id).indexOf(empData._id);
    employeePayrollList.splice(index,1);
    localStorage.setItem('EmployeePayrollList',JSON.stringify(employeePayrollList));
    document.querySelector('.emp-count').textContent = employeePayrollList.length;
    CreateInnerHTML();
}

//Update data
function update(node)
{
    let empData = employeePayrollList.find(emp=>emp._id == node.id);
    if(!empData) return;
    localStorage.setItem('EditEmployee',JSON.stringify(empData));
    window.location.replace("../pages/new_EmpPayroll.html");
}

//Get departments for a employee to display on HTML page
function GetDepartment(deptList)
{
    let departments = '';
    for(const dept of deptList)
    {
        departments = `${departments} <div class='dept-label'>${dept}</div>`
    }
    return departments;
}

//Get date in particular format
function GetDate(startDate)
{
    let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let date = new Date(startDate);
    return date.getDate()+" "+month[date.getMonth()]+" "+date.getFullYear();
}
