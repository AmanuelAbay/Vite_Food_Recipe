<script>
import UPDATE_INGREDIENT from "../../graphql/UPDATE_INGREDIENT.gql"
import DELETE_INGREDIENT from "../../graphql/DELETE_INGREDIENT.gql"
// import apolloClient from "../../utils/apollo.config";
import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
export default {
    props: {
        ingredient: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props, { emit }) {

        const ingredient_name = ref(props.ingredient.name);
        const ingredient_amount = ref(props.ingredient.amount);
        const error = ref(false);
        const toggleUp = ref(true);
        const { mutate: updateIngredientMutate, onDone: updateDone } = useMutation(
            UPDATE_INGREDIENT
        );

        updateDone(() => {
            console.log("update done!!");
        })

        const updateIngredient = (id) => {
            if (!(ingredient_amount.value === null) && !(ingredient_name.value == null || ingredient_name.value.trim() === '')) {
                updateIngredientMutate({
                    id: id,
                    name: ingredient_name.value,
                    amount: ingredient_amount.value
                })
                error.value = false
            }
            else error.value = true
        }

        const deleteIngredient = (id) => {
            useMutation(
                DELETE_INGREDIENT,
                () => ({ id: id })
            );
            error.value = false;
            toggleUp.value = true;
            emit("deleteIngredient", id);
        }

        return {
            updateIngredient, deleteIngredient, ingredient_name, ingredient_amount, toggleUp
        }
    },
}
</script>
<template>
    <div class="grid grid-cols-2 items-center">
        <div class="pr-7">
            <input @click="error.false" v-model="ingredient_name" type="text" required name="name" placeholder="Name"
                class="border border-gray-400 w-full rounded outline-none focus:border-primary py-1 px-3 text-base" />
        </div>
        <div class="flex justify-start items-center space-x-3">
            <input v-model="ingredient_amount" name="duration" type="number" :id="'amount'+ingredient.id" required
                placeholder="(gram)"
                class="border block border-gray-400 w-35 rounded outline-none focus:border-primary py-1 px-3 text-base" />
            <button @click.prevent="updateIngredient(ingredient.id)"
                class="w-50 bg-green-500 p-3 rounded text-white hover:bg-green-700 transition duration-300">Update</button>
            <button @click.prevent="toggleUp=false"
                class="w-50 bg-red-500 p-3 rounded text-white hover:bg-red-700 transition duration-300">Delete</button>
        </div>
        <div class="grid grid-cols-2 items-center">
            <div v-if="error" class="flex justify-start items-center">
                <p class="text-red-900 text-base font-bold">error</p>
            </div>
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
                                    {{ingredient.name}}
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
                        <button type="button" @click="deleteIngredient(ingredient.id)"
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