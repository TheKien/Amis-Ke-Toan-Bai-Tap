<template>
  <div class="m-popup-box" :class="{ 'm-popup-show': isShowPopup }">
    <div class="m-popup">
      <div class="m-popup-content">
        <div class="m-flex">
          <div :class="icon"></div>
          <!-- Messenger -->
          <div class="m-messenger">{{ popup.Title }}</div>
        </div>
        <div class="m-mess-line"></div>
      </div>
      <div class="m-popup-bottom">
        <div v-if="popup.Status == 'Warning'" class="m-flex-between">
          <!-- Button close -->
          <button class="m-btn m-btn-gray" @click="onClickClose()">
            Không
          </button>
          <!-- Button comfirm -->
          <button class="m-btn m-btn-success" @click="onClickComfirm()">
            Có
          </button>
        </div>
        <div v-if="popup.Status == 'Danger'" class="m-flex-justify-center">
          <!-- Button close -->
          <button class="m-btn m-btn-success" @click="onClickClose()">
            Đóng
          </button>
        </div>
        <div v-if="popup.Status == 'Question'" class="m-flex-between">
          <!-- Button close -->
          <button class="m-btn m-btn-gray" @click="onClickClose()">
            Huỷ
          </button>
          <div class="m-flex">
            <!-- Button close -->
            <button class="m-btn m-btn-gray m-mr-10" @click="onClickNot()">
              Không
            </button>
            <!-- Button comfirm -->
            <button class="m-btn m-btn-success" @click="onClickComfirm()">
              Có
            </button>
          </div>
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
     * If click OK, call function in father-component
     * Author: TTKien (12/12/2021)
     */
    onClickComfirm() {
      this.$emit("onClickComfirm");
    },

    /**
     * If click NOT, close the popup
     * Author: TTKien (12/12/2021)
     */
    onClickClose() {
      this.$emit("onClickClosePopup");
    },
    /**
     * If click NOT, close the popup question
     * Author: TTKien (12/12/2021)
     */
    onClickNot() {
      this.$emit("onClickClosePopup");
      this.$emit("hideEmployeeModal");
    }
  },
  watch: {
    /**
     * Change status of popup
     * Author: TTKien (12/12/2021)
     */
    isShowPopup() {
      switch (this.popup.Status) {
        case "Warning":
          this.icon = "mi mi-48 mi-exclamation-warning-48";
          break;
        case "Danger":
          this.icon = "mi mi-48 mi-exclamation-error-48-2";
          break;
        case "Question":
          this.icon = "mi mi-48 mi-exclamation-question-48";
          break;
        default:
          break;
      }
    },
  },
};
</script>