<template>
  <div class="scroll"
       :class="{
         'pull-down': (state === 0),
         'pull-up': (state === 1),
         refreshing: (state === 2),
         touching: touching
       }"
      @touchstart="touchStart($event)"
      @touchmove="mytouchmove($event)"
      @touchend="touchEnd($event)"
      @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined"
       >
    <div class="scroll-inner"
      :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }"
      >
      <div class="pull-to-refresh-layer" v-if="!!onRefresh">
        <slot name="refresh">
          <div class="preloader"></div>
          <div class="pull-to-refresh-arrow"></div>
          <span class="label-down">下拉刷新</span>
          <span class="label-up">松开刷新</span>
          <span class="label-refresh">刷新中...</span>
        </slot>
      </div>
      <slot></slot>
      <div class="infinite-layer" v-if="enableInfinite">
        <slot name="infinite">
          <div class="infinite-preloader"></div>
          <div>Loading...</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        props: {
            offset: {
                type: Number,
                default: 44
            },
            enableInfinite: {
                type: Boolean,
                default: true
            },
            enableRefresh: {
                type: Boolean,
                default: true
            },
            onRefresh: {
                type: Function,
                default: undefined,
                required: false
            },
            onInfinite: {
                type: Function,
                default: undefined,
                require: false
            }
        },
        data() {
            return {
                top: 0,
                state: 0, // 0:down, 1: up, 2: refreshing
                startY: 0,
                startX: '',
                endX: '',
                endY: '',
                touching: false,

                infiniteLoading: false
            }
        },
        methods: {
            GetSlideDirection(startX, startY, endX, endY, ev) { //自定义添加
                //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
                const dy = startY - endY;
                const dx = endX - startX;
                //如果滑动距离太短
                if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
                    return;
                }
                const angle = this.GetSlideAngle(dx, dy);
                if (angle >= -60 && angle < 60) {
                    return;
                } else if (angle >= 60 && angle < 120) {
                    //              console.log(2)
                    return;
                } else if (angle >= -120 && angle < -60) {
                    // 角度在 -60 ~ -120 调用原组件的下拉刷新 
                    this.touchMove(ev)
                    return;
                } else if ((angle >= 120 && angle <= 180) || (angle >= -120 && angle < -150)) {
                    return;
                }
            },
            mytouchmove(ev) { //touchend  touchmove 自定义添加
                this.endX = ev.changedTouches[0].pageX;
                this.endY = ev.changedTouches[0].pageY;
                this.GetSlideDirection(this.startX, this.startY, this.endX, this.endY, ev);
            },
            GetSlideAngle(dx, dy) { //自定义添加
                return Math.atan2(dy, dx) * 180 / Math.PI;
            },
            touchStart(e) {
                this.startY = e.targetTouches[0].pageY
                this.startX = e.touches[0].pageX;
                this.startScroll = this.$el.scrollTop || 0
                this.touching = true
            },
            touchMove(e) {
                if (!this.enableRefresh || this.$el.scrollTop > 0 || !this.touching) {
                    return
                }
                let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
                if (diff > 0) e.preventDefault()
                this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)

                if (this.state === 2) { // in refreshing
                    return
                }
                if (this.top >= this.offset) {
                    this.state = 1
                } else {
                    this.state = 0
                }
            },
            touchEnd(e) {
                if (!this.enableRefresh) return
                this.touching = false
                if (this.state === 2) { // in refreshing
                    this.state = 2
                    this.top = this.offset
                    return
                }
                if (this.top >= this.offset) { // do refresh
                    this.refresh()
                } else { // cancel refresh
                    this.state = 0
                    this.top = 0
                }
            },
            refresh() {
                this.state = 2
                this.top = this.offset
                this.onRefresh(this.refreshDone)
            },
            refreshDone() {
                this.state = 0
                this.top = 0
            },

            infinite() {
                this.infiniteLoading = true
                this.onInfinite(this.infiniteDone)
            },

            infiniteDone() {
                this.infiniteLoading = false
            },

            onScroll(e) {
                if (!this.enableInfinite || this.infiniteLoading) {
                    return
                }
                let outerHeight = this.$el.clientHeight
                let innerHeight = this.$el.querySelector('.scroll-inner').clientHeight
                let scrollTop = this.$el.scrollTop
                let ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-to-refresh-layer').clientHeight : 0
                let infiniteHeight = this.$el.querySelector('.infinite-layer').clientHeight
                let bottom = innerHeight - outerHeight - scrollTop - ptrHeight

                if (bottom < infiniteHeight) this.infinite()
            }
        }
    }
</script>
<style lang="less" scoped>
    @import './scroll.less';
</style>