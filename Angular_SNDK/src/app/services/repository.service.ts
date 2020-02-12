import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { config } from '../constant';
import { CommonService } from './common.service';
import { ConfirmationService } from 'primeng/api';

@Injectable()
export class RepositoryService {


    constructor(public apiService: ApiServiceService, public common: CommonService, public confirmationService: ConfirmationService) { }

    async Delete(Modelname, id, msgname) {
        return new Promise((resolve, reject) => {
            this.confirmationService.confirm({
                message: 'Are you sure want to delete?',
                header: 'Delete',
                icon: 'fa fa-info-circle',
                accept: async () => {
                    var model = await this.DeleteModel(Modelname, id, msgname);
                    resolve(model);
                },
                reject: () => {
                    resolve(null);
                }
            });
        });
    }

    async DeleteModel(Modelname, id, msgname) {
        const response = await this.apiService.delete(config.API_URL + config.SOFT + Modelname + '/' + id);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            const objItem = result.data;
            this.common.showSuccess(msgname + ' deleted successfully');
            return objItem;
        } else {
            this.common.showError(result.message);
            return null;
        }
    }

    async GetDataByID(modelname, ID) {
        const response = await this.apiService.get(config.API_URL + modelname + '/' + ID);
        const result = JSON.parse(JSON.stringify(response));
        return result.data;
    }

    async GetData(modelname) {
        const response = await this.apiService.get(config.API_URL + modelname);
        const result = JSON.parse(JSON.stringify(response));
        return result.data;
    }

    async GetQueryData(modelname, data) {
        const users = await this.apiService.post_without_cache(config.API_URL + config.QUERYEXE + modelname, data);
        const result = JSON.parse(JSON.stringify(users));
        return result.data;
    }

    async SaveQueryData(modelname, data, msgname) {
        this.common.showLoader();
        var response: Object | {
            is_error: boolean;
            message: any;
        }
        if (data.id) {
            response = await this.apiService.post_without_cache(config.API_URL + modelname + '/' + data.id, data);
        }
        else {
            response = await this.apiService.put(config.API_URL + modelname, data);
        }
        const result = JSON.parse(JSON.stringify(response));
        this.common.dismissLoader();
        if (!result.is_error) {
            const objData = result.data;
            if (data.id) {
                this.common.showSuccess(msgname + ' updated successfully');
            }
            else {
                this.common.showSuccess(msgname + ' added successfully');
            }
            return objData;
        } else {
            this.common.showError(result.message);
            return null;
        }
    }

}
