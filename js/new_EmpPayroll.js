let isUpdate = false;
let empPayrollObject = {}; 

window.addEventListener('DOMContentLoaded',(event)=>
{
    //Event listener for salary
    const salary=document.querySelector('#salary');
    const output=document.querySelector('.salary-output-text');
        output.textContent=salary.value;
        salary.addEventListener('input',function(){
            output.textContent=salary.value;
        })

    //Event listener for name field
    const name=document.querySelector('#name');
    const nameError=document.querySelector('.name-error');
    name.addEventListener('input', function(){
        try{
            (new EmployeePayroll()).Name = name.value;
            nameError.textContent="";
        }
        catch(e)
        {
            nameError.textContent = e; 
        }
    });
    const date=document.querySelector('#date');
    date.addEventListener('input',function()
    {
        const startDate = new Date(document.querySelector('#year').value+"-"+document.querySelector('#month').value+"-"+document.querySelector('#day').value);
        const dateError = document.querySelector('.date-error');
        try{
            (new EmployeePayroll()).StartDate = startDate;
            dateError.textContent="";
        }
        catch(e)
        {
            dateError.textContent = e; 
        }
    });
    CheckUpdate();
});

//On press of submit button
function save(event)
{
    event.preventDefault();
    event.stopPropagation();
    try
    {
        CreateAndUpdateStorage(); 
        Reset();  
        window.location.replace("../pages/new_home.html")
    }
    catch(e)
    {
        alert(e);
    }
}

//// Save data to local HTML Storage
function CreateAndUpdateStorage()
{
    let employeeList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    
    if(employeeList != undefined)
    {
        let empData = employeeList.find(item=>item._id == empPayrollObject._id);
        if(!empData)
        {
            employeeList.push(CreateNewEmployee());
        }
        else
        {
            let index = employeeList.map(data=>data._id).indexOf(empData._id);
            employeeList.splice(index,1,CreateNewEmployee(empData._id)); 
        }          
    }
    else
    {
        employeeList = [CreateNewEmployee()];
    }
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeeList));
}

//Create new EmployeePayroll object
const CreateNewEmployee = (id)=>
{
    let employee = new EmployeePayroll();
    if(!id)employee.Id = GetNewId();
    else employee.Id = id;
    SetEmployeePayrollObject(employee);
    return employee;
}
//Set the objects with values from the form
function SetEmployeePayrollObject(employee)
{
    employee.Name = document.getElementById('name').value; 
    empPayrollObject._name = employee.Name;  

    let profile = document.getElementsByName('profile');       
    for(i = 0; i < profile.length; i++)
    {
        if(profile[i].checked)
            employee.ProfilePhoto = profile[i].value;
    }  
    empPayrollObject._profilePhoto = employee.ProfilePhoto;

    let gender = document.getElementsByName('gender');
    for(i = 0; i < gender.length; i++)
    {
        if(gender[i].checked)
            employee.Gender = gender[i].value;
    } 
    empPayrollObject._gender = employee.Gender;

    let empDepartment = new Array();
    let department = document.getElementsByName('department');
    for(i = 0; i < department.length; i++)
    {
        if(department[i].checked)
            empDepartment.push(department[i].value);
    } 
    employee.Department = empDepartment;
    empPayrollObject._department = empDepartment;

    employee.Salary = document.getElementById('salary').value; 
    empPayrollObject._salary = employee.Salary;
    
    let startDate = new Date(document.querySelector('#year').value+"-"+document.querySelector('#month').value+"-"+document.querySelector('#day').value);
    employee.StartDate = startDate;
    empPayrollObject._startDate = startDate;

    employee.Notes = document.querySelector('#notes').value;
    empPayrollObject._notes = employee.Notes; 
}

//Get id method
function GetNewId()
{
    let empId = localStorage.getItem('EmployeeID');
    empId = !empId ? 1:(parseInt(empId)+1).toString();
    localStorage.setItem('EmployeeID',empId);
    return empId;
}

//Reset form on click of reset button
function Reset()
{
    document.querySelector('#name').value = '';
    document.querySelector('.name-error').textContent = '';
    document.querySelectorAll('[name=profile]').forEach(a=>{a.checked = false;});
    document.querySelectorAll('[name=gender]').forEach(a=>{a.checked = false;});
    document.querySelectorAll('[name=department]').forEach(a=>{a.checked = false;});
    document.querySelector('#salary').value = '400000';
    document.querySelector('.salary-output-text').value='400000';
    document.querySelector('#day').value = '1';
    document.querySelector('#month').value = 'January';
    document.querySelector('#year').value = '2016';
    document.querySelector('#notes').value = '';
}

//Check for update
function CheckUpdate()
{
    let empUpdate = localStorage.getItem('EditEmployee');
    isUpdate = empUpdate?true:false;
    if(!isUpdate) return;
    empPayrollObject = JSON.parse(empUpdate);
    SetForm();
}

//Set the form if update is true
function SetForm()
{
    document.querySelector('#name').value = empPayrollObject._name;
    document.querySelector('.name-error').textContent = '';
    SetSelectedValues('[name=profile]',empPayrollObject._profilePhoto);
    SetSelectedValues('[name=gender]',empPayrollObject._gender);
    SetSelectedValues('[name=department]',empPayrollObject._department);
    document.querySelector('#salary').value = empPayrollObject._salary;
    document.querySelector('.salary-output-text').value = empPayrollObject._salary;
    document.querySelector('#notes').value = empPayrollObject._notes;
    SetDate(empPayrollObject._startDate);
}

function SetSelectedValues(property,value)
{
    document.querySelectorAll(property).forEach(item=>
    {
        if(Array.isArray(value))
        {
            if(value.includes(item.value))
                item.checked = true;
        }
        else if(item.value == value)
        {
            item.checked = true;
        }
    });    
}

function SetDate(startDate)
{
    let date = new Date(startDate);
    let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    document.querySelector('#day').value = date.getDate();
    document.querySelector('#month').value = month[date.getMonth()];
    document.querySelector('#year').value = date.getFullYear();
}