import { Component, OnInit } from '@angular/core';

import jsonForm from '../assets/form.json';
import { CloudForm } from './interfaces';
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
      let dialogRef; 
      
      try {
        await this.http
        .get(
          'http://127.0.0.1:8000/validate',
          {params: this.formGroup.value, headers: new HttpHeaders({timeout: '2000'})}
        )
        .forEach((data) => {
          this.isLoading = false;
          dialogRef = this.dialog.open(ResponseComponent, {
            height: '200px',
            width: '400px',
            data: {type:"ok", data}
          });
        });
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        dialogRef = this.dialog.open(ResponseComponent, {
          height: '200px',
          width: '400px',
          data: {type: "error", error}
        });
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
}
