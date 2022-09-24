<script>
import MainLayout from '../components/layouts/MainLayout.vue';
import useValidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive, computed, ref } from 'vue';
import ADD_FOODS from "../graphql/create_food.gql";
import UPLOAD_IMAGE from "@/graphql/UPLOAD_IMAGE.gql";
import { useMutation } from '@vue/apollo-composable';
export default {
    setup() {
        const error_ingredient_name = ref(false);
        const error_ingredient_amount = ref(false);
        const steps = ref([]);
        const step = ref('');
        // const step = ref(null)
        const ingredients = ref([]);
        // const ingredients = []
        const ingredientName = ref('');
        const images = ref([]);
        const images_url = ref([]);
        const isStepNull = ref(false);
        const amount = ref(null);
        const image_error = ref(false);
        const ingredient_error = ref(false);
        const loading = ref(false);

        const state = reactive({
            title: '',
            category: '',
            description: '',
            duration: ''
        });

        const rules = computed(() => {
            return {
                title: { required },
                category: { required },
                description: { required },
                duration: { required }
            }
        });
        const v$ = useValidate(rules, state);
        const addSteps = () => {
            if (!(step.value === null || step.value.trim() === '')) {
                let add_step = { step_number: steps.value.length + 1, description: step.value.replace(/\n/g, '') }
                // console.log(add_step);
                steps.value.push(add_step);
                step.value = "";
                isStepNull.value = false;
            }
        }

        const createBase64Image = (ImageObject) => {
            const reader = new FileReader();
            reader.onload = async () => {
                await images.value.push(reader.result);
            }
            reader.readAsDataURL(ImageObject);
        }
        const fileUpload = (event) => {
            image_error.value = false;
            const selectedImages = event.target.files;
            for (let i = 0; i < selectedImages.length; i++) {
                createBase64Image(selectedImages[i]);
            }
        }
        const { onDone, mutate, onError:UploadFail } = useMutation(
            UPLOAD_IMAGE
        );

        const { onDone: RecipeDone, mutate: addRecipe } = useMutation(
            ADD_FOODS
        )
        RecipeDone(({ data }) => {
            this.loading = false
            console.log("done")
        })

        onDone(({ data: { upload: { uploaded_images } } }) => {
            console.log("creating recipe..")
            addRecipe({
                title: state.title,
                steps: steps.value,
                ingredients: ingredients.value,
                category: state.category,
                description: state.description,
                duration: state.duration.toString(),
                images_url: uploaded_images
            })
            // location.replace("/my_foods");
        })

        UploadFail(()=>{
            //TODO: toast notification for image upload
        })
        const storePath = () => {
            console.log("start creating...");
            mutate({
                folder: "Images",
                image: images.value,
            })
        }



        return {
            state, loading, storePath, image_error, ingredient_error, createBase64Image, isStepNull, fileUpload, v$, steps, addSteps, ingredients, ingredientName, error_ingredient_amount, error_ingredient_name, images, images_url, amount, step
        }
    },
    methods: {
        submitForm() {
            this.storePath()
            // this.v$.$validate();
            // if (!this.v$.$error) {
            //     if (this.ingredients.length > 0) {
            //         if (this.steps.length > 0) {
            //             if (this.images.length > 0) {
            //                 this.loading = true
            //                 this.storePath()
            //             }
            //             else this.image_error = true;
            //         }
            //         else this.isStepNull = true;
            //     }
            //     else this.ingredient_error = true;
            // } else {
            //     // show error message
            //     console.log("please fill the form correctly!!");
            // }
        },
        addIngredients() {
            if (!(ingredientName.value === null || ingredientName.value.trim() === '')) {
                if (!(amount.value === null || amount.value <= 0)) {
                    let ingredient = { name: ingredientName.value, amount: amount.value }
                    // console.log(ingredient);
                    this.ingredients.push(ingredient);
                    ingredientName.value = "";
                    amount.value = "";
                }
                else this.error_ingredient_amount = true
            }
            else this.error_ingredient_name = true
        },


        removeImage(index) {
            this.images.splice(index, 1);
        },
    },
    components: {
        MainLayout
    }
}

</script>
<template>
    <MainLayout>
        <div class="flex flex-col items-start px-14 bg-main_background">
            <div class="flex flex-col items-center">
                <h2 class="text-black text-3xl font-bold mt-7 mb-4 capitalize">create new food</h2>
            </div>
            <div class="px-7 pt-5 border-t w-full  border-gray-400">
                <form action="" class="space-y-6" @submit.prevent="submitForm">
                    <div class="grid grid-cols-2 items-center">
                        <div class="pr-7">
                            <label for="name" class="block mb-2 font-bold text-base capitalize">Title</label>
                            <input type="text" v-model="state.title" ref="title" name="title" id="lastName"
                                class="border border-gray-400 w-full rounded outline-none focus:border-primary py-1 px-3 text-base" />
                        </div>
                    </div>
                    <!-- image upload section -->
                    <div class="pr-7">
                        <label for="name" class="block mb-2 font-bold text-base capitalize">Cover Image</label>
                        <input type="file" multiple name="image" accept="image/*" @change="fileUpload($event)" />
                        <div class="mt-8 flex overflow-y-hidden overflow-x-auto">
                            <div class="relative flex w-32 mr-3" v-for="(image, index) in images" :key="index">
                                <img class="w-full" :key="index" :src="image" alt="" />
                                <button type="button" @click="removeImage(index)"
                                    class="rounded shadow-lg absolute top-0 bg-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24"
                                        width="24px" fill="red">
                                        <path d="M0 0h24v24H0V0z" fill="none" />
                                        <path d="M0 0h24v24H0V0z" fill="none" />
                                        <path
                                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                                    </svg>
                                </button>
                            </div>
                            <div class="grid grid-cols-2 items-center">
                                <div v-if="image_error.valueOf(true)" class="flex justify-start items-center">
                                    <p class="text-red-900 text-base font-bold">at leaset one image is needed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="mb-3 xl:w-96">
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
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none
                                " name="description" id="description" rows="3" v-model="state.description"
                                placeholder="Description"></textarea>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 items-center">
                        <div class="pr-7">
                            <label for="name" class="block mb-2 font-bold text-base capitalize">Category</label>
                            <select
                                class="w-full capitalize border border-gray-400 py-1 rounded focus:border-primary active:border-primary"
                                name="category" id="category" v-model="state.category">
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
                            <input name="duration" v-model="state.duration" min="0" type="number" id="duration"
                                placeholder="(min)"
                                class="border block border-gray-400 w-35 rounded outline-none focus:border-primary py-1 px-3 text-base" />
                            <ErrorMessage class="text-red-600 block" name="duration" />
                        </div>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="mb-3 xl:w-96">
                            <label for="ingredients"
                                class="block mb-2 font-bold text-base capitalize">ingredients</label>
                            <div v-if="ingredients.length!==0" class="pl-10 font-semibold">
                                <ol class="space-y-3 mb-5 list-decimal">
                                    <li v-for="(ingredient, index) in ingredients" :key="index" class="capitalize pl-2">
                                        {{ingredient.name}} amount {{ingredient.amount}} gram</li>
                                </ol>
                            </div>

                            <div class="grid grid-cols-2 items-center">
                                <div class="pr-7">
                                    <input @keyup.enter="addIngredients" @click="ingredient_error = false"
                                        ref="ingredientName" type="text" name="name" placeholder="Name"
                                        id="ingredientName"
                                        class="border border-gray-400 w-full rounded outline-none focus:border-primary py-1 px-3 text-base" />
                                </div>
                                <div class="flex justify-start items-center space-x-3">
                                    <input ref="amount" name="duration" min="0" type="number" id="amount"
                                        placeholder="(gram)" @click="ingredient_error = false;"
                                        class="border block border-gray-400 w-35 rounded outline-none focus:border-primary py-1 px-3 text-base" />
                                    <button @click.prevent="addIngredients"
                                        class="w-50 bg-primary p-3 rounded text-white hover:bg-primary transition duration-300">Add</button>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 items-center">
                                <div v-if="ingredient_error.valueOf(true)" class="flex justify-start items-center">
                                    <p class="text-red-900 text-base font-bold">no ingredients</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label for="steps" class="block mb-2 font-bold text-xl capitalize">Necessary Steps</label>
                        <div v-if="steps.length!==0" class="pl-10 font-semibold">
                            <ol class="space-y-3 mb-5 list-decimal">
                                <li v-for="step in steps" :key="step.step_number" class="capitalize pl-2">
                                    {{step.description}}</li>
                            </ol>
                        </div>

                        <div class="grid grid-cols-2 items-center">
                            <div class="pr-7">
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
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    " id="steps" rows="4" placeholder="Steps" @keyup.enter="addSteps"
                                    @click.prevent="this.isStepNull=false" v-model="step"></textarea>
                            </div>
                            <div>
                                <button @click.prevent="addSteps"
                                    class="w-50 bg-primary p-3 rounded text-white hover:bg-orange-700 transition duration-300">Add</button>
                            </div>
                            <div v-if="isStepNull.valueOf(true)" class="flex justify-start items-center mt-1">
                                <p class="text-red-900 text-base font-bold">Empty Step</p>
                            </div>
                        </div>
                    </div>
                    <button type="submit" :disabled="loading"
                        class="w-50 flex flex-col bg-primary p-3 rounded text-white hover:bg-orange-700 transition duration-300">
                        <div v-if="loading" class="mx-auto w-full">
                            <div class="bar bar1"></div>
                            <div class="bar bar2"></div>
                            <div class="bar bar3"></div>
                            <div class="bar bar4"></div>
                            <div class="bar bar5"></div>
                            <div class="bar bar6"></div>
                            <div class="bar bar7"></div>
                            <div class="bar bar8"></div>
                        </div>
                        <div v-if="!loading" class="capitalize">
                            create
                        </div>
                    </button>
                </form>
            </div>
        </div>
    </MainLayout>
</template>
<style scoped>
.bar {
    width: 10px;
    height: 20px;
    display: inline-block;
    transform-origin: bottom center;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    /*   box-shadow:5px 10px 20px inset rgba(255,23,25.2); */
    animation: loader 1.2s linear infinite;
}

.bar1 {
    animation-delay: 0.1s;
}

.bar2 {
    animation-delay: 0.2s;
}

.bar3 {
    animation-delay: 0.3s;
}

.bar4 {
    animation-delay: 0.4s;
}

.bar5 {
    animation-delay: 0.5s;
}

.bar6 {
    animation-delay: 0.6s;
}

.bar7 {
    animation-delay: 0.7s;
}

.bar8 {
    animation-delay: 0.8s;
}

@keyframes loader {
    0% {
        transform: scaleY(0.1);
        background: yellowgreen;
    }

    50% {
        transform: scaleY(1);
        background: yellowgreen;
    }

    100% {
        transform: scaleY(0.1);
        background: transparent;
    }
}
</style>