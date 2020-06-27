<template>
    <div class="container-fluid">
        <h1 class="text-monospace">Doctor's Appointment</h1><br>
        <div class="row mr-0 ml-0">
        <div class="col-6">
            <FetchSlots :changeEvent="changeEvent"
             @changeEventsAccepted="changeEventsAccepted"
             @Country="Country"/>
        </div>
        <div class="col-6">
            <CreateEvents @newSlots="newSlots" :countryName="countryName"/>
        </div>
    </div>
    </div>
</template>

<script>
import FetchSlots from '@/components/fetchSlots';
import CreateEvents from '@/components/createEvents';

export default {
    data(){
        return{
            changeEvent: 0,
            countryName: ""
        }
    },
    components: {
        FetchSlots,
        CreateEvents
  },
  methods:{
      newSlots(e){ //update slots change
          this.changeEvent = e;
      },
      changeEventsAccepted(e){ //update slots change
          this.changeEvent = e;
      },
      Country(e){
          this.countryName = e;
      }
  }
}
</script>

<style scoped>
</style>