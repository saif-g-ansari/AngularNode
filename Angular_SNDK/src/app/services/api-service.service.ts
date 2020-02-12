import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiServiceService {
    image: any;

    constructor(private http: HttpClient) {
    }

    createAuthorizationHeader() {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    createAuthorizationHeaderForFileUpload() {
        let header: HttpHeaders = new HttpHeaders();
        header = header.append('Content-Type', 'multipart/form-data');
        header = header.append('Authorization', 'Basic YXBpXzZFUkVzWHNEZEdReWM5eTQ6QjJkQ3RpekdFRUVtZWRJT09iWjgyQjZsRDJYMkF5NkROa2FpX3R0VlRfZw==');
        return header;
    }

    public async get(url) {
        const header = this.createAuthorizationHeader();
        const delayType = 'all';
        const request = await this.http.get(url, { headers: header }).toPromise().catch(this.handleErrorObservable);
        // .subscribe(this.extractData);
        return request;
    }

    public getNew(url) {
        const header = this.createAuthorizationHeader();
        const delayType = 'all';
        const request = this.http.get(url, { headers: header }).subscribe(
            data => {},
            error => {});
        // .subscribe(this.extractData);
        return request;
    }

    // getConfig() {
    //     return this.http.get<any>(this.configUrl)
    //       .pipe(
    //         retry(3), // retry a failed request up to 3 times
    //         catchError(this.handleError) // then handle the error
    //       );
    //   }

    public async put(url, data) {
        const headers = this.createAuthorizationHeader();
        const ttl = 5;
        const delayType = 'all';
        const cacheKey = url + JSON.stringify(data);
        const request = await this.http.put(url, data, { headers: headers }).toPromise().catch(this.handleErrorObservable);
        return request;
    }

    public async post(url, data) {
        console.log('api : ' + url);
        console.log('Data : ' + JSON.stringify(data));
        const headers = this.createAuthorizationHeader();
        const request = await this.http.post(url, data, { headers: headers }).toPromise().catch(this.handleErrorObservable);
        return request;
    }

    handleErrorObservable(error: Response | any) {
        console.log('error', error);
        console.error(error.message || error);
        var response = error.message || error;
        let responseJson = { is_error: true, message: response };
        return responseJson;
    }


    public async post_without_cache(url, data) {
        const headers = this.createAuthorizationHeader();
        const request = await this.http.post(url, data, { headers: headers }).toPromise().catch(this.handleErrorObservable);
        return request;
    }

    public async post_FileUpload(url, data) {
        const header = this.createAuthorizationHeaderForFileUpload();
        console.log('data', data);
        console.log('headers', header);
        const request = await this.http.post(url, data, { headers: header }).toPromise().catch(this.handleErrorObservable);
        return request;
    }

    public async post_ImageUpload(url, data) {
        // const header = this.createAuthorizationHeaderForFileUpload();
        console.log('data', data);
        const request = await this.http.post(url, data).toPromise().catch(this.handleErrorObservable);
        return request;
    }

    public async delete_with_data(url, data) {
        const headers = this.createAuthorizationHeader();
        return await this.http.request('delete', url, { body: data });
    }

    public async delete(url) {
        const headers = this.createAuthorizationHeader();
        return await this.http.delete(url, { headers: headers }).toPromise().catch(this.handleErrorObservable);
    }

    public async getPDf(url) {
        let headers = new HttpHeaders();
        headers = headers.set('accept', 'application/pdf');
        return this.http.get(url, { headers: headers, responseType: 'blob' });
    }

}
