import { Injectable } from '@angular/core';
import { criteria } from './mock/data';

@Injectable({
  providedIn: 'root',
})
export class LimitationService {
  
  constructor () {}

  private fill = (n: number) => n < 10 ? `0${n}` : `${n}`

  getCriteria (text: string, start: number, stop: number): Promise<any> {
    return new Promise((resolve) => {
      // Filter criteria
      let data = criteria
      // Filter text
      if (text) {
        data = criteria.filter(e => e.name
          .match(
            new RegExp(`${text}`, 'gi')
          ))
      }
      let total = data.length
      let result = data.slice(start, stop)
      // Result
      resolve({ total, result })
    })
  }

}