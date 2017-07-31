import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from "@angular/core";
import { environment as ENV } from "../../environments/environment";
import { TokenRingService } from "./token-ring.service"
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ContactService {

  private options: RequestOptions;

  constructor(private http: Http, private trs: TokenRingService) {
    this.options = this.trs.getHeaders();
  }

  bugReport(description) {
    return this.trs.apiCall(ENV.endpoint['bug-report'], {'description': description});
  }
}
