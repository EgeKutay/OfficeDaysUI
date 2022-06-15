 
<template>
  <div>
    <!-- search input -->
    <b-card>
    <b-button variant="primary" @click="GenerateWorkingPlan">Generate Working Plan</b-button>
    <b-button variant="success" style="margin-left:20px">Save Default</b-button>
    <b-card-body>
    <div class="custom-search d-flex justify-content-end">
      <b-form-group>
        <div class="d-flex align-items-center">
          <label class="mr-1">Search</label>
          <b-form-input
            v-model="searchTerm"
            placeholder="Search"
            type="text"
            class="d-inline-block"
          />
        </div>
      </b-form-group>
    </div>


    <!-- table -->
    <vue-good-table
    ref="my-table"
      :columns="columns"
      :rows="rows"
      
     @on-page-change="saveData"
     @on-per-page-changed="saveData"
     @on-cell-click="onCellClick"
     @on-sort-change="saveData"
     @filter-changed="saveData"
     @on-column-filter="saveData"
   
      :search-options="{
        enabled: true,
        externalQuery: searchTerm }"
      :select-options="{
        enabled: true,
        selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
        selectionInfoClass: 'custom-class',
        selectionText: 'rows selected',
        clearSelectionText: 'clear',
        disableSelectInfo: true, // disable the select info panel on top
        selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
      }"
      :pagination-options="{
        enabled: true,
        perPage:pageLength
      }"
     theme="nocturnal">
   
      <template slot="table-row" slot-scope="props" >
        <div v-for="day in weekdays"  >
      <span v-if="props.column.field ==day" >
       <span class="wrap" >
          <span :class="getCellClass(props)"  >
            <br>

             {{props.row[day]}}
      
          </span>
          
        </span> 
      </span>
            </div>
      <span >
        {{props.formattedRow[props.column.field]}}
      </span>
    </template>
   

      <!-- pagination -->
    
      <template
        slot="pagination-bottom"
        slot-scope="props"
      >
        <div class="d-flex justify-content-between flex-wrap">
          
          <div class="d-flex align-items-center mb-0 mt-1">
            <span class="text-nowrap ">
              Showing 1 to
            </span>
            <b-form-select
              v-model="pageLength"
              :options="['5','10','20','50','100']"
              class="mx-1"
              @input="(value)=>props.perPageChanged({currentPerPage:value})"
            />
            <span class="text-nowrap"> of {{ props.total }} entries </span>
          </div>
         
          <div>
           
            <b-pagination
              :value="1"
              :total-rows="props.total"
              :per-page="pageLength"
              first-number
              last-number
              align="right"
              prev-class="prev-item"
              next-class="next-item"
              class="mt-1 mb-0"
              @input="(value)=>props.pageChanged({currentPage:value})"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>
          </div>
        </div>
        <b-row>
          <b-col
      md="2"
      xl="2"
      class="mb-1"
    >
          </b-col>
              <b-col
      md="1"
      xl="1"
      class="mb-1"
    >

      <!-- basic -->
      <b-form-group
        label="Basic Input"
        label-for="basicInput"
      >
        <b-form-input
          id="basicInput"
          placeholder="Enter Email"
        />
      </b-form-group>
    </b-col>
     <b-col
      md="1"
      xl="1"
      class="mb-1"
    >

      <!-- basic -->
      <b-form-group
        label="Basic Input"
        label-for="basicInput"
      >
        <b-form-input
          id="basicInput"
          placeholder="Enter Email"
        />
      </b-form-group>
    </b-col>
     <b-col
      md="1"
      xl="1"
      class="mb-1"
    >

      <!-- basic -->
      <b-form-group
        label="Basic Input"
        label-for="basicInput"
      >
        <b-form-input
          id="basicInput"
          placeholder="Enter Email"
        />
      </b-form-group>
    </b-col>
     <b-col
      md="1"
      xl="1"
      class="mb-1"
    >

      <!-- basic -->
      <b-form-group
        label="Basic Input"
        label-for="basicInput"
      >
        <b-form-input
          id="basicInput"
          placeholder="Enter Email"
        />
      </b-form-group>
    </b-col>
     <b-col
      md="1"
      xl="1"
      class="mb-1"
    >

      <!-- basic -->
      <b-form-group
        label="Basic Input"
        label-for="basicInput"
      >
        <b-form-input
          id="basicInput"
          placeholder="Enter Email"
        />
      </b-form-group>
    </b-col>
        </b-row>
      </template>
    </vue-good-table>
    </b-card-body>
    </b-card>
  </div>
</template>

<script>
import {
  BAvatar, BBadge, BPagination, BFormGroup,BCard,BCardBody, BFormInput, BFormSelect, BDropdown, BDropdownItem,BButton,BRow,BCol
} from 'bootstrap-vue'

import store from '@/store/index'


import tableConfig from "./tableConfig.js"

import employeeConfig from "./InitEmployees"
import { findIndex, indexOf } from 'postcss-rtl/lib/affected-props'
import appConfig from "@/appConfig"
import tools from "@/tools/modelTransformer"
import workingPlan from "@/tools/workingPlanGenerator"
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import dateFormatter from "@/tools/dateFormatter"
export default {
  components: {
    ToastificationContent,
    BRow,
    BCol,
    BAvatar,
    BBadge,
    BButton,
    BPagination,
    BFormGroup,
    BCard,
    BFormInput,
    BFormSelect,
    BCardBody,
    BDropdown,
    BDropdownItem,
    
  },
  beforeDestroy(){
    this.saveData()
  },
  data() {
    return {
      weekCount:0,
    employees:[],
     employeeCell:[],
     dayCell:[],
      dayClicked:0,
      weekdays:appConfig["weekdays"],
      dayTypes:appConfig["dayTypes"],
      pageLength: 10,
      dir: false,
      columns:tableConfig["columns"],
      rows: [],
      searchTerm: '',
    }
  },
  computed: {
  },
  created(){
    this.weekCount=dateFormatter.getNextWeekNumber()
   if(this.$store.getters.getExcelRows<1){
  let config = JSON.parse(JSON.stringify(require("@/localdb/config.json")))
this.employees=tools.Json2ExcelFormat(config["employees"])
  this.$store.dispatch("updateExcelRows",this.employees)
   }
   console.log(this.$store.getters.getExcelRows)
    this.rows = this.$store.getters.getExcelRows
     for( let employee of this.rows){
       employee.vgtSelected=false //reset select boxes
       //this is needed to keep track for cells clicked by user
       this.employeeCell.push({
         id:employee.id,
         days:{monday:0,tuesday:0,wednesday:0,thursday:0,friday:0}//this number can change between 0-6
         })
     }
  },
  methods:{
    validateChange(event){
      let employees=this.$store.getters.getExcelRows
     
     let empIndex=employees.findIndex((object)=>{
       return object.id==event.row.id
     })

    },
    onCellClick(event){
    /*if(!this.validateChange(event)){
    return
    }*/
    if(this.weekdays.includes(event.column.field)){
      if(this.$refs["my-table"].selectedRows.length>0){
         if(!this.$refs["my-table"].selectedRows.includes(event.row)){
          this.changeCellDayType(event)
         }
         else{
        this.changeSelectedCells(this.$refs["my-table"].selectedRows,event)
         }
      
      }
      else{
      this.changeCellDayType(event)
      
      }
    }
    else if(event.column.field.toLowerCase()==="nwdaycount"){
      this.changeNWDayCount(event)
    }
    else{
      this.selectRow(event)
    }
  },
    changeSelectedCells(rows,event){
          let findIndex=this.employeeCell.findIndex((object)=>{
              return object.id===event.row.id
            })
          let dayIndex = this.weekdays.findIndex((object)=>{return object===event.column.field})
           this.employeeCell[findIndex].days[this.weekdays[dayIndex]]++
           if(this.employeeCell[findIndex].days[this.weekdays[dayIndex]]>=this.dayTypes.length){
              this.employeeCell[findIndex].days[this.weekdays[dayIndex]]=0
           }
     for(let row of rows){
       let rowIndex=this.rows.findIndex((object)=>{
         return row.id===object.id
       })
      // this.rows[rowIndex][this.weekdays[dayIndex]]=this.dayTypes[this.employeeCell[findIndex].days[this.weekdays[dayIndex]]]
      this.$store.dispatch("updateChangedExcelRow",row)
       row[event.column.field]=this.dayTypes[this.employeeCell[findIndex].days[this.weekdays[dayIndex]]]
      
     }
    

  },
      changeCellDayType(event){
        
        for(let day of this.weekdays){
          if(event.column.field === day){
            let rowIndex=this.rows.findIndex((object)=>{
              return object.id===event.row.id
            })
            let findIndex=this.employeeCell.findIndex((object)=>{
              return object.id===event.row.id
            })
          this.employeeCell[findIndex].days[day]++
           if( this.employeeCell[findIndex].days[day]>=this.dayTypes.length){
                this.employeeCell[findIndex].days[day]=0
            }
            this.$store.dispatch("updateChangedExcelRow",event.row)
            event.row[day]=this.dayTypes[this.employeeCell[findIndex].days[day]]
            //this.rows[rowIndex][day]=this.dayTypes[this.employeeCell[findIndex].days[day]]
          }
        }
      },
     changeNWDayCount(event){
       event.row.nwdaycount++
       this.$store.dispatch("updateChangedExcelRow",event.row)
       if(event.row.nwdaycount>5){
         event.row.nwdaycount=0
       }
     },
     saveData(event){
      let empRows=this.$store.getters.getExcelRows
      let changedEmpRows=this.$store.getters.getChangedExcelRows
      for(let changedRow of changedEmpRows){
        
        let index=empRows.findIndex((object)=>{
          return object.id===changedRow.id
        }
        )
        empRows[index]=changedRow
      }
      this.$store.dispatch("updateExcelRows",empRows)
      this.rows=JSON.parse(JSON.stringify(this.$store.getters.getExcelRows))
     },
     selectRow(event){
    // this.$set(event.row,'vgtSelected',true)
      this.$refs["my-table"].onCheckboxClicked(event.row,event.rowIndex,event)
     },
  async GenerateWorkingPlan(){
        this.saveData()
  let exceldata=JSON.parse(JSON.stringify(this.$store.getters.getExcelRows))
  let jsondata=tools.Excel2JsonFormat(exceldata)
  let response
  for(let tryCount=0;tryCount<appConfig["tryCount"];tryCount++){
    response= await workingPlan.generateWorkPlan(jsondata)
  if(response){
    break;
  }
  console.log(tryCount)
  }
  if(!response){
      this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Failed to generate the office working plan...',
                icon: 'EditIcon',
                variant: 'danger',
              },
    })
  }
  else{
      this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Successfully generated the office working plan',
                icon: 'EditIcon',
                variant: 'success',
              },
            })
      this.$store.dispatch("updateWorkingPlan",response)
      this.$router.replace({name:"working-plan"})
}


    },
    getCellClass(props){
     for(let day of this.weekdays){
        if(props.column.field===day){
              if(props.row[day]==="NW"){
          return "blueCell"
          }
          else if(props.row[day]==="RM"){
          return "cyanCell"
          }
            else if(props.row[day]==="SW"){
          return "pinkCell"
          }
          else  if(props.row[day]==="AL"){
            return "yellowCell"
          }
          else  if(props.row[day]==="UL"){
            return "purpleCell"
          }
          else  if(props.row[day]==="ML"){
            return "orangeCell"
          }
          else  if(props.row[day]==="PH"){
          return "goldCell"
          }
            else  if(props.row[day]==="HR"){
            return "greenCell"
          }

        }
      }
    },
 
  },
    
   
    
}


</script>
<style scoped>
.wrap{
  display: inline-block;
 position: sticky;
  width:100%;
    text-align:center
    
}

.blueCell{
  background: rgb(136, 221, 255);
  color: white;
  position: absolute;
  left: -0.75rem;
  right: -0.75rem;
  top: -2.00rem;
  bottom: -2.8rem;
  padding: 0.0rem;
}
.pinkCell{
  background: rgb(210, 180, 220);
  color: white;
  position: absolute;
  left: -0.75rem;
  right: -0.75rem;
  top: -2.00rem;
  bottom: -2.8rem;
  padding: 0.0rem;
}
.yellowCell{
  background: rgb(220, 220, 0);
  color: white;
  position: absolute;
  left: -0.75rem;
  right: -0.75rem;
  top: -2.00rem;
  bottom: -2.8rem;
  padding: 0.0rem;
}
.purpleCell{
  background: rgb(100, 0, 255);
  color: white;
  position: absolute;
  left: -0.75rem;
  right: -0.75rem;
  top: -2.00rem;
  bottom: -2.8rem;
  padding: 0.0rem;
}
.orangeCell{
  background: rgb(255, 150, 0);
  color: white;
  position: absolute;
  left: -0.75rem;
  right: -0.75rem;
  top: -2.00rem;
  bottom: -2.8rem;
  padding: 0.0rem;
}
.goldCell{
  background: rgb(255, 200, 0);
  color: white;
  position: absolute;
  left: -0.75rem;
  right: -0.75rem;
  top: -2.00rem;
  bottom: -2.8rem;
  padding:0.0rem;
}
.greenCell{
  background: rgb(0, 194, 48);
  color: white;
  position: absolute;
  left: -0.75rem;
  right: -0.75rem;
  top: -2.00rem;
  bottom: -2.8rem;
  padding: 0.0rem;
}
.cyanCell{
  background: rgb(0, 200, 200);
  color: white;
  position: absolute;
  left: -0.75rem;
  right: -0.75rem;
  top: -2.00rem;
  bottom: -2.8rem;
  padding: 0.0rem;
}

</style>