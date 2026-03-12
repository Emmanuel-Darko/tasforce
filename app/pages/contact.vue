<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold);margin-bottom:12px;">Get In Touch</div>
        <h1>Contact Us</h1>
        <p style="margin-top:14px;">We are here to listen and support you.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr 280px;gap:48px;">
          <div>
            <h2 style="font-family:'Playfair Display',serif;font-size:24px;color:var(--crimson);margin-bottom:20px;">Send us a message</h2>
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
          <div style="background:var(--parchment);border:1px solid var(--border);border-radius:8px;padding:24px;">
            <h3 style="font-family:'Playfair Display',serif;font-size:18px;color:var(--crimson);margin-bottom:18px;">Contact Information</h3>
            <div v-for="[k,v] in info" :key="k" style="margin-bottom:16px;">
              <div style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold);margin-bottom:3px;">{{ k }}</div>
              <div style="font-size:15px;color:var(--text);white-space:pre-line;">{{ v }}</div>
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
const info = [
  ['Email',       'info@tas-force.org'],
  ['Phone',       '+123-456-7890'],
  ['Website',     'www.tas-force.org'],
  ['Office Hours','Monday – Friday\n9:00 am – 5:00 pm'],
]
</script>
