<template>
  <main
    class="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 via-blue-50 to-cyan-50 w-full overflow-x-hidden relative"
  >
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        class="absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full animate-float opacity-20"
      ></div>
      <div
        class="absolute top-1/4 right-20 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-float-delayed opacity-25"
      ></div>
      <div
        class="absolute bottom-1/4 left-1/4 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-float opacity-30"
      ></div>
      <div
        class="absolute bottom-20 right-10 w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-float-delayed opacity-20"
      ></div>
      <div
        class="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-bounce opacity-20"
      ></div>
      <div
        class="absolute top-1/2 left-10 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse opacity-40"
      ></div>
      <div
        class="absolute top-20 right-1/3 w-14 h-14 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full animate-ping opacity-30"
      ></div>
    </div>

    <slot />
  </main>
</template>
