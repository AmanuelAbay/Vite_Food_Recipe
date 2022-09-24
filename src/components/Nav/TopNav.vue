<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { LoggedIn } from "../../utils/user.js";

const category = ref("all")
const store = useStore()
const setCategory = () => {
    store.dispatch('setCategory', category)
}
</script>

<template>
    <div
        class="flex justify-between py-5 md:pl-20 sm:pl-5 pr-10 items-center border-solid border-b-200 border-black-900 bg-gray-200">
        <div class="flex justify-start items-center">
            <router-link to="/"><img src="../../assets/img/logo.png" alt="K" class="h-10 mr-10"></router-link>
            <!-- <div>
                <div v-if="this.$route.path=='/foods' || this.$route.path=='/'"
                    class="relative flex justify-center items-center border border-gray-400 py-0.5 px-2 bg-white rounded-full">
                    <svg class="absoulte left-0 w-4 h-4" fill="none" stroke="gray" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input type="text" placeholder="Search Food..." autocomplete="off"
                        class="text-base placeholder-gray ml-1 focus:outline-none">
                </div>
            </div> -->

        </div>
        <div class="flex justify-end items-center pr-5 space-x-5" v-if="this.$route.path=='/'">
            <div v-if="LoggedIn">
                <select v-model="category" @change="setCategory"
                    class="w-full relative capitalize border border-gray-400 p-1 rounded focus:border-primary active:border-primary"
                    name="filter" id="filter">
                    <option value="all">All</option>
                    <option value="fruits">Fruits</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="grains">Grains</option>
                    <option value="proteins">Protein</option>
                    <option value="meats">meats</option>
                    <option value="dairys">Dairy</option>
                    <option value="poultrys">Poultry</option>
                    <option value="seafoods">Fish and seafood</option>
                    <option value="eggs">Eggs</option>
                    <option value="seeds">Nuts and seeds</option>
                    <option value="beans">Legumes/beans</option>
                </select>
            </div>
            <div v-if="!LoggedIn" class="flex justify-end items-center pr-5 space-x-5">
                <div>
                    <router-link
                        class="w-50 bg-gray-400 px-3 py-2 rounded text-white hover:bg-gray-700 transition duration-300 capitalize"
                        to="/register">sign up</router-link>
                </div>
                <div>
                    <router-link
                        class="w-50 bg-primary px-3 py-2 rounded text-white hover:bg-orange-900 transition duration-300 capitalize"
                        to="/login">sign in</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
