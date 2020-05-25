<template>
  <div :style="{'pointer-events': haveProjects?'auto':'none','font-family': 'Microsoft Ya Hei'}">
    <el-tooltip :content="'Number of projects: '+content" v-if="haveProjects">

      <span style="font-weight: 900;color:#131124;">{{index}}<br>{{title}}</span>
    </el-tooltip>
    <div v-else style="color:#fff">
      {{index}}<br>{{title}}
    </div>
  </div>
</template>

<script>
    export default {
        name: "ElementCell",
        props: ['index', 'title', 'content', 'haveProjects']
    }
</script>

<style scoped>
</style>
