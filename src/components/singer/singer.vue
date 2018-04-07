<template>
  <div class="singer">
      <listview :data="singers"></listview>
      <div class="loading-container" v-show="!singers.length">
        <loading></loading>
      </div>
  </div>
</template>

<script>
import {getSingerList} from '@/api/singer.js'
import {ERR_OK} from '../../api/config.js'
import Singer from '@/common/js/singer.js'
import Listview from '@/base/listview/listview.vue'
import Loading from '@/base/loading/loading.vue'
const HOT_NAME = '热门';
const HOT_SINGER_LEN = 10;
export default {
  data() {
    return {
      singers:[]
    }
  },
  created() {
    this._getSingerList();
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        // console.log(res);
        if(res.code === ERR_OK)
        {
          this.singers = this._normalizeSinger(res.data.list);
          
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title:HOT_NAME,
          items:[]
        }
      }
      list.forEach((item, index) => {
        if(index < HOT_SINGER_LEN)
        {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex;
        if(!map[key])
        {
          map[key] = {
            title: key,
            items:[]
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      });
      // console.log(map)
      let hot = []
      let ret = []
      for(var key in map) {
        if(map[key].title.match(/[a-zA-Z]/))
        {
          ret.push(map[key]);
        }else if(map[key].title === HOT_NAME) {
          hot.push(map[key]);
        }
      }
      ret.sort((a,b) => {
        return a.title.localeCompare(b.title);
      })
      return [...hot,...ret]
    }
  },
  components: {
    Listview,
    Loading
  }
}
</script>
<style lang="stylus" scoped>
  .singer
    position: fixed
    top:88px
    bottom:0
    width:100%
    .loading-container
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%,-50%)
</style>


