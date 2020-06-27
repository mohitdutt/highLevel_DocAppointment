<template>
    <div class="container">
        <h3 class="text-danger">Pick Date, TimeZone & Duration</h3><br>
        <div>
            <Datepicker v-model="date" class="float-left" name="uniquename"/>
        </div>
        <input class="float-right" v-model="input" placeholder="Time Slot in minutes">
        <select class="selectBox" v-model="selectedTimeZone" v-on:change="getTimeZone(selectedTimeZone)">
            <option 
                v-for="tz in timeZone" :key="tz.id"
                :selected="tz.id == 4"
                :value="tz.key">
                {{tz.name}}
            </option>
        </select>
        <button class="w-75 btn mt-3" @click="fetchFreeSlots">Get Free Slots</button>
        <div class="mt-5">
            <GetEvents />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import GetEvents from '@/components/getEvents';
import Datepicker from 'vuejs-datepicker';
export default {
    data(){
        return{
            date: new Date(),
            input: '30',
            timeZone: [
              { id:1, key: 'Australia/Brisbane', name: 'Australia' },
              { id:2, key: 'Asia/Shanghai', name: 'Shanghai' },
              { id:3, key: 'America/New_York', name: 'New York' },
              { id:4, key: 'Asia/Kolkata', name: 'India' }
            ],
            selectedTimeZone: ""
        }
    },
    props:{
        changeEvent: Number
    },
    computed:{
        ...mapGetters({
            timeSlot: 'slots/timeSlot', // getting time slots from store
        }),
        changeEventCase(){ // change event for updating slots
            return this.changeEvent;
        }
    },
    watch:{
        input: function(e){ // watching input change and saving data to store
            this.$store.state.slots.timeSlot = e.replace(/[^0-9.]/g, '');
        },
        changeEventCase(){ // watch updated
            if(this.changeEvent == 1){
                this.fetchFreeSlots();
                this.$emit("changeEventsAccepted", 0);
            }
        }
    },
    components: {
        Datepicker,
        GetEvents
    },
    methods:{
        ...mapActions({
            freeSlots: 'slots/getFreeSlots', // getting action from store
        }),
        fetchFreeSlots(){ // method for hitting store for getting all availbale slots
            const params = {date: this.date.toISOString(), timeZone: this.selectedTimeZone}
            this.freeSlots(params).then((response)=>{
                if(response){
                    // alert('Slots loaded successfully!');
                }
            })
        },
        getTimeZone(timeZone){ //timeZone selection
            this.selectedTimeZone = timeZone;
            this.$emit('Country', this.selectedTimeZone)
        }
    },
    mounted(){
        this.selectedTimeZone = this.timeZone.find(e=> e.name == 'India').key;
        this.$emit('Country', this.selectedTimeZone)
        this.fetchFreeSlots(); //fetching by default slots for India
    }
}
</script>

<style scoped>
    .selectBox{
        height: 30px;
        width: 150px;
    }
    button{
        border: 2px solid #999;
        background: #d3d3d361;
        border-radius: 15px;
        box-shadow: 0 4px #999;
    }
    button:hover{
      box-shadow: 0 0 black;
      background: content-box;
    }
    h3{
        text-decoration: underline;
    }
</style>