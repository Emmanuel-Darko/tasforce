<template>
  <div class="pg">
    <!-- HERO -->
    <section class="ph">
      <img src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=1600&q=85&auto=format&fit=crop" alt="Contact" class="ph-bg" />
      <div class="ph-overlay" />
      <div class="ph-noise" />
      <div class="container ph-inner">
        <div class="ph-eyebrow">Get In Touch</div>
        <h1 class="ph-title">Contact Us</h1>
        <p class="ph-sub">We are here to listen, support, and take action.</p>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="pg-section">
      <div class="container">
        <div class="ct-grid">

          <!-- FORM -->
          <div>
            <h2 class="ct-form-title">Send Us a Message</h2>
            <p class="ct-form-sub">Have a question, need support, or want to collaborate? We'd love to hear from you.</p>

            <div v-if="sent" class="ct-success">
              <div class="ct-success-icon">✓</div>
              <div>
                <div class="ct-success-title">Message Sent!</div>
                <div class="ct-success-sub">We'll respond within 2 working days.</div>
              </div>
            </div>

            <template v-else>
              <div class="ct-form-grid">
                <div class="ct-field">
                  <label class="ct-label">Full Name <span class="ct-req">*</span></label>
                  <input type="text" class="ct-input" placeholder="Your full name" v-model="form.name" />
                </div>
                <div class="ct-field">
                  <label class="ct-label">Email Address <span class="ct-req">*</span></label>
                  <input type="email" class="ct-input" placeholder="you@email.com" v-model="form.email" />
                </div>
                <div class="ct-field ct-col-2">
                  <label class="ct-label">Subject</label>
                  <input type="text" class="ct-input" placeholder="What is this about?" v-model="form.subject" />
                </div>
                <div class="ct-field ct-col-2">
                  <label class="ct-label">Message <span class="ct-req">*</span></label>
                  <textarea class="ct-textarea" rows="5" placeholder="How can we help you?" v-model="form.message" />
                </div>
              </div>
              <button class="ct-submit" @click="sent = true">
                Send Message
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </button>
            </template>
          </div>

          <!-- INFO -->
          <div class="ct-info-col">
            <div v-for="item in contactInfo" :key="item.label" class="ct-info-card">
              <div class="ct-info-icon">{{ item.icon }}</div>
              <div>
                <div class="ct-info-label">{{ item.label }}</div>
                <div class="ct-info-value">{{ item.value }}</div>
                <div v-if="item.sub" class="ct-info-sub">{{ item.sub }}</div>
              </div>
            </div>

            <div class="ct-location-card">
              <div class="ct-location-icon">📍</div>
              <div class="ct-location-name">Accra, Ghana</div>
              <div class="ct-location-sub">West Africa</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const sent = ref(false)
const form = reactive({ name:'', email:'', subject:'', message:'' })
const contactInfo = [
  { icon:'📧', label:'Email',        value:'info@tas-force.org',  sub:'We reply within 24 hours' },
  { icon:'📞', label:'Phone',        value:'+123-456-7890',       sub:'Mon–Fri, 9am–5pm GMT' },
  { icon:'🌐', label:'Website',      value:'www.tas-force.org',   sub:null },
  { icon:'🕐', label:'Office Hours', value:'Mon–Fri, 9am–5pm',    sub:'West Africa Time (GMT)' },
]
</script>

<style scoped>
.pg { background: var(--lv-bg, #0a0a0a); color: var(--lv-fg, #e8dcc8); font-family: 'Plus Jakarta Sans', 'Crimson Pro', sans-serif; }

.ph { position: relative; min-height: 380px; display: flex; align-items: center; overflow: hidden; }
.ph-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; opacity: .3; }
.ph-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, hsla(348,100%,6%,.97) 0%, hsla(348,85%,16%,.88) 60%, hsla(348,100%,6%,.92) 100%); }
.ph-noise { position: absolute; inset: 0; opacity: .35; pointer-events: none; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"); }
.ph-inner  { position: relative; z-index: 2; padding: 80px 0; }
.ph-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: #c9a84c; margin-bottom: 14px; }
.ph-title   { font-family: 'Fraunces', 'Playfair Display', serif; font-size: clamp(32px,5vw,54px); font-weight: 900; color: hsl(40,30%,92%); margin-bottom: 10px; line-height: 1.05; }
.ph-sub     { font-size: 17px; color: rgba(232,220,200,.55); max-width: 520px; line-height: 1.7; }

.pg-section { padding: 96px 0; }

.ct-grid { display: grid; grid-template-columns: 1fr 360px; gap: 56px; align-items: start; }

/* Form */
.ct-form-title { font-family: 'Fraunces', 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: var(--lv-fg, #e8dcc8); margin-bottom: 8px; }
.ct-form-sub   { font-size: 15px; color: rgba(232,220,200,.5); margin-bottom: 32px; line-height: 1.65; }
.ct-form-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
.ct-col-2 { grid-column: span 2; }
.ct-field { display: flex; flex-direction: column; gap: 6px; }
.ct-label { font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(232,220,200,.5); }
.ct-req   { color: #e57373; }
.ct-input, .ct-textarea {
  background: rgba(255,255,255,.04);
  border: 1.5px solid rgba(255,255,255,.1);
  border-radius: 10px; padding: 12px 16px;
  font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px;
  color: var(--lv-fg, #e8dcc8); outline: none; width: 100%;
  transition: border-color .18s, box-shadow .18s;
}
.ct-input::placeholder, .ct-textarea::placeholder { color: rgba(232,220,200,.28); }
.ct-input:focus, .ct-textarea:focus { border-color: rgba(201,168,76,.5); box-shadow: 0 0 0 3px rgba(201,168,76,.1); background: rgba(201,168,76,.04); }
.ct-textarea { resize: vertical; min-height: 120px; line-height: 1.6; }

.ct-submit {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 32px; border-radius: 12px;
  background: linear-gradient(135deg, #c9a84c, #e0c06a);
  color: hsl(348,100%,6%); font-weight: 700; font-size: 15px;
  border: none; cursor: pointer;
  box-shadow: 0 4px 24px hsla(43,60%,54%,.38);
  transition: transform .26s, box-shadow .26s;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.ct-submit svg { width: 15px; height: 15px; transition: transform .24s; }
.ct-submit:hover { transform: translateY(-2px); box-shadow: 0 10px 36px hsla(43,60%,54%,.52); }
.ct-submit:hover svg { transform: translateX(4px); }

/* Success */
.ct-success { display: flex; align-items: center; gap: 16px; padding: 20px 24px; background: rgba(45,106,79,.15); border: 1.5px solid rgba(45,106,79,.35); border-radius: 14px; margin-bottom: 24px; }
.ct-success-icon { width: 44px; height: 44px; background: rgba(45,106,79,.25); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #5de89a; flex-shrink: 0; }
.ct-success-title { font-weight: 700; font-size: 16px; color: var(--lv-fg, #e8dcc8); margin-bottom: 2px; }
.ct-success-sub   { font-size: 13px; color: rgba(232,220,200,.5); }

/* Info cards */
.ct-info-col { display: flex; flex-direction: column; gap: 12px; }
.ct-info-card {
  display: flex; align-items: center; gap: 16px;
  background: var(--lv-surface, #111); border: 1px solid rgba(255,255,255,.07);
  border-radius: 14px; padding: 18px 20px;
  transition: transform .2s, border-color .2s;
}
.ct-info-card:hover { transform: translateY(-2px); border-color: rgba(201,168,76,.2); }
.ct-info-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(201,168,76,.1); border: 1px solid rgba(201,168,76,.2); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.ct-info-label { font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(201,168,76,.6); margin-bottom: 3px; }
.ct-info-value { font-size: 15px; font-weight: 600; color: var(--lv-fg, #e8dcc8); }
.ct-info-sub   { font-size: 12px; color: rgba(232,220,200,.4); margin-top: 2px; }

.ct-location-card { background: rgba(201,168,76,.06); border: 1px solid rgba(201,168,76,.18); border-radius: 14px; padding: 28px; text-align: center; margin-top: 4px; }
.ct-location-icon { font-size: 34px; margin-bottom: 10px; }
.ct-location-name { font-family: 'Fraunces', 'Playfair Display', serif; font-size: 19px; font-weight: 700; color: var(--lv-fg, #e8dcc8); margin-bottom: 4px; }
.ct-location-sub  { font-size: 13px; color: rgba(232,220,200,.45); }

@media (max-width: 900px) { .ct-grid { grid-template-columns: 1fr; gap: 40px; } }
@media (max-width: 640px) {
  .ph { min-height: 300px; } .ph-inner { padding: 56px 16px; }
  .pg-section { padding: 64px 0; }
  .ct-form-grid { grid-template-columns: 1fr; }
  .ct-col-2 { grid-column: span 1; }
}
</style>