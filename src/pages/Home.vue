<template>
  <div class="min-h-screen bg-oxford-blue flex flex-col">
    <!-- Nav -->
    <nav class="flex items-center justify-between px-6 py-4 border-b border-lavender/10 sticky top-0 z-50 bg-oxford-blue/95 backdrop-blur-sm">
      <router-link to="/" class="flex items-center">
        <TruffleLogo className="h-8 w-auto" />
      </router-link>
      <router-link
        to="/admin"
        class="text-lavender/60 hover:text-lavender text-sm transition-colors"
      >
        Admin
      </router-link>
    </nav>

    <!-- Hero -->
    <main class="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
      <div class="max-w-3xl mx-auto space-y-8">
        <!-- Label -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyclamen/30 bg-cyclamen/10 text-cyclamen text-sm font-medium">
          <span class="w-1.5 h-1.5 rounded-full bg-cyclamen animate-pulse" />
          WWPS Semiconductor Analytics Practice
        </div>

        <!-- Heading -->
        <h1 class="text-4xl md:text-6xl font-bold text-white leading-tight">
          Join a Global<br />
          <span class="gradient-text">Semiconductor Analytics</span><br />
          Practice
        </h1>

        <!-- Value prop -->
        <p class="text-lg md:text-xl text-lavender/80 leading-relaxed max-w-2xl mx-auto">
          Our client is a leading semiconductor company running a large-scale data migration and
          analytics modernisation programme on Azure and Microsoft Fabric. We are building a
          South African team to serve as a timezone bridge to the US practice — enabling overlap
          hours that extend their engineering day. This is a long-term programme with strong growth
          potential for the right candidates.
        </p>

        <!-- CTA -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <router-link to="/screen" class="btn-primary text-lg px-8 py-4 rounded-xl">
            Start Screening →
          </router-link>
        </div>

        <!-- Trust line -->
        <p class="text-lavender/40 text-sm pt-4">
          Truffle has been placing analytics and actuarial talent for 15+ years
        </p>
      </div>
    </main>

    <!-- Features strip -->
    <section class="px-6 py-16 border-t border-lavender/10">
      <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="card text-center space-y-3">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyclamen to-veronica flex items-center justify-center mx-auto text-white text-2xl">⚡</div>
          <h3 class="font-semibold text-white">2-Minute Screening</h3>
          <p class="text-lavender/60 text-sm">Five targeted questions to assess your fit for the role. No CV upload required.</p>
        </div>
        <div class="card text-center space-y-3">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyclamen to-veronica flex items-center justify-center mx-auto text-white text-2xl">🌍</div>
          <h3 class="font-semibold text-white">Remote-First Role</h3>
          <p class="text-lavender/60 text-sm">Work from anywhere in South Africa. Overlap with US Eastern Time required.</p>
        </div>
        <div class="card text-center space-y-3">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyclamen to-veronica flex items-center justify-center mx-auto text-white text-2xl">🚀</div>
          <h3 class="font-semibold text-white">Long-Term Programme</h3>
          <p class="text-lavender/60 text-sm">Not a short-term contract — this is a sustained programme with career growth.</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="px-6 py-8 border-t border-lavender/10 text-center">
      <p class="text-lavender/40 text-sm">© {{ new Date().getFullYear() }} Truffle. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import TruffleLogo from '../components/TruffleLogo.vue'
</script>
