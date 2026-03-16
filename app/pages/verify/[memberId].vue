<template>
  <div class="vf-root">
    <!-- Brand mark -->
    <div class="vf-brand">
      <div class="vf-brand-mark">TF</div>
      <div class="vf-brand-name">TAS-FORCE</div>
      <div class="vf-brand-sub">Member Verification Portal</div>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="vf-card vf-loading">
      <div class="vf-spinner" />
      <p>Verifying membership…</p>
    </div>

    <!-- Valid -->
    <div v-else-if="result?.valid" class="vf-card vf-card--valid">
      <div class="vf-card-bar vf-card-bar--gold" />
      <div class="vf-check">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h2 class="vf-status-title">Valid Member</h2>
      <p class="vf-status-sub">This is a verified TAS-FORCE member.</p>

      <div v-if="result.member?.photoUrl" class="vf-photo">
        <img :src="result.member.photoUrl" alt="Member photo" />
      </div>

      <div class="vf-details">
        <div v-for="[k,v] in memberInfo" :key="k" class="vf-detail-row">
          <span class="vf-detail-key">{{ k }}</span>
          <span class="vf-detail-val">{{ v }}</span>
        </div>
      </div>
    </div>

    <!-- Invalid -->
    <div v-else class="vf-card vf-card--invalid">
      <div class="vf-card-bar vf-card-bar--red" />
      <div class="vf-cross">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </div>
      <h2 class="vf-status-title vf-status-title--red">Invalid Membership</h2>
      <p class="vf-status-sub">{{ result?.message || 'This member ID is not valid or not active.' }}</p>
    </div>

    <NuxtLink to="/" class="vf-back">← Return to TAS-FORCE</NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
const route  = useRoute()
const { data: result, pending } = await useFetch<any>(`/api/verify/${route.params.memberId}`)
const memberInfo = computed(() => {
  const m = result.value?.member
  if (!m) return []
  return [
    ['Full Name',    `${m.firstName} ${m.lastName}`],
    ['Member ID',     m.memberId],
    ['Position',      m.position],
    ['Country',       m.country],
    ['Member Since',  m.memberSince],
    ['Status',        m.status],
  ]
})
</script>

<style scoped>
.vf-root {
  min-height: 100svh;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  background: var(--lv-bg, #0a0a0a);
  padding: 40px 20px;
  font-family: 'Plus Jakarta Sans', 'Crimson Pro', sans-serif;
  color: var(--lv-fg, #e8dcc8);
}

/* Brand */
.vf-brand { text-align: center; margin-bottom: 36px; }
.vf-brand-mark {
  width: 54px; height: 54px; border-radius: 14px;
  background: linear-gradient(135deg, #c9a84c, #e0c06a);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Fraunces', 'Playfair Display', serif;
  font-weight: 900; font-size: 16px; color: hsl(348,100%,6%);
  margin: 0 auto 12px;
  box-shadow: 0 6px 24px hsla(43,60%,54%,.35);
}
.vf-brand-name { font-family: 'Fraunces', 'Playfair Display', serif; font-weight: 900; font-size: 22px; color: var(--lv-fg, #e8dcc8); letter-spacing: .05em; }
.vf-brand-sub  { font-size: 11px; color: rgba(201,168,76,.5); letter-spacing: .12em; text-transform: uppercase; margin-top: 3px; }

/* Card */
.vf-card {
  width: 100%; max-width: 460px;
  background: var(--lv-surface, #111); border: 1px solid rgba(255,255,255,.08);
  border-radius: 20px; overflow: hidden;
  margin-bottom: 24px;
}
.vf-card-bar { height: 4px; }
.vf-card-bar--gold { background: linear-gradient(90deg, #9a7a2a, #e0c06a, #c9a84c, #e0c06a, #9a7a2a); }
.vf-card-bar--red  { background: hsl(0,80%,40%); }

/* Loading */
.vf-loading { padding: 56px; display: flex; flex-direction: column; align-items: center; gap: 20px; color: rgba(232,220,200,.45); font-size: 15px; }
.vf-spinner { width: 40px; height: 40px; border: 3px solid rgba(201,168,76,.2); border-top-color: #c9a84c; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Valid / Invalid shared */
.vf-check, .vf-cross {
  width: 64px; height: 64px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 32px auto 16px;
}
.vf-check { background: rgba(45,106,79,.2); border: 2px solid rgba(45,106,79,.4); color: #5de89a; }
.vf-check svg { width: 26px; height: 26px; }
.vf-cross { background: rgba(139,0,0,.15); border: 2px solid rgba(139,0,0,.3); color: #e57373; }
.vf-cross svg { width: 24px; height: 24px; }

.vf-status-title { font-family: 'Fraunces', 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: var(--lv-fg, #e8dcc8); text-align: center; margin-bottom: 6px; }
.vf-status-title--red { color: #e57373; }
.vf-status-sub { font-size: 14px; color: rgba(232,220,200,.48); text-align: center; margin-bottom: 24px; padding: 0 24px; line-height: 1.6; }

.vf-photo { width: 80px; height: 80px; border-radius: 50%; overflow: hidden; margin: 0 auto 20px; border: 3px solid rgba(201,168,76,.4); }
.vf-photo img { width: 100%; height: 100%; object-fit: cover; }

.vf-details { background: rgba(255,255,255,.03); margin: 0 20px 24px; border-radius: 12px; overflow: hidden; }
.vf-detail-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 11px 16px; border-bottom: 1px solid rgba(255,255,255,.05); font-size: 14px; }
.vf-detail-row:last-child { border-bottom: none; }
.vf-detail-key { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: rgba(201,168,76,.55); flex-shrink: 0; }
.vf-detail-val { font-weight: 500; color: var(--lv-fg, #e8dcc8); text-align: right; text-transform: capitalize; }

.vf-back { font-size: 13px; color: rgba(232,220,200,.35); text-decoration: none; transition: color .18s; }
.vf-back:hover { color: #c9a84c; }
</style>