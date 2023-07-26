import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedItems: []
    },
    mutations: {
      setItems(state, items) {
        state.loadedItems = items;
      },
      addItem(state, item) {
        state.loadedItems.push(item);
      },
      editItem(state, editedItem) {
        const itemIndex = state.loadedItems.findIndex(
          item => item.id === editedItem.id
        );
        state.loadedItems[itemIndex] = editedItem;
      },
    },
    actions: {
      setItems(vuexContext, items) {
        vuexContext.commit("setItems", items);
      },
      addItem(vuexContext, item) {
        vuexContext.commit("addItem", item);
      },
      deleteItem(vuexContext, itemId) {
        const newState = Object.assign({}, vuexContext.state);
        const itemIndex = newState.loadedItems.findIndex(
          item => item.id === itemId
        );
        if (itemIndex === -1) {
          return;
        }
        newState.loadedItems.splice(itemIndex, 1);
        vuexContext.commit("setItems", newState.loadedItems);
      },
      editItem(vuexContext, editedItem) {
        vuexContext.commit("editItem", editedItem);
      },
  
      toggleButton(vuexContext,{ itemId, isActivated}){
        const items = [...vuexContext.state.loadedItems]
        const item = items.find(
          item => item.id === itemId
        );
        item.isActivated =isActivated;
        const itemIndex = items.findIndex(
          item => item.id === itemId
        );
        items.splice(itemIndex, 1, item);
        vuexContext.commit("setItems", items);
      }
    },
    getters: {
      loadedItems(state) {
        return state.loadedItems;
      },
      getSelectedItem(state) {
        return itemId =>
          state.loadedItems.find(item => {
            return item.id === itemId;
          });
      }
    }
  });
};

export default createStore;
