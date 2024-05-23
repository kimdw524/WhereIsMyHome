<script setup>
import IPad from './IPad.vue';
import EnterButton from '@/components/Intro/EnterButton.vue';
import { ref, onMounted, onUnmounted } from 'vue';
const wrapper = ref(null);
const container = ref(null);
const items = ref([]);
const enter = ref(false);

const duration = 0.2;
const children = [
  {
    icon: ['fas', 'chalkboard-user'],
    head: '자유게시판',
    body: '사람들과 부동산에 관한<br />이야기를 자유롭게<br />나눌 수 있어요.',
    webm: 'src/assets/webms/4.webm',
  },
  {
    icon: ['fas', 'comments'],
    head: '매물 토론실',
    body: '부동산 매물에 대해<br />자유롭게 토론할 수 있어요.',
    webm: 'src/assets/webms/5.webm',
  },
  {
    icon: ['fas', 'newspaper'],
    head: '뉴스',
    body: '최신 부동산 뉴스를<br />한눈에 볼 수 있도록 모아뒀어요.',
    webm: 'src/assets/webms/6.webm',
  },
];

const handleScroll = (e) => {
  const posY = window.scrollY - wrapper.value.offsetTop;
  enter.value = false;
  if (posY >= 0 && wrapper.value.offsetHeight - container.value.offsetHeight > posY) {
    draw(posY / (wrapper.value.offsetHeight - container.value.offsetHeight));
  } else {
    if (posY > 0) {
      enter.value = true;
    }
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
            transform: rotateY(${value * 90}deg) translateX(${-value * 50}%);
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
        <div :class="$style.head">다양한 커뮤니티</div>
        <div :class="$style.body">정보를 공유하고 얻을 수 있어요.</div>
      </div>

      <div :class="$style.childContainer" v-for="item in items" :key="item.index">
        <div :class="$style.imageWrapper">
          <IPad :class="$style.image" :src="children[item.index].webm" :style="item.imageStyle" />
        </div>
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
      </div>
    </div>
    <div :class="[$style.enter, enter && $style.active]">
      <EnterButton>시작하기</EnterButton>
    </div>
  </div>
</template>

<style module>
.wrapper {
  position: relative;
  top: 0;

  height: 3000px;
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
  right: 4rem;

  text-align: right;

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
    align-items: flex-end;
  }

  .head {
    color: var(--intro-section-head-color);
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-align: right;

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
    text-align: right;

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
  justify-content: flex-start;

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

.enter {
  position: absolute;
  right: 2rem;
  bottom: 2rem;

  transition: all 300ms ease;

  transform: translateY(-2rem);
  opacity: 0;
}

.enter.active {
  transform: translateY(0);
  opacity: 1;
}
</style>
