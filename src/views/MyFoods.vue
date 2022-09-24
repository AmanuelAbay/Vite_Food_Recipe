<script setup>
import { ref, onBeforeMount } from 'vue';
import FoodCard from '../components/cards/Food.vue';
import MainLayout from '../components/layouts/MainLayout.vue';
import YOUR_FOODS from "@/graphql/YOUR_FOOD.gql";
import { useQuery } from '@vue/apollo-composable';
import { userId } from "../utils/user.js"

const savedFoods = ref([]);


const { onResult } = useQuery(
    YOUR_FOODS,
    () => ({
        user_id: userId,
    }),
    () => ({
        fetchPolicy: 'no-cache'
    })
)

onResult(({ data }) => {
    console.log(data)
    savedFoods.value = data.foods;
})


</script>
<template>
    <MainLayout>
        <div>

            <body class="pr-5 pl-14 bg-main_background min-h-screen">
                <div class="pt-6">
                    <h4 class="text-secondary-900 text-4xl font-bold border-b border-secondary pb-2">Foods</h4>
                </div>
                <!-- list of card views will be displayed -->
                <div class="mt-8 grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 md:gap-8" v-if="savedFoods">
                    <div v-for="food in savedFoods" :key="food.id">
                        <FoodCard :food="food" />
                    </div>
                </div>
                <!-- <div class="flex justify-center my-8 cursor-pointer">
                <div class="capitalize btn border border-gray-200 py-1 px-2 shadow rounded bg-secondary-100 text-secondary-200 hover:shadow-inner hover:bg-opacity-50 transition ease-out duration-300">Load More</div>
            </div> -->
            </body>
        </div>
    </MainLayout>
</template>
