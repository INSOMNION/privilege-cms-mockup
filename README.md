# MockPrivilege

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
## **DEFINE**

- Worker - ผู้เล่น (Player)
- Man-hour - รอบ (Turn)
- TODO list - กองจั่ว (Draw pile)
- DONE list - กองทิ้ง Discard pile
- BUG - จุดบกพร่องของแอพพลิเคชั่น
- DEBUGGER - เครื่องมือสำหรับแก้ไข BUG

## **CARDS**

### **PRODUCTIVITY**

- DEBUGGER
 - การ์ดมีผลทันที
 - เสีย 1 ใบเมื่อจั่วเจอ BUG!

- NEW FEATURE
 - การ์ดมีผลทันที
 - เมื่อจั่วเจอ ให้นำการ์ดกองทิ้งมาสับแล้วแจกให้ผู้เล่นคนละ 1 ใบ
 - ถ้าผู้เล่น ไม่มีการ์ดบนมือให้แจก 2 ใบ
 - เริ่มจากคนถัดไปจนวนครบรอบผู้จั่ว

### ISSUES

- BUG!
 - การ์ดมีผลทันที
 - เมื่อจั่วเจอ ผู้จั่วต้องแสดงให้ผู้เล่นอื่นดูทันที
 - หากผู้จั่ว**มี** DEBUGGER ต้องเสีย 1 ใบ แล้วนำการ์ด BUG ไปใส่ไว้ในกองจั่ว (ห้ามสับการ์ดกองจั่ว)
 - หากผู้จั่ว**ไม่มี** DEBUGGER จะแพ้ทันที
 - **ยกเว้น** Role USER สามารถถือขึ้นมือได้

- DEADLINE
 - การ์ดมีผลทันที
 - เมื่อจั่วเจอ บังคับเพิ่มรอบคนละ 1 รอบ
 - เริ่มจากคนถัดไปจนวนครบรอบผู้จั่ว

- DELAY
 - การ์ดมีผลทันที
 - เมื่อจั่วเจอ ทุกคนเลือกการ์ดบนมือ 2 ใบ ใส่ไปในกองจั่ว แล้วสับกองจั่ว

### **BACKLOGS**

- STANDUP MEETING
 - การ์ดทั่วไป
 - เมื่อวานทำ ... 
 - วันนี้ทำ ... 
 - ติดปัญหา ...

- DESIGN
 - การ์ดทั่วไป
 - ออกแบบ UX/UI
 - ออกแบบ Algorithm
 - ออกแบบ System

- DEVELOP
 - การ์ดทั่วไป
 - พัฒนา User Interface
 - พัฒนา ฺBusiness Logics

- TEST
 - การ์ดทั่วไป
 - Unit Testing ทดสอบ Software ในแต่ละ Function
 - Integration Testing ทดสอบ Software โดยรวม
 - UAT (User Acceptance Testing) ทดสอบ Software โดยผู้ใช้งานจริง

- DEPLOY
 - การ์ดทั่วไป
 - Continuous Integration รวบรวม Code จาก Developer แล้วทำการ Test Software ให้พร้อมก่อนนำไปใช้งานจริง
 - Continuous Delivery รวบรวมขั้นตอนการส่งออก Software
 - Continuous Deployment นำ Software ไปใช้งานจริง

- REVIEW
 - การ์ดทั่วไป
 - งานที่เสร็จแล้ว ...
 - งานที่ยังไม่เสร็จ ...
 - ปัญหาที่เจอ ...
 - ควรเปลี่ยนแปลง ...
 - งานต่อไป ...

### **SOLUTIONS** (การ์ด)

- LAZY
 - การ์ดแอคชั่น
 - "ขี้เกียจจจ 🥱"
 - **ยกเลิก** 1 แอคชั่น

- VACATION
 - การ์ดแอคชั่น
 - "ล๊าาาาาา 😛"
 - **จบรอบ**การเล่นทันที

- CHANGE REQ. 
 - การ์ดแอคชั่น
 - "พี่ว่าแบบนี้ ดีก่า 🙃"
 - **เปลี่ยนทิศ**ทางการเล่น

- CLARIFY
 - การ์ดแอคชั่น
 - "ตะกี้ ว่าไงนะ !? 🤔"
 - เลือกผู้เล่น 1 คน ให้**แสดงการ์ด**บนมือให้ผู้เล่นเห็นทั้งหมด 2 รอบ

- TRANSFER
 - การ์ดแอคชั่น
 - "แลกกัน นะ 🤗"
 - เลือกผู้เล่น 1 คน ให้**สลับการ์ด**ทั้งหมดบนมือตัวเอง
 - หากผู้เล่นไม่ใช่ Role USER เมื่อสลับแล้ว ถือ BUG! บนมือให้นำ BUG! ใส่กองจั่วแล้วสับกองจั่ว

- HOTFIX
 - การ์ดแอคชั่น
 - "งานเข้า 🔥"
 - ผู้เล่นต่อไปเล่น 2 รอบ

- HELP ME
 - การ์ดแอคชั่น
 - "ช่วยด้วย 😌"
 - เลือกผู้เล่น 1 คน **ขอการ์ด**แอคชั่นที่ต้องการ
 - หาก**มีการ์ด** ที่ขอ ต้องให้การ์ดนั้น
 - หาก**ไม่มีการ์ด** ที่ขอ ต้องให้การ์ด 2 ใบอะไรก็ได้

- MEETING
 - การ์ดแอคชั่น
 - "ปะ ปะ ประชุมมม 🧐"
 - ผู้เล่นทุกคนยกเว้นผู้ใช้ **แสดงการ์ด**อะไรก็ได้ บนมือ 1 ใบ
 - ผู้ใช้**เลือกการ์ด** 1 ใบจากผู้เล่นที่แสดงการ์ด
 - ไม่สามารถยกเลือกแอคชั่นนี้ได้
 - สามารถใช้การ์ด LAZY ได้ หากไม่ต้องการแสดงการ์ด

- TESTING
 - การ์ดแอคชั่น
 - "ขอเทส 🤓"
 - จั่วการ์ด 3 ใบจากด้านบนเพื่อ**ดูการ์ด**
- REVIEW CODE
 - การ์ดแอคชั่น
 - จั่วการ์ด 3 ใบจากด้านบนเพื่อ**ดูการ์ด** และ สามารถ**สลับการ์ด** ได้

- MERGE CODE
 - การ์ดแอคชั่น
 - "บูมมมมม 😱"
 - สับกองจั่ว

- PUSH CODE
 - การ์ดแอคชั่น
 - ""
 - จั่วการ์ด 3 ใบจากด้านบนเพื่อ**ดูการ์ด** แล้ว **เลือกการ์ด** 1 ใบ ไปไว้ล่างสุด

- PULL CODE
 - การ์ดแอคชั่น
 - จั่วการ์ดใบล่างสุดแล้วจบรอบ

### **CHARACTERS & SKILLS**

- THE BOSS
 - Hippo
 - ... 🤑 - ... (Cooldown ... man-days)

- PROJECT MANAGER
 - Lion
 - Grooming 😏 - เรียกประชุม MEETING (Cooldown ... man-days)

- MARKETING
 - Salmon
 - New Requirement 😛 - Use change req. solution. (Cooldown ... man-days)

- SYSTEM ANALYST
 - Tiger
 - Interim Solution 🙄 - Use a code review solution. (Cooldown ... man-days)

- SENIOR DEVELOPER
- Bear
- Debug 😎 - Fix BUG (1 time / game)

- JUNIOR DEVELOPER
 - Puppy
 - Help !! 😅 - Can get 1 card from any worker without a customer. (Cooldown ... man-days)

- IT SUPPORT 
 - Sloth
 - Slow Work 😑 - Next worker works 2 man-days. (Cooldown ... man-days)

- TESTER
 - Dog
 - Automate test 🤖 - If using the testing card will draw 5 cards. (Passive)

- USER
 - Duck
 - I don't know 🤔 - Can hold BUG on hand (If hold > 2 will lose the game) (Passive)