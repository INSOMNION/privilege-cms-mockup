import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuotaService {
  
  constructor () {}
  
  mock = (name: string,n: number): {
    id: number,
    name: string
  }[] => "i".repeat(n)
    .split("")
    .map((_, i) => ({
      id: i + 1,
      name: `${name}-${i}`
    }))

  fetchChoice (id: number): {
    id: number, name: string,
  }[] {
    return this.mock('choice', id)
  }
  
  fetchCriteria (id: number): {
    id: number, name: string,
  }[] {
    return this.mock('criteria', id)
  }

  isPhone (input: string): boolean {
    let regex = new RegExp(
      /^[66][0-9]{10}$|^[0][0-9]{9}$/
    )
    return !!input && regex.test(input)
  }

  isEmail (input: string): boolean {
    let regex = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
    return !!input && regex.test(input)
  }

  monthDiff (
    start: Date,
    end: Date
  ): number {
    // Diff Month & Year
    let month = (end.getMonth() - start.getMonth()) + 1
    let year = end.getFullYear() - start.getFullYear()
    // Result
    return (month + 12 * year)
  }

  monthRange (
    year: number,
    month: number,
  ): {
    start: Date,
    stop: Date
  } {
    return {
      start: new Date(
        year, month, 1, 0, 0, 0, 0
      ),
      stop: new Date(
        year, month + 1, 0, 23, 59, 59
      )
    }
  }

  setMonth (
    year: number,
    month: number
  ): {
    year: number,
    month: number
  } {
    let y = Math.floor(month / 11)
    // Check Date
    if (month >= 12) {
      // Calculate year & month
      year = y + year
      month = month % 12
    }
    return { year, month }
  }

  setPeriod (
    type: number,
    start: Date,
    stop: Date
  ): {
    start: Date,
    stop: Date,
  }[] {
    // Result
    let result: {
      start: Date, stop: Date,
    }[] = []
    // Filter Period Type
    switch (type) {
      // Overall
      case 0:
        result.push({ start, stop })
        break;
      // Monthly
      case 1:
      // Haft-monthly
      case 2:
        // Input year & month
        let startYear = start.getFullYear()
        let startMonth = start.getMonth()
        let diff = this.monthDiff(start, stop)
        // Period List
        result = "m".repeat(diff)
          .split("")
          .map((_, i) => {
            // Set month
            let result = []
            let { year, month } = this.setMonth(
              startYear,
              startMonth + i
            )
            // Month Start & Stop
            let range = this.monthRange(
              year, month
            )
            // Scope Start & Stop
            range.start = (i == 0)
              ? start
              : range.start
            range.stop = (i == diff - 1)
              ? stop
              : range.stop
            // Period Type
            if (type == 1) {
              // Month Period
              if (range.start < range.stop) result.push(range)
            }
            else {
              // First of month
              let first = {
                start: range.start, 
                stop: new Date(
                  year, month, 15, 23, 59, 59
                )
              }
              // Half of month
              let haft = {
                stop: range.stop,
                start: new Date(
                  year, month, 16, 0, 0, 0
                ),
              }
              // Get Time
              let firstStart = first.start.getTime()
              let firstStop = first.stop.getTime()
              let haftStart = haft.start.getTime()
              let haftStop = haft.stop.getTime()
              // Set First Stop
              first.stop = firstStop < haftStop
                ? first.stop
                : haft.stop
              // First Month Period
              if (
                firstStart < firstStop &&
                firstStart < haftStop
              ) result.push(first)
              
              console.log(i, firstStart, firstStop, haftStart, haftStop)
              // Haft Month Period
              if (
                haftStart > firstStop && 
                haftStart < haftStop
              ) result.push(haft)
            }
            return result
          })
          .reduce(
            (pre, cur) => pre.concat(...cur), []
          )
        break
      default:
        break;
    }
    return result
  }

  averageQuota (total: number, divisor: number): number[] {
    // Result
    let result = []
    let quota = Math.floor(total / divisor)
    let remain = total % divisor;
    // Average Excess
    for (let index = 1; index <= divisor; index++) {
      result.push(remain > 0 ? quota + 1 : quota)
      remain--;
    }
    return result
  }

  setQuota (
    period: {
      begin: Date,
      end: Date,
    }[],
    mobile: number,
    fbb: number
  ) {
    //
    let divisor = period.length
  }
}