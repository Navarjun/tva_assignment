export const NASA_API = {
  baseUrl: 'https://api.nasa.gov/',
  apiKey: '5hEmBl2Y6hWRqAHuf3vCKSlP9O7ocREz2obzU85E',
  endpoints: {
    neoAsteroids: 'neo/rest/v1/feed'
  },
  methods: {
    formatDate (d) {
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      const year = d.getFullYear()

      if (month.length < 2) {
        month = '0' + month
      }
      if (day.length < 2) {
        day = '0' + day
      }

      return [year, month, day].join('-')
    }
  }
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export function getWeekday (date) {
  return weekdays[date.getDay()]
}
