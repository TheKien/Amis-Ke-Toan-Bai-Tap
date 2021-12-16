<template>
  <div class="m-popup-box" :class="{ 'm-popup-show': isShowPopup }">
    <div class="m-popup">
      <div class="m-popup-content">
        <div class="m-flex">
          <div class="mi mi-48 mi-exclamation-warning-48" v-if="popup.Status == 'Warning'"></div>
          <div class="mi mi-48 mi-exclamation-error-48-2" v-if="popup.Status == 'Danger'"></div>
          <div class="mi mi-48 mi-exclamation-question-48" v-if="popup.Status == 'Question'"></div>
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
          <button class="m-btn m-btn-gray" @click="onClickClose()">Huỷ</button>
          <div class="m-flex">
            <!-- Button close -->
            <button class="m-btn m-btn-gray m-mr-10" @click="onClickNot()">
              Không
            </button>
            <!-- Button comfirm -->
            <button class="m-btn m-btn-success" @click="onClickYes()">
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
import { eventBus } from "../../main";
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
      // Call funciton close modal from global
      eventBus.$emit("onClickClose");
    },
    /**
     * If click YES, close the popup question
     * Author: TTKien (12/12/2021)
     */
    onClickYes() {
      this.$emit("onClickClosePopup");
      // Call funciton submit form modal from global
      eventBus.$emit("onClickSubmit", 0);
    },
  },
};
</script>