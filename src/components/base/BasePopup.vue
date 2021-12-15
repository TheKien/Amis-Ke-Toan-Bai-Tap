<template>
  <div class="m-popup-box" :class="{ 'm-popup-show': isShowPopup }">
    <div class="m-popup">
      <div class="m-popup-content">
        <div class="m-flex">
          <div :class="icon"></div>
          <div class="m-messenger">{{ popup.Title }}</div>
        </div>
        <div class="m-mess-line"></div>
      </div>
      <div class="m-popup-bottom">
        <div v-if="popup.Status == 'Warning'" class="m-flex-between">
          <button class="m-btn m-btn-gray" @click="onClickClosePopup()">
            Không
          </button>
          <button class="m-btn m-btn-success" @click="onClickComfirm()">
            Có
          </button>
        </div>
        <div v-if="popup.Status == 'Danger'" class="m-flex-justify-center">
          <button class="m-btn m-btn-success" @click="onClickClosePopup()">
            Đóng
          </button>
        </div>
      </div>
    </div>
    <div class="m-popup-background"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icon: "",
    };
  },
  props: ["isShowPopup", "popup"],
  methods: {
    /**
     * If click OK, call function deleteEmployee in father-component
     * Author: CTKimYen (14/12/2021)
     */
    onClickComfirm() {
      this.$emit("onClickComfirm");
    },

    /**
     * If click NOT, close the popup
     * Author: CTKimYen (14/12/2021)
     */
    onClickClosePopup() {
      this.$emit("onClickClosePopup");
    },
  },
  watch: {
    isShowPopup() {
      switch (this.popup.Status) {
        case "Warning":
          this.icon = "mi mi-48 mi-exclamation-warning-48";
          this.btnBox = ``;
          break;
        case "Danger":
          this.icon = "mi mi-48 mi-exclamation-error-48-2";
          break;
        default:
          break;
      }
    },
  },
};
</script>