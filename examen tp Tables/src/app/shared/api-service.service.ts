import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  baseUrl : string = environment.baseUrl;

  postTable(data:any){
    return this.http.post<any>(this.baseUrl+'/tables', data);
  }

  getAllTable(){
    return this.http.get<any>(this.baseUrl+'/tables');
  }

  deleteTable(id:any){
    return this.http.delete<any>(this.baseUrl+'/tables/'+ id);
  }

  updateTable(data:any, id:number){
    return this.http.put<any>(this.baseUrl+'/tables/'+id, data);
  }

}
