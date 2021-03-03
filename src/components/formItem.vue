<template>
  <div class="crm-form-item"
       :class="{'date': date}"
       :style="{'margin': margin || '15px 15px 0 0','display':display}">
    <label class="crm-form-item-label"
           :style="{'width': labelwidth || '120px'}"
           :class="{'required': required}">{{label}}：</label>
    <div class="crm-form-item-con"
         :class="{'date': date}"
         :style="{'width': width || '240px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'formItem',
  data() {
    return {}
  },
  props: ['label', 'required', 'date', 'width', 'labelwidth', 'margin', 'display']
}
</script>
