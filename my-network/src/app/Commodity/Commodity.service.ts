import { Trade } from '../org.acme.mynetwork';
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Commodity } from '../org.acme.mynetwork';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class CommodityService {

	
    private NAMESPACE: string = 'Commodity';
    
    private NAMESPACE1: string = 'Trade';
	



    constructor(private dataService: DataService<Commodity>, private dataService1: DataService<Trade>) {
    };

    public getAll(): Observable<Commodity[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Commodity> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Commodity> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(itemToUpdate: any, id: any): Observable<Trade> {
      return this.dataService1.update(this.NAMESPACE1, itemToUpdate, id);
    }

    public deleteAsset(id: any): Observable<Commodity> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
