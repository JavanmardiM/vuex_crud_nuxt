<template>
  <div class="container pt-3">
    <div class="content">
      <b-card>
        <!-- <ValidationObserver v-slot="{ handleSubmit }"> -->
          <!-- @submit.prevent="onSave" -->
          <form @submit.prevent="onSave">
            <p class="h4 mb-4 text-center">ثبت جدید</p>   
            <b-form-group class="mb-0 text-right">
              <!-- <ValidationProvider rules="required" v-slot="{ errors }"> -->
                <b-form-input
                  v-model="loadSelectedItem.name"
                  id="input-1"
                  type="text"
                  required
                  placeholder="نام"
                ></b-form-input>
                <!-- <span>{{ errors[0] }}</span> -->
              <!-- </ValidationProvider> -->
            </b-form-group>

            <b-form-group class="mb-0">
              <b-form-input
                v-model="loadSelectedItem.title"
                id="input-2"
                type="text"
                required
                placeholder="عنوان"
              ></b-form-input>
            </b-form-group>

            <b-form-group class="mb-0" style="border-right: 1px #dadada solid;">
              <date-picker
                v-model="loadSelectedItem.date"
                :clearable="true"
                input-format="YYYY-MM-DD"
                format="jYYYY/jMM/jDD"
                 altFormat = 'YYYY-MM-DD'
              />
            </b-form-group>
            <b-form-group class="mb-0 pt-3">
              <b-form-input
                v-model="loadSelectedItem.url"
                id="input-3"
                type="text"
                required
                placeholder="url"
              ></b-form-input>
            </b-form-group>
            <b-form-group class="mb-0 pt-3">
              <b-form-checkbox
                class="checkbox"
                id="checkbox-1"
                v-model="loadSelectedItem.isGeneral"
                name="checkbox-1"
                value="true"
                unchecked-value="false"
              >عمومی</b-form-checkbox>
            </b-form-group>

            <b-button type="submit" variant="primary">ثبت</b-button>
            <b-button @click="onCancel" type="reset" variant="danger">انصراف</b-button>
          </form>
        <!-- </ValidationObserver> -->
      </b-card>
    </div>
  </div>
</template>

<script>
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import { ValidationObserver, ValidationProvider } from "vee-validate";

// import { required } from "vee-validate/dist/rules";

// extend("required", {
//   ...required,
//   message: "This field is required"
// });
export default {
  data() {
    return {
      loadedItems: {
        id: "",
        name: "",
        title: "",
        date: "",
        url: "",
        isGeneral: "",
        isActivated: true
      }
    };
  },
  components: {
    datePicker: VuePersianDatetimePicker,
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    submitNewOperation() {
      this.onSave();
    },
    onSave() {
      if (!!this.$route.params.id) {
        this.editItme();
      } else {
        this.addItem();
      }
    },
    addItem() {
      this.$store
        .dispatch("addItem", {
          ...this.loadedItems,
          id: Math.random()
            .toString(36)
            .substring(7)
        })
        .then(() => {
          this.$router.push("/");
        });
    },
    editItme() {
      this.$store.dispatch("editItem", this.loadedItems).then(() => {
        this.$router.push("/");
      });
    },
    onCancel() {
      this.$router.push("/");
    }
  },
  computed: {
    loadSelectedItem() {
      const selectedItem = !!this.$route.params.id
        ? this.$store.getters.getSelectedItem(this.$route.params.id)
        : this.loadedItems;
      return selectedItem;
    }
  }
};
</script>
<style scoped>
input[type="text"],
.txtarea {
  margin-bottom: 10px;
  text-align: right;
}
.checkbox {
  text-align: right;
}
</style>