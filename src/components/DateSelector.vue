<template>
  <div id="date-selector">
    <h4 class="title text-white">Select the day to view the asteroid</h4>
    <div class="btn-group">
      <button :class="{ btn: true, active: activeDate.valueOf() === date.valueOf() }"
        v-for="date in datesArr"
        :key="date.valueOf()"
        @click="dateChanged(date)">
        {{ formattedDate(date) }}
      </button>
    </div>
  </div>
</template>

<script>
import * as C from './../constants'

export default {
  name: 'DateSelector',
  props: {
    startDate: { type: Date, required: false, default: () => new Date() },
    days: { type: Number, required: false, default: 7 }
  },
  data () {
    const activeDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate())
    return {
      activeDate: activeDate
    }
  },
  computed: {
    datesArr () {
      const initDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate())

      const x = [...Array(7).keys()].map((_, i) => {
        const newDate = new Date(initDate)
        newDate.setDate(initDate.getDate() + i)
        return newDate
      })

      return x
    }
  },
  methods: {
    formattedDate (date) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const dateString = date.getDate()
      const monthString = months[date.getMonth()]

      const formattedDate = `${C.getWeekday(date)}, ${dateString} ${monthString}`
      if (date.getDate() === this.startDate.getDate() && date.getMonth() === this.startDate.getMonth()) {
        return formattedDate + ' (today)'
      }
      return formattedDate
    },
    dateChanged (date) {
      this.$emit('dateChanged', date)
      this.activeDate = date
    }
  },
  components: {
  },

  // LIFECYCLE METHODS
  beforeMount () {
    // emitting default dates array
    // for if the component was instantiated without props
    this.$emit('onMount', this.datesArr)
  }
}
</script>

<style lang="scss">
@import './../constants.scss';
#date-selector {
  margin: 0px;

  h4.title {
    margin-bottom: 10px;
  }
  .btn-group {
    text-align: left;

    .btn {
      padding: 10px 20px;
      margin-right: 10px;
      height: 40px;
      background: transparent;
      border-radius: 20px;
      border: 1px solid $highlight-color;
      font-size: 14px;
      color: $highlight-color;
      cursor: pointer;

      &:hover {
        background: rgba($highlight-color, 0.3);
      }
      &:active {
        background: rgba($highlight-color, 0.7);
      }

      &.active {
        color: $bg-color;
        background: $highlight-color;
        font-weight: bold;
      }
    }
  }
}
</style>
