import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-employee-dialog',
  templateUrl: './delete-employee-dialog.component.html',
  styleUrls: ['./delete-employee-dialog.component.css']
})
export class DeleteEmployeeDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) { }

  ngOnInit(): void {
  }

  onClickCancel(): void {
    this.dialogRef.close();
  }

}
