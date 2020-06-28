<template>
    <div class="">
        <h3 class="text-danger">Available Slots For {{countryName}}</h3><br>
        <div class="container" v-if="slots.length">
            <div class="col" v-for="column in columns" :key="column[0]">
                <div class="item-container" v-for="slot in column" :key="slot.split(',')[1]" @click="createEvents(slot)">{{slot.split(',')[1]}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment'
export default {
    data(){
        return{
            cols: 2,
        }
    },
  computed: {
      ...mapGetters({ // getting data from store getters
        slots: 'slots/slots',
        timeSlot: 'slots/timeSlot',
    }),
    columns () { // setting the UI for displaying slots
      let columns = []
      let mid = Math.ceil(this.slots.length / this.cols)
      if(this.slots.length>0){
          for (let col = 0; col < this.cols; col++) {
        columns.push(this.slots.slice(col * mid, col * mid + mid))
      }
      }
      return columns
    }
  },
  props:{
      countryName: String
    },
  methods:{
      ...mapActions({ //actions retreiving from store
            events: 'events/createEvents',
      }),
      createEvents(slot){ //creating events
          const duration = this.timeSlot.replace(/ /g, "");
          if(!this.timeSlot.replace(/ /g, "")){
            alert("Please confirm Time Slot first")
          }else{
              const params = {slot, duration}
              // const allSlots = this.slots;
              const numberOfSlots = Math.ceil(params.duration / 30);
              const dt = new Date(params.slot);
              const endTime = dt.setMinutes(dt.getMinutes() + numberOfSlots * 30)
              const et = new Date(endTime);
              const f = et.toISOString();
              const abc = this.intervals(params.slot, f)
              const filtered = this.timeConversionAsPerTimeZone(abc, this.countryName);
              let x = []
              console.log(2, filtered)
              for(let i=0; i<this.slots.length; i++){
                  let index = filtered.indexOf(this.slots[i])
                  if(index>-1){
                      x.push(index)
                  }
              }
              if(x.length){
                this.events(params).then((response)=>{
                  
                  if(response){
                    console.log(9, response)
                    this.$emit('newSlots', 1)
                      alert('Slots loaded successfully!');
                  }
                })
              }else{
                alert('please select any other time slot')
              }
          }
      },
      intervals(startDate, endDate){
        const start = moment(startDate);
        const end = moment(endDate);
        start.minutes(Math.ceil(start.minutes() / 15) * 15);
        const result = [];
        const current = moment(start);
        while (current <= end) {
            result.push(current.toISOString());
            current.add(30, 'minutes');
        }
        return result;
      },
      timeConversionAsPerTimeZone(allSlots, timeZone){
        const filteredDate = []
        for (let i = 0; i < allSlots.length; i++) {
            const data = new Date(allSlots[i]).toLocaleString("en-US", { timeZone: timeZone });
            filteredDate.push(data);
        }
        return filteredDate
      }
  }
}
</script>

<style scoped>
    .container {
      display: flex;
    }
    .col {
      margin: 10px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    .item-container {
      border: 1px solid;
      padding: 5px;
      margin: 5px;
      cursor: pointer;
      color: darkgreen;
      border: 2px solid;
      border-radius: 20px;
      box-shadow: 0 4px #1a841a;
      background: #d6e4d6;
    }
    .item-container:hover{
      box-shadow: 0 0 black;
      background: none;
    }
    h3{
      text-decoration: underline;
    }
</style>