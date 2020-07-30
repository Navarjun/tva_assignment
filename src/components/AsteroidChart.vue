<template>
  <div id="asteroid-chart-container">
    <div class="loading-message" v-if="!this.asteroids">
      Loading data…
    </div>
    <div class="asteroid-chart" v-else>
      <svg :width= "svg.width" :height="svg.height">
        <defs>
          <radialGradient id="min-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style="stop-color:#05f49d
            stop-opacity:0" />
            <stop offset="100%" style="stop-color:#2e294e;stop-opacity:1" />
          </radialGradient>
        </defs>

        <g transform="translate(15, 15)">
          <transition-group name="modal" tag="g">
            <g class="g-asteroid"
              :transform="'translate(' + scaleX(asteroid.velocity) + ',' + scaleY(asteroid.distance) + ')'"
              v-for="asteroid in this.asteroids" :key="asteroid.id"
              @mouseover="hoverOn(asteroid)"
              @mouseleave="hoverOff()">

              <circle class="max-diameter"
              :r="scaleR(asteroid.maxDiameter)"
              fill="url(#min-gradient)"></circle>

              <circle class="min-diameter"
                :r="scaleR(asteroid.minDiameter)"></circle>

            </g>
          </transition-group>

          <g class="axes" :transform="`translate(0,${this.svg.height - this.svgPadding - this.chartPadding})`">
            <line x1="0" y1="0" :x2="this.svg.width - 15" y2="0" stroke="white"/>
            <line x1="0" y1="0" x2="0" :y2="-this.svg.height" stroke="white"/>
            <text class="label label-x">Velocity</text>
            <text class="label label-y">Distance</text>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
// import * as C from './constants'

export default {
  name: 'AsteroidChart',
  props: {
    asteroids: { type: Array, required: false, default: undefined }
  },
  data () {
    return {
      svg: { width: 0, height: 0 }
    }
  },
  computed: {
    largestAsteroid () {
      if (this.asteroids) {
        return this.asteroidWithHighest('maxDiameter')
      }
      return undefined
    },
    fastestAsteroid () {
      if (this.asteroids) {
        return this.asteroidWithHighest('velocity')
      }
      return undefined
    },
    farthestAsteroid () {
      if (this.asteroids) {
        return this.asteroidWithHighest('distance')
      }
      return undefined
    },
    svgPadding () { return 15 /* 15 - padding */ },
    chartPadding () { return 50 /* 50 max radius of an asteroid */ }
  },
  components: {
  },
  methods: {
    scaleX (velocity) {
      return (this.svg.width - this.svgPadding - this.chartPadding*2) * (velocity/this.fastestAsteroid.velocity)
    },
    scaleY (distance) {
      return (this.svg.height - this.svgPadding - this.chartPadding*2) - (this.svg.height - this.svgPadding - this.chartPadding*2) * (distance/this.farthestAsteroid.distance)
    },
    scaleR (diameter) {
      return (50) * (diameter/this.largestAsteroid.maxDiameter)
    },
    asteroidWithHighest (key) {
      let theAsteroid;

      this.asteroids.forEach(d => {
        if (!theAsteroid) {
          theAsteroid = d
        } else if (theAsteroid[key] < d[key]) {
          theAsteroid = d
        }
      })

      return theAsteroid
    },
    hoverOn (asteroid) {
      this.$emit('hoverOn', asteroid)
    },
    hoverOff () {
      this.$emit('hoverOff')
    }
  },
  updated () {
    if (this.asteroids) {
      const chartDiv = document.getElementsByClassName('asteroid-chart')
      const rect = chartDiv[0].getBoundingClientRect()
      if (this.svg.width === 0 || this.svg.height === 0) {
        this.svg = { width: rect.width, height: rect.height }
      }
    }
  }
}
</script>

<style lang="scss">
@import './../constants.scss';
#asteroid-chart-container {
  height: 100%;
  position: relative;

  .loading-message {
    width: 100%;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .asteroid-chart {
    height: 100%;
    width: 100%;
  }

  .g-asteroid {
    transition: all 0.5s ease-out;
  }

  circle.max-diameter {
    stroke-width: 1px;
    stroke: $highlight-color;
    // fill: $bg-color;
  }
  circle.min-diameter {
    stroke-width: 1px;
    stroke: $highlight-color;
    fill: $highlight-color;
  }

  .axes {
    line {
      opacity: 0.3;
    }
    .label {
      fill: white;
      &.label-y {
        transform: translate(-3px, -20px) rotate(-90deg);
      }
      &.label-x {
        transform: translate(20px, 16px);
      }
    }
  }

  .modal-enter-active,
  .modal-leave-active { transition: all 350ms }

  .modal-enter,
  .modal-leave-to { opacity: 0 }

  .modal-leave,
  .modal-enter-to { opacity: 1 }
  .modal-move {
    transition: all 350ms;
  }
}
</style>
