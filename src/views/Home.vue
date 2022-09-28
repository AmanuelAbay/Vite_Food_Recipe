<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useStore } from 'vuex';
import FoodCard from '../components/cards/Food.vue';
import MainLayout from '../components/layouts/MainLayout.vue';
import FETCHING_FOODS from "@/graphql/fetch_foods.gql";
import FETCHING_FOOD from "@/graphql/_foods.gql";
import FILTER_FOODS from "@/graphql/FILTER_FOOD.gql";
// import apolloClient from "../utils/apollo.config.js";
import { useQuery } from '@vue/apollo-composable';
import { LoggedIn, userId } from "../utils/user.js";

const foods = ref([]);
const store = useStore()
const category = computed(() => store.state.category);
const filter_all = ref(true);

const { onResult, loading, error } = useQuery(
    FILTER_FOODS,
    () => ({
        user_id: userId,
        category: category.value
    }),
    () => ({
        enabled: !filter_all.value,
        fetchPolicy: 'no-cache'
    })

)

const { onResult: FilterAll, loading: filterallloading, error: filterallerror, refetch: filterallrefetch } = useQuery(
    FETCHING_FOODS,
    () => ({
        user_id: userId
    }),
    () => ({
        enabled: filter_all.value,
        fetchPolicy: 'no-cache'
    })
);

FilterAll(({ data }) => {
    foods.value = data.foods
})

onResult(({ data }) => {
    foods.value = data.foods
})

watch(category, async (newValue, oldValue) => {
    console.log(category.value);
    if (category.value == "all") {
        filter_all.value = true;
    }
    else {
        filter_all.value = false;
    }

    // if (newValue != "all") {

    // }
    // else {
    //     const { onResult } = useQuery(
    //         FETCHING_FOODS,
    //         () => ({
    //             user_id: userId
    //         })
    //     );
    //     onResult(({ data }) => {
    //         foods.value = data.foods
    //     })
    // }
}, { immediate: true })

if (LoggedIn) {
    const { onResult } = useQuery(
        FETCHING_FOODS,
        () => ({
            user_id: userId
        }),
        () => ({
            fetchPolicy: 'no-cache'
        })
    )

    onResult(({ data }) => {
        foods.value = data.foods
    })

}
else {
    const { onResult } = useQuery(
        FETCHING_FOOD,
        () => ({
            user_id: userId
        }),

        () => ({
            fetchPolicy: 'no-cache'
        })
    )
    onResult(({ data }) => {
        foods.value = data.foods
    })
    // foods.value = data.foods
}


</script>
<template>
    <MainLayout>
        <div>

            <body class="pr-5 pl-14 bg-main_background min-h-screen pb-5">
                <div class="pt-6">
                    <h4 class="text-secondary-900 text-4xl font-bold border-b border-secondary pb-2">Foods</h4>
                </div>
                <!-- list of card views will be displayed -->
                <div class="mt-8 grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 md:gap-8">
                    <div v-for="food in foods" :key="food.id">
                        <FoodCard :food=food />
                    </div>
                </div>
                <!-- <div class="flex justify-center my-8 cursor-pointer">
                <div class="capitalize btn border border-gray-200 py-1 px-2 shadow rounded bg-secondary-100 text-secondary-200 hover:shadow-inner hover:bg-opacity-50 transition ease-out duration-300">Load More</div>
            </div> -->
            </body>
        </div>
    </MainLayout>
</template>
