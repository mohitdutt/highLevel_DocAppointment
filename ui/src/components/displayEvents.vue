<template>
    <div class="">
        <span class="mt-2 float-left" @click="BackToForm()"><i class="fa fa-backward" aria-hidden="true"></i></span>
        <h3 class="text-danger">Booked Slots For {{selectedTimeZone}}</h3><br>
        <div class="container" v-if="events.length">
            <div class="col" v-for="column in columns" :key="column[0]">
                <div class="item-container" v-for="slot in column" :key="slot.split(',')[1]">{{slot.split(',')[1]}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data(){
        return{
            cols: 2,
        }
    },
    props:{
        selectedTimeZone: String
    },
  computed: {
      ...mapGetters({ // getting data from store getters
        events: 'events/events'
    }),
    columns () { // setting the UI for displaying slots
      let columns = []
      let mid = Math.ceil(this.events.length / this.cols)
      if(this.events.length>0){
          for (let col = 0; col < this.cols; col++) {
            columns.push(this.events.slice(col * mid, col * mid + mid))
        }
      }
      return columns
    }
  },
  methods:{
      BackToForm(){
          this.$emit('BackToFormValue', 1)
      }
  }
}
</script>

<style scoped>
    span{
        cursor: pointer;
    }
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
      padding: 5px;
      margin: 5px;
      cursor: pointer;
      color: #770615;
      border: 2px solid;
      border-radius: 20px;
      box-shadow: 0 4px #ab1b3c;
      background: #e8e1e3f7;
    }
    .item-container:hover{
      box-shadow: 0 0 black;
      background: none;
    }
    h3{
      text-decoration: underline;
    }
</style>