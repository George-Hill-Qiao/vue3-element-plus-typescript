<template>
  <div id="nav">
  </div>
  <router-view></router-view>
</template>

<style >
#app {
  padding:20px;
}
::-webkit-scrollbar {
    width:6px;
    height:6px;
}
::-webkit-scrollbar-thumb {
    background-color:rgba(0,0,0, .1);
    background-clip:padding-box;
    min-height:28px;
    border-radius:2em;
}
::-webkit-scrollbar-thumb:hover {
        background-color:rgba(0,0,0, .4);
}

</style>
