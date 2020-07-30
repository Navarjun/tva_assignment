export default class Asteroid {
  constructor(obj) {

    this.id = obj.id
    this.name = obj.name
    this.minDiameter = +obj.estimated_diameter.kilometers.estimated_diameter_min
    this.maxDiameter = +obj.estimated_diameter.kilometers.estimated_diameter_max
    this.magnitude = +obj.absolute_magnitude_h
    this.distance = +obj.close_approach_data[0].miss_distance.astronomical
    this.velocity = +obj.close_approach_data[0].relative_velocity.kilometers_per_second

    return this
  }
}
