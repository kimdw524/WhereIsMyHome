<script setup>
const props = defineProps({ option: Object });

const share = () => {
  console.log(props.option);
  Kakao.Share.sendDefault(props.option);
};
</script>
<template>
  <div :class="$style.container" @click="share">
    <img src="@/assets/images/kakao_share.png" alt="카카오톡 공유" />
  </div>
</template>
<style module>
.container {
  cursor: pointer;
}

.container img {
  width: 2.25rem;
  height: 2.25rem;
}
</style>
