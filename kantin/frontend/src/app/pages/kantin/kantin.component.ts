import {Component,OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {MenuKantin} from './kantin.model';
import {MenuKantinService} from './kantin.service';


let alertify = require("../../../public/js/alertify");
declare let $:any;

@Component({
    selector: 'kantin.component',
    templateUrl: 'kantin.component.html',
    styleUrls:['kantin.component.css']
})

export class KantinCrud implements OnInit{
    private items:MenuKantin[];
    private selectedItem:MenuKantin;
    private modalTitle:string;
    private btnStatus:number=0;
    
    


    constructor(private service:MenuKantinService){}

    ngOnInit(){
        this.selectedItem = new MenuKantin();
        this.retrieveDatas();
    }

    retrieveDatas(){
        this.service.getAll().subscribe(x=>{this.items=x;});
    }

    onAddModal(){
        this.selectedItem = new MenuKantin();
        this.btnStatus = 0;
        this.modalTitle = "Form Add Menu";
        $('#myModal').modal('show');
    }
    onEditModal(o:MenuKantin){
        this.btnStatus = 1;
        this.selectedItem = o;
        $('#myModal').modal('show');
    }
    onDeleteModal(o:MenuKantin){
        this.selectedItem = o;
        $('#modalHapus').modal('show');
    }
    doSave(){

        if (this.validasiInputHarga() && this.mandatoryValidation()) {
            this.service.save(this.selectedItem).subscribe(x=>{this.items=x;});
            $('#myModal').modal('hide');
        }else{
            alert("Input tidak valid");
        }
        
    }
    doUpdate(){
        if (this.validasiInputHarga() && this.mandatoryValidation()) {
            this.service.update(this.selectedItem).subscribe(x=>{this.items=x;});
            $('#myModal').modal('hide');
        }else{
            alert("Input tidak valid");
        }
    }
    hapus(){
        this.service.delete(this.selectedItem.id).subscribe(x=>{this.items=x;});
        $('#modalHapus').modal('hide');
    }
    

    validasiInputHarga(){
        let harga = Number(this.selectedItem.harga);
        if (harga) {
           return true;
        }
        return false;
    }

    mandatoryValidation(){
        if(this.selectedItem.nama && this.selectedItem.jenis && this.selectedItem.harga){
            return true;
        }
        return false;
    }
}