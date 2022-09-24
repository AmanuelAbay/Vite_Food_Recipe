<script>
import { ref } from 'vue';
import CommentCard from './Comment.vue';
export default {
    props: {
        comments: {
            type: Object,
            default: () => ({}),
        },
    },
    setup(props) {
        console.log(props.comments);

        return {
            // comments
        }

    }
}

</script>
<template>
    <section class="border-t border-3 mt-14 mr-5">
        <div class="font-bold capitalize text-2xl mt-3">Rating and Review</div>
        <ul class="block space-y-1 mt-5 ml-5">
            <!-- <li v-for="review in 10" :key="review.id"> -->
            <!-- list of comments will be displayed here -->
            <div class="flex justify-center relative w-full">
                <!-- This is an example component -->
                <div v-for="comment in comments" :key="comment.id"
                    class="w-full relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
                    <div class="relative flex gap-4">
                        <img src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
                            class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy">
                        <div class="flex flex-col w-full">
                            <div class="flex flex-row justify-between">
                                <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">
                                    name</p>
                                <a class="text-gray-500 text-xl" href="#"><i class="fa-solid fa-trash"></i></a>
                            </div>
                        </div>
                    </div>
                    <p class="-mt-4 text-gray-500 w-full">{{comment.comment}}</p>
                </div>
            </div>
            <!-- </li> -->
        </ul>
        <!-- <div class="w-max mt-4 ml-14 mb-10 cursor-pointer capitalize btn border border-gray-200 py-1 px-2 shadow rounded bg-secondary-100 text-secondary-200 hover:shadow-inner hover:bg-opacity-50 transition ease-out duration-300 capitalize">See More</div> -->
    </section>
</template>