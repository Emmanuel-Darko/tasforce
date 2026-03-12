<template>
  <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--parchment);padding:32px;">
    <div style="width:100%;max-width:480px;">
      <div style="text-align:center;margin-bottom:28px;">
        <div class="pub-logo-img" style="width:52px;height:52px;margin:0 auto 12px;">
          <span style="font-family:'Playfair Display',serif;font-weight:900;font-size:15px;color:#3D0000;">TF</span>
        </div>
        <div style="font-family:'Playfair Display',serif;font-weight:900;font-size:20px;color:var(--crimson);">TAS-FORCE</div>
        <div style="font-size:11px;color:var(--muted);letter-spacing:0.06em;text-transform:uppercase;margin-top:3px;">Member Verification Portal</div>
      </div>

      <div v-if="pending" style="text-align:center;padding:40px;color:var(--muted);">Verifying membership…</div>

      <div v-else-if="result?.valid" class="card">
        <div style="height:5px;background:linear-gradient(90deg,var(--crimson),var(--gold));" />
        <div class="card-body" style="text-align:center;">
          <div style="width:60px;height:60px;background:#e8f5ee;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;color:var(--success);margin:0 auto 16px;">✓</div>
          <h2 style="font-family:'Playfair Display',serif;font-size:22px;color:var(--crimson);margin-bottom:6px;">Valid Member</h2>
          <p style="font-size:14px;color:var(--muted);margin-bottom:20px;">This is a verified TAS-FORCE member.</p>

          <div v-if="result.member?.photoUrl" style="width:80px;height:80px;border-radius:50%;overflow:hidden;margin:0 auto 16px;border:3px solid var(--crimson);">
            <img :src="result.member.photoUrl" style="width:100%;height:100%;object-fit:cover;" />
          </div>

          <div style="background:var(--parchment);border-radius:8px;padding:16px;text-align:left;">
            <div v-for="[k,v] in memberInfo" :key="k" class="detail-row">
              <span class="detail-key">{{ k }}</span>
              <span class="detail-value" style="text-transform:capitalize;">{{ v }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="card">
        <div style="height:5px;background:var(--danger);" />
        <div class="card-body" style="text-align:center;">
          <div style="width:60px;height:60px;background:#fdf0f0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;color:var(--danger);margin:0 auto 16px;">✗</div>
          <h2 style="font-family:'Playfair Display',serif;font-size:22px;color:var(--danger);margin-bottom:8px;">Invalid Membership</h2>
          <p style="font-size:15px;color:var(--muted);">{{ result?.message || 'This member ID is not valid or not active.' }}</p>
        </div>
      </div>

      <div style="text-align:center;margin-top:20px;">
        <NuxtLink to="/" style="font-size:13px;color:var(--muted);">← Return to TAS-FORCE</NuxtLink>
      </div>
    </div>
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
