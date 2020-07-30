<template>
  <div id="app" @mousemove="this.mouseMove">
    <div class="content">
      <h1 class="title text-white">Asteroids of the day</h1>
      <div class="date-container">
        <DateSelector
          @onMount="fetchForDates"
          @dateChanged="dateChanged"
        />
      </div>
      <div class="asteroid-chart-container">
        <AsteroidChart :asteroids="asteroidsForDate"
          v-if="this.asteroidsForDate"
          @hoverOn="hoverOn"
          @hoverOff="hoverOff"/>
        <AsteroidChart v-else/>
        <Tooltip :pointer="this.pointer" :asteroid="selectedAsteroid"></Tooltip>
      </div>
    </div>
    <div class="right-sidebar">
      <h1 class="title text-white">Brightest of the week</h1>
    </div>
  </div>
</template>

<script>
import DateSelector from './components/DateSelector.vue'
import AsteroidChart from './components/AsteroidChart.vue'
import Tooltip from './components/Tooltip.vue'
import * as C from './constants'
import Asteroid from './models/Asteroid'

export default {
  name: 'App',
  data () {
    return {
      asteroids: undefined,
      selectedDate: undefined,
      pointer: {x: -300, y: -300},
      selectedAsteroid: undefined
    }
  },
  computed: {
    asteroidsForDate () {
      if (!this.asteroids) {
        return undefined
      }
      const returnVal = this.asteroids[C.NASA_API.methods.formatDate(this.selectedDate)]
      return returnVal
    }
  },
  methods: {
    fetchForDates (datesArr) {
      this.selectedDate = datesArr[0]
      const params = {
        start_date: C.NASA_API.methods.formatDate(datesArr[0]),
        end_date: C.NASA_API.methods.formatDate(datesArr[datesArr.length - 1]),
        api_key: C.NASA_API.apiKey
      }
      const paramString = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&')

      fetch(`${C.NASA_API.baseUrl}${C.NASA_API.endpoints.neoAsteroids}?${paramString}`)
        .then(response => response.json())
        .then(data => {
          const parsedData = {}
          for (const key in data.near_earth_objects) {
            parsedData[key] = data.near_earth_objects[key].map(d => new Asteroid(d))
          }
          return parsedData
        })
        .then(data => {
          this.asteroids = data
        })
        .catch(e => console.log(e))
    },
    dateChanged (date) {
      this.selectedDate = date
    },
    hoverOn (data) {
      this.selectedAsteroid = data
    },
    hoverOff () {
      this.selectedAsteroid = undefined
    },
    mouseMove (e) {
      this.pointer = { x: e.clientX, y: e.clientY }
    }
  },
  components: {
    DateSelector,
    AsteroidChart,
    Tooltip
  }
}
</script>

<style lang="scss">
@import './constants.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $highlight-color;
  margin: 0px;
  height: 100vh;
  background: $bg-color;
  padding: 15px;
  display: flex;

  & > * {
    padding: 0px 15px;
  }
  .content {
    flex: 3;
    display: flex;
    flex-direction: column;
    .date-container {
      margin-bottom: 20px;
    }
    .asteroid-chart-container {
      flex-grow: 1;
    }
  }
  .right-sidebar {
    flex: 1;
    border-left: solid 1px white;
  }
  .title {
    text-align: left;
    margin-top: 0px;
    margin-bottom: 20px;
  }
  .text-white {
    color: white;
  }

  h1, h2, h3, h4, h5, h6, p, div {
    @extend .text-white;
  }
}
</style>
