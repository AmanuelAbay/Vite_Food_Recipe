<script setup>
import { ref } from 'vue';
import { apolloClient } from '../../utils/apollo.config.js';
import DELETE_FOOD from "../../graphql/DELETE_FOOD.gql";
import FAV from '../../graphql/FAV';
import UNFAV from '../../graphql/UNFAV.js';
import LIKE from '../../graphql/LIKE.js';
import UNLIKE from '../../graphql/UNLIKE.js';
import { LoggedIn } from '../../utils/user';
import { useMutation } from '@vue/apollo-composable';

const props = defineProps({
    food: {
        type: Object,
        default: () => ({}),
    }
})

const emit = defineEmits(['removeFavorite'])

const toggleUp = ref(true);
const total_likes = ref(props.food.likes_aggregate.aggregate.count);
const isFav = LoggedIn ? ref(props.food.favorites.length > 0) : ref(false);
const isLiked = LoggedIn ? ref(props.food.likes.length > 0) : ref(false);
// const like_icon = (id) => {
// check if it was liked if so 
//TODO: delete the row from db and change color
// if not fill the color to normal bg and send data to db

// }
const { onDone ,mutate} = useMutation(
    DELETE_FOOD,
);

const DeleteFood = (id) => {
mutate({
food_id:id
})

}

onDone(() => {
    location.reload();
})
const fav_icon = (id) => {
    // check if it was in the favorite list
    //TODO: delete tttttt
    if (isFav.value) {
        apolloClient.mutate(
            {
                mutation: UNFAV,
                variables: {
                    food_id: id
                }
            }
        );
        isFav.value = false;
        emit("removeFavorite", id)
    }
    else {
        apolloClient.mutate(
            {
                mutation: FAV,
                variables: {
                    food_id: id
                }
            }
        );
        isFav.value = true;
    }
}
const like_icon = (id) => {
    // check if it was in the favorite list
    //TODO: delete tttttt
    if (isLiked.value) {
        apolloClient.mutate(
            {
                mutation: UNLIKE,
                variables: {
                    food_id: id
                }
            }
        );
        isLiked.value = false;
        total_likes.value--
    }
    else {
        apolloClient.mutate(
            {
                mutation: LIKE,
                variables: {
                    food_id: id
                }
            }
        );
        isLiked.value = true;
        total_likes.value++;
    }
}

</script>
<template>
    <div class="card rounded-lg overflow-hidden hover:shadow-4xl z-1 bg-white">
        <router-link :to="'/description/'+ food.id">
            <img :src="food?.images[0].path" alt="pizza" class="w-full h-32 sm:h-48 object-cover">
        </router-link>
        <div class="m-3  px-2">
            <div class="md:flex justify-between items-center">
                <span class="font-bold capitalize">{{food.title}}</span>
                <svg v-if="this.$route.path!=='/my_foods'" @click="fav_icon(food.id)" class="w-5 h-5 cursor-pointer"
                    :fill="isFav ? '#FF7F3F': 'transparent' " stroke="#FF7F3F" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                    </path>
                </svg>
            </div>
            <div class="flex justify-start items-center">
                <div class="break-normal w-full h-24 mb- description">
                    {{food.description}}
                </div>
            </div>
            <div class="flex justify-between items-center mt-7">
                <div class="flex justify-start items-center mr-3 cursor-pointer" @click="like_icon(food.id)">
                    <svg class="w-5 h-5" :fill="isLiked ? '#FF7F3F': 'transparent' " stroke="#FF7F3F"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
                        </path>
                    </svg>
                    <div v-if="total_likes>0" class="text-sm ml-0.5">
                        {{total_likes}}</div>
                </div>
                <!-- <div class="flex justify-start items-center">
                    <div v-if="rate!=0" class="flex justify-start items-center">
                        <svg class="w-5 h-5" fill="#FF7F3F" stroke="#FF7F3F" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
                            </path>
                        </svg>
                        <div class="text-sm ml-0.5">({{rate}})</div>
                    </div>
                </div> -->
                <div class="font-semibold capitalize">
                    <div v-if="this.$route.path!=='/my_foods'"><i class="font-regular">{{food.user.name}}</i></div>
                    <div v-if="this.$route.path==='/my_foods'" class="flex justify-end space-x-3">
                        <div>
                            <router-link :to="'/edit_recipe/'+ food.id">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                    </path>
                                </svg>
                            </router-link>
                        </div>
                        <div @click="toggleUp=false" class="cursor-pointer">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tag block item-center text-center">
            <div>{{food.duration}}</div>
            <div>Min</div>
        </div>
        <div :class="{'hidden': toggleUp}" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title"
            role="dialog" aria-modal="true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div :class="{'hidden': toggleUp}" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"></div>

                <!-- This element is to trick the browser into centering the modal contents. -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div :class="{'hidden': toggleUp}"
                    class=" inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <!-- Heroicon name: outline/exclamation -->
                                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    {{food.title}}
                                </h3>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500">
                                        Are you sure you want to delete?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                         <button type="button" @click="DeleteFood(food.id)"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Delete
                        </button>
                        <button type="button" @click="toggleUp=true"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>