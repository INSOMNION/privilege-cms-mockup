import { CalendarData } from "./calendar.model"

export const weekdayColor: string[] = [
  "rgb(246,82,71)",
  "rgb(242,187,1)",
  "rgb(242,121,162)",
  "rgb(163,194,102)",
  "rgb(239,115,31)",
  "rgb(156,214,242)",
  "rgb(216,156,242)",
]

export const weekdayEn: CalendarData[] = [
  { short: "sun", full: "Sunday"},
  { short: "mon", full: "Monday"},
  { short: "tue", full: "Tueday"},
  { short: "wed", full: "Wednesday"},
  { short: "thur", full: "Thursday"},
  { short: "fri", full: "Friday"},
  { short: "sat", full: "Saturday"},
]

export const weekdayTh: CalendarData[] = [
  { short: "อา.", full: "วันอาทิตย์"},
  { short: "จ.", full: "วันจันทร์"},
  { short: "อ.", full: "วันอังคาร"},
  { short: "พ.", full: "วันพุธ"},
  { short: "พฤ.", full: "วันพฤหัสบดี"},
  { short: "ศ.", full: "วันศุกร์"},
  { short: "ส.", full: "วันเสาร์"},
]

export const monthEn: CalendarData[] = [
  { short: "Jan", full: "January"},
  { short: "Feb", full: "February"},
  { short: "Mar", full: "March"},
  { short: "Apr", full: "April"},
  { short: "May", full: "May"},
  { short: "Jun", full: "June"},
  { short: "Jul", full: "July"},
  { short: "Aug", full: "August"},
  { short: "Sep", full: "September"},
  { short: "Oct", full: "October"},
  { short: "Nov", full: "November"},
  { short: "Dec", full: "December"},
]

export const monthTh: CalendarData[] = [
  { short: "ม.ค.", full: "มกราคม"},
  { short: "ก.พ.", full: "กุมภาพันธ์"},
  { short: "มี.ค.", full: "มีนาคม"},
  { short: "เม.ย.", full: "เมษายน"},
  { short: "พ.ค.", full: "พฤษภาคม"},
  { short: "มิ.ย.", full: "มิถุนายน"},
  { short: "ก.ค.", full: "กรกฎาคม"},
  { short: "ส.ค.", full: "สิงหาคม"},
  { short: "ก.ย.", full: "กันยายน"},
  { short: "ต.ค.", full: "ตุลาคม"},
  { short: "พ.ย.", full: "พฤศจิกายน"},
  { short: "ธ.ค.", full: "ธันวาคม"},
]
