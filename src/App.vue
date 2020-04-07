<template>
  <div id="app">

    <!--
      页面跳转的滑动状态保存：
      1、所有的组件中数据都会被保存下来；
      2、需要在组件中创建一个变量（会被keep-alive保存起来），通过这个变量来记录当前页面的滑动距离；
      3、当后退回该页面的时候，使用这个变量来改变当前页面的一个滑动距离；
        1、应该在什么时机去改变当前页面的滑动距离？
        2、可以在组件的activated（keep-alive组件被激活的时候才会调用）方法中去指定页面滑动模块的滑动距离
    -->

    <transition :name="jumpType ? 'slide-left' : 'slide-right'">
      <keep-alive :include="virtualTaskStack">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        jumpType: 0,
        // 虚拟任务栈
        virtualTaskStack: [
          'm-main'
        ]
      }
    },
    // 接着在父组件内
    // watch $route 决定使用哪种过渡
    watch: {
      '$route' (to, from) {
        let jumpType = to.params.jumpType
        this.jumpType = jumpType
        if (jumpType == 1) {
          // 当进入新页面的时候，保存新页面名称到虚拟任务栈
          this.virtualTaskStack.push(to.name)
        } else {
          // 执行后退操作的时候，把最后一个页面从任务栈中弹出
          this.virtualTaskStack.pop()
        }

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
