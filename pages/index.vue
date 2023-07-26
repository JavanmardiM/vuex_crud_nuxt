<template>
  <div class="container-fluid pt-3">
    <div class="content">
      <b-card>
        <div class="pt-3">
          <button @click="$router.push('/item')" type="button" class="btn btn-primary">
            <font-awesome-icon class="ml-2" icon="plus" size="sm" />ثبت نرم افزار
          </button>
        </div>
        <b-tabs
          class="mt-3"
          active-nav-item-class="font-weight-bold "
          active-tab-class="font-weight-bold"
          content-class="mt-3"
        >
          <b-tab title="نرم افزار های فعال" active>
            <div class="row d-flex flex-row-reverse">
              <div class="col-1">
                <b-form-input type="number" value="10" min="1" max="999"></b-form-input>
              </div>
            </div>
            <div class="pt-3">
              <b-table striped hover :fields="fields" :items="loadActiveItemList">
                <template v-slot:cell(edit)="row">
                  <span v-b-tooltip.hover title="ویرایش">
                    <font-awesome-icon
                      @click="editItem(row.item.id)"
                      icon="edit"
                      size="lg"
                      class="m-1 cursor"
                    />
                  </span>
                </template>
                <template v-slot:cell(delete)="row">
                  <span v-b-tooltip.hover title="حذف">
                    <font-awesome-icon
                      @click="confirmDialog(row.item.id)"
                      icon="trash"
                      size="lg"
                      class="text-danger m-1 cursor"
                    />
                  </span>
                </template>
                <template v-slot:cell(isActived)="row">
                  <span v-b-tooltip.hover>
                    <ToggleButton
                      :options="{...options, isActive: row.item.isActivated}"
                      @setIsActive="toggleBtn($event,row.item.id)"
                    ></ToggleButton>
                  </span>
                </template>
                <template v-slot:cell(isGeneral)="row">
                  <span v-b-tooltip.hover>
                    <span v-if="row.item.isGeneral" v-b-tooltip.hover title="عمومی">
                      <font-awesome-icon icon="check" size="lg" class="text-success m-1 cursor" />
                    </span>
                    <span v-else v-b-tooltip.hover>
                      <font-awesome-icon icon="times" size="lg" class="text-danger m-1 cursor" />
                    </span>
                  </span>
                </template>
              </b-table>
            </div>
          </b-tab>
          <b-tab title="نرم افزار های غیر فعال">
            <div class="row d-flex flex-row-reverse">
              <div class="col-1">
                <b-form-input type="number" value="10" min="1" max="999"></b-form-input>
              </div>
            </div>
            <div class="pt-3">
              <b-table striped hover :fields="inActiveields" :items="loadInActiveItemList">
                <template v-slot:cell(isActived)="row">
                  <span v-b-tooltip.hover>
                    <ToggleButton
                      :options="{...options, isActive: row.item.isActivated}"
                      @setIsActive="toggleBtn($event,row.item.id)"
                    ></ToggleButton>
                  </span>
                </template>
              </b-table>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import ToggleButton from "~/components/ToggleButton.vue";

export default {
  data() {
    return {
      options: {
        isActive: ""
      },
      isToggled: false,
      fields: [
        { key: "name", label: "نام" },
        { key: "title", label: "عنوان" },
        { key: "date", label: "تاریخ" },
        { key: "url", label: "url" },
        { key: "isGeneral", label: "عمومی" },
        { key: "edit", label: "ویرایش" },
        { key: "isActived", label: "فعال" },
        { key: "delete", label: "حذف" }
      ],
      inActiveields: [
        { key: "name", label: "نام" },
        { key: "title", label: "عنوان" },
        { key: "date", label: "تاریخ" },
        { key: "url", label: "url" },
        { key: "isGeneral", label: "عمومی" },
        { key: "isActived", label: "فعال" }
      ]
    };
  },
  components: {
    ToggleButton
  },
  methods: {
    deleteItem(itemId) {
      // if (confirm("Do you really want to delete?")) {
      this.$store.dispatch("deleteItem", itemId);
      // }
    },
    editItem(itemId) {
      this.$router.push(`/item/${itemId}`);
    },
    toggleBtn(event, itemId) {
      this.$store.dispatch("toggleButton", {
        itemId: itemId,
        isActivated: !!event
      });
    },
    confirmDialog(itemId) {
      this.$bvModal
        .msgBoxConfirm("آیا از حذف این مورد اطمینان دارید؟", {
          title: "تایید حذف",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "تایید",
          cancelTitle: "انصراف",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) this.deleteItem(itemId);
        })
        .catch(err => {
          // An error occurred
        });
    }
  },
  computed: {
    loadItemList() {
      return this.$store.getters.loadedItems;
    },
    loadActiveItemList() {
      let activeList = this.loadItemList.filter(item => {
        return item.isActivated == true;
      });
      return activeList;
    },
    loadInActiveItemList() {
      let activeList = this.loadItemList.filter(item => {
        return item.isActivated == false;
      });
      return activeList;
    }
  }
};
</script>

<style scoped>
.content {
  direction: rtl;
  text-align: right;
}
input[type="number"]::-webkit-inner-spin-button {
  opacity: 1;
}
</style>
