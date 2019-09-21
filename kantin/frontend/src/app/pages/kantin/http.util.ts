import {Injectable, Inject} from "@angular/core";
import {Response, Http, RequestOptions, Headers, ResponseContentType} from "@angular/http";
import {Observable} from "rxjs/Rx";


declare let _:any;

@Injectable()
export class HttpUtilService {
    private hostUrl:string;

    constructor(private _http: Http){
        this.hostUrl = 'http://localhost:5002';
    }

    httpGet(servicePath:string, queryParameter?:string, params?: any):Observable<any> {
            let serviceUrlFromCode = this.hostUrl+servicePath;
            if(servicePath){
                if (queryParameter) {
                    serviceUrlFromCode = serviceUrlFromCode + queryParameter;
                }
                if(params) serviceUrlFromCode = this.replaceParam(serviceUrlFromCode, params);
                return this._http.get(serviceUrlFromCode)
                    .map((resp)=>this.extractData(resp))
                    .catch((err)=>this.handleError(err))
            }else{
                return this.handleError({status: 404});
            }
    }

    httpDelete(servicePath:string, queryParameter?:string, params?: any):Observable<any> {
        let serviceUrlFromCode = this.hostUrl+servicePath;
        if(servicePath){
            if (queryParameter) {
                serviceUrlFromCode = serviceUrlFromCode + queryParameter;
            }
            if(params) serviceUrlFromCode = this.replaceParam(serviceUrlFromCode, params);
            return this._http.delete(serviceUrlFromCode)
                .map((resp)=>this.extractData(resp))
                .catch((err)=>this.handleError(err))
        }else{
            return this.handleError({status: 404});
        }
}


    httpPost(servicePath:string, payload:any):Observable<any> {
            let serviceUrlFromCode = this.hostUrl + servicePath;
            if(serviceUrlFromCode){
                return this._http.post(serviceUrlFromCode, payload)
                    .map((resp)=>this.extractData(resp))
                    .catch((err)=>this.handleError(err));
            }else{
                return this.handleError({status: 404});
            }
    }

    httpPut(servicePath:string, payload:any):Observable<any> {
        let serviceUrlFromCode = this.hostUrl + servicePath;
        if(serviceUrlFromCode){
            return this._http.put(serviceUrlFromCode, payload)
                .map((resp)=>this.extractData(resp))
                .catch((err)=>this.handleError(err));
        }else{
            return this.handleError({status: 404});
        }
}

    
    generateUrl(servicePath: string, params?: any) {
        let serviceUrlFromCode = this.hostUrl+servicePath;
        if(params) serviceUrlFromCode = this.replaceParam(serviceUrlFromCode, params);

        return serviceUrlFromCode;
    }




    extractData(response:Response) {
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Bad response status: ' + response.status);
        }
        let body = response.json();
        return body || {};
    }

    replaceParam(serviceUrlFromCode: string, params: any){
        if(!params){
            this.handleError({status: 400, message: 'params not valid'});
        }else{
            for(var keyParam in params){
                serviceUrlFromCode = serviceUrlFromCode.replace('{'+keyParam+'}',params[keyParam]);
            }
            return serviceUrlFromCode;
        }
    }
    
    private handleError(error: any) {
        console.log('handleError',error);
        return Observable.throw({errorCode: error.status, errorMessage: error.message});
    }

}