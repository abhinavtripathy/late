<!--Modals: Select course-->
<template>
  <div class="columns is-multiline">
    <div
      v-for="c in selectedCourses"
      :key="c.crn"
      class="column course-column is-half"
    >
      <div
        class="course box"
        :value="c.crn"
        :class="{active: isActive(c.crn)}"
        :style="{'--box-shadow-color': c.color}"
        :title="c.originalTitle + ' - ' + c.summary + ' - ' + c.sectionId"
        @click="setCRN(c.crn)"
      >
        <span
          class="tag is-pulled-right"
          :style="{'background-color': c.color, color: 'white'}"
          :title="'You are in Section ' + c.sectionId"
        >Section {{ c.sectionId }}</span>
        {{ c.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalSelectCourse',
  props: {
    assessmentType: { type: String, required: true },
    courseCRN: { type: String, required: true }
  },
  computed: {
    selectedCourses () {
      return this.ongoingCourses.length > 0 ? this.ongoingCourses : this.courses
    }
  },
  methods: {
    isActive (crn) {
      return this.courseCRN === crn ? 'active' : ''
    },
    setCRN (crn) {
      this.$emit('update-crn', crn)
      this.$emit('next-step')
    }
  }
}
</script>

<style lang="scss" scoped>
.course-column {
  padding: 6px;
}

.course.box {
  padding: 10px 15px;
  cursor: pointer;
}

.active {
  box-shadow: -0px 0px 2px 0.5px var(--box-shadow-color);
}
</style>
