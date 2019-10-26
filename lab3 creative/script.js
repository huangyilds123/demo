
Vue.component('star-rating', VueStarRating.default)

console.log(moment());



let app = new Vue({
  el: '#app',
  
  
  data: {
    img:'',
    pressure : '', 
     humid:'',
     date: moment().format('MMMM Do YYYY'),
    name : '' ,
      tem : '', 
     value : 'Provo333', 
    cities: [],
    prefix: '',
    addedName: '',
    addedComment: '',
    comments: {},
    number: '',
    max: '',
    current: {
      title: '',
      img: '',
      alt: ''
    },
    loading: false,
  },
  
 
  
  
  methods: {
    fetchAPI() {
      console.log("In Fetch " + this.prefix);
      const url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.prefix + ",US&units=imperial" + "&APPID=1f62fad15bab6607c478c99e9b515cee";
      console.log("URL " + url);
      fetch(url)
        .then((data) => {
          return (data.json());
        })
        .then((json) => {
          console.log("json");
          console.log(json);
          this.tem = json.main.temp ; 
          this.tem += "°F" ; 
          this.name = json.name ; 
          this.humid = json.main.humidity ; 
          this.pressure = json.main.pressure; 
           this.img = "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png" ; 
        
          console.log("Got Citylist");
          console.log(this.prefix);
        });
    },
    
    
    fetchREST() {
      console.log(999999999999);
       var urls = "http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q=" + this.prefix;
      console.log("URL " + urls);
      fetch(urls)
        .then((data) => {
          console.log(1);
          return (data.json());
           
           
        })
        .then((citylist) => {
          console.log("CityList");
          console.log(citylist);
          this.cities = [];
          for (let i = 0; i < citylist.length; i++) {
            console.log(citylist[i].city);
            this.cities.push({ name: citylist[i].city });
          };
          console.log("Got Citylist");
        });
    },
  
    
    
    
    
    
    
    
    
     addComment() {
      if (!(this.number in this.comments))
        Vue.set(app.comments, this.number, new Array);
      this.comments[this.number].push({
        author: this.addedName,
        text: this.addedComment,
        date: moment().format('MMMM Do YYYY, h:mm:ss a'),
      });
      this.addedName = '';
      this.addedComment = '';
    },

  
  
  }
});