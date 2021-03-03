<template>
  <div class="crm-cropper">
    <img v-if="showCropper" v-cropper="cropOptions" src="../../../static/pg1.jpeg" alt="jQuery Meme">
    <button @click="showCropper = !showCropper">点击</button>
  </div>
</template>
<script>
import Cropper from 'directives/Cropper'
export default {
  directives: {
    Cropper
  },
  data() {
    return {
      cropOptions: {
        viewModel: 0,
        zoomable: false
      },
      showCropper: false
    }
  }
}
</script>
