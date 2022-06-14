const configFile=JSON.parse(JSON.stringify(require("../localdb/config.json")))
/** requires an jsonmodel (the employee config file)*/
function Json2ExcelFormat(jsonmodel){
//excel format means the data model is ready to exported to excel
//this function will convert default config file to excel
 
let employees=jsonmodel

let mappedArr=employees.map((key)=>{
   
   let days={
    monday: "RM",
    tuesday: "RM",
    wednesday: "RM",
    thursday: "RM",
    friday: "RM",
    }
  for( let dayType in key.offdays){
    if(dayType.length>0){
         for(let day of key.offdays[dayType]){
            days[day.toLowerCase()]=dayType.substring(0,2).toUpperCase()
        }
    }
  }
    return {
        id:key.id,
        name:key.name,
        nwdaycount:key.nwdaycount,
        ...days
    }

})



return mappedArr
}
/**@param jsonmodel
 *
 * */
function Json2ExcelWorkingPlan(jsonmodel){
    //excel format means the data model is ready to exported to excel
//this function will convert default config file to excel
 
let employees=jsonmodel

let mappedArr=employees.map((key)=>{
   
   let days={
    monday: "SW",
    tuesday: "SW",
    wednesday: "SW",
    thursday: "SW",
    friday: "SW",
    }
  for( let dayType in key.offdays){
    if(dayType.length>0){
         for(let day of key.offdays[dayType]){
            days[day.toLowerCase()]=dayType.substring(0,2).toUpperCase()
        }
    }
  }
    return {
        id:key.id,
        name:key.name,
        nwdaycount:key.nwdaycount,
        ...days
    }

})



return mappedArr
    

}
/**@param excelmodel
 *
 * */
function Excel2JsonFormat(excelmodel){
    //this function will convert excel model to default config
    let mappedArr=excelmodel.map((key)=>{
     let offdays={nwdays:[],aldays:[],hrdays:[],uldays:[],swdays:[],mldays:[],phdays:[]}
     key=getDaysObject(key)
        for(let day in key.offdays){
            for(let dkey in offdays){
                if(dkey.substring(0,2).toUpperCase()==key.offdays[day]){
                   offdays[`${dkey.substring(0,2).toLowerCase()}days`].push(day)   
                }
            }
        }
        return {
            id:key.id,
            name:key.name,
            nwdaycount:key.nwdaycount,
            offdays:offdays
        }
    })
    return mappedArr
}
/**param as an employeeobject  */
function getDaysObject(empobj){
    
    let days=["monday","tuesday","wednesday","thursday","friday"]
    let offdays={}
  for(let key in empobj){
      if(days.includes(key)){
          offdays[key]=empobj[key]
      }
  }
  let resultObj={id:empobj.id,name:empobj.name,nwdaycount:empobj.nwdaycount,offdays}
  
  return resultObj

}


export default{
    Json2ExcelFormat,
    Excel2JsonFormat,
   
    Json2ExcelWorkingPlan

}