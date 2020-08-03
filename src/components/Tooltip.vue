<template>
  <div id="tooltip" :style="{ left: pointer.x + 'px', top: pointer.y + 'px' }" v-if="this.asteroid">
    <div>Name: {{this.asteroid.name}}</div>
    <div>Diameter: {{this.asteroid.minDiameter.toFixed(2)}} - {{this.asteroid.maxDiameter.toFixed(2)}}km</div>
    <div>Magnitude: {{this.asteroid.magnitude}}h</div>
    <div>Distance: {{this.asteroid.distance.toFixed(4)}}au</div>
    <div>Velocity: {{this.asteroid.velocity.toFixed(2)}}km/s</div>
  </div>
</template>

<script>

export default {
  name: 'DateSelector',
  props: {
    asteroid: { type: Object, required: false },
    pointer: { type: Object, required: true }
  }
}
</script>

<style lang="scss">
@import './../constants.scss';
#tooltip {
  position: absolute;
  background: rgba(black, 0.4);
  z-index: 99;
  border: solid 1px white;
  color: white;
  padding: 5px;
  text-align: left;

}
</style>
