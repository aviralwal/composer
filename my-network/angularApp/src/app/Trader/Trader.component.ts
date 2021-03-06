import { Component, OnInit } from '@angular/core';
import { TraderService } from './Trader.service'
import 'rxjs/add/operator/toPromise';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-Trader',
  templateUrl: './Trader.component.html',
  styleUrls: ['./Trader.component.css'],
  providers: [TraderService]
})
export class TraderComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;
  
  tradeId = new FormControl("", Validators.required);

  firstName = new FormControl("", Validators.required);

  lastName = new FormControl("", Validators.required);

  constructor(private serviceTrader:TraderService, fb: FormBuilder) {
    this.myForm = fb.group({

      tradeId:this.tradeId,

      firstName:this.firstName,

      lastName:this.lastName

    })

   }

  
  
  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceTrader.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

  addParticipant(form: any): Promise<any> {

    this.participant = {
      $class: "org.acme.mynetwork.Trader",
      
        
          "tradeId":this.tradeId.value,
        
      
        
          "firstName":this.firstName.value,
        
      
        
          "lastName":this.lastName.value

        
      
    };

    this.myForm.setValue({
             "tradeId":null,
          
        
          
            "firstName":null,
          
        
          
            "lastName":null
        

        
      
    });

    return this.serviceTrader.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        "tradeId":null,
          
        
          
            "firstName":null,
          
        
          
            "lastName":null
        
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }

  deleteParticipant(): Promise<any> {

    return this.serviceTrader.deleteParticipant(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceTrader.getParticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "tradeId":null,
          
        
          
            "firstName":null,
          
        
          
            "lastName":null
        
      };



      
        if(result.tradeId){
          formObject.tradeId = result.tradeId;
        }else{
          formObject.tradeId = null;
        }
      
        if(result.firstName){
          formObject.firstName = result.firstName;
        }else{
          formObject.firstName = null;
        }
      
        if(result.lastName){
          formObject.lastName = result.lastName;
        }else{
          formObject.lastName = null;
        }
      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "tradingSymbol":null,
        
      
        
          "description":null,
        
      
        
          "mainExchange":null,
        
      
        
          "quantity":null,
        
      
        
          "owner":null 
        
      
      });
  }


}
