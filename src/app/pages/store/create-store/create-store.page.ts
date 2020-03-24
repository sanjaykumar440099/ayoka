import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertController, ToastController  } from '@ionic/angular';
import { Routes, Router } from "@angular/router";

//service
import { StoreService } from '../storeService/store.service';
import { CommonService } from '../../../commonServices/common.service';
import { LoadingService } from '../../../commonServices/loading.service';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.page.html',
  styleUrls: ['./create-store.page.scss'],
})
export class CreateStorePage implements OnInit {
  public createStoreForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private common: CommonService,
    public alertController: AlertController,
    public loadingService: LoadingService,
    private _store: StoreService,
    public toastController: ToastController,
    private router: Router
  ) {
    this.createStoreForm = formBuilder.group({
      firstname: ['', Validators.required],
      lastname: [''],
      email: [''],
      telephone: [''],
      username: [''],
      password: [''],
      agree: 'yes'
    });
  }

  firstStep: boolean = true;
  seconStep: boolean;
  error: any = '';
  isStoreAvailable: any;
  toast: any;
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

  //check store name availability
  async  checkStoreAvailability() {
    this.loadingService.loadingPresent();
    this.common.checkStoreNameAvailability(this.createStoreForm.value.username).pipe(first()).subscribe(data => {
      if (data.success) {
        const alert = this.alertController.create({
          message: 'Store name is available.',
          header: 'Success',
          buttons: ['OK']
        }).then(alert => alert.present());
        this.isStoreAvailable = data.success;
        this.loadingService.loadingDismiss();
      } else if (data.error) {
        const alert = this.alertController.create({
          header: 'Warning',
          message: 'Store name slready in use.',
          buttons: ['OK'],
          backdropDismiss: false
        }).then(alert => alert.present());
        this.isStoreAvailable = data.error;
        this.loadingService.loadingDismiss();
      }
    },
      error => {
        console.log('Error : ' + JSON.stringify(error));
        this.error = error;
        this.loadingService.loadingDismiss();
      })
  }
  //create store
  createStore() {
    var formData =
      'firstname=' + this.createStoreForm.value.firstname +
      '&lastname=' + this.createStoreForm.value.lastname +
      '&email=' + this.createStoreForm.value.email +
      '&telephone=' + this.createStoreForm.value.telephone +
      '&username=' + this.createStoreForm.value.username +
      '&password=' + this.createStoreForm.value.password +
      '&agree=' + this.createStoreForm.value.agree +
      '&flag=' + 'Yes';
    this.loadingService.loadingPresent();
    this._store.addStoreDetail(formData).pipe(first()).subscribe(response => {
      if (response) {
        if (response.error_warning) {
          const alert = this.alertController.create({
            header: 'Warning',
            message: response.error_warning,
            buttons: ['OK'],
            backdropDismiss: false
          }).then(alert => alert.present());
        } else {
          const alert = this.alertController.create({
            header: 'Success',
            message: 'Store has been created successfully',
            buttons: ['OK'],
            backdropDismiss: false
          }).then(alert => alert.present());
        }
        this.loadingService.loadingDismiss();
      }
    },
      error => {
        this.toast = this.toastController.create({
          color: 'success',
          message: 'Store has been created successfully',
          duration: 2000,
          animated: true
        }).then((toastData) => {
          console.log(toastData);
          toastData.present();
        });
        this.router.navigateByUrl('/store-login');

        console.log('Error : ' + JSON.stringify(error));
        this.error = error;
        this.loadingService.loadingDismiss();
      })
  }

}
