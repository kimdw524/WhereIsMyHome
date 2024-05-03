<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const wrapper = ref(null);
const container = ref(null);
const items = ref([]);

const duration = 0.1;
const children = [
  {
    icon: ['fas', 'poo'],
    head: '양규현',
    body: '양규현 찾기<br />양규현을 찾을 수 있습니다.<br />찾아 보세요.',
    image: './src/assets/images/intro/1.png',
  },
  {
    icon: ['fas', 'user'],
    head: '김다운',
    body: '김다운 찾기<br />김다운을 찾을 수 있습니다.<br />찾아 보세요.',
    image: './src/assets/images/intro/2.png',
  },
  {
    icon: ['fas', 'user'],
    head: '손동희',
    body: '손동희 찾기<br />손동희를 찾을 수 있습니다.<br />찾아 보세요.',
    image: './src/assets/images/intro/1.png',
  },
  {
    icon: ['fas', 'user'],
    head: '최요하',
    body: '최요하 찾기<br />최요하를 찾을 수 있습니다.<br />찾아 보세요.',
    image: './src/assets/images/intro/2.png',
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
            transform: translateX(${value * mul}vw);
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
            transform: translateX(0);
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
        <div :class="$style.head">검색</div>
        <div :class="$style.body">검색 기능이 있습니다.</div>
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
          <img :class="$style.image" :src="children[item.index].image" :style="item.imageStyle" />
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
.wrapper {
  position: relative;
  top: 0;

  height: 3000px;

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

  @media (max-width: 576px) {
    top: 2rem;
    right: 2rem;
    left: 2rem;
  }

  @media (max-height: 768px) {
    position: relative;
    top: 0;
    left: 0;

    margin-bottom: 2rem;
  }
}

.head {
  color: var(--intro-section-head-color);
  font-size: 1.75rem;
  font-weight: 600;
  letter-spacing: 1px;

  transition: all 100ms linear;

  user-select: none;

  @media (max-width: 576px) {
    font-size: 1.25rem;
  }
}

.body {
  margin: 1.5rem 0;

  font-size: 2.25rem;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 150%;

  transition: all 100ms linear;

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
