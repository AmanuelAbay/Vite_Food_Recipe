<script setup>
import TopNav from '../Nav/TopNav.vue'
import SideNav from '../Nav/SideNav.vue'
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <TopNav class="sticky top-0 z-50" />
    <!-- side navbar menu -->
    <div class="grid grid-cols-12 relative">
        <div class="md:col-span-2 sm:col-span-12">
            <SideNav />
        </div>
        <div class="md:col-span-10 sm:col-span-12 relative">
            <main>
                <slot></slot>
                <!-- childrens passed here -->
                <!-- <router-view></router-view> -->
            </main>
        </div>
    </div>
</template>
