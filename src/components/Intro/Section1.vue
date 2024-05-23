<script setup>
import IPad from './IPad.vue';
import { ref, onMounted, onUnmounted } from 'vue';
const wrapper = ref(null);
``;
const container = ref(null);
const items = ref([]);

const duration = 0.2;
const children = [
  {
    icon: ['fas', 'magnifying-glass'],
    head: '다양한 검색 조건',
    body: '다양한 조건을 설정하여 원하는 매물을 쉽게 찾을 수 있어요.',
    webm: 'src/assets/webms/1.webm',
  },
  {
    icon: ['fas', 'heart'],
    head: '관심 매물',
    body: '관심있는 매물만 모아서 따로 볼 수 있어요.',
    webm: 'src/assets/webms/2.webm',
  },
  {
    icon: ['fas', 'location-dot'],
    head: '내 주변 인기 매물',
    body: '접속 위치를 바탕으로 주변에서 가장 인기 있는 매물을 추천해드려요.',
    webm: 'src/assets/webms/3.webm',
  },
];

const handleScroll = (e) => {
  const posY = window.scrollY - wrapper.value.offsetTop;
  if (posY >= 0 && wrapper.value.offsetHeight - container.value.offsetHeight > posY) {
    draw(posY / (wrapper.value.offsetHeight - container.value.offsetHeight));
  } else {
    draw(posY > 0 ? 1 : 0);
  }
};

const draw = (ratio) => {
  items.value = [{ index: 0, headStyle: '', bodyStyle: '', imageStyle: '' }];

  for (let i = 0; i < children.length; i++) {
    const cur = (i + 1) * (1 / children.length);
    if (ratio >= cur) {
      if (i + 1 < children.length && ratio <= cur + duration) {
        const value = (ratio - cur) / duration;
        const mul = 50;
        items.value = [
          {
            index: i,
            headStyle: `
            transform: translateY(${-value * mul}vh);
            opacity: ${1 - value};
            `,
            bodyStyle: `
            transform: translateY(${-value * mul}vh);
            opacity: ${1 - value};`,
            imageStyle: `
            transform: rotateY(${-value * 90}deg) translateX(${value * 50}%);
            opacity: ${1 - value};
            `,
          },
          {
            index: i + 1,
            headStyle: `
            transform: translateY(${(1 - value) * mul}vh);
            opacity: ${value};
            `,
            bodyStyle: `
            transform: translateY(${(1 - value) * mul}vh);
            opacity: ${value};`,
            imageStyle: `
            transform: rotateY(0) translateX(0);
            opacity: ${value};
            `,
          },
        ];
      } else {
        items.value = [
          {
            index: Math.min(children.length - 1, i + 1),
            headStyle: '',
            bodyStyle: '',
            imageStyle: '',
          },
        ];
      }
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div :class="$style.wrapper" ref="wrapper">
    <div :class="$style.container" ref="container">
      <div :class="$style.header">
        <div :class="$style.head">수십만 개의 데이터 중</div>
        <div :class="$style.body">꼭 필요한 데이터만 보여드려요.</div>
      </div>

      <div :class="$style.childContainer" v-for="item in items" :key="item.index">
        <div>
          <div :class="$style.head" :style="item.headStyle">
            <font-awesome-icon :icon="children[item.index].icon" />{{ children[item.index].head }}
          </div>
          <div
            :class="$style.body"
            :style="item.bodyStyle"
            v-html="children[item.index].body"
          ></div>
        </div>
        <div :class="$style.imageWrapper">
          <IPad :class="$style.image" :src="children[item.index].webm" :style="item.imageStyle" />
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
.wrapper {
  position: relative;
  top: 0;

  height: 2250px;

  background-color: var(--intro-section-bg);
}

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: sticky;
  top: 0;
  overflow: hidden;

  height: 100vh;
  padding: 4rem;
  box-sizing: border-box;

  @media (max-width: 576px) {
    padding: 2rem;
  }
}

.header {
  position: absolute;
  top: 4rem;
  left: 4rem;

  @media (max-width: 576px) or (max-height: 576px) {
    top: 2rem;
    right: 2rem;
    left: 2rem;
  }
}

.head {
  color: var(--intro-section-head-color);
  font-size: 1.75rem;
  font-weight: 600;
  letter-spacing: 1px;

  transition: all 300ms linear;

  user-select: none;

  @media (max-width: 576px) {
    font-size: 1.25rem;
  }
}

.body {
  max-width: 30vw;
  margin: 1.5rem 0;

  font-size: 2.25rem;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 150%;
  word-break: keep-all;

  transition: all 300ms linear;

  user-select: none;

  @media (max-width: 576px) {
    margin: 0.75rem 0;

    font-size: 1.5rem;
  }
}

.childContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  position: absolute;
  left: 3rem;
  right: 3rem;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }

  .head {
    color: var(--intro-section-head-color);
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: 1px;

    user-select: none;

    @media (max-width: 576px) {
      font-size: 1.25rem;
    }

    svg {
      margin-right: 0.375rem;
    }
  }

  .body {
    margin: 0.75rem 0;

    color: var(--intro-section-child-body-color);
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 1px;

    user-select: none;

    @media (max-width: 576px) {
      margin: 0.75rem 0;

      font-size: 1.25rem;
    }
  }
}

.imageWrapper {
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-end;

  @media (max-width: 576px) {
    width: 100%;

    text-align: center;
  }
}

.image {
  width: 100%;
  max-width: 50vw;

  user-select: none;

  @media (max-width: 576px) {
    max-width: 100vw;
  }
}
</style>
