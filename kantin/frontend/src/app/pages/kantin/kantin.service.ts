import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { HttpUtilService } from './http.util';
import {MenuKantin} from './kantin.model';

@Injectable()
export class MenuKantinService{
    constructor(private httpUtil:HttpUtilService){}

    public getAll(){
        return this.httpUtil.httpGet('/getAll',null,null);
    }
    public getOne(id:string){
        return this.httpUtil.httpGet('/kantinCrud/{id}',null,{"id":id});
    }
    public delete(id:string){
        return this.httpUtil.httpDelete('/kantinCrud/{id}',null,{"id":id});
    }
    public save(o:MenuKantin){
        return this.httpUtil.httpPost('/kantinCrud',o);
    }
    public update(o:MenuKantin){
        return this.httpUtil.httpPut('/kantinCrud',o);
    }


}