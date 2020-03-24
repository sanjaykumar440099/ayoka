import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

//service
import { StoreService } from '../storeService/store.service';
import { LoadingService } from '../../../commonServices/loading.service';

@Component({
  selector: 'app-store-login',
  templateUrl: './store-login.page.html',
  styleUrls: ['./store-login.page.scss'],
})
export class StoreLoginPage implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public loadingService: LoadingService,
    private _store: StoreService
  ) { }
  email: string;
  password: string;
  error: any = '';
  ngOnInit() {
  }

  //login to account
  loginStore() {
    var formData =
      '&email=' + this.email +
      '&password=' + this.password +
      '&flag=' + 'Yes';
    this.loadingService.loadingPresent();
    this._store.loginToStore(formData).pipe(first()).subscribe(response => {
      if (response) {
        if (response.error_warning) {
          const alert = this.alertController.create({
            header: 'Warning',
            message: response.error_warning,
            buttons: ['OK'],
            backdropDismiss: false
          }).then(alert => alert.present());
        }
        this.loadingService.loadingDismiss();
      }
    }, error => {
        const alert = this.alertController.create({
          header: 'Warning',
          message: 'Oops..! Somethig went wrong, please try again.',
          buttons: ['OK'],
          backdropDismiss: false
        }).then(alert => alert.present());
      console.log('Error : ' + JSON.stringify(error));
      this.error = error;
      this.loadingService.loadingDismiss();
    })
  }
}
