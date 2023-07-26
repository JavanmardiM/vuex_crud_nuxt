<template>
  <div>
    <h1>this is emoplee</h1>
    <validation-provider rules="required" v-slot="{ errors }">
      <input v-model="value" name="myinput" type="text" />
      <span>{{ errors[0] }}</span>
    </validation-provider>
  </div>
</template>

<script>
import { ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required"
});

export default {
    components: {
    ValidationProvider
  },
  data: () => ({
    value: ""
  })
};
</script>