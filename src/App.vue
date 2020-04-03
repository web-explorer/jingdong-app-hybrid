<template>
  <div id="app">
    <transition :name="jumpType ? 'slide-left' : 'slide-right'">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        jumpType: ''
      }
    },
    // 接着在父组件内
    // watch $route 决定使用哪种过渡
    watch: {
      '$route' (to, from) {
        this.jumpType = to.params.jumpType
      }
    }
  }
</script>

<style lang="scss">
  #app {
    height: 100%;
    .slide-left-enter-active, .slide-left-leave-active {
      transition: transform 0.5s;
    }
    .slide-left-enter {
      transform: translateX(100%);
    }
    .slide-left-leave-to {
      transform: translateX(-100%);
    }
    .slide-right-enter-active, .slide-right-leave-active {
      transition: transform 0.5s;
    }
    .slide-right-enter {
      transform: translateX(-100%);
    }
    .slide-right-leave-to {
      transform: translateX(100%);
    }
  }
</style>
