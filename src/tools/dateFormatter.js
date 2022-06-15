/**
 * @returns the next week number we will be in a year
 */
function getNextWeekNumber(){
//returns the next week's number starting from October
let date=new Date()
let currentYear=new Date(date.getFullYear()-1,11,26)
let weekNo=Math.round((date.getTime()-currentYear.getTime())/(1000*60*60*(24)*7))
return weekNo
}
/**
 * @param {Number} weekday 
 * 0 means Monday ,6 means Sunday, 7 means neext week's monday -7 means last week monday, 1+7= next week tuesday 
 * You can also input negative numbers, -1 returns last week's sunday -3 return last week's friday etc)
 * add 7 or its multiples to get next weekdays number
 *@returns the date number of given parameter
 */
function getDate(weekday){
    
    let currentdate=new Date()
    let datecontext= new Date(currentdate.getTime()+((weekday+1)*24*60*60*1000)-(currentdate.getDay()*24*60*60*1000))
   console.log(datecontext.getDate())
    return datecontext

}
/**
 * 
 * @returns week number
 */
function getCurrentWeekNumber(){
    let date=new Date()
let currentYear=new Date(date.getFullYear(),0,1)
let weekNo=Math.round((date.getTime()-currentYear.getTime())/(1000*60*60*24*7))
return weekNo

}

function getNextWeekDate(weekday){
}

console.log(getCurrentWeekNumber())