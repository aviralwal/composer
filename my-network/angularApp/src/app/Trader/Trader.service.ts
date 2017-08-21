import { AddParticipant } from './../org.hyperledger.composer.system';
import { Trader } from './../org.acme.mynetwork';
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Commodity } from '../org.acme.mynetwork';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class TraderService {

	
		private NAMESPACE: string = 'Trader';
	



    constructor(private dataService: DataService<Trader>) {
    };
    public getAll(): Observable<Trader[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getParticipant(id: any): Observable<Trader> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addParticipant(itemToAdd: any): Observable<Trader > {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public deleteParticipant(id: any): Observable<Trader> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
