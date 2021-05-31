<template>
	<div class="module-background" :style="style"></div>
</template>

<script>
	 export default{
			  name:'moduleBg',
					props:['base'],				
					computed:{
						 style(){
								 let bg = '';
								 if(this.base.bg==2){ bg = 'background:none;';}
									else if(this.base.bg==3){
										 if(this.base.bt==1){ bg = `background:${this.base.bc};`; }		
											else if(this.base.bt==2 && this.base.bi!=''){ bg = `background:url(${this.base.bi}) no-repeat center;background-size:cover;`; }									
									}
									return bg;
							} 
					}
		}
</script>
