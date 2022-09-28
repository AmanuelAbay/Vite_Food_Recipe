<script>
// import Comment from '../components/cards/Comment.vue';
import { ref, onBeforeMount } from 'vue';
import StarRating from 'vue-star-rating';
import Rate_and_Review from '../components/cards/Rate_and_Review.vue';
import SELECTED_FOOD from '../graphql/GET_FOOD.gql';
// import apolloClient from '../utils/apollo.config';
import { useQuery } from '@vue/apollo-composable';
import { useRoute } from "vue-router";

// fetching food based on passed Id on parameter
export default {

    setup() {

        const food = ref(null);
        const router = useRoute();
        const comments = ref([]);

        const { onResult } = useQuery(
            SELECTED_FOOD,
            () => ({
                food_id: router.params.id
            })
        );

        onResult(({ data }) => {
            food.value = data.foods[0];
        })
        // comments.value = foods[0].comments
        // console.log(comments.value);

        return {
            food, router, comments
        }
    },
    components: {
        Rate_and_Review
    }

}

</script>

<template>

    <body class="flex flex-col bg-main_background">
        <!-- top image -->
        <div class="h-95 w-full relative items-center">
            <img :src="food?.images[0].path" alt="Kaldi's Coffee"
                class="from-black to-transparent h-80 w-full object-cover" />
            <div class="flex justify-between w-full items-center px-20 absolute bottom-2">
                <div class="flex flex-col">
                    <div class="font-bold text-white text-4xl uppercase">{{food?.title}}</div>
                    <div class="flex justify-start items-center">
                        <star-rating inline="true" star-size="22" active-color="#FF7F3F" read-only="true"
                            increment="0.5" :show-rating="false" rating="4"></star-rating>
                        <p class="text-white font-bold pl-2 pr-5">(4)</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- descriptions below image -->
        <div class="block h-95 w-full text-start mt-8 px-20">
            <!-- detail description -->
            <p class="flex flex-wrap break-normal">
                {{food?.description}}
            </p>

            <!-- rating and category section -->
            <div class="flex justify-end items-center mr-6 font-bold mt-3 border-b border-gray-400 pb-10">
                <div class="pl-1 uppercase">
                    <span
                        class="px-4 py-2 rounded-full text-main_background bg-primary font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
                        {{food?.category}}
                    </span>
                </div>
            </div>
        </div>
        <div class="flex flex-col pl-20 py-5 space-y-3">
            <label for="ingredients"
                class="block mb-2 font-bold text-xl uppercase border-solid border-l-4 w-fit pl-5 border-primary ">ingredients</label>
            <ul class="flex flex-col  pl-20 list-disc space-y-4 marker:text-primary">
                <li class="text-base" v-for="ingredient in food?.ingredients" :key="ingredient.id">
                    {{ingredient.name}} Amount {{ingredient.amount}}<i>gram</i></li>
            </ul>
        </div>
        <div class="flex flex-col pl-20 space-y-3 pt-5">
            <label for="ingredients"
                class="block mb-2 font-bold text-xl uppercase border-solid border-l-4 w-fit pl-5 border-primary">necessary
                Steps</label>
            <ul class="space-y-3 px-20 list-disc marker:text-primary">
                <li class="text-base list-decimal pl-1" v-for="step in food?.steps" :key="step.step_number">
                    {{step.description}}</li>
            </ul>
        </div>
        <div class="pl-20">

            <Rate_and_Review :comments="comments" class="pl-20 mb-2 max-w-lg" />
        </div>

        <div class="flex mx-auto items-center justify-center shadow-lg mt-10 mx-8 mb-4 max-w-lg ml-20">
            <form class="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-full px-3 mb-2 mt-2">
                        <textarea
                            class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                            name="body" placeholder='Type Your Comment' required></textarea>
                    </div>
                    <div class="w-full md:w-full flex items-start md:w-full px-3">
                        <div class="-mr-1">
                            <input type='submit'
                                class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                                value='Post Comment'>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <div :class="{'hidden': true}" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title"
            role="dialog" aria-modal="true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div :class="{'hidden': true}" @click="this.toggleup=true"
                    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <!-- This element is to trick the browser into centering the modal contents. -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div :class="{'hidden': true}"
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-6 sm:p-6 sm:pb-4">
                        <div class="flex flex-col text-center items-center justify-center sm:items-start">
                            <h3 class="font-bold text-3xl mb-3 mx-auto">Rate Food</h3>
                            <star-rating class="mx-auto" @update:rating="setRating" :max-rating="5"
                                active-color="#FF7F3F" :border-width="2" border-color="#FF7F3F" show-rating="false"
                                :star-size="45"></star-rating>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>