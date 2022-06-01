let dummydata = JSON.parse(JSON.stringify(require("@/localdb/config.json")))
let employees=dummydata["employees"]
let officeDayArr = [];
let replicateDays=dummydata["days"]


  for(let emp of employees) {
     
    let employeeObj = {
      Id: "error",
      Name: "Name",
      Monday: "R",
      Tuesday: "R",
      Wednesday: "R",
      Thursday: "R",
      Friday: "R",
    };
    employeeObj["Id"] = emp.id;
    employeeObj["Name"] = emp.name;
    employeeObj["Officedays"] = emp.nwdaycount;
    for (let j = 0; j < emp.nwdays.length; j++) {
      for (let k = 0; k < Object.keys(employeeObj).length; k++) {
        if (
          Object.keys(employeeObj)[k].toLowerCase() ===emp.nwdays[j].toLowerCase()
        ) {
          employeeObj[`${Object.keys(employeeObj)[k]}`] = "NW";
        }
      }
    }
    for (let l = 0; l < emp.offdays.aldays.length; l++) {
      for (let k = 0; k < Object.keys(employeeObj).length; k++) {
        if (Object.keys(employeeObj)[k].toLowerCase() ===emp.offdays.aldays[l].toLowerCase()){
          employeeObj[`${Object.keys(employeeObj)[k]}`] = "AL";
        }
      }
    }
    for (let l = 0; l < emp.offdays.hrdays.length; l++) {
      for (let k = 0; k < Object.keys(employeeObj).length; k++) {
        if (Object.keys(employeeObj)[k].toLowerCase() ===emp.offdays.hrdays[l].toLowerCase()){
          employeeObj[`${Object.keys(employeeObj)[k]}`] = "HR";
        }
      }
    }
    for (let l = 0; l < emp.offdays.mldays.length; l++) {
      for (let k = 0; k < Object.keys(employeeObj).length; k++) {
        if (Object.keys(employeeObj)[k].toLowerCase() ===emp.offdays.mldays[l].toLowerCase()){
          employeeObj[`${Object.keys(employeeObj)[k]}`] = "ML";
        }
      }
    }
    for (let l = 0; l < emp.offdays.swdays.length; l++) {
      for (let k = 0; k < Object.keys(employeeObj).length; k++) {
        if (Object.keys(employeeObj)[k].toLowerCase() ===emp.offdays.swdays[l].toLowerCase()){
          employeeObj[`${Object.keys(employeeObj)[k]}`] = "SW";
        }
      }
    }
    for (let l = 0; l < emp.offdays.uldays.length; l++) {
      for (let k = 0; k < Object.keys(employeeObj).length; k++) {
        if (Object.keys(employeeObj)[k].toLowerCase() ===emp.offdays.uldays[l].toLowerCase()){
          employeeObj[`${Object.keys(employeeObj)[k]}`] = "UL";
        }
      }
    }
    for(let m=0;m<replicateDays.length;m++){
      if(replicateDays[m].employeeCount===0){
        for (let k = 0; k < Object.keys(employeeObj).length; k++) {
          if (Object.keys(employeeObj)[k].toLowerCase() ===replicateDays[m].day.toLowerCase()){
            employeeObj[`${Object.keys(employeeObj)[k]}`] = "PH";
          }
        }
      }
    }
    officeDayArr.push(employeeObj);
  }

  module.exports = officeDayArr;