<template>
    <scroll class="listview" :data="data" ref="listview">
        <ul>
            <li v-for="(group,index) in data" :key="index" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{ group.title }}</h2>
                <ul>
                    <li v-for="(item,ind) in group.items" @click="selectItem(item)" :key="ind" class="list-group-item">
                        <img v-lazy="item.avatar" class="avatar" alt="">
                        <span class="name">{{ item.name }}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
            <ul>
                <li v-for="(item, ind) in shortcutList" :key="ind" :data-index="ind" class="item">
                    {{ item }}
                </li>
            </ul>
        </div>
    </scroll>
</template>

<script>
import Scroll from '../scroll/scroll.vue'
import $ from 'jquery'

const ANCHOR_HEIGHT = 18 //右边abcd每项的高度18px
export default {
  props: {
      data:{
          type:Array,
          default:[]
      }
  },
  created() {
      this.touch = {}
  },
  computed:{
      shortcutList() {
          return this.data.map((item) => {
              return item.title.substring(0,1);
          })
      }
  },
  methods:{
      onShortcutTouchStart(e) {
          let anchorIndex = $(e.target).attr('data-index');
          this.touch.anchorIndex = anchorIndex;
          let firstTouch = e.touches[0];
          this.touch.y1 = firstTouch.pageY;
          this._scrollTo(anchorIndex);
      },
      onShortcutTouchMove(e) {
          let firstTouch = e.touches[0];
          this.touch.y2 = firstTouch.pageY;
          let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;//计算y轴滑动的多少项，'|0'(math.floor)就是向下取整
          let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
          this._scrollTo(anchorIndex);
      },
      _scrollTo(index) {
          this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);//第一个参数为要滚动到的元素，第二个参数为滚动延时时间
      },
      selectItem(item) {
          console.log(item);
          this.$emit('select',item);
      }
  },
  components: {
      Scroll
  }
}
</script>
<style lang="stylus" scoped>
    @import "../../common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

