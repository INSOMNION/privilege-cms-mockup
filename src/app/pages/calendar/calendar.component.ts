import { 
  Component, 
  OnInit, 
  OnChanges, 
  SimpleChanges, 
  Input, 
  Output, 
  EventEmitter
} from '@angular/core';
import { 
  monthEn, 
  monthTh, 
  weekdayEn, 
  weekdayTh,
  weekdayColor
} from './calendar.data';
import { 
  CalendarData, 
  CalendarValue 
} from './calendar.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnChanges {
  
  // Properties
  @Input() historical: string = 'GREGORIAN'
  @Input() lang: string = 'EN'
  @Input() min: string = ''
  @Input() max: string = ''
  @Input() value: string | Date = new Date()
  @Input() dayList: CalendarData[] = weekdayEn
  @Input() monthList: CalendarData[] = monthEn

  // Event
  @Output() onSelect = new EventEmitter()

  today: CalendarValue = null as any
  active: CalendarValue = null as any

  // Calendar setup
  first: number = 0
  last: number = 0
  year: number = 0
  month: number = 0

  // Calendar date list
  calendar: CalendarValue[] = []

  // Calendar Info
  colors: string[] = weekdayColor
  days: CalendarData[] = []
  months: CalendarData[] = []
  historicalYear: number = 0

  private fill = (n: number) => n < 10 ? `0${n}` : `${n}`
  
  ngOnInit(): void {
    // Set calendar state
    this.today = this.toCalendar(new Date())
    // Init active
    if (typeof this.value == 'string') {
      this.value = new Date(this.value)
    }
    this.active = this.toCalendar(this.value)
    // Set calendar info
    this.setInfo(
      this.lang, 
      this.dayList,
      this.monthList, 
    )
    // Set active calendar
    this.goto(
      this.active.year,
      this.active.month
    )
  }

  /**
   * Set calendar date
   * @param {number} year - Display year
   * @param {number} month - Display month
   */
  private setCalendar (year: number, month: number): void {
    // Reset calendar
    this.calendar = []
    // Current first & last day
    let firstDate = new Date(year, month, 1)
    let lastDate = new Date(year, month + 1, 0)
    // Setup calendar state
    this.month = month
    this.year = year
    this.first = firstDate.getDate()
    this.last = lastDate.getDate()
    this.setHistoricalYear(
      this.historical, this.year
    )
    // First date
    let first = {
      date: this.first, day: firstDate.getDay()
    }
    // Last date
    let last = {
      date: this.last, day: lastDate.getDay()
    }
    // Previous month
    if (first.day > 0) {
      for (let date = (first.day - 1); date >= 0; date--) {
        this.calendar.push(this.toCalendar(new Date(
          year, month, date * -1
        )))
      }
    }
    // Current month
    for (let date = first.date; date <= last.date; date++) {
      this.calendar.push(this.toCalendar(new Date(
        year, month, date
      )))
    }
    // Next month
    if (last.day < 6) {
      for (let date = 1; date <= (6 - last.day); date++) {
        this.calendar.push(this.toCalendar(new Date(
          year, month + 1, date
        )))
      }
    }
  }

  /**
   * Set Calendar value
   * @param {Date} input - input date
   * @returns CalendarValue
   */
  private toCalendar (input: Date): CalendarValue {
    return {
      day: input.getDay(),
      year: input.getFullYear(),
      month: input.getMonth(),
      date: input.getDate(),
      iso: this.toISO(input),
      time: input.getTime(),
      value: input
    }
  }

  /**
   * Format date to ISO YYYY-MM-DDTHH:mm:ss.sssZ (ISO date)
   * @param {Date} date - Input date
   * @returns {string} ISO Date format
   */
  private toISO (date: Date): string {
    // Date value
    let year = date.getFullYear()
    let month = this.fill(date.getMonth() + 1)
    let day = this.fill(date.getDate())
    // Result
    return `${year}-${month}-${day}T00:00:00.000Z`
  }

  /**
   * Set calendar information
   * @param {string} language - Information Language
   * @param {CalendarData[]} days - Weekday Info
   * @param {CalendarData[]} months - Month Info
   */
  private setInfo (
    language: string,
    days: {
      short: string,
      full: string
    }[] = [],
    months: {
      short: string,
      full: string
    }[] = []
  ): void {
    // Default info
    this.days = weekdayEn
    this.months = monthEn
    // Filter Language
    switch (language.toUpperCase()) {
      case 'TH': 
        this.days = weekdayTh
        this.months = monthTh
        break
      case 'CUSTOM': 
        this.days = days
        this.months = months
        break
    }
  }

  /**
   * Set Display Year
   * @param {string} calendar - Historical Calendar Type
   * @param {number} year - Input year
   */
  private setHistoricalYear (
    calendar: string,
    year: number
  ): void {
    // Filter Calendar
    switch (calendar) {
      case 'BUDDHIST': 
        this.historicalYear = year + 543
        break
      case 'GREGORIAN':
        this.historicalYear = year
      break
    }
  }

  /**
   * Change Calendar
   * @param {number} year - Input year 
   * @param {number} month - Input month (0-11)
   */
  goto (year: number, month: number): void {

    let y = Math.floor(month / 11)
    if (y < 0) {
      y = Math.abs(y)
      year = year - Math.abs(y)
      month = (12 * y) - (Math.abs(month) % 11)
    }
    if (month >= 12) {
      // Calculate year & month
      year = y + year
      month = month % 12
    }
    // Set year & month state
    this.year = year
    this.month = month
    // Set Calendar
    this.setCalendar(
      this.year,
      this.month
    )
  }

  /**
   * On select Handler
   * @param {string} value - Date an ISO String 
   */
  onPickDate(value: string): void {
    // Set active
    this.active = this.toCalendar(new Date(value))
    // Check active month
    this.active.month != this.month ? this.goto(
      this.active.year,
      this.active.month
    ) : null
    // Define Information
    let { 
      day, year, month, date, time, value: dateValue 
    } = this.active
    let dayInfo = this.days[day]
    let monthInfo = this.months[month]
    // Set Result
    let result = {
      year: `${year}`,
      historicalYear: this.fill(this.historicalYear),
      month: this.fill(month + 1),
      monthShort: monthInfo.short,
      monthFull: monthInfo.full,
      date: this.fill(date),
      day: this.fill(day),
      dayShort: dayInfo.short,
      dayFull: dayInfo.full,
      value: dateValue,
      time,
    }
    // Emit Change
    this.onSelect.emit(result)
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      // Init active
      let value = changes['value'].currentValue
      value = typeof value == 'string' ? new Date(value) : value
      // Set active calendar
      this.active = this.toCalendar(value)
      this.goto(
        this.active.year,
        this.active.month
      )
    }
    if (changes['lang']) {
      this.lang = changes['lang'].currentValue
    }
    if (changes['dayList']) {
      this.days = changes['dayList'].currentValue
    }
    if (changes['monthList']) {
      this.months = changes['monthList'].currentValue
    }
  }
}
