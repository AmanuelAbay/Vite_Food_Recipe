<script setup>
import { onBeforeMount, ref } from 'vue';
import FoodCard from '../components/cards/Food.vue';
import MainLayout from '../components/layouts/MainLayout.vue';
import FAVORITE_FOOD from "../graphql/FAVORITE_FOOD.gql"
// import apolloClient from '../utils/apollo.config';
import { useQuery } from '@vue/apollo-composable';
import { userId } from '../utils/user';

const savedFoods = ref([]);
const saved = ref([]);

const { onResult, refetch } = useQuery(
    FAVORITE_FOOD,
    () => ({
        user_id: userId
    }),
    () => ({
        fetchPolicy: 'no-cache'
    })
)

onResult(({ data }) => {
    savedFoods.value = data.favorites;
    saved.value = data.favorites;
})

const removeFavorite = (id) => {
    // console.log("removed");
    saved.value = savedFoods.value.filter((favorite) => favorite.food.id != id);
    // refetch();
    // console.log(savedFoods.value);
}

</script>

<template>
    <MainLayout>
        <div>

            <body class="pr-5 pl-14 bg-main_background min-h-screen">
                <div class="pt-6">
                    <h4 class="text-secondary-900 text-4xl font-bold border-b border-secondary pb-2">Foods</h4>
                </div>
                <!-- list of card views will be displayed -->
                <div class="mt-8 grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 md:gap-8">
                    <div v-for="favorite in saved" :key="favorite.id">
                        <FoodCard @removeFavorite="removeFavorite" :food=favorite.food />
                    </div>
                </div>
            </body>
        </div>
    </MainLayout>
</template>