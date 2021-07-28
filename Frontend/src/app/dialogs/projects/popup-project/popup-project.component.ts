import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-project',
  templateUrl: './popup-project.component.html',
  styleUrls: ['./popup-project.component.css']
})
export class PopupProjectComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PopupProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onClickCancel(): void {
    this.dialogRef.close();
  }

}
