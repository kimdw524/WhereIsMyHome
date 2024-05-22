<script setup>
import { useMapStore } from '@/stores/map';
import { distanceFormat } from '@/utils/utils';
import { onUnmounted, ref } from 'vue';
const props = defineProps({ name: String, category: String, house: Object });
const distance = ref({ time: 0, length: 0 });
const active = ref(false);
const mapStore = useMapStore();
let overlays = [],
  items = [];

const addOverlay = (items) => {
  items.forEach((item) => {
    const overlayContent = document.createElement('div');
    overlayContent.className = 'overlayPlace';
    overlayContent.style = `--overlay-color: var(--${props.category})`;
    overlayContent.innerHTML = props.name;

    overlayContent.addEventListener('click', () => {
      window.open(item.place_url);
    });

    const overlay = new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(item.y, item.x),
      clickable: true,
      content: overlayContent,
    });

    overlays.push(overlay);
  });

  overlays.forEach((overlay) => overlay.setMap(mapStore.map.value));
};

const removeOverlay = () => {
  overlays.forEach((overlay) => {
    overlay.setVisible(false);
    overlay.setMap(null);
  });
  overlays = [];
};

const handeClick = () => {
  active.value = !active.value;
  if (active.value) {
    addOverlay(items);
  } else {
    removeOverlay();
  }
};

const getPlaces = (house, category) => {
  const ps = new kakao.maps.services.Places(mapStore.map.value);
  ps.categorySearch(
    category,
    (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        if (data.length) {
          const dist = Math.sqrt(
            Math.pow(parseFloat(house.lat) - parseFloat(data[0].y), 2) +
              Math.pow(parseFloat(house.lng) - parseFloat(data[0].x), 2),
          );
          distance.value = {
            time: `${Math.round(((dist * 88.8) / 4) * 60)}분`,
            length: distanceFormat(dist * 88.8),
          };
          items = data;
        }
      }
    },
    { location: new kakao.maps.LatLng(house.lat, house.lng), size: 5 },
  );
};

getPlaces(props.house, props.category);

onUnmounted(() => {
  removeOverlay();
});
</script>

<template>
  <div :class="$style.container" @click="handeClick">
    <div :class="[active && $style.active]">
      <slot />
    </div>
    <div :class="$style.name">{{ name }}</div>
    <div :class="$style.length">{{ distance.length }}</div>
    <div :class="$style.time">{{ distance.time }}</div>
  </div>
</template>

<style>
.overlayPlace {
  --BK9: #003ffc;
  --MT1: #ed362d;
  --PM9: #14bb08;
  --OL7: #ff7429;
  --CE7: #8a3e00;
  --CS2: #0e4baf;

  display: flex;
  gap: 0.125rem;
  overflow: hidden;

  padding: 0.1875rem 0.25rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.625rem 0.125rem rgba(30, 30, 30, 0.1);

  background-color: var(--overlay-color);

  color: #fff;
  font-size: 0.75rem;
  font-weight: 400;
}
</style>

<style module>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.25rem;
  position: relative;

  width: 4rem;

  transition: all 100ms ease;

  cursor: pointer;
  user-select: none;
}

.name {
  font-size: 0.875rem;
  font-weight: 500;
}

.length {
  margin-top: 0.25rem;

  font-size: 0.875rem;
  font-weight: 600;
}

.time {
  font-size: 0.875rem;
  font-weight: 400;
}

.active {
  color: var(--color-primary);
}
</style>
