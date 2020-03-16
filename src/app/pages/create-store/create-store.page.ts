import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.page.html',
  styleUrls: ['./create-store.page.scss'],
})
export class CreateStorePage implements OnInit {
  public createStoreForm: FormGroup;
  constructor(public formBuilder: FormBuilder) {
    this.createStoreForm = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: [''],
      mobile: [''],
    });
  }

  firstStep: boolean = true;
  seconStep: boolean;

  ngOnInit() { }

  //forms steps
  goToNextStep(level: string) {
    if (level === 'second') {
      this.seconStep = true;
      this.firstStep = false;
    } else if (level === 'first') {
      this.seconStep = false;
      this.firstStep = true;
    }
  }

}
