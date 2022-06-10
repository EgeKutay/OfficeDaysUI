let dummydata = JSON.parse(JSON.stringify(require("@/localdb/config.json")))
let employees=dummydata["employees"]
let officeDayArr = [];
let replicateDays=dummydata["days"]


for(emp of employees) {
  let employeeObj = {
    id: "error",
    name: "Name",
    days:{
    monday: "R",
    tuesday: "R",
    wednesday: "R",
    thursday: "R",
    friday: "R",
    }
  };
  employeeObj["id"] = emp.id;
  employeeObj["name"] = emp.name;
  employeeObj["officedays"] = emp.nwdaycount;
  for (let j = 0; j < emp.offdays.nwdays.length; j++) {
    for (let k = 0; k < Object.keys(employeeObj["days"]).length; k++) {
      if (
        Object.keys(employeeObj["days"])[k].toLowerCase() ===emp.offdays.nwdays[j].toLowerCase()
      ) {
        employeeObj[`${Object.keys(employeeObj["days"])[k]}`] = "NW";
      } else if (employeeObj[`${Object.keys(employeeObj["days"])[k]}`] == "emp") {
        employeeObj[`${Object.keys(employeeObj["days"])[k]}`] = "SW";
      }
    }
  }
  for (let l = 0; l < emp.offdays.aldays.length; l++) {
    for (let k = 0; k < Object.keys(employeeObj["days"]).length; k++) {
      if (Object.keys(employeeObj["days"])[k].toLowerCase() ===emp.offdays.aldays[l].toLowerCase()){
        employeeObj[`${Object.keys(employeeObj["days"])[k]}`] = "AL";
      }
    }
  }
  for (let l = 0; l < emp.offdays.hrdays.length; l++) {
    for (let k = 0; k < Object.keys(employeeObj["days"]).length; k++) {
      if (Object.keys(employeeObj["days"])[k].toLowerCase() ===emp.offdays.hrdays[l].toLowerCase()){
        employeeObj[`${Object.keys(employeeObj["days"])[k]}`] = "HR";
      }
    }
  }
  for (let l = 0; l < emp.offdays.mldays.length; l++) {
    for (let k = 0; k < Object.keys(employeeObj["days"]).length; k++) {
      if (Object.keys(employeeObj["days"])[k].toLowerCase() ===emp.offdays.mldays[l].toLowerCase()){
        employeeObj[`${Object.keys(employeeObj["days"])[k]}`] = "ML";
      }
    }
  }
  for (let l = 0; l < emp.offdays.swdays.length; l++) {
    for (let k = 0; k < Object.keys(employeeObj["days"]).length; k++) {
      if (Object.keys(employeeObj["days"])[k].toLowerCase() ===emp.offdays.swdays[l].toLowerCase()){
        employeeObj[`${Object.keys(employeeObj["days"])[k]}`] = "SW";
      }
    }
  }
  for (let l = 0; l < emp.offdays.uldays.length; l++) {
    for (let k = 0; k < Object.keys(employeeObj["days"]).length; k++) {
      if (Object.keys(employeeObj["days"])[k].toLowerCase() ===emp.offdays.uldays[l].toLowerCase()){
        employeeObj[`${Object.keys(employeeObj["days"])[k]}`] = "UL";
      }
    }
  }
  for (let l = 0; l < emp.offdays.phdays.length; l++) {
    for (let k = 0; k < Object.keys(employeeObj["days"]).length; k++) {
      if (Object.keys(employeeObj["days"])[k].toLowerCase() ===emp.offdays.phdays[l].toLowerCase()){
        employeeObj[`${Object.keys(employeeObj["days"])[k]}`] = "PH";
      }
    }
  }
  for(let m=0;m<replicateDays.length;m++){
    if(replicateDays[m].employeeCount===0){
      for (let k = 0; k < Object.keys(employeeObj["days"]).length; k++) {
        if (Object.keys(employeeObj["days"])[k].toLowerCase() ===replicateDays[m].day.toLowerCase()){
          employeeObj[`${Object.keys(employeeObj["days"])[k]}`] = "PH";
        }
      }
    }
  }
  officeDayArr.push(employeeObj);
}

  module.exports = officeDayArr;