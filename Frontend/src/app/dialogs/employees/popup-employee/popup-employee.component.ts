import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-popup-employee',
  templateUrl: './popup-employee.component.html',
  styleUrls: ['./popup-employee.component.css']
})
export class PopupEmployeeComponent implements OnInit {

  projectId: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PopupEmployeeComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.projectId = this.fb.group({
      name: ["", Validators.required],
      project_id: ["", Validators.required],
      adress: ["", Validators.required],
      email: new FormControl("", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      hire_date: new FormControl(new Date(), [Validators.required]),
      salary: new FormControl("", [Validators.required, Validators.pattern('^[0-9]*$')]),
      job_title: ["", Validators.required]
    });
   }

  ngOnInit(): void {

    if (this.data.project_id !== "" && this.data.project_id !== undefined)
    {
      const toSelect = this.data.projectIds.find((e: any) => e.id === this.data.project_id);
      this.projectId.get('project_id')?.setValue(toSelect);
      this.projectId.get('name')?.setValue(this.data.name);
      this.projectId.get('adress')?.setValue(this.data.adress);
      this.projectId.get('email')?.setValue(this.data.email);
      this.projectId.get('salary')?.setValue(this.data.salary);
      this.projectId.get('hire_date')?.setValue(new Date(this.data.hire_date));
      this.projectId.get('job_title')?.setValue(this.data.job_title);
    }
  }

  get employeeName() {
    return this.projectId.get('name');
  }

  get employeeEmail() {
    return this.projectId.get('email');
  }

  get employeeAdress() {
    return this.projectId.get('adress');
  }

  get employeeHireDate() {
    return this.projectId.get('hire_date');
  }

  get employeeSalary() {
    return this.projectId.get('salary');
  }

  get employeeJobTitle() {
    return this.projectId.get('job_title');
  }

  get employeeProjectId() {
    return this.projectId.get('project_id');
  }

  onClickCancel(): void {
    this.dialogRef.close();
  }

  convertDate(): String {
    const myDate = this.projectId.get('hire_date')?.value;
    let dayString = myDate.getDate();
    let monthString = myDate.getMonth() + 1;

    if (myDate.getDate() < 10)
      dayString = "0" + myDate.getDate();

    if (myDate.getMonth() + 1 < 10)
      monthString = "0" + (myDate.getMonth() + 1);
  
    const myDateString = myDate.getFullYear() + "-" + monthString + "-" + dayString;

    return myDateString;
  }

  onClickSubmit(): void {
    this.data.project_id = this.projectId.get('project_id')?.value.id;
    this.data.name = this.projectId.get('name')?.value;
    this.data.adress = this.projectId.get('adress')?.value;
    this.data.email = this.projectId.get('email')?.value;
    this.data.salary = this.projectId.get('salary')?.value;
    this.data.hire_date = this.convertDate();
    this.data.job_title = this.projectId.get('job_title')?.value;
  }

}
