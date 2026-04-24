<template>
  <div class="min-h-screen bg-oxford-blue flex flex-col">

    <!-- Nav -->
    <nav class="flex items-center justify-between px-6 py-5 border-b border-lavender/10 sticky top-0 z-50 bg-oxford-blue/95 backdrop-blur-sm">
      <router-link to="/" class="flex items-center">
        <TruffleLogo className="h-10 w-auto" />
      </router-link>
      <div class="hidden md:flex items-center gap-6 text-base text-lavender/60">
        <a href="#brief" class="hover:text-lavender transition-colors">The Brief</a>
        <a href="#industry" class="hover:text-lavender transition-colors">Industry</a>
        <a href="#challenge" class="hover:text-lavender transition-colors">The Challenge</a>
        <a href="#program" class="hover:text-lavender transition-colors">Program</a>
        <a href="#team" class="hover:text-lavender transition-colors">Team</a>
        <a href="#looking" class="hover:text-lavender transition-colors">Role Fit</a>
        <a href="#evp" class="hover:text-lavender transition-colors">Benefits</a>
      </div>
      <div class="flex items-center gap-6">
        <router-link to="/screen" class="text-cyclamen hover:text-cyclamen/80 text-sm font-medium transition-colors">
          Join Now
        </router-link>
        <router-link to="/admin" class="text-lavender/40 hover:text-lavender/60 text-xs transition-colors hidden md:inline">
          Admin
        </router-link>
      </div>
    </nav>

    <!-- ====== HERO ====== -->
    <header class="relative overflow-hidden">
      <div class="absolute inset-0">
        <img src="/img/AdobeStock_482999310.jpg" alt="Semiconductor wafer" class="w-full h-full object-cover opacity-35" />
        <div class="absolute inset-0 bg-gradient-to-b from-oxford-blue/75 via-oxford-blue/95 to-oxford-blue" />
      </div>
      <div class="relative max-w-4xl mx-auto px-6 py-24 md:py-32 text-center space-y-8">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyclamen/30 bg-cyclamen/10 text-cyclamen text-sm font-medium">
          <span class="w-1.5 h-1.5 rounded-full bg-cyclamen animate-pulse" />
          Truffle Talent — Offshore Engineering Centre of Excellence
        </div>
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
          Building a Global<br />
          <span class="gradient-text">Engineering and Analytics</span><br />
          Practice from South Africa
        </h1>
        <p class="text-lg md:text-xl text-lavender/70 leading-relaxed max-w-2xl mx-auto">
          An offshore data engineering program for one of the world's leading advanced
          construction firms servicing the semiconductor, datacentre and energy sectors.
          3,000 legacy reporting and dashboard assets. 20 years of federated infrastructure.
          One team to bring it into the modern era.
        </p>
        <div class="pt-4">
          <router-link to="/screen" class="btn-primary text-lg px-10 py-4 rounded-xl inline-block">
            Start Initial Assessment
          </router-link>
        </div>
      </div>
    </header>

    <!-- ====== THE BRIEF ====== -->
    <section id="brief" class="scroll-mt-20 border-t border-lavender/10">
      <div class="max-w-4xl mx-auto px-6 py-20">
        <div class="flex items-center gap-3 mb-10">
          <div class="w-1 h-8 bg-cyclamen rounded-full" />
          <h2 class="text-sm font-semibold text-cyclamen uppercase tracking-widest">The Brief</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 class="text-2xl md:text-3xl font-bold text-white leading-snug mb-4">
              A 15-year partnership entering its most ambitious phase
            </h3>
            <p class="text-lavender/70 leading-relaxed">
              Our construction client has worked with this semiconductor client for over a decade.
              Following a massive organisational restructure, the semiconductor client chose to
              consolidate and offshore all internal data engineering and analytics related to their
              construction and fabrication.
            </p>
            <p class="text-lavender/70 leading-relaxed mt-4">
              Various subsidiaries, multiple sites, each with their own tech stack, methodologies,
              and systems, are being transitioned into this program. Our client, a leader in
              Advanced Construction serving the semiconductor, datacentre, and energy sectors, was
              awarded 100% of this work following a decade-long partnership.
            </p>
          </div>
          <div class="space-y-6">
            <div class="p-5 rounded-xl bg-white/[0.03] border border-lavender/10">
              <div class="text-3xl font-bold gradient-text mb-1">~3,000</div>
              <div class="text-lavender/60 text-sm">Dashboard and reporting assets inherited across multiple environments</div>
            </div>
            <div class="p-5 rounded-xl bg-white/[0.03] border border-lavender/10">
              <div class="text-3xl font-bold gradient-text mb-1">20–25 yrs</div>
              <div class="text-lavender/60 text-sm">Of legacy reporting across multiple eras of Microsoft stack</div>
            </div>
            <div class="p-5 rounded-xl bg-white/[0.03] border border-lavender/10">
              <div class="text-3xl font-bold gradient-text mb-1">60–70</div>
              <div class="text-lavender/60 text-sm">Active backlog tasks, growing by ~10 every week</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== FULL-WIDTH IMAGE BREAK ====== -->
    <div class="relative h-64 md:h-96 overflow-hidden">
      <img src="/img/AdobeStock_499684822.jpg" alt="Data centre infrastructure" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-r from-oxford-blue/80 to-oxford-blue/40" />
      <div class="absolute inset-0 flex items-center px-6 md:px-16">
        <blockquote class="max-w-xl">
          <p class="text-xl md:text-2xl text-white font-light leading-relaxed italic">
            "They did all of this in-house... they have already made the move that no, we're going
            to bring this out of house... they decided that they want to go 100% outsourced to us."
          </p>
          <cite class="block mt-4 text-cyclamen text-sm not-italic">— Director, Software Engineering, Client</cite>
        </blockquote>
      </div>
    </div>

    <!-- ====== THE INDUSTRY ====== -->
    <section id="industry" class="scroll-mt-20 border-t border-lavender/10">
      <div class="max-w-4xl mx-auto px-6 py-20">
        <div class="flex items-center gap-3 mb-10">
          <div class="w-1 h-8 bg-cyclamen rounded-full" />
          <h2 class="text-sm font-semibold text-cyclamen uppercase tracking-widest">The Industry</h2>
        </div>

        <h3 class="text-2xl md:text-3xl font-bold text-white leading-snug mb-6">
          The largest infrastructure build-out in a generation
        </h3>
        <p class="text-lavender/70 leading-relaxed max-w-2xl mb-12">
          The US semiconductor industry holds over 50% of global market share. Sales are projected
          to surpass $1 trillion by 2030. The CHIPS Act is driving a domestic manufacturing
          resurgence that will triple US chipmaking capacity by 2032. Behind every new fab is a
          data infrastructure that needs building, migrating, and maintaining.
        </p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="p-5 rounded-xl bg-white/[0.03] border border-lavender/10 text-center">
            <div class="text-2xl md:text-3xl font-bold gradient-text mb-1">$1T+</div>
            <div class="text-lavender/50 text-xs">Projected semiconductor sales by 2030</div>
          </div>
          <div class="p-5 rounded-xl bg-white/[0.03] border border-lavender/10 text-center">
            <div class="text-2xl md:text-3xl font-bold gradient-text mb-1">3×</div>
            <div class="text-lavender/50 text-xs">US chipmaking capacity growth by 2032</div>
          </div>
          <div class="p-5 rounded-xl bg-white/[0.03] border border-lavender/10 text-center">
            <div class="text-2xl md:text-3xl font-bold gradient-text mb-1">35GW+</div>
            <div class="text-lavender/50 text-xs">Data centre capacity under construction in North America</div>
          </div>
          <div class="p-5 rounded-xl bg-white/[0.03] border border-lavender/10 text-center">
            <div class="text-2xl md:text-3xl font-bold gradient-text mb-1">$70B+</div>
            <div class="text-lavender/50 text-xs">Quarterly construction spending in the sector</div>
          </div>
        </div>

        <p class="text-lavender/50 text-xs mt-8 text-center">
          Sources: Semiconductor Industry Association, US Bureau of Labor Statistics, McKinsey Global Institute
        </p>
      </div>
    </section>

    <!-- ====== THE CHALLENGE ====== -->
    <section id="challenge" class="scroll-mt-20 border-t border-lavender/10">
      <div class="max-w-4xl mx-auto px-6 py-20">
        <div class="flex items-center gap-3 mb-10">
          <div class="w-1 h-8 bg-cyclamen rounded-full" />
          <h2 class="text-sm font-semibold text-cyclamen uppercase tracking-widest">The Challenge</h2>
        </div>

        <h3 class="text-2xl md:text-3xl font-bold text-white leading-snug mb-8">
          Reverse engineering two decades of fragmented data infrastructure
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="space-y-6">
            <p class="text-lavender/70 leading-relaxed">
              Multiple subsidiary organizations had a federated data model with autonomy to
              choose their stack and own their data and reporting, each with their own engineers,
              developers, and methodologies. Zero cross-pollination. The people who built these
              systems are no longer there. Sometimes nobody remembers where the source files are.
            </p>
            <p class="text-lavender/70 leading-relaxed">
              Four to five enterprise data warehouses. A patchwork of on-prem and cloud, with the
              on-prem footprint still growing as new assets are discovered. SSIS packages from the
              early 2000s sitting alongside modern Azure Data Factory pipelines.
            </p>
          </div>
          <div class="space-y-4">
            <div class="callout-card">
              <p class="text-white/90 text-sm leading-relaxed italic">
                "Those that were owning it are no longer there. So sometimes they don't even know
                how to access these datasets."
              </p>
              <span class="text-cyclamen text-xs mt-2 block">— Lead Business Analyst, Client</span>
            </div>
            <div class="callout-card">
              <p class="text-white/90 text-sm leading-relaxed italic">
                "So many different tech stacks, so many different methodologies, so many different
                credentials and solutions and key vaults and you name it."
              </p>
              <span class="text-cyclamen text-xs mt-2 block">— Director, Software Engineering, Client</span>
            </div>
          </div>
        </div>

        <!-- Tech stack timeline -->
        <div class="p-8 md:p-10 rounded-2xl bg-white/[0.03] border border-lavender/10">
          <h4 class="text-white font-semibold mb-8 text-center">Technology Landscape</h4>

          <!-- Timeline connector -->
          <div class="hidden md:block h-px bg-gradient-to-r from-lavender/30 via-cyclamen/50 to-cyclamen/30 mb-8"></div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Legacy -->
            <div class="space-y-4">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-2 h-2 rounded-full bg-lavender/40"></div>
                <span class="text-lavender/60 font-mono text-xs uppercase tracking-wider">Legacy — Inheriting</span>
              </div>
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-white/70 text-sm"><span class="inline-block w-1 h-1 rounded-full bg-lavender/50 flex-shrink-0"></span> SQL Server / T-SQL</div>
                <div class="flex items-center gap-2 text-white/70 text-sm"><span class="inline-block w-1 h-1 rounded-full bg-lavender/50 flex-shrink-0"></span> SSIS / SSRS / SSAS</div>
                <div class="flex items-center gap-2 text-white/70 text-sm"><span class="inline-block w-1 h-1 rounded-full bg-lavender/50 flex-shrink-0"></span> DTS / PBIRS</div>
                <div class="flex items-center gap-2 text-white/70 text-sm"><span class="inline-block w-1 h-1 rounded-full bg-lavender/50 flex-shrink-0"></span> Teradata</div>
                <div class="flex items-center gap-2 text-white/70 text-sm"><span class="inline-block w-1 h-1 rounded-full bg-lavender/50 flex-shrink-0"></span> Stored Procedures</div>
                <div class="flex items-center gap-2 text-white/70 text-sm"><span class="inline-block w-1 h-1 rounded-full bg-lavender/50 flex-shrink-0"></span> Semantic Models</div>
              </div>
            </div>

            <!-- Current -->
            <div class="space-y-4">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-2 h-2 rounded-full bg-cyclamen/60"></div>
                <span class="text-cyclamen/80 font-mono text-xs uppercase tracking-wider">Current — Transitional</span>
              </div>
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-white/70 text-sm"><span class="inline-block w-1 h-1 rounded-full bg-cyclamen/50 flex-shrink-0"></span> Azure Data Factory</div>
                <div class="flex items-center gap-2 text-white/70 text-sm"><span class="inline-block w-1 h-1 rounded-full bg-cyclamen/50 flex-shrink-0"></span> Power BI Cloud</div>
                <div class="flex items-center gap-2 text-white/70 text-sm"><span class="inline-block w-1 h-1 rounded-full bg-cyclamen/50 flex-shrink-0"></span> Snowflake</div>
                <div class="flex items-center gap-2 text-white/70 text-sm"><span class="inline-block w-1 h-1 rounded-full bg-cyclamen/50 flex-shrink-0"></span> SQL / T-SQL</div>
                <div class="flex items-center gap-2 text-white/70 text-sm"><span class="inline-block w-1 h-1 rounded-full bg-cyclamen/50 flex-shrink-0"></span> Smartsheet</div>
                <div class="flex items-center gap-2 text-white/70 text-sm"><span class="inline-block w-1 h-1 rounded-full bg-cyclamen/50 flex-shrink-0"></span> Data Mapping</div>
              </div>
            </div>

            <!-- Target -->
            <div class="space-y-4">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-2 h-2 rounded-full bg-cyclamen"></div>
                <span class="text-cyclamen font-mono text-xs uppercase tracking-wider">Target — Building Toward</span>
              </div>
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-white/70 text-sm"><span class="inline-block w-1 h-1 rounded-full bg-cyclamen flex-shrink-0"></span> Microsoft Fabric</div>
                <div class="flex items-center gap-2 text-white/70 text-sm"><span class="inline-block w-1 h-1 rounded-full bg-cyclamen flex-shrink-0"></span> Azure Data Lake</div>
                <div class="flex items-center gap-2 text-white/70 text-sm"><span class="inline-block w-1 h-1 rounded-full bg-cyclamen flex-shrink-0"></span> Databricks</div>
                <div class="flex items-center gap-2 text-white/70 text-sm"><span class="inline-block w-1 h-1 rounded-full bg-cyclamen flex-shrink-0"></span> Power BI</div>
                <div class="flex items-center gap-2 text-white/70 text-sm"><span class="inline-block w-1 h-1 rounded-full bg-cyclamen flex-shrink-0"></span> Self-service Model</div>
                <div class="flex items-center gap-2 text-white/70 text-sm"><span class="inline-block w-1 h-1 rounded-full bg-cyclamen flex-shrink-0"></span> Data Governance</div>
              </div>
            </div>
          </div>

          <!-- Mobile: horizontal scroll hint -->
          <div class="md:hidden mt-4 text-center">
            <div class="h-px bg-gradient-to-r from-lavender/30 via-cyclamen/50 to-cyclamen/30"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== FULL-WIDTH IMAGE BREAK 2 ====== -->
    <div class="relative h-64 md:h-96 overflow-hidden">
      <img src="/img/AdobeStock_477534477.jpg" alt="Silicon wafer close-up" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-l from-oxford-blue/80 to-oxford-blue/40" />
      <div class="absolute inset-0 flex items-center justify-end px-6 md:px-16">
        <blockquote class="max-w-xl text-right">
          <p class="text-xl md:text-2xl text-white font-light leading-relaxed italic">
            "It's all Microsoft tech stack, but different solutions throughout it. And then different
            eras of Microsoft tech stack still being deployed."
          </p>
          <cite class="block mt-4 text-cyclamen text-sm not-italic">— Director, Software Engineering, Client</cite>
        </blockquote>
      </div>
    </div>

    <!-- ====== THE PROGRAMME ====== -->
    <section id="program" class="scroll-mt-20 border-t border-lavender/10">
      <div class="max-w-4xl mx-auto px-6 py-20">
        <div class="flex items-center gap-3 mb-10">
          <div class="w-1 h-8 bg-cyclamen rounded-full" />
          <h2 class="text-sm font-semibold text-cyclamen uppercase tracking-widest">The Program</h2>
        </div>

        <h3 class="text-2xl md:text-3xl font-bold text-white leading-snug mb-12">
          Two phases. A stabilisation sprint followed by a multi-year modernisation journey.
        </h3>

        <div class="space-y-8">
          <!-- Phase 1 -->
          <div class="relative pl-8 border-l-2 border-cyclamen/40">
            <div class="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-cyclamen" />
            <div class="mb-2">
              <span class="text-cyclamen font-mono text-sm">Phase 1</span>
              <span class="text-lavender/40 text-sm ml-3">0–6 months</span>
            </div>
            <h4 class="text-xl font-bold text-white mb-3">Stabilisation</h4>
            <ul class="space-y-2 text-lavender/70">
              <li class="flex items-start gap-2"><span class="text-cyclamen mt-1">→</span> Inherit everything. Understand connections across all business units.</li>
              <li class="flex items-start gap-2"><span class="text-cyclamen mt-1">→</span> Audit what's being used. Identify duplicates. Turn off the dead reports.</li>
              <li class="flex items-start gap-2"><span class="text-cyclamen mt-1">→</span> Fix active bugs — reports down, data flows broken, critical paths blocked.</li>
              <li class="flex items-start gap-2"><span class="text-cyclamen mt-1">→</span> Integrate with business units. Learn their players and data models.</li>
            </ul>
          </div>

          <!-- Phase 2 — gradient glow -->
          <div class="relative pl-8">
            <div class="absolute left-0 top-0 bottom-0 w-0.5 -translate-x-px bg-gradient-to-b from-cyclamen to-veronica rounded-full" />
            <div class="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-gradient-to-br from-cyclamen to-veronica" />
            <div class="mb-2">
              <span class="bg-gradient-to-r from-cyclamen to-veronica bg-clip-text text-transparent font-mono text-sm font-semibold">Phase 2</span>
              <span class="text-lavender/40 text-sm ml-3">6–18+ months</span>
            </div>
            <h4 class="text-xl font-bold text-white mb-3">Standardisation & Modernisation</h4>
            <ul class="space-y-2 text-lavender/70">
              <li class="flex items-start gap-2"><span class="bg-gradient-to-r from-cyclamen to-veronica bg-clip-text text-transparent mt-1 font-bold">→</span> Consolidate into standardised enterprise data models.</li>
              <li class="flex items-start gap-2"><span class="bg-gradient-to-r from-cyclamen to-veronica bg-clip-text text-transparent mt-1 font-bold">→</span> Migrate legacy stacks into modern Azure and Fabric platforms.</li>
              <li class="flex items-start gap-2"><span class="bg-gradient-to-r from-cyclamen to-veronica bg-clip-text text-transparent mt-1 font-bold">→</span> Work with the BA team and client stakeholders to rationalise the reporting environment.</li>
              <li class="flex items-start gap-2"><span class="bg-gradient-to-r from-cyclamen to-veronica bg-clip-text text-transparent mt-1 font-bold">→</span> Reduce duplication. Build a governed, self-service data culture.</li>
              <li class="flex items-start gap-2"><span class="bg-gradient-to-r from-cyclamen to-veronica bg-clip-text text-transparent mt-1 font-bold">→</span> Target: 25% central reports, 75% self-service. Microsoft Fabric as the endgame.</li>
            </ul>
          </div>
        </div>

        <div class="callout-card mt-10">
          <p class="text-white/90 text-sm leading-relaxed italic">
            "Our 6-month goal is bring in capacity, expand the team, and get control of the backlog."
          </p>
          <span class="text-cyclamen text-xs mt-2 block">— Director, Software Engineering, Client</span>
        </div>
      </div>
    </section>

    <!-- ====== WHY SOUTH AFRICA ====== -->
    <section class="border-t border-lavender/10 bg-white/[0.02]">
      <div class="max-w-5xl mx-auto px-6 py-20">
        <div class="flex items-center gap-3 mb-10">
          <div class="w-1 h-8 bg-cyclamen rounded-full" />
          <h2 class="text-sm font-semibold text-cyclamen uppercase tracking-widest">Why South Africa</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch rounded-2xl overflow-hidden border border-lavender/10">
          <div class="space-y-6 p-8 md:p-10">
            <h3 class="text-2xl md:text-3xl font-bold text-white leading-snug">
              Follow the sun. Not just the cost.
            </h3>
            <p class="text-lavender/70 leading-relaxed">
              South Africa sits between the US and Asia in a "follow the sun" delivery model.
              Same timezone as Ireland, one of the end client's major hubs. The strategic position
              is what drew our client to South Africa. The cost advantage is real, but it's not the story.
            </p>
            <p class="text-lavender/70 leading-relaxed">
              The long-term vision is a physical office in Cape Town, growing beyond this engagement
              into a permanent offshore capability.
            </p>
            <div class="callout-card">
              <p class="text-white/90 text-sm leading-relaxed italic">
                "What actually interests us about South Africa... is you're somewhat in the middle
                of our two biggest standing end clients."
              </p>
              <span class="text-cyclamen text-xs mt-2 block">— Director, Software Engineering, Client</span>
            </div>
          </div>
          <div class="relative min-h-[400px] md:min-h-0">
            <img
              src="/img/file_402.jpg"
              alt="Cape Town cityscape with Table Mountain"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-oxford-blue/30 to-transparent md:block hidden"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== THE TEAM ====== -->
    <section id="team" class="scroll-mt-20 border-t border-lavender/10">
      <div class="max-w-4xl mx-auto px-6 py-20">
        <div class="flex items-center gap-3 mb-10">
          <div class="w-1 h-8 bg-cyclamen rounded-full" />
          <h2 class="text-sm font-semibold text-cyclamen uppercase tracking-widest">The Team</h2>
        </div>

        <h3 class="text-2xl md:text-3xl font-bold text-white leading-snug mb-4">
          Eight engineers. Four specialist roles.
        </h3>
        <p class="text-lavender/70 leading-relaxed mb-10 max-w-2xl">
          We're recruiting a senior-weighted team of eight data engineers to embed directly
          with our client's analytics practice. Fully remote from South Africa, overlapping with
          US Eastern Time.
        </p>

        <!-- Master-detail: role selector + detail pane -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">

          <!-- Left: stacked role cards -->
          <div class="md:col-span-2 space-y-3">
            <button
              v-for="(role, idx) in roles"
              :key="role.title"
              @click="selectedRole = idx"
              class="w-full text-left p-4 rounded-xl border transition-all duration-200"
              :class="selectedRole === idx
                ? 'bg-white/[0.06] border-cyclamen/40 shadow-lg shadow-cyclamen/5'
                : 'bg-white/[0.03] border-lavender/10 hover:bg-white/[0.05] hover:border-lavender/20'"
            >
              <div class="flex items-center gap-3">
                <span class="text-2xl font-bold gradient-text">×{{ role.qty }}</span>
                <div>
                  <div class="text-white font-semibold text-sm">{{ role.title }}</div>
                  <div class="text-lavender/50 text-xs">{{ role.years }}</div>
                </div>
              </div>
            </button>
          </div>

          <!-- Right: detail pane -->
          <div class="md:col-span-3 p-6 rounded-xl bg-white/[0.03] border border-lavender/10">
            <div class="mb-4">
              <div class="flex items-center gap-3 mb-1">
                <span class="text-xl font-bold gradient-text">×{{ roles[selectedRole].qty }}</span>
                <h4 class="text-white font-semibold">{{ roles[selectedRole].title }}</h4>
              </div>
              <div class="text-lavender/50 text-xs">{{ roles[selectedRole].years }}</div>
            </div>

            <div class="space-y-5">
              <div>
                <div class="text-cyclamen text-xs font-semibold uppercase tracking-wider mb-2">Primary Responsibilities</div>
                <p class="text-lavender/70 text-sm leading-relaxed">{{ roles[selectedRole].responsibilities }}</p>
              </div>
              <div>
                <div class="text-cyclamen text-xs font-semibold uppercase tracking-wider mb-2">Key Technologies</div>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in roles[selectedRole].tech"
                    :key="tech"
                    class="px-2.5 py-1 rounded-md bg-gradient-to-r from-cyclamen/20 to-veronica/20 border border-cyclamen/10 text-lavender/80 text-xs"
                  >{{ tech }}</span>
                </div>
              </div>
              <div>
                <div class="text-cyclamen text-xs font-semibold uppercase tracking-wider mb-2">Critical Skill Sets</div>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="skill in roles[selectedRole].skills"
                    :key="skill"
                    class="px-2.5 py-1 rounded-md bg-gradient-to-r from-cyclamen/30 to-veronica/30 border border-cyclamen/20 text-white/90 text-xs"
                  >{{ skill }}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="callout-card">
          <p class="text-white/90 text-sm leading-relaxed italic">
            "I want to start a team of 8 or 10 right off the bat down there... and then grow from there."
          </p>
          <span class="text-cyclamen text-xs mt-2 block">— Director, Software Engineering, Client</span>
        </div>
      </div>
    </section>

    <!-- ====== WHAT THEY WANT ====== -->
    <section id="looking" class="scroll-mt-20 border-t border-lavender/10 bg-white/[0.02]">
      <div class="max-w-4xl mx-auto px-6 py-20">
        <div class="flex items-center gap-3 mb-10">
          <div class="w-1 h-8 bg-cyclamen rounded-full" />
          <h2 class="text-sm font-semibold text-cyclamen uppercase tracking-widest">Role Fit</h2>
        </div>

        <div class="space-y-6">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-cyclamen to-veronica flex items-center justify-center flex-shrink-0 mt-1">
              <IconPuzzle class="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 class="text-white font-semibold mb-1">Problem solvers who enjoy reverse engineering</h4>
              <p class="text-lavender/60 text-sm leading-relaxed">
                You'll inherit systems built by people who are no longer there. You need to figure out
                how things work, not just follow instructions and be comfortable with ambiguity.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-cyclamen to-veronica flex items-center justify-center flex-shrink-0 mt-1">
              <IconCompass class="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 class="text-white font-semibold mb-1">Self-performers who can be embedded with a business unit</h4>
              <p class="text-lavender/60 text-sm leading-relaxed">
                You'll own a relationship with a specific business unit. Learn their players,
                their data models, their language. Operate independently but collaborate with the
                team on best practice and the shared vision.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-cyclamen to-veronica flex items-center justify-center flex-shrink-0 mt-1">
              <IconDatabase class="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 class="text-white font-semibold mb-1">Legacy experience valued, not penalised</h4>
              <p class="text-lavender/60 text-sm leading-relaxed">
                SSIS, stored procedures, SQL but also SSAS — if you know this world, you're ahead.
                They have a heavy SSAS reporting cube environment which needs to move to ADF in the
                interim, and later migrate into modern Azure solutions and Fabric.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-cyclamen to-veronica flex items-center justify-center flex-shrink-0 mt-1">
              <IconRocket class="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 class="text-white font-semibold mb-1">Growth-hungry people who want to learn</h4>
              <p class="text-lavender/60 text-sm leading-relaxed">
                Things are moving so fast in this sector that as part of the journey, you'll be an
                early entrant, with a perspective and set of skills that will define the next decade
                of data engineering.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-cyclamen to-veronica flex items-center justify-center flex-shrink-0 mt-1">
              <IconGlobe class="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 class="text-white font-semibold mb-1">Fully remote, long-term view</h4>
              <p class="text-lavender/60 text-sm leading-relaxed">
                Our engagement has an 18-month initial term with a 12 month renewal annually.
                In addition, our construction client wants to roll out the solution to the other
                11 semiconductor manufacturing clients on their books.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== EVP ====== -->
    <section id="evp" class="scroll-mt-20 border-t border-lavender/10">
      <div class="max-w-4xl mx-auto px-6 py-20">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-1 h-8 bg-cyclamen rounded-full" />
          <h2 class="text-sm font-semibold text-cyclamen uppercase tracking-widest">Our Employee Value Proposition</h2>
        </div>

        <p class="text-lavender/70 leading-relaxed max-w-2xl mb-10">
          This isn't just another contract. We invest in our team because we're building for the long term.
        </p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="p-5 rounded-xl bg-white/[0.03] border border-lavender/10 text-center space-y-3">
            <div class="w-12 h-12 rounded-xl bg-cyclamen/10 border border-cyclamen/20 flex items-center justify-center mx-auto text-2xl">🌐</div>
            <div class="text-white font-semibold text-sm">Global Exposure</div>
            <p class="text-lavender/50 text-xs leading-relaxed">Work directly with US-based teams on mission-critical semiconductor infrastructure</p>
          </div>
          <div class="p-5 rounded-xl bg-white/[0.03] border border-lavender/10 text-center space-y-3">
            <div class="w-12 h-12 rounded-xl bg-cyclamen/10 border border-cyclamen/20 flex items-center justify-center mx-auto text-2xl">🏠</div>
            <div class="text-white font-semibold text-sm">Remote Work</div>
            <p class="text-lavender/50 text-xs leading-relaxed">Fully remote from day one. Work from where you're most productive</p>
          </div>
          <div class="p-5 rounded-xl bg-white/[0.03] border border-lavender/10 text-center space-y-3">
            <div class="w-12 h-12 rounded-xl bg-cyclamen/10 border border-cyclamen/20 flex items-center justify-center mx-auto text-2xl">💻</div>
            <div class="text-white font-semibold text-sm">Office in a Box</div>
            <p class="text-lavender/50 text-xs leading-relaxed">Laptop, connectivity, and M365 licensing all provided and maintained</p>
          </div>
          <div class="p-5 rounded-xl bg-white/[0.03] border border-lavender/10 text-center space-y-3">
            <div class="w-12 h-12 rounded-xl bg-cyclamen/10 border border-cyclamen/20 flex items-center justify-center mx-auto text-2xl">👕</div>
            <div class="text-white font-semibold text-sm">SWAG</div>
            <p class="text-lavender/50 text-xs leading-relaxed">Branded kit delivered to your door. Represent the team from day one</p>
          </div>
          <div class="p-5 rounded-xl bg-white/[0.03] border border-lavender/10 text-center space-y-3">
            <div class="w-12 h-12 rounded-xl bg-cyclamen/10 border border-cyclamen/20 flex items-center justify-center mx-auto text-2xl">🏖️</div>
            <div class="text-white font-semibold text-sm">18 Annual Leave Days</div>
            <p class="text-lavender/50 text-xs leading-relaxed">Generous leave policy. Recharge properly, come back sharp</p>
          </div>
          <div class="p-5 rounded-xl bg-white/[0.03] border border-lavender/10 text-center space-y-3">
            <div class="w-12 h-12 rounded-xl bg-cyclamen/10 border border-cyclamen/20 flex items-center justify-center mx-auto text-2xl">💰</div>
            <div class="text-white font-semibold text-sm">Performance Bonus</div>
            <p class="text-lavender/50 text-xs leading-relaxed">Annual performance-based bonus. Your contribution gets recognised</p>
          </div>
          <div class="p-5 rounded-xl bg-white/[0.03] border border-lavender/10 text-center space-y-3">
            <div class="w-12 h-12 rounded-xl bg-cyclamen/10 border border-cyclamen/20 flex items-center justify-center mx-auto text-2xl">🥂</div>
            <div class="text-white font-semibold text-sm">Team Building & Dinners</div>
            <p class="text-lavender/50 text-xs leading-relaxed">Regular team events. Build real relationships, not just working relationships</p>
          </div>
          <div class="p-5 rounded-xl bg-white/[0.03] border border-lavender/10 text-center space-y-3">
            <div class="w-12 h-12 rounded-xl bg-cyclamen/10 border border-cyclamen/20 flex items-center justify-center mx-auto text-2xl">📋</div>
            <div class="text-white font-semibold text-sm">Contract Flexibility</div>
            <p class="text-lavender/50 text-xs leading-relaxed">Structured terms with room to adapt. We work with you on what works</p>
          </div>
          <div class="p-5 rounded-xl bg-white/[0.03] border border-lavender/10 text-center space-y-3">
            <div class="w-12 h-12 rounded-xl bg-cyclamen/10 border border-cyclamen/20 flex items-center justify-center mx-auto text-2xl">✨</div>
            <div class="text-white font-semibold text-sm">Awesome Culture</div>
            <p class="text-lavender/50 text-xs leading-relaxed">Small, tight-knit team that genuinely enjoys working together. No corporate theatre</p>
          </div>
          <div class="p-5 rounded-xl bg-white/[0.03] border border-lavender/10 text-center space-y-3">
            <div class="w-12 h-12 rounded-xl bg-cyclamen/10 border border-cyclamen/20 flex items-center justify-center mx-auto text-2xl">📚</div>
            <div class="text-white font-semibold text-sm">Ongoing L&D Support</div>
            <p class="text-lavender/50 text-xs leading-relaxed">Continuous learning and development. Your growth is part of the plan</p>
          </div>
          <div class="p-5 rounded-xl bg-white/[0.03] border border-lavender/10 text-center space-y-3">
            <div class="w-12 h-12 rounded-xl bg-cyclamen/10 border border-cyclamen/20 flex items-center justify-center mx-auto text-2xl">TBD</div>
            <div class="text-white font-semibold text-sm">Coming Soon</div>
            <p class="text-lavender/50 text-xs leading-relaxed">Placeholder</p>
          </div>
          <div class="p-5 rounded-xl bg-white/[0.03] border border-lavender/10 text-center space-y-3">
            <div class="w-12 h-12 rounded-xl bg-cyclamen/10 border border-cyclamen/20 flex items-center justify-center mx-auto text-2xl">TBD</div>
            <div class="text-white font-semibold text-sm">Coming Soon</div>
            <p class="text-lavender/50 text-xs leading-relaxed">Placeholder</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== IMAGE BREAK 3 ====== -->
    <div class="relative h-64 md:h-80 overflow-hidden">
      <img src="/img/AdobeStock_260280571.jpg" alt="Circuit board macro" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-oxford-blue via-oxford-blue/60 to-transparent" />
    </div>

    <!-- ====== CTA ====== -->
    <section class="border-t border-lavender/10">
      <div class="max-w-3xl mx-auto px-6 py-20 text-center space-y-8">
        <h2 class="text-3xl md:text-4xl font-bold text-white leading-tight">
          This is not a job posting.<br />
          <span class="gradient-text">This is a build.</span>
        </h2>
        <p class="text-lavender/70 leading-relaxed max-w-xl mx-auto">
          An eight-person offshore team to start. A 15-year client relationship. A multi-year
          program to modernise 20 years of data infrastructure at a semiconductor/datacentre
          provider. Starting now.
        </p>
        <div class="pt-4">
          <router-link to="/screen" class="btn-primary text-lg px-10 py-4 rounded-xl inline-block">
            Start Initial Assessment
          </router-link>
        </div>
        <p class="text-lavender/40 text-sm">
          Truffle has been placing analytics and engineering talent for 15+ years.
        </p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="px-6 py-8 border-t border-lavender/10 text-center">
      <p class="text-lavender/40 text-sm">&copy; {{ new Date().getFullYear() }} Truffle. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TruffleLogo from '../components/TruffleLogo.vue'
import { IconPuzzle, IconCompass, IconDatabase, IconRocket, IconGlobe } from '@tabler/icons-vue'

const selectedRole = ref(0)

const roles = [
  {
    qty: 4,
    title: 'Data Engineer',
    level: 'Mid',
    years: '5 – 8 years experience',
    responsibilities: 'Maintain and fix ETL and data flows. Debug existing SSIS packages and stored procedures. Trace data lineage across legacy warehouses. Support the senior engineers on pipeline modernisation tasks.',
    tech: ['SSIS', 'SSAS', 'SQL Server', 'Excel', 'Access', 'ADF', 'GitHub'],
    skills: ['Debugging', 'Reverse engineering', 'Data tracing']
  },
  {
    qty: 2,
    title: 'Senior Data Engineer',
    level: 'Senior',
    years: '9 – 13 years experience',
    responsibilities: 'Own data pipelines end to end. Lead modernisation from legacy SSIS to Azure Data Factory. Design and build new Fabric-based pipelines. Mentor mid-level engineers and set technical standards.',
    tech: ['SSIS', 'ADF', 'SQL Server', 'Azure SQL', 'SSAS', 'Microsoft Fabric'],
    skills: ['System design', 'Root cause analysis', 'Refactoring']
  },
  {
    qty: 1,
    title: 'Senior SQL Database Engineer',
    level: 'Senior',
    years: '8 – 12 years experience',
    responsibilities: 'Own database performance and data integrity across the estate. Tune complex queries, design indexing strategies, and manage schema evolution. Bridge on-prem SQL Server to cloud targets like Snowflake and Azure SQL.',
    tech: ['SQL Server', 'Indexing', 'Query Tuning', 'Snowflake', 'SAP HANA', 'APIs'],
    skills: ['Performance tuning', 'Data modelling', 'Troubleshooting']
  },
  {
    qty: 1,
    title: 'Senior BI Developer',
    level: 'Senior',
    years: '8 – 11 years experience',
    responsibilities: 'Own BI architecture and report standardisation. Rebuild legacy SSRS and Power BI reports on modern Fabric/Power BI stack. Translate business requirements into data models. Act as the primary BI liaison with client stakeholders.',
    tech: ['Power BI', 'Power Query', 'SSAS Tabular', 'DAX', 'SQL', 'Microsoft Fabric'],
    skills: ['Data modelling', 'Performance tuning', 'Requirements translation', 'Client communication']
  }
]
</script>
