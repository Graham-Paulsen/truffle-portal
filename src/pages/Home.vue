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
          We're building a specialist data engineering team for one of the world's top five
          semiconductor manufacturers. The US semiconductor industry holds over 50% of global
          market share, with sales projected to hit $1 trillion by 2026. This is a multi-year
          programme inheriting 20 to 25 years of reporting infrastructure across thousands of
          isolated sites, consolidating it into modern Azure and Fabric platforms.
        </p>
        <p class="text-lg md:text-xl text-lavender/80 leading-relaxed max-w-2xl mx-auto">
          Our client has moved 100% of their development and reporting to us. The scale is
          enormous. The work is real. And they're hiring in South Africa.
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

    <!-- Stats -->
    <section class="px-6 py-16 border-t border-lavender/10">
      <div class="max-w-3xl mx-auto text-center space-y-6">
        <h2 class="text-2xl md:text-3xl font-bold text-white">The Scale</h2>
        <p class="text-lavender/80 leading-relaxed max-w-2xl mx-auto">
          Over 35GW of data centre capacity is under construction in North America alone. More than
          $70 billion in quarterly construction spending. The CHIPS Act is driving a manufacturing
          resurgence that will triple domestic chipmaking capacity by 2032. Behind every one of
          those facilities is a data infrastructure that needs building, migrating, and maintaining.
          That is what you will be working on.
        </p>
      </div>
    </section>

    <!-- Why SA -->
    <section class="px-6 py-16 border-t border-lavender/10">
      <div class="max-w-3xl mx-auto text-center space-y-6">
        <h2 class="text-2xl md:text-3xl font-bold text-white">Why South Africa</h2>
        <p class="text-lavender/80 leading-relaxed max-w-2xl mx-auto">
          South Africa sits between the US and Asia. Same timezone as Ireland. The client explicitly
          values this position as a strategic bridge. This is not a cost arbitrage play. It is a
          follow-the-sun delivery model.
        </p>
      </div>
    </section>

    <!-- Features strip -->
    <section class="px-6 py-16 border-t border-lavender/10">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold text-white text-center mb-10">What We're Looking For</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card text-center space-y-3">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyclamen to-veronica flex items-center justify-center mx-auto text-white text-2xl">🔧</div>
            <h3 class="font-semibold text-white">Problem Solvers</h3>
            <p class="text-lavender/60 text-sm">People who enjoy reverse engineering. Self-starters who can be embedded with a business unit and own the relationship.</p>
          </div>
          <div class="card text-center space-y-3">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyclamen to-veronica flex items-center justify-center mx-auto text-white text-2xl">📈</div>
            <h3 class="font-semibold text-white">Growth Hungry</h3>
            <p class="text-lavender/60 text-sm">People who want to learn into modern technology. Legacy experience is valued, not penalised.</p>
          </div>
          <div class="card text-center space-y-3">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyclamen to-veronica flex items-center justify-center mx-auto text-white text-2xl">🌍</div>
            <h3 class="font-semibold text-white">Fully Remote</h3>
            <p class="text-lavender/60 text-sm">Long-term engagement. Competitive, USD-linked packages. South Africa based, overlapping with US Eastern Time.</p>
          </div>
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
