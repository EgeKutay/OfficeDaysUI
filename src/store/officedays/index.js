
import util from "@/auth/utils"
import config from "@/localdb/config.json"
let employees=config["employees"]
const state={
    changedExcelRows:[],
    excelRows:[],
    workingplan:[],
    changedWorkingPlan:[]
    

}

const getters={
    getChangedExcelRows(state){
      
    
        return state.changedExcelRows
    },
    getExcelRows(state){
       
        return state.excelRows
    },
    getWorkingPlan(state){
        return state.workingplan
    },
    getChangedWorkingPlan(state){
        return state.changedWorkingPlan
    }
    
  
}
const actions={
    updateChangedExcelRow(context,data){
        context.commit("setChangedExcelRow",data)
    },
    updateExcelRows(context,data){
        context.commit("setExcelRows",data)
    },
    updateChanges(context,data){
        context.commit("saveChanges",data)
    },
    updateWorkingPlan(context,data){
        context.commit("setWorkingPlan",data)
    },
    updateChangedWorkingPlan(context,data){
        context.commit("setChangedWorkingPlan",data)
    }
}
const mutations={
    setChangedWorkingPlan(state,data){
        let mappedids=state.changedWorkingPlan.map(object=>(object.id))
        
            if(mappedids.includes(data.id)){
                let index = state.changedWorkingPlan.findIndex((object)=>{
                    return object.id==data.id
                })
            state.changedWorkingPlan[index]=data
            }
            else{
                state.changedWorkingPlan.push(data)
            }
        },
    setChangedExcelRow(state,data){
let mappedids=state.changedExcelRows.map(object=>(object.id))

    if(mappedids.includes(data.id)){
        let index = state.changedExcelRows.findIndex((object)=>{
            return object.id==data.id
        })
    state.changedExcelRows[index]=data
    }
    else{
        state.changedExcelRows.push(data)
    }
    },
    setExcelRows(state,data){
        state.excelRows=data;
    },
    saveChanges(state,data){
        for(let empobj of state.changedExcelRows){
        let index= state.excelRows.findIndex((object)=>{
            return object.id==empobj.id
        })
        state.excelRows[index]=empobj
    }

    },
    setWorkingPlan(state,data){
        state.workingplan=JSON.parse(JSON.stringify(data))
    }

}
export default {
  state,
  getters,
  actions,
  mutations
}