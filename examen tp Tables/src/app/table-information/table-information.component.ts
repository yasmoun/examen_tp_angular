import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiServiceService } from 'src/app/shared/api-service.service';
@Component({
  selector: 'app-table-information',
  templateUrl: './table-information.component.html',
  styleUrls: ['./table-information.component.css']
})
export class TableInformationComponent implements OnInit {

  TableForm!: FormGroup;
  TableModel:any;
  TableDetails:any;
  showAddBtn:boolean=true;
  showUpdateBtn:boolean=false;


  constructor(private api: ApiServiceService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAll();
    this.createForm();
  }

  createForm(){
    this.TableForm = this.fb.group({
      id:[''],
      identifiant:[''],
      marque:[''],
      description:[''],
      date:[''],
    });
  }

  getAll(){
    this.api.getAllTable().subscribe(res=>{
      this.TableDetails = res;
    }, err=>{
      console.log(err);

    })
  }

  onAddClick(){
    this.showAddBtn=true;
    this.showUpdateBtn=false;
  }

  post(){
    this.TableModel = Object.assign({}, this.TableForm.value);

    this.api.postTable(this.TableModel).subscribe(res=>{
      alert("added successfully");
      let close = document.getElementById('close');
      close?.click();
      this.TableForm.reset();
      this.getAll();
    }, err=>{
      alert("Error");
    })
  }

  delete(id:any){
    this.api.deleteTable(id).subscribe(res=>{
      alert("deleted successfully");
      this.getAll();
    }, err=>{
      alert("Failed to delete");
    })
  }

  edit(table:any){

    this.showAddBtn=false;
    this.showUpdateBtn=true;
    this.TableForm.controls['id'].setValue(table.id);
    this.TableForm.controls['identifiant'].setValue(table.identifiant);
    this.TableForm.controls['marque'].setValue(table.marque);
    this.TableForm.controls['description'].setValue(table.description);
    this.TableForm.controls['date'].setValue(table.date);
  }

  update(){
    this.TableModel = Object.assign({}, this.TableForm.value);

    this.api.updateTable(this.TableModel, this.TableModel.id).subscribe(res=>{
      alert("table updated successfully");
      let close = document.getElementById('close');
      close?.click();
      this.getAll();
      this.TableForm.reset();
      this.TableModel={};
    }, err=>{
      alert("Error in updating ");
    })
  }

  reset(){
    this.TableForm.reset();
    this.TableModel={};
  }

}
