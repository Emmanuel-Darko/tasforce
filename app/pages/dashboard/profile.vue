<template>
  <div>
    <div class="topbar">
      <button class="topbar-menu" @click="toggleSidebar?.()">☰</button>
      <h1 class="topbar-title">My Profile</h1>
    </div>
    <div class="page-body">
      <div class="card" style="max-width:600px;">
        <div class="card-header"><h3 class="card-title">Personal Information</h3></div>
        <div class="card-body">
          <div class="form-grid" style="margin-bottom:18px;">
            <div class="field"><label>First Name</label><input type="text" class="f-input" :value="user?.firstName" disabled /></div>
            <div class="field"><label>Last Name</label><input type="text" class="f-input" :value="user?.lastName" disabled /></div>
            <div class="field col-span-2"><label>Email</label><input type="email" class="f-input" :value="user?.email" disabled /></div>
            <div class="field"><label>Country</label><input type="text" class="f-input" :value="user?.country" disabled /></div>
            <div class="field"><label>Position</label><input type="text" class="f-input" :value="user?.position" disabled /></div>
          </div>
          <div class="notice notice-info">
            <span>ℹ</span><span>To update your profile information, please contact the administrator at info@tas-force.org.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })
const { user } = useAuth()
const toggleSidebar = inject<() => void>('toggleSidebar')
</script>
