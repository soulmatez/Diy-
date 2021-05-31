<template>
  <div id="app"> 
     <router-view/>
  </div>
</template>
<script>
	export default{
		 data(){
			 return{
				  
			 }
		 },
		 computed:{
			 key(){
				 return this.$route.path + Math.random();
			 }
		 }
	}
</script>

<style lang="scss">
$color:#42d9b4;

*{ box-sizing: border-box; margin:0px; padding:0px;}
html,body{ height:100%; overflow: hidden; font-size:12px; color:#333;}
#app {  font-family: Avenir, Helvetica, Arial, sans-serif; height:100%;  }
ul,li,dl,dd{ list-style-type: none;}
*:focus{ outline:none;}
img{ max-width:100%;}

.radio{ margin-right:6px; position: relative; width:16px; height:16px; -webkit-appearance: none; border-radius:50%; border:1px solid #ddd; cursor:pointer;}
.radio:checked,.radio.on{ border-color:$color; background:$color url(assets/gou.png) no-repeat center; background-size:9px auto;}

.checkbox{ position: relative; width:16px; margin-right:6px; height:16px; background:#fff; border-radius:2px; -webkit-appearance: none; border:1px solid #ddd; cursor:pointer;}
.checkbox:checked{ border-color:$color; background:$color url(assets/gou.png) no-repeat center; background-size:10px auto; }


/***渐渐右向左动画***/
.right-enter-active {animation: fadeRight 0.3s  cubic-bezier(.17,.84,.44,1);}
.right-leave-active {animation: fadeOutRight 0.3s  cubic-bezier(.17,.84,.44,1);}
@keyframes fadeRight {0%{ transform: translateX(100%) }100%{ transform:translateX(0%);}}
@keyframes fadeOutRight {0%{transform: translateX(0)}100%{transform: translateX(100%)}}

/***向上动画***/
.down-enter-active {animation: down1 0.3s cubic-bezier(.17,.84,.44,1);}
.down-leave-active {animation: down2 0s cubic-bezier(.17,.84,.44,1);}
@keyframes down1 {0%{transform: translateY(-20px); opacity: 0;} 100%{transform: translateY(0); opacity: 1;}}
@keyframes down2 {0%{transform: translateY(0px); opacity: 1;} 100%{transform: translateY(-20px); opacity: 0;}}

/***放大动画***/
.scale-enter-active {animation: scale22 0.4s cubic-bezier(.17,.84,.44,1);}
.scale-leave-active {animation: scale21 0.3s cubic-bezier(.17,.84,.44,1);}
@keyframes scale22 {0%{transform: scale(0.5); opacity: 0;}50%{transform: scale(1.1); opacity:0.8;}100%{transform: scale(1); opacity: 1;}}
@keyframes scale21 {0%{ transform: scale(1); opacity:1;} 30%{transform: scale(1.05); opacity:0.8} 100%{transform: scale(0.5); opacity: 0;}}

/***渐渐显示动画***/
.mask-enter-active {animation: fadeIn 0.3s;}
.mask-leave-active {animation: fadeOut 0.3s;}
@keyframes fadeIn {0%{opacity:0;}100%{opacity:1;}}
@keyframes fadeOut {0%{opacity: 1}100%{opacity:0;}}

.comm-mask{ background:rgba(0,0,0,0.7); position: fixed; left:0; top:0; width:100%; height:100%; z-index:998;}
.nodata{ text-align:center; color:#bfbfbf; padding:100px 0;
  img{ width:150px;}
}

</style>
