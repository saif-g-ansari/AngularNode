import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { config } from '../constant';
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';

@Injectable()
export class CommonService {

    loading: any;
    Templates: {};
    closeResult: string;
    Patient: any;
    // msgs: Message[] = [];
    // spinnerShow: boolean;

    constructor(public apiService: ApiServiceService) {

    }

    basicAlert(message) {
        //let alert = this.alertCtrl.create({
        //    subTitle: message,
        //    buttons: ['OKAY']
        //});
        //alert.present();
        console.log('Alert ==> ' + message);
    }

    showSuccess(message) {
        // this.messageService.add({ severity: 'success', summary: 'Success!', detail: message });
    }

    showError(message) {
        // this.messageService.add({ severity: 'error', summary: 'Oops!', detail: message });
    }

    showLoader() {
        // this.spinnerShow = true;
        // if (this.loading == null) {
        //     this.loading = this.loadingCtrl.create({
        //         content: this.PleaseWait
        //     });
        //     this.loading.present();
        // }
        // this.spinnerService.show();
    }

    dismissLoader() {
        // this.spinnerShow = false;
        // this.spinnerService.hide();
        // if (this.loading != null) {
        //     this.loading.dismiss();
        //     this.loading = null;
        // }
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    Onlynumber(event: any) {
        const pattern = /[0-9]/g;

        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    OnlyAlphabets(event: any) {
        const pattern = /[a-zA-Z ]/g;

        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    async ImageUpload(Imagedata) {
        console.log('Imagedata', Imagedata);
        this.showLoader();
        const response = await this.apiService.post_ImageUpload(config.API_URL + config.UPLOADIMAGE, Imagedata);
        const result = JSON.parse(JSON.stringify(response));
        this.dismissLoader();
        if (!result.is_error) {
            const objimage = result.data;
            this.showSuccess('Image Upload Successfully.');
            return objimage;
        } else {
            this.showError(result.message);
            return null;
        }
    }

    async FileTemplateUpload(Filedata) {
        console.log('Filedata', Filedata);
        this.showLoader();
        const response = await this.apiService.post_FileUpload('https://app.formapi.io/api/v1/templates', Filedata);
        const result = JSON.parse(JSON.stringify(response));
        this.dismissLoader();
        if (!result.is_error) {
            const objimage = result.data;
            this.showSuccess(result.message);
            return objimage;
        } else {
            this.showError(result.message);
            return null;
        }
    }
}