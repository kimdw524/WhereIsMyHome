<script setup>
import { dealNumberFormat, toNumber } from '@/utils/utils';

const props = defineProps({ data: Object });

const dealType =
  toNumber(props.data.dealAmount) > 0 ? 0 : toNumber(props.data.rentCost) === 0 ? 1 : 2;

const price =
  dealType === 0
    ? dealNumberFormat(toNumber(props.data.dealAmount))
    : dealType === 1
    ? dealNumberFormat(toNumber(props.data.deposit))
    : `${dealNumberFormat(toNumber(props.data.deposit))} / ${dealNumberFormat(
        toNumber(props.data.rentCost),
      )}`;
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.dealAmount">
      <span>{{ ['매매', '전세', '월세'][dealType] }}</span>
      {{ price }}
    </div>
    <div :class="$style.detailContainer">
      <div :class="$style.left">
        <div :class="$style.detail">{{ data.floor }}층</div>
        <div :class="$style.detail">
          <span>면적</span>
          {{ data.area }}
        </div>
      </div>

      <div :class="$style.date">
        {{
          `${data.dealYear}.${('0' + data.dealMonth).slice(-2)}.${('0' + data.dealDay).slice(-2)}`
        }}
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid var(--map-houselist-border);
}

.dealAmount {
  font-size: 1rem;
  font-weight: 500;
}

.dealAmount span {
  color: var(--color-primary);
}

.detailContainer {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;

  font-size: 0.875rem;
}

.detail {
  font-weight: 300;
}

.detail span {
  font-weight: 500;
}

.left {
  display: flex;
  gap: 0.5rem;
}

.date {
  color: var(--color-light);
  font-size: 0.875rem;
  font-weight: 300;
  text-align: right;
}
</style>
