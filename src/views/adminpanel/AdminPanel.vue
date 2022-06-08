 
<template>
  <div>
    <!-- search input -->
    <b-card>
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
     
     @on-cell-click="onCellClick"
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
              :options="['5','10','20']"
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
      </template>
    </vue-good-table>
    </b-card-body>
    </b-card>
  </div>
</template>

<script>
import {
  BAvatar, BBadge, BPagination, BFormGroup,BCard,BCardBody, BFormInput, BFormSelect, BDropdown, BDropdownItem,
} from 'bootstrap-vue'

import store from '@/store/index'
let dummydata = JSON.parse(JSON.stringify(require("@/localdb/config.json")))
let employees=dummydata["employees"]
import employeeRows from "./EmployeeRows.vue"
import employeeConfig from "./InitEmployees"
import { findIndex, indexOf } from 'postcss-rtl/lib/affected-props'
export default {
  components: {
    
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BCard,
    BFormInput,
    BFormSelect,
    BCardBody,
    BDropdown,
    BDropdownItem,
    employeerows:employeeRows
  },
  data() {
    return {
     employeeCell:[{employee:{},dayClicked:0}],
      dayClicked:0,
      weekdays:["Monday","Tuesday","Wednesday","Thursday","Friday"],
      dayTypes:["R","NW","SW","UL","HR","ML","PH"],
      pageLength: 10,
      dir: false,
      columns: [
        {
          label: 'Id',
          field: 'Id',
           filterOptions: {
            enabled: true,
            placeholder: 'Search Date',
          },
        },
        {
          label: 'Name',
          field: 'Name',
           filterOptions: {
            enabled: true,
            placeholder: 'Search Date',
          },
        },
        {
          label: 'Monday',
          field: 'Monday',
           filterOptions: {
            enabled: true,
            placeholder: 'Search Date',
          },
        },
        {
          label: 'Tuesday',
          field: 'Tuesday',
           filterOptions: {
            enabled: true,
            placeholder: 'Search Date',
          },
        },
        {
          label: 'Wednesday',
          field: 'Wednesday',
           filterOptions: {
            enabled: true,
            placeholder: 'Search Date',
          },
        },
        {
          label: 'Thursday',
          field: 'Thursday',
           filterOptions: {
            enabled: true,
            placeholder: 'Search Date',
          },
        },
        {
          label:'Friday',
          field:'Friday',
           filterOptions: {
            enabled: true,
            placeholder: 'Search Date',
          },
        },
        {
          label:'Normal Work Day Count',
          field:'Officedays',
           filterOptions: {
            enabled: true,
            placeholder: 'Search Date',
          },
        }
      ],
      rows: [{Id: 20001, "Name": 'GOKHAN BINGOL', Monday: 'emp', Tuesday: 'SW', Wednesday: 'SW',Thursday:'SW',Friday:'HR'}],
      searchTerm: '',
      status: [{
        1: 'Current',
        2: 'Professional',
        3: 'Rejected',
        4: 'Resigned',
        5: 'Applied',
      },
      {
        1: 'light-primary',
        2: 'light-success',
        3: 'light-danger',
        4: 'light-warning',
        5: 'light-info',
      }],
    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Current      : 'light-primary',
        Professional : 'light-success',
        Rejected     : 'light-danger',
        Resigned     : 'light-warning',
        Applied      : 'light-info',
        /* eslint-enable key-spacing */
      }

      return status => statusColor[status]
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  created(){
    console.log(employeeConfig)
     let mappedarr=employeeConfig.map((key)=>{
       return {
         Id:key.Id,
         Name:key.Name,
         Officedays:key.Officedays,
         Monday:key.days.Monday,
          Tuesday:key.days.Tuesday,
          Wednesday:key.days.Wednesday,
          Thursday:key.days.Thursday,
          Friday:key.days.Friday,

         }
     })
  console.log(mappedarr)
     this.rows = mappedarr
     for(let employee of employeeConfig){
       this.employeeCell.push({employee:employee.Id,dayClicked:0})
     }
  },
  methods:{
    onCellClick(event){
let selectedRows=JSON.parse(JSON.stringify(this.$refs["my-table"].selectedRows))
if(selectedRows.length>0)
      if(this.weekdays.includes(event.column.field)){
      let theIndex = employeeConfig.findIndex((obj)=>{
        return obj.Id===event.row.Id
      })
      this.employeeCell.push()
  employeeConfig[theIndex][event.column.field]=this.dayTypes[this.dayClicked]
  this.dayClicked++
  console.log(this.dayClicked)
  console.log(employeeConfig[theIndex][event.column.field])
   //this.rows = mappedarr
     if(this.dayClicked>=this.dayTypes.length){
   this.dayClicked=0;
   }
      }
    },
    getCellClass(props){
    
     for(let day of this.weekdays){
       if(props.column.field===day){
             if(props.row[day]==="NW"){
         return "blueCell"
        }
         else if(props.row[day]==="R"){
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
      /*
      for(let day of this.weekdays){
       
    
          
      }*/
  
    },
  }
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
  background: rgb(255, 255, 0);
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