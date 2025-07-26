<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';

const store = useCounterStore();
</script>

<template>
    <h1>Dashboard</h1>
    <h2>Halaman Dashboard</h2>
    <div>Saya Andreas Mustofa, seorang software developer</div>

    <div>
        <button @click="store.increment">Count is {{ store.count }}</button>
    </div>
</template>

<style>
</style>