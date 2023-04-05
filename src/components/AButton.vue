<template>
  <button class="a-btn" title="Click to calculate.">
    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44">
      <g fill="none" stroke="#FFF" stroke-width="2">
        <path
          class="icon"
          d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"
        />
      </g>
    </svg>
  </button>
</template>
<script setup></script>
<style scoped lang="scss">
@import '@/assets/scss/theme.scss';

.a-btn {
  background-color: theme-color(purple);
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 500ms;
  cursor: pointer;

  &:hover {
    background-color: theme-color(off-black);

    &:hover .icon {
      stroke-dashoffset: 1000;
      animation: arrow-fill 2s ease-in-out infinite;
    }
  }

  svg {
    stroke-width: 2px;
    stroke: white;
    width: 32px;
    height: 30px;
  }
}

@media screen and (min-width: 374.999px) {
  .a-btn {
    width: 6rem;
    height: 6rem;
    svg {
      stroke-width: 2px;
      stroke: white;
      width: 46px;
      height: 44px;
    }
  }
}

.icon {
  stroke-dasharray: 1000;
  stroke-width: 4px;
  stroke: white;
}

@keyframes arrow-fill {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
