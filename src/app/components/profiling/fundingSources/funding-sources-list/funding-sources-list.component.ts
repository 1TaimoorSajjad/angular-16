import { Component, OnDestroy, OnInit } from '@angular/core';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Subject, takeUntil } from 'rxjs';
import { FundingSourceService } from 'src/app/services/fundingsource/funding-source.service';
import { SharedDataService } from 'src/app/services/shared-service/shared-data.service';
import { sweetAlert } from 'src/app/utils/swal';
@Component({
  selector: 'app-funding-sources-list',
  templateUrl: './funding-sources-list.component.html',
  styleUrls: ['./funding-sources-list.component.css']
})
export class FundingSourcesListComponent implements OnInit, OnDestroy {
  status = "active";
  search:any;
  isList = false;
  isMapper = false;
  user: any;
  fundingSourceList = [];
  private destroy$ = new Subject<void>();

  constructor(
    private fundingSourceService : FundingSourceService,
    private sharedDataService: SharedDataService
  ) {

  }

  ngOnInit() {
    this.getUser();
    this.getFundingSource();
  }

  getUser() {
    this.sharedDataService.getUser()
      .subscribe((user) => {
        if (user) {
          this.user = user;
       
        }
      });
  }

  getFundingSource() {
    this.fundingSourceList = [];
    this.fundingSourceService
      .getFundingSourceUsers(this.status)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        console.log('data', data);
        if (data && data.length) {
          this.fundingSourceList = data;
        }
      }, err => {
        sweetAlert('Error', err, 'warning', 'OK');
      });
  }

  onChangeStatus() {
   this.getFundingSource();
  }

  onChangeView(view: any) {
    if (view == 'list') {
      this.isList = true;
    }
    else if (view == 'mapper') {
      this.isMapper = true;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}


