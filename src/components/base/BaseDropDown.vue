<template>
  <!-- @blur="listOpen = false" -->
  <div class="main-container">
    <button class="sel-btn" @click="listOpen = !listOpen">
      {{ getText() }}
    </button>
    <br />
    <div class="list-items" v-show="listOpen">
      <button
        class="item"
        v-for="(l, i) in list"
        :key="i"
        @click="btnClicked(i)"
      >
        {{ l }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultText: {
      type: String,
      required: false,
    },
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedIndex: -1,
      listOpen: false,
    };
  },
  mounted() {
    window.addEventListener("blur", this.closeDropdown, true);
  },
  destroyed() {
    window.removeEventListener("blur", this.closeDropdown);
  },
  methods: {
    closeDropdown() {
      setTimeout(() => {
        this.listOpen = false;
      }, 100);
    },
    getText() {
      if (this.selectedIndex !== -1) return this.list[this.selectedIndex];
      if (this.defaultText) return this.defaultText;
      return "Please Select";
    },

    btnClicked(index) {
      this.selectedIndex = index;
      this.listOpen = false;
      this.$emit("input", this.list[index]);
    },
  },
};
</script>

<style scoped>
.main-container {
  position: relative;
  display: inline-block;
  min-width: 125px;
  max-width: 125px;
  text-align: left;
  border: 0;
  background: #0000;
}

.sel-btn {
  display: inline-block;
  width: 100%;
  text-align: left;
  border: 0;
  background: linear-gradient(0deg, #efefef, #fff);
  padding: 8px;
  border: 1px solid #1111;
  box-shadow: 1px 1px 1px #1115;
  cursor: pointer;
  overflow: hidden;
}

.sel-btn:hover {
  background: linear-gradient(0deg, #cef, #fff);
  box-shadow: 1px 1px 1px #6390bd;
  color: #58a;
}

.sel-btn::after {
  content: "\2bc6";
  position: absolute;
  right: 4%;
}

.list-items {
  position: absolute;
  width: 100%;
  background: #fff;
  box-shadow: 1px 1px 3px #3333;
}

.item {
  display: block;
  width: 100%;
  text-align: left;
  background: #fff;
  border: 0;
  cursor: pointer;
  padding: 8px;
  border-bottom: 1px solid #2221;
  font-size: 0.8rem;
}

.item:hover {
  background: #4b84c5;
  color: #fff;
}
</style>