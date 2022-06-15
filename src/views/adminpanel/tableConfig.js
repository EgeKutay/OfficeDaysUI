import dateFormatter from "@/tools/dateFormatter"
let columns=[
    {
     sortable:false,
      label: 'Id',
      field: 'id',
       filterOptions: {
        enabled: true,
        placeholder: 'Search Id',
      },
    },
    {
      label: 'Name',
      field: 'name',
       filterOptions: {
        enabled: true,
        placeholder: 'Search Name',
      },
    },
    {
      label: `${dateFormatter.getDate(7)} Monday` ,
      field: 'monday',
       filterOptions: {
        enabled: true,
        placeholder: 'Search Type',
      },
    },
    {
      label: `${dateFormatter.getDate(8)} Tuesday` ,
      field: 'tuesday',
       filterOptions: {
        enabled: true,
        placeholder: 'Search Type',
      },
    },
    {
      label: `${dateFormatter.getDate(9)} Wednesday` ,
      field: 'wednesday',
       filterOptions: {
        enabled: true,
        placeholder: 'Search Type',
      },
    },
    {
      label: `${dateFormatter.getDate(10)} Thursday` ,
      field: 'thursday',
       filterOptions: {
        enabled: true,
        placeholder: 'Search Type',
      },
    },
    {
      label: `${dateFormatter.getDate(11)} Friday`,
      field:'friday',
       filterOptions: {
        enabled: true,
        placeholder: 'Search Type',
      },
    },
    {
      sortable:false,
      label:'Normal Work Day Count',
      field:'nwdaycount',
       filterOptions: {
        enabled: true,
        placeholder: 'Search Count',
      },
    }
  ]
  export default{
      columns

  }