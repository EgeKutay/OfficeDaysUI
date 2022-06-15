const data = {...require("@/localdb/config.json")};
import tools from "./modelTransformer"

let employeeDatas=[]
async function generateWorkPlan(employeeData){
  

employeeDatas=employeeData
let employees = JSON.parse(JSON.stringify(employeeData));
let balanceFactor=JSON.parse(JSON.stringify(data["balanceFactor"]));

employees = employees.sort(() => Math.random() - 0.5);
let days = JSON.parse(JSON.stringify(data["days"]));
let replicateDays=JSON.parse(JSON.stringify(days))
let totalEmpCount = 0;
function findDayIndex(target,base){
 let result= target.findIndex((object) => {

    return object === base;
  });
  return result
} 
for (let day in days) {
  totalEmpCount += days[day].employeeCount;
}
let totalWorkDays = 0;
for (let emp in employees) {
  totalWorkDays += employees[emp].nwdaycount;
}
if (totalWorkDays > totalEmpCount) {
  console.error(
    "-----ERROR!!!!! Sum of weekly employee office day count cannot be larger than sum of office day capacity"
)}

let findIndex = 0;
let offDaysList=["aldays","hrdays","mldays","swdays","uldays"]


try {
  for(let emp of employees) {
    emp["availableNWdays"]=[]
  
  for(let weekday of days){
    emp.availableNWdays.push(JSON.parse(JSON.stringify(weekday.day)));
  }
    for (let nwday in emp.offdays.nwdays) {
    
      
     let findViableday=findDayIndex(emp.availableNWdays,emp.offdays.nwdays[nwday])

      let findday = days.findIndex((object) => {
        return object.day == emp.offdays.nwdays[nwday];
      });
      emp.nwdaycount--;
      if(emp.nwdaycount<1){
        emp.availableNWdays=[]
      }
      days[findday].employeeCount--;
     
      if (days[findViableday].employeeCount < 1) {
        days.splice(findday, 1);
      }
    emp.availableNWdays.splice(findViableday, 1);
    }
    for (let ofday in emp.offdays.aldays) {
      let findoffdayIndex =findDayIndex(emp.availableNWdays,emp.offdays.aldays[ofday]);
    emp.availableNWdays.splice(findoffdayIndex, 1);
    }
    for (let ofday in emp.offdays.hrdays) {
      let findoffdayIndex =findDayIndex(emp.availableNWdays,emp.offdays.hrdays[ofday]);
    emp.availableNWdays.splice(findoffdayIndex, 1);
    }
    for (let ofday in emp.offdays.mldays) {
      let findoffdayIndex =findDayIndex(emp.availableNWdays,emp.offdays.mldays[ofday]);
    emp.availableNWdays.splice(findoffdayIndex, 1);
    }
    for (let ofday in emp.offdays.swdays) {
      let findoffdayIndex =findDayIndex(emp.availableNWdays,emp.offdays.swdays[ofday]);
    emp.availableNWdays.splice(findoffdayIndex, 1);
    }
    for (let ofday in emp.offdays.uldays) {
      let findoffdayIndex =findDayIndex(emp.availableNWdays,emp.offdays.uldays[ofday]);
    emp.availableNWdays.splice(findoffdayIndex, 1);
    }
    for (let ofday in emp.offdays.phdays) {
      let findoffdayIndex =findDayIndex(emp.availableNWdays,emp.offdays.phdays[ofday]);
    emp.availableNWdays.splice(findoffdayIndex, 1);
    }
    if(emp.availableNWdays<emp.nwdaycount){
      emp.nwdaycount=emp.availableNWdays
    }
  }
} catch (err) {
  

    return 0
}

//checking if available nwdays matches with days array if not remove the elements on both arrays
for (let i = 0; i < days.length; i++) {
 
  if (days[i].employeeCount < 1) {
    days.splice(i, 1);
  }
  
}
for(let emp of employees){
  if(emp.nwdaycount>=days.length){
    emp.nwdaycount=days.length
  }
  let result=days.map(dayName=>(dayName.day))

  let filteredNWDays=emp.availableNWdays.filter((object)=>{
    return result.includes(object)
  })
  emp.availableNWdays=filteredNWDays
}


//insert random nw days
try {
  for(let emp of employees) {
    //employees iteration
    let isBalanced = false;
    emp.availableNWdays =emp.availableNWdays.sort(() => Math.random() - 0.5);
    let balanceFactor=0;
   
    while(emp.nwdaycount>0){
        let avalabledayindex =0
        if(balanceFactor <data["balanceFactor"]&&emp.availableNWdays.length>1){
          avalabledayindex = getMostViableDay(emp.availableNWdays,days)
          balanceFactor++
        }
        emp.offdays.nwdays.push(emp.availableNWdays[avalabledayindex])
        emp.nwdaycount--
      let findIndex = findDayIndex(days.map(dayName=>(dayName.day)),emp.availableNWdays[avalabledayindex])
        emp.availableNWdays.splice(avalabledayindex,1)
        
        days[findIndex].employeeCount--
        
        
        if(days[findIndex].employeeCount<1){
          days.splice(findIndex,1)
        }
    }
    if(emp.nwdaycount >0){
      
      generateWorkPlan(employeeData)


    }
  
    
   
  }
} catch (err) {
  console.log(err)
    return 0
}

function getMostViableDay(availableDaysList,days){
  let index=0;
  let mostViableDayCount=0
  let mostViableDayIndex=0
  let result=0
  let dayArray=0
  

  dayArray=days.map(dayName=>(dayName.day))
 for(let availableDay in availableDaysList){
   let indexInDayArray=findDayIndex(dayArray,availableDaysList[availableDay])
 
   if(days[indexInDayArray].employeeCount>mostViableDayCount){
     mostViableDayCount=days[indexInDayArray].employeeCount
     mostViableDayIndex=indexInDayArray
   }

 }

  
result =findDayIndex(availableDaysList,dayArray[mostViableDayIndex])
  return result

}

//Sort the employee array in id order

employees = employees.sort(function (a, b) {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
});
return tools.Json2ExcelWorkingPlan(employees)
}

//if error rerun the program



export default{
  generateWorkPlan
}