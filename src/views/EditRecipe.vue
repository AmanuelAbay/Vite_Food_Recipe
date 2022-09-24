<script>
import EDIT_FOOD from "../graphql/EDIT_FOOD.js";
import SELECTED_FOOD from '../graphql/GET_FOOD.gql';
import STEP from "../graphql/STEPS.js";
import stepInput from "../components/cards/Steps.vue";
import ingredientInput from "../components/cards/Ingredients.vue";
// import apolloClient from "../utils/apollo.config";
import useValidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive, computed, ref, onBeforeMount } from 'vue';
import Ingredients from "../components/cards/Ingredients.vue";
import Steps from "../components/cards/Steps.vue";
import { useRoute } from "vue-router";
import MainLayout from '../components/layouts/MainLayout.vue';
import { useQuery } from "@vue/apollo-composable";

export default {
    setup() {
        const router = useRoute();
        const food = ref(null);
        const steps = ref(null);
        const ingredients = ref(null);
        const { onResult } = useQuery(
            SELECTED_FOOD,
            () => ({
                food_id: router.params.id
            })
        );

        onResult(({ data }) => {
            console.log(data)
            food.value = data.foods;
            food.value = data.foods[0];
            steps.value = food.value.steps;
            ingredients.value = food.value.ingredients;

        })

        const deleteStep = (id) => {
            steps.value = steps.value.filter((step) => step.id != id);
        }


        const deleteIngredient = (id) => {
            ingredients.value = ingredients.value.filter((ingredient) => ingredient.id != id);
        }

        return {
            food, deleteStep, steps, ingredients, deleteIngredient
        }
    },
    methods: {
        update_food() {
            let description = document.getElementById("description").value;
            let category = document.getElementById("category").value;
            let title = document.getElementById("title").value;
            let duration = document.getElementById("duration").value;
            if (!(description === null)) {
                if (!(title === null))
                    if (!(duration === null)) {
                        useMutation(
                            EDIT_FOOD,
                            () => (
                                {
                                    category: category,
                                    description: description,
                                    duration: duration,
                                    title: title,
                                    id: this.$route.params.id
                                }
                            )
                        );
                        location.replace("/my_foods");
                    }
            }
            else
                this.error = true;
        }
    },
    components: { Ingredients, Steps, MainLayout }
}
</script>
<template>
    <MainLayout>
        <div class="bg-main_background">
            <div v-if="false" class="items-center"> Loading... </div>
            <div v-else class="flex flex-col items-start px-14">
                <div class="flex flex-col items-center">
                    <h2 class="text-black text-3xl font-bold mt-7 mb-4 capitalize" @click="display">Edit Food</h2>
                </div>
                <div class="px-7 pt-5 border-t w-full  border-gray-400">
                    <form action="" class="space-y-6">
                        <div class="grid grid-cols-2 items-center">
                            <div class="pr-7">
                                <label for="name" class="block mb-2 font-bold text-base capitalize">Title</label>
                                <input :value="food?.title" type="text" required name="title" placeholder="Name"
                                    id="title"
                                    class="border border-gray-400 w-full rounded outline-none focus:border-primary py-1 px-3 text-base" />
                                <ErrorMessage class="text-red-600" name="title" />
                            </div>
                        </div>
                        <!-- image upload section -->
                        <div class="">
                            <div class="mb-3 xl:w-110">
                                <label for="description"
                                    class="block mb-2 font-bold text-base capitalize">Description</label>
                                <textarea class="
                                form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                
                                focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none
                            " :value="food?.description" rows="5" required placeholder="Description"
                                    id="description"></textarea>
                            </div>
                            <div class="grid grid-cols-2 items-center">
                                <div v-if="error" class="flex justify-start items-center">
                                    <font-awesome-icon icon="exclamation-circle"
                                        class="text-red-700 text-base ml-5 mr-3">
                                    </font-awesome-icon>
                                    <p class="text-red-700 text-base font-bold">can't be empty!</p>
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 items-center">
                            <div class="pr-7">
                                <label for="name" class="block mb-2 font-bold text-base capitalize">Category</label>
                                <select :value="food?.category" required
                                    class="w-full capitalize border border-gray-400 py-1 rounded focus:border-primary active:border-primary"
                                    name="category" id="category">
                                    <option value="" disabled selected>Category</option>
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
                                <ErrorMessage class="text-red-600" name="category" />
                            </div>
                            <div class="block">
                                <label for="duration" class="block mb-2 font-bold text-base capitalize">time it takes
                                    (min)</label>
                                <input name="duration" min="0" :value="food?.duration" type="number" id="duration"
                                    required placeholder="(min)"
                                    class="border block border-gray-400 w-35 rounded outline-none focus:border-primary py-1 px-3 text-base" />
                                <ErrorMessage class="text-red-600 block" name="duration" />
                            </div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="mb-3 xl:w-96">
                                <label for="ingredients"
                                    class="block mb-2 font-bold text-xl capitalize">ingredients</label>
                                <div class="pl-10 font-semibold">
                                    <ol class="space-y-3 mb-5 list-decimal">
                                        <li v-for="ingredient in ingredients" :key="ingredient.id"
                                            class="capitalize pl-2">
                                            <Ingredients :ingredient="ingredient"
                                                @deleteIngredient="deleteIngredient" />
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label for="steps" class="block mb-2 font-bold text-xl capitalize">Necessary Steps</label>
                            <div class="pl-10 font-semibold">
                                <ol class="space-y-3 mb-5 list-decimal">
                                    <li v-for="step in steps" :key="step.id" class="capitalize pl-2">
                                        <Steps :step="step" @deleteStep="deleteStep" @updateStep="updateStep" />
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <button type="submit" @click.prevent="update_food"
                            class="w-50 bg-primary p-3 rounded text-white hover:bg-orange-700 transition duration-300">Done</button>
                    </form>
                </div>
            </div>
        </div>
    </MainLayout>
</template>