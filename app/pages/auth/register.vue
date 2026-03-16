<template>
  <div class="rf-wrap">

    <!-- SUCCESS -->
    <div v-if="submitted" class="rf-success">
      <div class="rf-success-check">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h2 class="rf-success-title">Application Submitted!</h2>
      <p class="rf-success-body">Thank you, <strong>{{ f.firstName }}</strong>. Your application is under review. We'll email <strong>{{ f.email }}</strong> once approved.</p>
      <div class="rf-next">
        <div class="rf-next-label">What happens next?</div>
        <div v-for="(s, i) in nextSteps" :key="i" class="rf-next-item">
          <div class="rf-next-num">{{ i + 1 }}</div>
          <span>{{ s }}</span>
        </div>
      </div>
      <NuxtLink to="/auth/login" class="rf-btn-gold" style="display:flex;justify-content:center;">Sign In to My Account</NuxtLink>
      <p style="margin-top:14px;font-size:13px;color:var(--muted);text-align:center;">Questions? <a href="mailto:info@tas-force.org" style="color:var(--crimson);">info@tas-force.org</a></p>
    </div>

    <!-- FORM -->
    <template v-else>
      <div class="rf-header">
        <h2 class="rf-title">Join TAS-FORCE</h2>
        <p class="rf-sub">Apply for membership — fields marked * are required.</p>
      </div>

      <!-- Stepper -->
      <div class="rf-stepper">
        <div v-for="(l, i) in steps" :key="l" class="rf-step">
          <div class="rf-step-num" :class="{ done: step > i+1, active: step === i+1 }">
            <svg v-if="step > i+1" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 4 6.5 11 3 7.5"/></svg>
            <span v-else>{{ i + 1 }}</span>
          </div>
          <span class="rf-step-lbl" :class="{ active: step === i+1 }">{{ l }}</span>
          <div v-if="i < steps.length - 1" class="rf-step-line" :class="{ done: step > i+1 }" />
        </div>
      </div>

      <div v-if="error" class="rf-error">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><line x1="10" y1="6.5" x2="10" y2="10.5"/><circle cx="10" cy="13.5" r=".6" fill="currentColor" stroke="none"/></svg>
        {{ error }}
      </div>

      <!-- STEP 1 -->
      <template v-if="step === 1">
        <div class="rf-grid">
          <div class="rf-field"><label class="rf-label">First Name <span class="rf-req">*</span></label><input type="text"  class="rf-input" placeholder="e.g. Akosua"        v-model="f.firstName" /></div>
          <div class="rf-field"><label class="rf-label">Last Name <span class="rf-req">*</span></label><input  type="text"  class="rf-input" placeholder="e.g. Serwah"         v-model="f.lastName" /></div>
          <div class="rf-field"><label class="rf-label">Email Address <span class="rf-req">*</span></label><input type="email" class="rf-input" placeholder="you@email.com"   v-model="f.email" /></div>
          <div class="rf-field"><label class="rf-label">Phone Number <span class="rf-req">*</span></label><input type="tel"   class="rf-input" placeholder="+123-456-7890"     v-model="f.phone" /></div>
          <div class="rf-field"><label class="rf-label">Country <span class="rf-req">*</span></label><input   type="text"  class="rf-input" placeholder="e.g. Ghana"          v-model="f.country" /></div>
          <div class="rf-field"><label class="rf-label">City / Town</label><input                             type="text"  class="rf-input" placeholder="e.g. Accra"           v-model="f.city" /></div>
          <div class="rf-field"><label class="rf-label">Date of Birth</label><input                           type="date"  class="rf-input"                                    v-model="f.dateOfBirth" /></div>
          <div class="rf-field"><label class="rf-label">Gender</label>
            <select class="rf-select" v-model="f.gender">
              <option value="">— Select —</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
          <div class="rf-field rf-col2"><label class="rf-label">Occupation</label><input type="text" class="rf-input" placeholder="e.g. Teacher, Lawyer, Student" v-model="f.occupation" /></div>
        </div>
        <div class="rf-actions">
          <button class="rf-btn-primary" @click="nextStep">Continue →</button>
        </div>
      </template>

      <!-- STEP 2 -->
      <template v-if="step === 2">
        <div class="rf-grid">
          <div class="rf-field"><label class="rf-label">Membership Type <span class="rf-req">*</span></label>
            <select class="rf-select" v-model="f.membershipType">
              <option value="advocate">Advocate</option>
              <option value="supporter">Supporter</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>
          <div class="rf-field"><label class="rf-label">Position / Role <span class="rf-req">*</span></label>
            <select class="rf-select" v-model="f.position">
              <option value="advocate">Advocate</option>
              <option value="coordinator">Coordinator</option>
              <option value="volunteer">Volunteer</option>
              <option value="ambassador">Ambassador</option>
              <option value="supporter">Supporter</option>
            </select>
          </div>
          <div class="rf-field rf-col2"><label class="rf-label">Why do you want to join? <span class="rf-req">*</span></label>
            <textarea class="rf-input rf-textarea" rows="4" placeholder="Tell us your motivation for joining TAS-FORCE…" v-model="f.motivation" />
          </div>
          <div class="rf-field"><label class="rf-label">Referred By (Member ID)</label><input type="text" class="rf-input" placeholder="TF-XXXX-XXXX" v-model="f.referredBy" /></div>
          <div class="rf-field"><label class="rf-label">Profile Photo URL</label>
            <input type="url" class="rf-input" placeholder="https://…" v-model="f.photoUrl" />
            <span class="rf-hint">Optional — used on your membership card</span>
          </div>
        </div>
        <div class="rf-actions">
          <button class="rf-btn-outline" @click="step--">← Back</button>
          <button class="rf-btn-primary" @click="nextStep">Continue →</button>
        </div>
      </template>

      <!-- STEP 3 -->
      <template v-if="step === 3">
        <div class="rf-grid">
          <div class="rf-field"><label class="rf-label">Password <span class="rf-req">*</span></label><input type="password" class="rf-input" placeholder="Min. 8 characters" v-model="f.password" /></div>
          <div class="rf-field"><label class="rf-label">Confirm Password <span class="rf-req">*</span></label><input type="password" class="rf-input" placeholder="Re-enter password" v-model="f.confirmPassword" /></div>
        </div>
        <div class="rf-info-box">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><line x1="10" y1="9" x2="10" y2="14"/><circle cx="10" cy="6.5" r=".5" fill="currentColor" stroke="none"/></svg>
          Your application will be reviewed by an administrator. You'll receive an email once approved and your membership card is issued.
        </div>
        <div class="rf-actions">
          <button class="rf-btn-outline" @click="step--">← Back</button>
          <button class="rf-btn-gold" :disabled="loading" @click="submit">
            <span v-if="loading" class="rf-spinner" />
            {{ loading ? 'Submitting…' : 'Submit Application' }}
          </button>
        </div>
      </template>

      <p class="rf-footer-link">
        Already a member? <NuxtLink to="/auth/login" style="color:var(--crimson);font-weight:600;">Sign in here</NuxtLink>
      </p>
    </template>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: 'guest' })
const steps = ['Personal', 'Membership', 'Security']
const step = ref(1), loading = ref(false), error = ref(''), submitted = ref(false)
const f = reactive({
  firstName:'', lastName:'', email:'', phone:'', country:'', city:'',
  dateOfBirth:'', gender:'', occupation:'',
  membershipType:'advocate', position:'advocate',
  motivation:'', referredBy:'', photoUrl:'',
  password:'', confirmPassword:'',
})
const nextSteps = [
  'Admin reviews your application (usually within 24–48 hours).',
  'You receive an approval email with your Member ID.',
  'Log in to download and print your official membership card.',
]
function nextStep() {
  error.value = ''
  if (step.value === 1 && (!f.firstName || !f.lastName || !f.email || !f.phone || !f.country)) {
    error.value = 'Please fill in all required fields.'; return
  }
  if (step.value === 2 && !f.motivation) {
    error.value = 'Please tell us your motivation for joining.'; return
  }
  step.value++
}
async function submit() {
  error.value = ''
  if (!f.password || f.password.length < 8) { error.value = 'Password must be at least 8 characters.'; return }
  if (f.password !== f.confirmPassword) { error.value = 'Passwords do not match.'; return }
  loading.value = true
  try {
    const { confirmPassword: _, ...body } = f
    await $fetch('/api/auth/register', { method: 'POST', body })
    submitted.value = true
  } catch (e: any) {
    error.value = e?.data?.message || 'Registration failed. Please try again.'
  } finally { loading.value = false }
}
</script>

<style scoped>
.rf-wrap {
  width: 100%;
  max-width: 580px;
  background: var(--white);
  border-radius: 20px;
  padding: 36px 36px 32px;
  box-shadow: 0 4px 32px rgba(61,0,0,.1), 0 1px 4px rgba(61,0,0,.06);
  border: 1px solid var(--border-light);
}

/* Header */
.rf-header { margin-bottom: 24px; }
.rf-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--crimson); margin-bottom: 5px; }
.rf-sub   { font-size: 14px; color: var(--muted); }

/* Stepper */
.rf-stepper { display: flex; align-items: flex-start; gap: 0; margin-bottom: 26px; }
.rf-step   { display: flex; flex-direction: column; align-items: center; gap: 5px; flex: 1; position: relative; }
.rf-step-num {
  width: 30px; height: 30px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif; font-size: 13px; font-weight: 700;
  background: var(--parchment2); color: var(--muted2);
  border: 2px solid var(--border); z-index: 1; position: relative;
  transition: all .22s;
}
.rf-step-num.active { background: var(--crimson); color: var(--cream); border-color: var(--crimson); box-shadow: 0 0 0 3px rgba(107,15,26,.15); }
.rf-step-num.done   { background: var(--gold); color: var(--crimson-deep); border-color: var(--gold); }
.rf-step-num svg    { width: 14px; height: 14px; }
.rf-step-lbl  { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: var(--muted2); text-align: center; }
.rf-step-lbl.active { color: var(--crimson); }
.rf-step-line {
  position: absolute; top: 15px; left: 50%; right: -50%;
  height: 2px; background: var(--border); z-index: 0;
  transition: background .22s;
}
.rf-step-line.done { background: var(--gold); }

/* Error */
.rf-error {
  display: flex; align-items: center; gap: 10px;
  padding: 11px 14px; background: #fff0f0;
  border: 1.5px solid #f5c0c0; border-radius: 10px;
  font-size: 13px; color: #7a0000; margin-bottom: 18px;
}
.rf-error svg { width: 17px; height: 17px; flex-shrink: 0; color: #c0392b; }

/* Form grid */
.rf-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
.rf-col2  { grid-column: span 2; }
.rf-field { display: flex; flex-direction: column; gap: 5px; }
.rf-label { font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--text-mid); }
.rf-req   { color: var(--danger); }
.rf-hint  { font-size: 12px; color: var(--muted2); margin-top: 3px; }
.rf-input, .rf-select {
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: 10px;
  padding: 10px 13px;
  font-family: 'Crimson Pro', serif;
  font-size: 15px;
  color: var(--text);
  outline: none;
  width: 100%;
  transition: border-color .18s, box-shadow .18s;
  -webkit-appearance: none;
  appearance: none;
}
.rf-select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237A5060' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 13px center;
  padding-right: 36px;
  cursor: pointer;
}
.rf-input::placeholder { color: var(--muted2); }
.rf-input:focus, .rf-select:focus {
  border-color: var(--crimson);
  box-shadow: 0 0 0 3px rgba(107,15,26,.1);
  background: #fffaf8;
}
.rf-textarea { resize: vertical; min-height: 96px; line-height: 1.6; }

/* Info box */
.rf-info-box {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 12px 16px; background: #f0f6ff;
  border: 1.5px solid #b8cef8; border-radius: 10px;
  font-size: 14px; color: #1a3a80; line-height: 1.6; margin-bottom: 18px;
}
.rf-info-box svg { width: 18px; height: 18px; flex-shrink: 0; margin-top: 1px; }

/* Actions */
.rf-actions { display: flex; justify-content: flex-end; gap: 10px; }

/* Buttons */
.rf-btn-primary {
  padding: 11px 26px; border-radius: 10px;
  background: var(--crimson); color: var(--cream);
  font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700;
  border: none; cursor: pointer; letter-spacing: .02em;
  box-shadow: 0 2px 10px rgba(107,15,26,.28);
  transition: background .2s, transform .2s;
}
.rf-btn-primary:hover { background: var(--crimson2); transform: translateY(-1px); }

.rf-btn-gold {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 11px 26px; border-radius: 10px;
  background: linear-gradient(135deg, var(--gold), var(--gold2));
  color: var(--crimson-deep); font-family: 'Playfair Display', serif;
  font-size: 15px; font-weight: 700; border: none; cursor: pointer;
  box-shadow: 0 2px 10px rgba(201,168,76,.32);
  transition: transform .2s, box-shadow .2s, opacity .2s;
}
.rf-btn-gold:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 18px rgba(201,168,76,.45); }
.rf-btn-gold:disabled { opacity: .6; cursor: not-allowed; }

.rf-btn-outline {
  padding: 11px 22px; border-radius: 10px; background: transparent;
  color: var(--crimson); border: 1.5px solid var(--crimson);
  font-family: 'Crimson Pro', serif; font-size: 15px; font-weight: 600;
  cursor: pointer; transition: background .18s;
}
.rf-btn-outline:hover { background: rgba(107,15,26,.05); }

.rf-spinner {
  width: 15px; height: 15px; border-radius: 50%;
  border: 2px solid rgba(45,0,8,.25); border-top-color: var(--crimson-deep);
  animation: rfSpin .7s linear infinite; flex-shrink: 0;
}
@keyframes rfSpin { to { transform: rotate(360deg); } }

.rf-footer-link { margin-top: 20px; font-size: 14px; color: var(--muted); }

/* Success */
.rf-success { text-align: center; }
.rf-success-check {
  width: 68px; height: 68px; border-radius: 50%;
  background: linear-gradient(135deg, #1f6644, #2D6A4F);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 4px 18px rgba(31,102,68,.35);
}
.rf-success-check svg { width: 28px; height: 28px; color: #fff; }
.rf-success-title { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: var(--crimson); margin-bottom: 10px; }
.rf-success-body  { font-size: 15px; color: var(--muted); line-height: 1.75; margin-bottom: 22px; }
.rf-next { background: var(--parchment2); border: 1px solid var(--border); border-radius: 14px; padding: 18px 22px; margin-bottom: 24px; text-align: left; }
.rf-next-label { font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--muted2); margin-bottom: 12px; }
.rf-next-item { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 10px; font-size: 14px; color: var(--text-mid); line-height: 1.55; }
.rf-next-num  { width: 22px; height: 22px; border-radius: 50%; background: var(--crimson); color: var(--cream); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; font-family: 'Playfair Display', serif; }

@media (max-width: 520px) {
  .rf-wrap { padding: 28px 20px 24px; border-radius: 16px; }
  .rf-grid { grid-template-columns: 1fr; }
  .rf-col2 { grid-column: span 1; }
  .rf-actions { flex-direction: column-reverse; }
  .rf-btn-primary, .rf-btn-gold, .rf-btn-outline { width: 100%; justify-content: center; text-align: center; }
  .rf-step-lbl { display: none; }
}
</style>