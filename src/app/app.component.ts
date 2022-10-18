import { Component, OnInit } from '@angular/core';

import jsonForm from '../assets/form.json';
import { CloudForm } from './interfaces';
import {FormBuilder, FormGroup} from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'MoorFields';
  formGroup = new FormGroup({});
  cloudForm: CloudForm[] = jsonForm['form'];
  formValue = "";
  constructor(private fb: FormBuilder, private http: HttpClient){}

  ngOnInit(): void {
      
  }

  submit(){
    if(this.formGroup.valid){
      console.log(this.formGroup.value);
      this.formValue = JSON.stringify(this.formGroup.value);
      try {
        this.http.post('http://127.0.0.1:8000/validate', this.formValue).pipe(catchError(this.handleError)).subscribe(data => alert(JSON.stringify(data)));
      } catch (error) {
        alert(error);
      }
    }else{
      alert("Please fill the form correctly.");
    }
  }

  handleError(error: HttpErrorResponse){
    alert(error.message);
    return throwError(() => error);
  }


}
