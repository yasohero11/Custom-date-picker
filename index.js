class MyDatePicker {

    properties = {
        startYaer: this.getFullDate(new Date()).year,
        endYear: Number(this.startYear) + 5,
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        format: "yyyy-mm-dd",
        enabledDates: [],
    }

    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    year30 = ["April", "June", "September", "November"]
    currentYear = document.querySelector(".current-year");
    rightArrow = document.querySelector(".right-arrow")
    leftArrow = document.querySelector(".left-arrow")
    datePicker = document.querySelector(".datePicker")
    daysPanel = document.getElementsByClassName("daysPanel")[0]
    datesPanel = document.getElementsByClassName("datesPanel")[0]
    today = new Date()
    year = this.today.getFullYear()
    
    isLeapYaer = false
    currentMonth = 0
    selectedDay = 1
    seletedElementDay = ""

    constructor(properties) {

        let year = this.year
        if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0))
            this.isLeapYaer = true



        if (properties != undefined)
            this.properties = properties;
        /*      
for(let month of  properties.months){
  this.monthsPanel.insertAdjacentHTML('beforeend', `<div class="datepicker-month"> ${month} </div>`)
}
 

for(let day of  properties.days){
  this.dayssPanel.insertAdjacentHTML('beforeend', `<div class="datepicker-month"> ${day} </div>`)
}
*/
        if (this.properties.startMonth == "today")
            this.viewMonth(this.months[this.today.getMonth()])
        else
            this.viewMonth(this.properties.startMonth || this.properties.months[0])

        this.rightArrow.addEventListener("click", () => {
            
            if (this.currentMonth != this.properties.months.length - 1)
                this.currentMonth++
            else                
                this.properties.startMonth == "today"?  this.currentMonth = this.today.getMonth(): this.currentMonth = 0

            this.selectedDay = 1
            this.daysPanel.innerHTML = ""
            this.viewMonth(this.properties.months[this.currentMonth])

        })

        this.leftArrow.addEventListener("click", () => {
            console.log(this.currentMonth + " " + this.today.getMonth() )
            if (this.currentMonth == this.today.getMonth())            
                this.currentMonth = this.properties.months.length - 1                
            else if(this.currentMonth != 0)
                this.currentMonth--                            
            else
                this.currentMonth = this.properties.months.length - 1
            this.selectedDay = 1
            this.daysPanel.innerHTML = ""
            this.viewMonth(this.properties.months[this.currentMonth])


        })


        this.datePicker.addEventListener("click", (ele) => {
            if (ele.target.classList.contains("datepciker-day") && !ele.target.classList.contains("disabled")) {
                this.seletedElementDay == "" ? "" : this.seletedElementDay.classList.remove("selected")
                this.seletedElementDay = ele.target
                this.selectedDay = ele.target.innerHTML
                ele.target.classList.add("selected")
                if (this.properties.onDateChanged)
                    this.setOnDateChanged(this.properties.onDateChanged)
            }
        })
    }


    setOnDateChanged(func) {
        func(this.getDate())
    }

    viewMonth(month) {
        let tempDate = this.properties.format
        this.currentMonth = this.properties.months.indexOf(month) != -1 ? this.properties.months.indexOf(month) : 0
        this.currentYear.innerHTML = `${this.today.getFullYear()} ${this.properties.months[this.currentMonth]}`

        let days = 30
        let prevousMonthDays = 30
        let prevousMonth = this.currentMonth - 1

        if (prevousMonth < 0)
            prevousMonth = this.properties.months[this.properties.months.length - 1]
        else
            prevousMonth = this.properties.months[prevousMonth]



        if (prevousMonth == "February") {
            if (this.isLeapYaer)
                prevousMonthDays = 29
            else
                prevousMonthDays = 28
        }
        else if (this.year30.includes(prevousMonth))
            prevousMonthDays = 31


        if (month == "February") {
            if (this.isLeapYaer)
                days = 29
            else
                days = 28
        }
        else if (this.year30.includes(month))
            days = 31


        for (let i = 34 - days; i >= 0; i--)
            this.daysPanel.insertAdjacentHTML("beforeend", ` <div class="datepciker-day disabled">${prevousMonthDays - i}</div>`)


        for (let i = 1; i <= days; i++) {
            tempDate = tempDate.replace("dd", i)
            tempDate = tempDate.replace("mm", this.months.indexOf(this.properties.months[this.currentMonth]) + 1)
            tempDate = tempDate.replace("yyyy", this.year)
            
            if(this.properties.disableOldDates)
                if(i >= this.today.getDate() && this.currentMonth >= this.today.getMonth()&& this.properties.enabledDates.includes(tempDate))
                    this.daysPanel.insertAdjacentHTML("beforeend", ` <div class="datepciker-day">${i}</div>`)
                else
                    this.daysPanel.insertAdjacentHTML("beforeend", ` <div class="datepciker-day disabled">${i}</div>`)
            else if (this.properties.enabledDates.includes(tempDate))
                    this.daysPanel.insertAdjacentHTML("beforeend", ` <div class="datepciker-day">${i}</div>`)
            else
                this.daysPanel.insertAdjacentHTML("beforeend", ` <div class="datepciker-day disabled">${i}</div>`)
                
            tempDate = this.properties.format
        }

    }



    getCurrentMonth() {
        return this.properties.months[this.currentMonth]
    }

    getDate() {
        let month = this.months.indexOf(this.properties.months[this.currentMonth]) + 1
        console.log(`before ${month}`)
        let date = `${this.year}/${(month.toString().length == 1 ? '0' + month : month)}/${(this.selectedDay.toString().length == 1 ? ('0' + this.selectedDay) : this.selectedDay)}`
        if (this.properties.format != undefined) {
            date = this.properties.format.toLowerCase()
            date = date.replace("yyyy", this.year)
            date = date.replace("mm", (month.toString().length == 1 ? '0' + month : month))
            date = date.replace("dd", (this.selectedDay.toString().length == 1 ? ('0' + this.selectedDay) : this.selectedDay))
           
        }
        return date
    }

    getFullDate(date) {


        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear()

        return {
            month: (month.toString().length == 1 ? '0' + month : month),
            day: (day.toString().length == 1 ? '0' + day : day),
            year: year
        }
    }
}