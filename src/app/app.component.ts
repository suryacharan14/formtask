import { Component, OnInit } from '@angular/core';

import jsonForm from '../assets/form.json';
import { AppResponse, CloudForm } from './interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError, } from 'rxjs';
import { UrlSerializer } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ResponseComponent } from './response/response.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Moorfields';
  formGroup = new FormGroup({});
  cloudForm: CloudForm[] = jsonForm['form'];
  formValue = '';
  isLoading = false;
  constructor(private fb: FormBuilder, private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {}

  async submit() {
    if (this.formGroup.valid) {
      this.isLoading = true;
      try {
        await this.http
        .get(
          'http://127.0.0.1:8000/validate',
          {params: this.formGroup.value, headers: new HttpHeaders({timeout: '360000'})}
        )
        .forEach((data: any) => {
          this.isLoading = false;
          let res: AppResponse | null = null;
          if(data.message){
            res = {type:"ok", ...data, action: 'add'};
          }else{
            res = {type: "error", ...data};
          }
          this.openDialog(res!);
        });
      } catch (error: any) {
        console.log(error);
        this.isLoading = false;
        this.openDialog({type: "error", error: error.message});
      }
      // this.formGroup.reset();
    } else {
      alert('Please fill the form correctly.');
    }
  }

  handleError(error: HttpErrorResponse) {
    alert(error.message);
    return throwError(() => error);
  }

  openDialog(data: AppResponse){
    let dialogRef = this.dialog.open(ResponseComponent, {
      height: '200px',
      width: '400px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'add'){
        this.addRequest();
      }
    })

  }

  async addRequest(){
    this.isLoading = true;
      try {
        await this.http
        .get(
          'http://127.0.0.1:8000/add',
          {params: this.formGroup.value, headers: new HttpHeaders({timeout: '360000'})}
        )
        .forEach((data: any) => {
          this.isLoading = false;
          let res: AppResponse | null = null;
          if(data.message){
            res = {type:"ok", ...data};
          }else{
            res = {type: "error", ...data};
          }
          this.openDialog(res!);
        });
      } catch (error: any) {
        console.log(error);
        this.isLoading = false;
        this.openDialog({type: "error", error: error.message});
      }
  }
}
