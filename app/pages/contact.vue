<template>
  <div>
    <section class="pg-hero">
      <img src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=1400&q=80&auto=format&fit=crop" alt="Contact" class="pg-hero-bg" />
      <div class="pg-hero-overlay" />
      <div class="container pg-hero-inner">
        <div class="pg-hero-eyebrow">Get In Touch</div>
        <h1 class="pg-hero-title">Contact Us</h1>
        <p class="pg-hero-sub">We are here to listen, support, and take action.</p>
      </div>
    </section>

    <section style="padding:80px 0;">
      <div class="container">
        <div class="ct-grid">
          <!-- Form -->
          <div>
            <h2 style="font-family:'Playfair Display',serif;font-size:24px;color:var(--crimson);margin-bottom:8px;">Send us a message</h2>
            <p style="font-size:15px;color:var(--muted);margin-bottom:24px;line-height:1.65;">Have a question, need support, or want to collaborate? We'd love to hear from you.</p>

            <div v-if="sent" class="notice notice-ok"><span>✦</span><span>Your message has been sent. We will respond within 2 working days.</span></div>
            <template v-else>
              <div class="form-grid" style="margin-bottom:16px;">
                <div class="field"><label>Full Name <span class="req">*</span></label><input type="text" class="f-input" placeholder="Your full name" v-model="form.name" /></div>
                <div class="field"><label>Email Address <span class="req">*</span></label><input type="email" class="f-input" placeholder="you@email.com" v-model="form.email" /></div>
                <div class="field col-span-2"><label>Subject</label><input type="text" class="f-input" placeholder="What is this about?" v-model="form.subject" /></div>
                <div class="field col-span-2"><label>Message <span class="req">*</span></label><textarea class="f-textarea" rows="5" placeholder="How can we help you?" v-model="form.message" /></div>
              </div>
              <button class="btn btn-crimson" @click="sent = true">Send Message</button>
            </template>
          </div>

          <!-- Info cards -->
          <div class="ct-info">
            <div class="ct-info-card">
              <div class="ct-info-icon">📧</div>
              <div>
                <div class="ct-info-label">Email</div>
                <div class="ct-info-value">info@tas-force.org</div>
              </div>
            </div>
            <div class="ct-info-card">
              <div class="ct-info-icon">📞</div>
              <div>
                <div class="ct-info-label">Phone</div>
                <div class="ct-info-value">+123-456-7890</div>
              </div>
            </div>
            <div class="ct-info-card">
              <div class="ct-info-icon">🌐</div>
              <div>
                <div class="ct-info-label">Website</div>
                <div class="ct-info-value">www.tas-force.org</div>
              </div>
            </div>
            <div class="ct-info-card">
              <div class="ct-info-icon">🕐</div>
              <div>
                <div class="ct-info-label">Office Hours</div>
                <div class="ct-info-value">Mon–Fri, 9am–5pm</div>
              </div>
            </div>

            <!-- Map accent -->
            <div class="ct-map-accent">
              <div style="font-size:32px;margin-bottom:8px;">📍</div>
              <div style="font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:var(--crimson);margin-bottom:4px;">Accra, Ghana</div>
              <div style="font-size:13px;color:var(--muted);">West Africa</div>
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
</script>

<style scoped>
.pg-hero { position:relative; min-height:340px; display:flex; align-items:center; overflow:hidden; }
.pg-hero-bg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.pg-hero-overlay { position:absolute; inset:0; background:linear-gradient(135deg, rgba(26,15,61,0.88), rgba(45,27,105,0.75)); }
.pg-hero-inner { position:relative; z-index:2; padding:60px 0; }
.pg-hero-eyebrow { font-size:11px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:var(--gold); margin-bottom:12px; }
.pg-hero-title { font-family:'Playfair Display',serif; font-size:clamp(32px,5vw,48px); color:var(--cream); font-weight:900; margin-bottom:8px; }
.pg-hero-sub { font-size:17px; color:rgba(255,255,255,0.6); max-width:500px; }

.ct-grid { display:grid; grid-template-columns:1fr 340px; gap:48px; align-items:start; }

.ct-info { display:flex; flex-direction:column; gap:14px; }
.ct-info-card {
  display:flex; align-items:center; gap:16px;
  background:var(--white); border:1px solid var(--border-light); border-radius:14px;
  padding:18px 20px; transition:transform 0.2s, box-shadow 0.2s;
}
.ct-info-card:hover { transform:translateY(-2px); box-shadow:var(--shadow-sm); }
.ct-info-icon {
  width:44px; height:44px; border-radius:12px;
  background:var(--parchment); border:1px solid var(--border);
  display:flex; align-items:center; justify-content:center;
  font-size:18px; flex-shrink:0;
}
.ct-info-label { font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--muted2); }
.ct-info-value { font-size:15px; font-weight:600; color:var(--text); margin-top:2px; }

.ct-map-accent {
  background:linear-gradient(135deg, var(--parchment), var(--parchment2));
  border:1px solid var(--border-light); border-radius:14px;
  padding:28px; text-align:center; margin-top:4px;
}

@media (max-width:768px) {
  .ct-grid { grid-template-columns:1fr; gap:32px; }
  .pg-hero { min-height:260px; }
}
</style>
