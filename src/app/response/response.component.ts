import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppResponse } from '../interfaces';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ResponseComponent>,@Inject(MAT_DIALOG_DATA) public data: AppResponse,) { }

  ngOnInit(): void {
  }

  onClose(){
    this.dialogRef.close(null);
  }

  next(){
    this.dialogRef.close(this.data.action);
  }
  
  toJsonString(obj: object){
    return JSON.stringify(obj);
  }

}
