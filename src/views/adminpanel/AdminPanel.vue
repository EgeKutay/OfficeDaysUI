 
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
        max-height="500px"
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
   
          <template slot="table-row" slot-scope="props">
      <span v-if="props.column.field == 'Monday'">
        <button >Edit</button>
        
      </span>
      <span v-else>
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
import initEmployeeConfig from "./InitEmployees"
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
      dayTypes:["R","NW","SW","UL","HR","ML"],
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
    

    
     this.rows = JSON.parse(JSON.stringify(initEmployeeConfig))
  },
  methods:{

<<<<<<< HEAD
 console.log(employees)
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
=======
    onCellClick(event){
      console.log(this.$refs["my-table"].selectedRows)
      console.log(event)
>>>>>>> 0c393fc5cc73d191f0f2e11bcff49906584d0656
    }
  }
}
</script>