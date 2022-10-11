import { Component, OnInit } from '@angular/core';

import jsonForm from '../assets/form.json';
import { CloudForm } from './interfaces';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Cloud Forms';
  formGroup = new FormGroup({});
  cloudForm: CloudForm[] = jsonForm['form'];
  formValue = "";
  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
      
  }

  submit(){
    if(this.formGroup.valid){
      console.log(this.formGroup.value);
      this.formValue = JSON.stringify(this.formGroup.value);
    }else{
      alert("Please fill the form correctly.");
    }
  }


}
