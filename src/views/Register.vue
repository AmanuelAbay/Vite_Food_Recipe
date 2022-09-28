<script>
import { ref, reactive, computed } from 'vue';
import useValidate from '@vuelidate/core';
import { useMutation } from '@vue/apollo-composable';
import SIGNUP from '@/graphql/signup.gql';
import { required } from '@vuelidate/validators';
import TopNav from '../components/Nav/TopNav.vue';

export default {
    setup() {
        const loading = ref(false);
        const error = ref(null);
        const user = reactive({
            firstname: "",
            lastname: "",
            email: "",
            phone_number: "",
            password: "",
            confirmPassword: ""
        });
        let { onDone, onError, mutate } = useMutation(SIGNUP);
        onDone(({ data: { register } }) => {
            if (!register.status) {
                error.value = register.message;
            }
            else {
                error.value = null;
                //remove current user
                localStorage.removeItem("token");
                localStorage.removeItem("user_id");
                // reset newly registerd user
                localStorage.setItem("token", register.token);
                localStorage.setItem("user_id", register.id);
                location.replace("/");
            }
        });
        const rules = computed(() => {
            return {
                // TODO: FORM MUST BE CHECK THE PASSWORD AND CONFIRM PASSWORD FIELD TO BE EQUAL
                firstname: { required },
                lastname: { required },
                email: { required },
                phone_number: { required },
                password: { required },
                confirmPassword: { required }
            };
        });
        const v$ = useValidate(rules, user);
        return {
            v$,
            user,
            error,
            loading,
            onDone,
            onError,
            mutate
        };
    },
    methods: {
        signup() {
            console.log("signup is called");
            // checking forms
            this.v$.$validate();
            if (!this.v$.$error) {
                // register user
                this.error = null;
                // console.log(this.user);
                this.mutate({ "name": this.user.firstname + " " + this.user.lastname, "email": this.user.email, "phone_number": this.user.phone_number, "password": this.user.password });
            }
            else {
                this.error = "Fill The Form Correctly!";
            }
        }
    },
    components: { TopNav }
}

</script>

<template>
    <TopNav />
    <div class="md:grid md:grid-cols-2 md:gap-6 mb-10">
        <div class="col-span-1">
            <img src="../assets/img/sign_up.png" alt="Sign Up">
        </div>
        <div class="col-span-1 items-center px-14">
            <div class="flex flex-col items-center">
                <h2 class="text-primary text-3xl font-bold mt-7 mb-4">Sign Up</h2>
            </div>
            <div class="px-7">
                <form method="POST" class="space-y-6" @submit.prevent="signup">
                    <div class="grid grid-cols-2 items-center">
                        <div class="pr-7">
                            <label for="firstname" class="block mb-2 font-bold text-sm capitalize">First Name</label>
                            <input type="text" v-model="user.firstname" name="firstname" id="firstname"
                                class="border border-gray-400 w-full rounded outline-none focus:border-primary py-1 px-3 text-base" />
                            <!-- <ErrorMessage class="text-red-600" name="firstname" /> -->
                        </div>
                        <div>
                            <label for="lastname" class="block mb-2 font-bold text-sm capitalize">Last Name</label>
                            <input type="text" v-model="user.lastname" name="lastname" id="lastname"
                                class="border border-gray-400 w-full rounded outline-none focus:border-primary py-1 px-3 text-base" />
                            <!-- <ErrorMessage class="text-red-600" name="lastname" /> -->
                        </div>
                    </div>
                    <div>
                        <label for="email" class="block mb-2 font-bold text-sm capitalize">Email</label>
                        <input type="email" v-model="user.email" name="email" id="email" autocomplete="false"
                            placeholder="example@email.com"
                            class="border border-gray-400 w-full rounded outline-none focus:border-primary py-1 px-3 text-base" />
                        <!-- <ErrorMessage class="text-red-600" name="email" /> -->
                    </div>
                    <div>
                        <label for="phonenumber" class="block mb-2 font-bold text-sm capitalize">Phone Number</label>
                        <input type="text" v-model="user.phone_number" name="phonenumber" id="phonenumber"
                            placeholder="+251" autocomplete="false"
                            class="border border-gray-400 w-full rounded outline-none focus:border-primary py-1 px-3 text-base" />
                        <!-- <ErrorMessage class="text-red-600" name="phonenumber" /> -->
                    </div>
                    <div>
                        <label for="password" class="block mb-2 font-bold text-sm capitalize">Password</label>
                        <input type="password" v-model="user.password" name="password" id="password"
                            class="border border-gray-400 w-full rounded outline-none focus:border-primary py-1 px-3 text-base" />
                        <!-- <ErrorMessage class="text-red-600" name="password" /> -->
                    </div>
                    <div>
                        <label for="confirmpassword" class="block mb-2 font-bold text-sm capitalize">Confirm
                            Password</label>
                        <input type="password" v-model="user.confirmPassword" name="confirmpassword"
                            id="confirmpassword"
                            class="border border-gray-400 w-full rounded outline-none focus:border-primary py-1 px-3 text-base" />
                    </div>
                    <p class="text-red-600" v-if="error" name="global_error">{{error}}</p>
                    <!-- <div class="flex justify-start items-center space-x-2">
                        <input type="checkbox" id="agree" class="bg-primary required:border-red-500 checked:bg-primary">
                        <label for="agree" class="text-gray-700 text-sm">I agree to the terms and privacy</label>
                    </div> -->
                    <!-- <div v-if="authError" class="flex justify-start items-center mt-1">
                        <font-awesome-icon icon="exclamation-circle" class="text-red-900 text-base ml-5 mr-3"></font-awesome-icon>
                        <p class="text-red-900 text-base font-bold">{{message}}</p>
                    </div> -->
                    <button type="submit" :disabled="loading"
                        class="flex flex-col items-center w-full bg-primary p-3 rounded text-white hover:bg-orange-700 transition duration-300">
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
                        <div v-if="!loading">
                            Sign Up
                        </div>
                    </button>
                </form>
                <div class="pt-3 flex justify-start items-center">
                    <div class="capitalize text-sm font-bold pr-1">Already Have Account?</div>
                    <router-link class="font-bold text-primary" to="/login">sign In</router-link>
                </div>
            </div>
        </div>
    </div>
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