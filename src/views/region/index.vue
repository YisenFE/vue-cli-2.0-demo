<template>
  <div class="crm-region">
    <form-item
      v-for="(item, index) in regionFrom"
      :key="index"
      :label="item.label">
      <el-select v-model="regionData[item.opt]" palceholder="请选择" @change="handleChange(item.opt, $event)">
          <el-option
            v-for="i in item.list"
            :label="i.cn"
            :key="i.id"
            :value="i.id">
        </el-option>
      </el-select>
    </form-item>
  </div>
</template>
<script>
import util from '@/common/util'
import world from '@/common/region.js'
import formItem from '@/components/formItem'
export default {
  name: 'Cascader',
  components: {
    formItem
  },
  props: {
    regionData: {
      type: Object,
      default: () => {
        return {
          country: '',
          region: '',
          city: '',
          district: ''
        }
      }
    }
  },
  methods: {
    handleChange(label, val) {
      let arr = ['country', 'region', 'city', 'district']
      let reset = false
      arr.forEach(i => {
        if (reset) {
          this.regionData[i] = ''
        }
        if (i === label) {
          reset = true
        }
      })
    }
  },
  computed: {
    regionFrom() {
      let country = this.regionData.country
      let region = this.regionData.region
      let city = this.regionData.city
      let countryList = []
      let regionList = []
      let cityList = []
      let districtList = []
      world.countries.forEach(co => {
        countryList.push({
          id: co.id,
          cn: co.cn
        })
        if (country === co.id && co.regions) {
          let regions = []
          if (!util.isArray(co.regions)) {
            regions.push(Object.assign(co.regions))
          } else {
            regions = co.regions
          }
          regions.forEach(re => {
            regionList.push({
              id: re.id,
              cn: re.cn
            })
            if (region === re.id && re.cities) {
              let cities = []
              if (!util.isArray(re.cities)) {
                cities.push(Object.assign(re.cities))
              } else {
                cities = re.cities
              }
              cities.forEach(ci => {
                cityList.push({
                  id: ci.id,
                  cn: ci.cn
                })
                if (city === ci.id && ci.districts) {
                  let districts = []
                  if (!util.isArray(ci.districts)) {
                    districts.push(Object.assign(ci.districts))
                  } else {
                    districts = ci.districts
                  }
                  districts.forEach(di => {
                    districtList.push({
                      id: di.id,
                      cn: di.cn
                    })
                  })
                }
              })
            }
          })
        }
      })
      /* eslint-disable */
      if (!country || regionList.length === 0) {
        return [{label: '国家', opt: 'country', list: countryList}]
      } else if (country && !region || cityList.length === 0) {
        return [
          {label: '国家', opt: 'country', list: countryList},
          {label: '省', opt: 'region', list: regionList}
        ]
      } else if (country && region && !city || districtList.length === 0) {
        return [
          {label: '国家', opt: 'country', list: countryList},
          {label: '省', opt: 'region', list: regionList},
          {label: '市', opt: 'city', list: cityList}
        ]
      } else {
        return [
          {label: '国家', opt: 'country', list: countryList},
          {label: '省', opt: 'region', list: regionList},
          {label: '市', opt: 'city', list: cityList},
          {label: '县', opt: 'district', list: districtList}
        ]
      }
      /* eslint-enable */
    }
  }
}
</script>
