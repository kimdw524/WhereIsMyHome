<script setup>
import Formatter from '@/utils/formatter';

const props = defineProps({ deals: Array, fullRents: Array, rents: Array });

const dealRange =
  props.deals.length === 0
    ? '정보 없음'
    : `${Formatter.dealNumberFormat(
        props.deals.reduce(
          (prev, cur) => Math.min(prev, Formatter.toNumber(cur.dealAmount)),
          999_999_999,
        ),
      )} ~ ${Formatter.dealNumberFormat(
        props.deals.reduce((prev, cur) => Math.max(prev, Formatter.toNumber(cur.dealAmount)), 0),
      )}`;
const fullRentRange =
  props.fullRents.length === 0
    ? '정보 없음'
    : `${Formatter.dealNumberFormat(
        props.fullRents.reduce(
          (prev, cur) => Math.min(prev, Formatter.toNumber(cur.deposit)),
          999_999_999,
        ),
      )} ~ ${Formatter.dealNumberFormat(
        props.fullRents.reduce((prev, cur) => Math.max(prev, Formatter.toNumber(cur.deposit)), 0),
      )}`;
</script>
<template>
  <div :class="$style.container">
    <div :class="$style.dealOverall">
      <div>최근 매매 실거래가</div>
      <span>{{
        deals.length === 0
          ? '정보 없음'
          : Formatter.dealNumberFormat(Formatter.toNumber(props.deals.at(-1).dealAmount))
      }}</span>
    </div>
    <div :class="$style.rangeContainer">
      <div :class="$style.range">
        <span>매매가</span>
        {{ dealRange }}
      </div>
      <div :class="$style.range">
        <span>전세가</span>
        {{ fullRentRange }}
      </div>
    </div>
  </div>
</template>
<style module>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dealOverall {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  color: var(--color-primary);
}

.dealOverall span {
  font-size: 1.25rem;
  font-weight: 600;
}

.name {
  color: var(--color-primary);
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.count {
  font-weight: 400;
  letter-spacing: 1px;
}

.rangeContainer {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 0.375rem;
}

.range {
  font-size: 0.875rem;
  font-weight: 400;
}

.range span {
  margin-right: 0.125rem;

  font-weight: 600;
}
</style>
