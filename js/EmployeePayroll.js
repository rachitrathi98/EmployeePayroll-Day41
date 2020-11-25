class EmployeePayroll
{
    get Id(){return this._id}
    set Id(Id)
    {this._id = Id;}

    get Name() {return this._name}
    set Name(Name) 
    {
        let regex_Name = RegExp("^[A-Z]{1}[A-Za-z]{2,}$");
        if(regex_Name.test(Name))
            this._name = Name;
        else
            throw "Name is invalid";
    }

    get ProfilePhoto() {return this._profilePhoto}
    set ProfilePhoto(ProfilePhoto) {this._profilePhoto = ProfilePhoto}

    get Gender() {return this._gender}
    set Gender(Gender) {this._gender = Gender}

    get Department() {return this._department}
    set Department(Department) {this._department = Department}

    get Salary() {return this._salary}
    set Salary(Salary) {this._salary = Salary}

    get StartDate() {return this._startDate}
    set StartDate(StartDate) {
        if(StartDate < new Date())
            this._startDate = StartDate;
        else
            throw "Date is invalid"
    }

    get Notes() {return this._notes}
    set Notes(Notes) {this._notes = Notes}
}