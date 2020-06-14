<template>
  <v-container>
    <v-alert v-if="hasError" type="error">{{errorMessage}}</v-alert>
    <v-layout>
      <v-flex>
        <v-row>
         <v-col cols="4">
            <v-text-field
              label="ID"
              v-model="tradeId">
            </v-text-field>
            <v-text-field
              label="Version"
              v-model="tradeVersion">
            </v-text-field>
            <v-text-field
              label="Country Party ID"
              v-model="countryPartyId">
            </v-text-field>
            <v-text-field
              label="Book ID"
              v-model="bookId">
            </v-text-field>
            <v-text-field
              label="Maturity Date"
              v-model="maturityDate">
            </v-text-field>
            <v-checkbox v-model="expired" class="mx-2" label="Expired"></v-checkbox>
            <div class="my-2">
             <v-btn depressed small color="primary"  @click.prevent="submitTrade">Submit Trade</v-btn>
            </div>
            <br/>
          </v-col>
          </v-row>
          <v-row>
          <v-col cols="12">
          <v-flex>
            <v-data-table
              :headers="headers"
              :items="trades"
              class="elevation-1"
            >
            </v-data-table>
          </v-flex>
           </v-col>
          </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const axios = require('axios').default;
export default {
  name: 'create',
  data: () => ({
    errorMessage: "",
    hasError: false,
    tradeId: null,
    tradeVersion: null,
    countryPartyId: null,
    bookId: null,
    maturityDate: null,
    expired: false,
    headers: [
          {
            text: 'Trades',
            align: 'left',
            sortable: false,
          },
          { text: 'ID', value: 'tradeId' },
          { text: 'Version', value: 'tradeVersion' },
          { text: 'Version', value: 'tradeVersion' },
          { text: 'CountryPartyId', value: 'countryPartyId' },
          { text: 'BookId', value: 'bookId' },
          { text: 'MaturityDate', value: 'maturityDateFormatted' },
          { text: 'CreatedDate', value: 'createdDateFormatted' },
          { text: 'Expired', value: 'expired' },
        ],
        trades: []

  }),
    methods:{
     submitTrade: function(evt){
      this.hasError = false
      this.errorMessage = ""
      if (this.tradeId == null){
        this.hasError = true
        this.errorMessage = "ID is required"
        return
      }
      if (this.tradeVersion == null){
        this.hasError = true
        this.errorMessage = "Version is required"
        return
      }
      if (!/^\+?\d+$/.test(this.tradeVersion)){
        this.hasError = true
        this.errorMessage = "Version must have only digits"
        return
      }
      if (this.countryPartyId == null){
        this.hasError = true
        this.errorMessage = "countryPartyId is required"
        return
      }
      if (this.bookId == null){
        this.hasError = true
        this.errorMessage = "bookId is required"
        return
      }
      if (this.maturityDate == null){
        this.hasError = true
        this.errorMessage = "maturityDate is required"
        return
      }
      const dataStr  = '{"tradeId": "'+this.tradeId+'", "tradeVersion": '+this.tradeVersion+', "countryPartyId": "'+this.countryPartyId+'", "bookId": "'+this.bookId+'", "maturityDate": "'+this.maturityDate+'", "expired" : "'+this.expired+'"}'
      console.log(dataStr);
        axios({
        method: 'post',
        url: '/api/v1/trade',
        responseType: 'json',
        data: dataStr,
        headers: { 'content-type': 'application/json'},
      }).then(response => {
         if (response.data.status == "1"){
          this.hasError = true
          this.errorMessage = JSON.stringify(response.data.message) 
         }else{
            this.loadTrades() 
            this.tradeId =  null,
            this.tradeVersion =  null
            this.countryPartyId = null
            this.bookId = null
            this.maturityDate = null
            this.expired = false
         }
         
      }).catch(error =>  {
          console.log(error);
          this.hasError = true
          this.errorMessage = error+" "+JSON.stringify(error.response) 
      });
      
     },
      loadTrades () {
        this.trades = []
        axios({
          method: 'get',
          url: '/api/v1/trade',
          responseType: 'json',
        }).then(response => {
          if (response.data.status == "1"){
            this.hasError = true
            this.errorMessage = JSON.stringify(response.data.messahe) 
            this.loading = false
          }else{
              this.trades =response.data.payload()
          }
        }).catch(error =>  {
            console.log(error);
            this.hasError = true
            this.errorMessage = error+" "+JSON.stringify(error.response) 
            this.loading = false
        });
      }
  },
  created() {
    this.loadTrades()
  }, 

};
</script>
