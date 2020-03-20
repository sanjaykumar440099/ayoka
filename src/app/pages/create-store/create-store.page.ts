import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

//service
import { CommonService } from '../../commonServices/common.service';
import { LoadingService } from '../../commonServices/loading.service';

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
    public loadingService: LoadingService
  ) {
    this.createStoreForm = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: [''],
      mobile: [''],
      storeName: [''],
      password: [''],
      planName: [''],
    });
  }

  firstStep: boolean = true;
  seconStep: boolean;
  error: any = '';
  isStoreAvailable: any;
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
    this.common.checkStoreNameAvailability(this.createStoreForm.value.storeName).pipe(first()).subscribe(data => {
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
    this.createStoreForm.value;
  }

}
