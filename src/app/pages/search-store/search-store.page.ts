import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

//services
import { CommonService } from '../../commonServices/common.service';
import { LoadingService } from '../../commonServices/loading.service';

@Component({
  selector: 'app-search-store',
  templateUrl: './search-store.page.html',
  styleUrls: ['./search-store.page.scss'],
})
export class SearchStorePage implements OnInit {

  constructor(
    private common: CommonService,
    public loadingService: LoadingService
  ) { }

  queryText: string;
  filterData: any;
  error: any = '';
  noDataText: boolean = false;
  ngOnInit() {
  }

  //live serach function
  searchByKeyword(event: any) {
    if (event === '') {
      this.filterData = [];
      this.noDataText = false;
    } else {
      this.loadingService.loadingPresent();
      this.common.searchStore(event).pipe(first()).subscribe(data => {
        if (data) {
          this.filterData = data;
          if (this.filterData.length === 0) {
            this.noDataText = true;
          } else {
            this.noDataText = false;
          }
          this.loadingService.loadingDismiss();
        }
      },
        error => {
          console.log('Error : ' + JSON.stringify(error));
          this.error = error;
          this.loadingService.loadingDismiss();
        })
    }
    
  }
}
