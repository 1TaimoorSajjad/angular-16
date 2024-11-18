import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FundingSourceService } from 'src/app/services/fundingsource/funding-source.service';
import { imageProcessing, ImageSnippet } from 'src/app/utils/image-processing-utils';
import { sweetAlert } from 'src/app/utils/swal';
import { getAddressDetails} from "../../../../utils/utils.common";

@Component({
  selector: 'app-add-funding-sources',
  templateUrl: './add-funding-sources.component.html',
  styleUrls: ['./add-funding-sources.component.css']
})
export class AddFundingSourcesComponent implements OnInit, OnDestroy {
  fundingSourceForm !: FormGroup;
  submitted : boolean = false;
  profileImageURL = null;
  selectedFile: ImageSnippet | null = null;
  passwordType = "password";
  passwordToggleFlag = true;
  fundingSourceId:any;
  private destroy$ = new Subject<void>();

constructor(
  private router: Router,
  private activatedRoute: ActivatedRoute,
  private fundingSourceService : FundingSourceService,
  private fb: FormBuilder
){}

  ngOnInit(){
    this.activatedRoute.params
    .subscribe((params) => {
      this.fundingSourceId = params["id"];
    });

    this.fundingSourceForm = this.fb.group({
      displayName: ["", [Validators.required, Validators.minLength(3)]],
      contactNumber: ["", Validators.required],
      tollFreeNumber: ["", Validators.required],
      address: ["", Validators.required],
      accountStatus: ["", Validators.required],
      // associateTo: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required,Validators.minLength(6), Validators.maxLength(16),],],
      latitude: ["", Validators.required],
      longitude: ["", Validators.required],
      corporateUserId: [""],
      images: [""],
      company: [""],
      showScheduleTime: [false],
      priority: ["",Validators.required],
      requiredOdometers: [0],
      takeSignaturesOnly:[false],
      requireForm837:[false],
      displayMode:['signature'],
      companyType:[''],

      focalPerson: this.fb.group({
        personeNameOne: [ "" ],
        personNumberOne: [ "" ],
        personeNameTwo: [ "" ],
        personNumberTwo: [ "" ]
      }),
      homeAddress: this.fb.group({
        aptOrSuite: [""],
        zipCode: [""],
        state: [""],
        city: [""],
        street: [""]
      }),
    });

    if(this.fundingSourceId)
      this.getFundingSourceById(this.fundingSourceId);
  }

  get form() {
    return this.fundingSourceForm.controls;
  }

  getFundingSourceById(id:any) {
    this.fundingSourceService.getFundingSourceUserById(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      if (data) {
        this.fundingSourceForm.patchValue({
          ...data,
          password: "",
          // company: this.user._id,
        });
        this.profileImageURL = data.profileImageURL;

      }
      // this.addNewCorporateUser.get('password').clearValidators();
      // this.addNewCorporateUser.get('password').updateValueAndValidity();

    });
  }

  processFile(imageInput: any) {
    imageProcessing(imageInput)
    .subscribe((result) => {
      this.selectedFile = result.file;
      this.profileImageURL = result.src;
    });
  }

  togglePasswordType() {
    this.passwordType = this.passwordToggleFlag ? "text" : "password";
    this.passwordToggleFlag = !this.passwordToggleFlag;
  }

  toggleSignature() {
    // this.addNewCorporateUser.patchValue({
    //   takeSignaturesOnly: !this.addNewCorporateUser.value.takeSignaturesOnly
    // });
  }

  toggleForm837(){
    // this.addNewCorporateUser.patchValue({
    //   requireForm837: !this.addNewCorporateUser.value.requireForm837
    // });

  }

  getAddress(place:any) {
    const addressDetails = getAddressDetails(place);
    this.fundingSourceForm.patchValue({
      address: place.formatted_address,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
      homeAddress: {
        ...addressDetails
      }
    });
  }

  addNewFundingSource() {
     this.submitted = true;
    if (this.fundingSourceForm.invalid) {
      return;
    } else if (this.selectedFile == null && this.profileImageURL == null) {
      return;
    } else {
      const image = {
        newProfilePicture: this.selectedFile,
      };

      // console.clear();
      // return;

      if (!this.fundingSourceId) {
        this.fundingSourceForm.patchValue({
          images: image,
        });
        this.savefundingSource(this.fundingSourceForm.value);
        // this.store.dispatch(new AddCorporateUser(this.addNewCorporateUser.value));
      } else {
        // delete this.addNewCorporateUser.value.password;
        this.fundingSourceForm.patchValue({
          corporateUserId: this.fundingSourceId,
          images: image,
        });
        const payload = this.fundingSourceForm.value;

        if (this.fundingSourceId) {
          if (this.fundingSourceForm.value.password === '') {
            delete payload.password;
          }
          this.savefundingSource(payload);
        }


      }
    }
  }

  savefundingSource(payload:any) {
    this.fundingSourceService.addFundingSourceUser(payload)
    .subscribe(
      (data) => {
        if (data) {
          this.submitted = false;
          this.router.navigateByUrl('credentialing/fundingsource');
        }
      },
      (err) => {
        sweetAlert("Error", err, "error", "Ok");
      }
    );
  }

  ngOnDestroy(){
    
  }

}
