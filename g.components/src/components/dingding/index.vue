<template>
  <div>
      <div class="room">
          <!--left-->
          <div class="roomleft">

          </div>
          <!--right-->
          <div class="roomright">
              <!--right_top-->
              <div></div>
              <!--right-bottom-->
              <div></div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
    .room{
        width:50%;
        height:650px;
        border:1px solid #000;
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin-left:25%;
        margin-top:150px;
    }
    .room .roomleft{
        width:30%;
        height:100%;
        border:1px solid #000;
        box-sizing: border-box;
    }
    .room .roomright{
       
        height:100%;
        border:1px solid #000;
        box-sizing: border-box;
    }
</style>


