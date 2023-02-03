import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddCampaignService {

  constructor() { }

  fetchBrand (name: string): [] {
    console.log('Service Hello')
    return []
  }

  saveChoice (choices: {

  }[]): {} {
    localStorage.setItem('choices', JSON.stringify(choices))
    return {}
  }

  fetchChoice (serviceId: number): [] {
    return []
  }
}
