<template>
  <div>
    <b-card  style="border: 2px solid #9ABAFF;" title="Welcome to the Office Day Manager Application">
      <b-card-text>Manage and create office working plan for hybrid working models in business. </b-card-text>
      <b-card-text>You can manage or edit working plan from Working Plan section.</b-card-text>
    </b-card>

    <b-card  style="border: 2px solid #BBA9FF;" title="Want to auto-generate office working plan?">
      <b-card-text>Go to Admin Panel section configure employee(s) day type as you want then click on Generate Working Plan button.</b-card-text>
      
    </b-card>
     <b-card style="border: 2px solid #FFAAAA;" title="Having trouble to generate working plan?">
      <b-card-text>Make sure the sum of employee normal working count doesn't exceed the sum of available weekday count.  </b-card-text>
      <b-card-text>You can click on cells to manage the working plan of the employee(s) </b-card-text>
    </b-card>

  </div>
</template>

<script>
import { BCard, BCardText, BLink } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardText,
    BLink,
  },
}
</script>

<style>

</style>
