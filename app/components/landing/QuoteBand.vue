<template>
  <div class="lv-quote">
    <div class="lv-quote-deco" aria-hidden="true">"</div>
    <div class="lv-container">
      <div class="lv-inner">
        <span class="lv-mark">"</span>
        <blockquote class="lv-text">
          Every woman deserves justice.<br class="lv-br-md" />
          Every voice deserves to be heard.<br />
          We are TAS-FORCE — and we will not be silent.
        </blockquote>
        <cite class="lv-cite">— TAS-FORCE Mission Statement</cite>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lv-quote { position: relative; overflow: hidden; padding: 76px 0; background: linear-gradient(135deg, hsl(348,100%,6%) 0%, hsl(348,85%,16%) 42%, hsl(0,80%,28%) 100%); }
.lv-quote-deco { position: absolute; font-family: var(--lv-font-d); font-size: 500px; color: rgba(255,255,255,.022); top: -90px; left: 24px; line-height: 1; pointer-events: none; user-select: none; }
.lv-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.lv-inner { text-align: center; max-width: 820px; margin: 0 auto; position: relative; z-index: 1; }
.lv-mark  { font-family: var(--lv-font-d); font-size: 90px; color: var(--lv-gold); line-height: .65; display: block; margin-bottom: 18px; }
.lv-text  { font-family: var(--lv-font-d); font-size: clamp(19px,2.9vw,28px); font-style: italic; color: var(--lv-cream); line-height: 1.65; margin-bottom: 20px; border: none; padding: 0; }
.lv-cite  { font-size: 11px; color: rgba(201,168,76,.48); letter-spacing: .18em; text-transform: uppercase; font-style: normal; }
.lv-br-md { display: none; }
@media (min-width: 768px) { .lv-br-md { display: block; } }
@media (max-width: 640px) { .lv-quote { padding: 52px 0; } .lv-text { font-size: 18px; } }
</style>