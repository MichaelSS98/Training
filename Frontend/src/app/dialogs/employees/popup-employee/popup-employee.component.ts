import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-employee',
  templateUrl: './popup-employee.component.html',
  styleUrls: ['./popup-employee.component.css']
})
export class PopupEmployeeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PopupEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onClickCancel(): void {
    this.dialogRef.close();
  }

}
