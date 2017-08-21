import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TradeCommodityService } from './TradeCommodity.service';

@Component({
  selector: 'app-TradeCommodity',
  templateUrl: './TradeCommodity.component.html',
  styleUrls: ['./TradeCommodity.component.css'],
  providers: [TradeCommodityService]
})
export class TradeCommodityComponent implements OnInit {
  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  tradingSymbol = new FormControl("", Validators.required);

  owner = new FormControl("", Validators.required);


  constructor(private serviceTradeCommodity: TradeCommodityService, fb: FormBuilder) {
    this.myForm = fb.group({


      tradingSymbol: this.tradingSymbol,

      owner: this.owner
    });
  };


  ngOnInit() {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceTradeCommodity.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(asset => {
          tempList.push(asset);
        });
        this.allAssets = tempList;
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
          this.errorMessage = error;
        }
      });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  updateOwner(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.mynetwork.Trade",

      "commodity": this.tradingSymbol.value,

      "newOwner": this.owner.value,

    };

    return this.serviceTradeCommodity.updateOwner(this.asset)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs for updateAsset."
        }
        else {
          this.errorMessage = error;
        }
      });
  }
 
  getForm(id: any): Promise<any> {

    return this.serviceTradeCommodity.getAsset(id)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        let formObject = {


          "tradingSymbol": null,



          "description": null,



          "mainExchange": null,



          "quantity": null,



          "owner": null


        };

        if (result.tradingSymbol) {
          formObject.tradingSymbol = result.tradingSymbol;
        } else {
          formObject.tradingSymbol = null;
        }

        if (result.owner) {
          formObject.owner = result.owner;
        } else {
          formObject.owner = null;
        }


        this.myForm.setValue(formObject);

      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs for getForm'
        }
        else {
          this.errorMessage = error;
        }
      });

  }

}
