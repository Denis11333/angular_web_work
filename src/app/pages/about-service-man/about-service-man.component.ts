import {Component, OnInit} from '@angular/core';
import {ServiceManService} from "../../services/service-man.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {environment} from "../../../environments/environment.development";
import {IServiceMan} from "../../models/service-man";


@Component({
    selector: 'app-about-service-man',
    templateUrl: './about-service-man.component.html',
    styleUrls: ['./about-service-man.component.css'],
})
export class AboutServiceManComponent implements OnInit {
    constructor(public serviceManService: ServiceManService,
                public route: ActivatedRoute, private router: Router) {
    }

    form = new FormGroup({
        fullName: new FormControl(''),
        rank: new FormControl(''),
        position: new FormControl(''),
        dateOfBirth: new FormControl(''),
        nationality: new FormControl(''),
        religiousBeliefs: new FormControl(''),
        placeOfBirth: new FormControl(''),
        sex: new FormControl(''),
        maritalStatus: new FormControl(''),
        phoneNumber: new FormControl(),
        dataOfEntryIntoMilitaryService: new FormControl(''),
        specialty: new FormControl(''),
        qualification: new FormControl(''),
        militaryTicketNumber: new FormControl(),
        passportNumber: new FormControl(),
        financialSupport: new FormControl(),
     });

    selectedFile: File

    onFileSelected(event: any) {
        this.selectedFile = <File>event.target.files[0]
    }



    isLoading = false

    ngOnInit(): void {
        this.isLoading = true
        let serviceManId = this.route.snapshot.params.id

        this.serviceManService.getServiceManById(serviceManId)
            .subscribe(() => {
                if (this.serviceManService.currentServiceMan === null) {
                    this.router.navigate(['/my-units'])
                }

                this.form.patchValue({...this.serviceManService.currentServiceMan});

                this.isLoading = false;
            })

    }

    saveServiceMan() {
        const formData = new FormData();

        if (this.selectedFile) {
            formData.append('image', this.selectedFile, this.selectedFile.name)
        }

        console.log(this.form.value)

        Object.entries({...this.serviceManService.currentServiceMan, ...this.form.value} as IServiceMan).forEach(([key, value]) => {
            if (key === 'unit') {
                formData.append(key, value.id)
            }  else {
                formData.append(key, value);
            }
        });

        this.serviceManService.editServiceMan(formData).subscribe()
    }

    deletePhoto(){
        this.serviceManService.deletePhoto({...this.serviceManService.currentServiceMan,...this.form.value} as IServiceMan).subscribe(() => {
            this.serviceManService.currentServiceMan.image = ''
        })
    }


    protected readonly environment = environment;
}
