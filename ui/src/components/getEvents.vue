<template>
    <div>
        <div v-if="showEvents">
            <div class="row">
                <div class="col-4">
                    <h5 class="text-danger">Start Date</h5>
                    <Datepicker v-model="startDate" class="text-center ml-4" name="uniquename"/>
                </div>
                <div class="col-4">
                    <h5 class="text-danger">End Date</h5>
                    <Datepicker v-model="endDate" class="text-center" name="uniquename2"/>
                </div>
                <div class="col-4">
                <h5 class="text-danger">TimeZone</h5>
                    <select class="selectBox" v-model="selectedTimeZone" v-on:change="getTimeZone(selectedTimeZone)">
                        <option 
                            v-for="tz in timeZone" :key="tz.id"
                            :selected="tz.id == 4"
                            :value="tz.key">
                            {{tz.name}}
                        </option>
                    </select>
                </div>
            </div>
            <button class="w-75 btn mt-3" @click="getAllEvents">Get All Events</button>
        </div>
        <div v-else>
            <DisplayEvents :selectedTimeZone="selectedTimeZone" @BackToFormValue="BackToFormValue"/>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import Datepicker from 'vuejs-datepicker';
import DisplayEvents from '@/components/displayEvents';
export default {
    data(){
        return{
            startDate: new Date(),
            endDate: new Date(),
            showEvents: true,
            timeZone: [
              { id:1, key: 'Australia/Brisbane', name: 'Australia' },
              { id:2, key: 'Asia/Shanghai', name: 'Shanghai' },
              { id:3, key: 'America/New_York', name: 'New York' },
              { id:4, key: 'Asia/Kolkata', name: 'India' }
            ],
            selectedTimeZone: ""
        }
    },
    components: {
        Datepicker,
        DisplayEvents
    },
    methods:{
        ...mapActions({ // retreive actions from the store
            events: 'events/getEvents',
        }),
        getAllEvents(){ //get All events
            const params = {startDate: this.startDate.toISOString(), endDate: this.endDate.toISOString(), timeZone:this.selectedTimeZone}
            if(params.startDate < params.endDate){
                alert("start date can not be lesser than end date")
            }
            this.events(params).then((response)=>{
                if(response){
                    if(response){
                        this.showEvents = false;
                        alert('All events fetched successfully!');
                    }
                }
            })
        },
        getTimeZone(timeZone){ //timeZone selection
            this.selectedTimeZone = timeZone;
        },
        BackToFormValue(){
            this.showEvents = true;
        }
    },
    mounted(){
        this.selectedTimeZone = this.timeZone.find(e=> e.name == 'India').key;
    }
}
</script>

<style scoped>
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
    .selectBox{
        height: 30px;
        width: 150px;
    }
</style>