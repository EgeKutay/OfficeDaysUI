const configFile=JSON.parse(JSON.stringify(require("../localdb/config.json")))
/** requires an jsonmodel */
function Json2ExcelFormat(jsonmodel){
//excel format means the data model is ready to exported to excel
//this function will convert default config file to excel
 
let employees=jsonmodel
let mappedArr=employees.map((key)=>{
    let days={
    Monday: "R",
    Tuesday: "R",
    Wednesday: "R",
    Thursday: "R",
    Friday: "R",
    }
  for( let dayType in key.offdays){
    
     if(key.offdays[dayType].length>0){
         for(let day of key.offdays[dayType]){
            days[day]=dayType.substring(0,2).toUpperCase()
         }
        }
  }
    return {
        Id:key.id,
        Name:key.name,
        Officedays:key.nwdaycount,
        ...days
    }

})

console.log(mappedArr)

return mappedArr
}
/**@param excelmodel
 *
 * */
function Excel2JsonFormat(excelmodel){
    //this function will convert excel model to default config
    
    let mappedArr=excelmodel.map((key)=>{
        
        offdays={nwdays:[],aldays:[],hrdays:[],uldays:[],swdays:[],mldays:[],phdays:[]}
     key=getDaysObject(key)
        for(let day in key.offdays){
           
            for(let dkey in offdays){
                if(dkey.substring(0,2).toUpperCase()==key.offdays[day]){
                   offdays[`${dkey.substring(0,2).toLowerCase()}days`].push(day)
                   
                }
            }
            
        }
        return {
            id:key.Id,
            name:key.Name,
            nwdaycount:key.Officedays,
            offdays:offdays
        }
       
    
    
    })
    return mappedArr
}
/**param as an employeeobject  */
function getDaysObject(empobj){
    
    let days=["Monday","Tuesday","Wednesday","Thursday","Friday"]
    let offdays={}
  for(key in empobj){
      if(days.includes(key)){
          offdays[key]=empobj[key]
      }
  }
  let resultObj={Id:empobj.Id,Name:empobj.Name,Officedays:empobj.Officedays,offdays}
  
  return resultObj

}


export default{
    Json2ExcelFormat,
    Excel2JsonFormat,
    getDaysObject

}