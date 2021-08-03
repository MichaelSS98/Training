import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-popup-project',
  templateUrl: './popup-project.component.html',
  styleUrls: ['./popup-project.component.css']
})
export class PopupProjectComponent implements OnInit {

  project: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PopupProjectComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.project = this.fb.group({
      project_name: ["", Validators.required],
      start_date: new FormControl(new Date(), [Validators.required]),
      planned_end_date: new FormControl(new Date(), [Validators.required]),
      description: ["", Validators.required],
      project_code: ["", Validators.required]
    });
   }

  ngOnInit(): void {
    if (this.data.project_name !== "" && this.data.project_name !== undefined)
    {
      this.project.get('project_name')?.setValue(this.data.project_name);
      this.project.get('start_date')?.setValue(new Date(this.data.start_date));
      this.project.get('planned_end_date')?.setValue(new Date(this.data.planned_end_date));
      this.project.get('description')?.setValue(this.data.description);
      this.project.get('project_code')?.setValue(this.data.project_code);
    }
  };

  get projectName() {
    return this.project.get('project_name');
  }

  get projectStartDate() {
    return this.project.get('start_date');
  }

  get projectPlannedEndDate() {
    return this.project.get('planned_end_date');
  }

  get projectDescription() {
    return this.project.get('description');
  }

  get projectCode() {
    return this.project.get('project_code');
  }

  onClickCancel(): void {
    this.dialogRef.close();
  };

  onClickSubmit(): void {
      this.data.project_name = this.project.get('project_name')?.value;
      this.data.start_date = this.project.get('start_date')?.value.toISOString();
      this.data.planned_end_date = this.project.get('planned_end_date')?.value.toISOString();
      this.data.description = this.project.get('description')?.value;
      this.data.project_code = this.project.get('project_code')?.value;
  };

}
