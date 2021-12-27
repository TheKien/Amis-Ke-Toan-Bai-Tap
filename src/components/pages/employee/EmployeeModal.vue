<template>
  <div class="m-modal-box" :class="{ 'modal-show': isShowModal }">
    <div class="m-modal">
      <div class="m-flex-between">
        <!--===== Modal header ======-->
        <div class="m-modal-header">
          <div class="m-modal-title">Thông tin nhân viên</div>
          <div class="m-modal-checkbox m-flex-item-center">
            <input type="checkbox" class="m-checkbox" /><span
              style="margin-left: 10px"
              >Là khách hàng</span
            >
            <input type="checkbox" class="m-checkbox" /><span
              style="margin-left: 10px"
              >Là nhà cung cấp</span
            >
          </div>
        </div>
        <!--===== End modal header ======-->
        <div class="m-modal-icon m-flex">
          <div class="mi mi-24 mi-help"></div>
          <!-- Button close -->
          <div
            class="m-modal-close mi mi-24 mi-close"
            @click="onClickExit()"
          ></div>
        </div>
      </div>

      <!--===== Modal content ======-->
      <div class="m-modal-content">
        <form>
          <div class="m-flex m-pb-12">
            <div class="m-pr-26 m-form-group">
              <div class="m-form-row m-flex">
                <div class="m-pr-6">
                  <label class="m-form-lable" for="">Mã <span> *</span></label>
                  <!-- Input EmployeeCode -->
                  <input
                    type="text"
                    class="m-form-input"
                    style="width: 150px"
                    ref="txtEmployeeCode"
                    v-model="employee.EmployeeCode"
                    :class="{
                      'm-form-error':
                        submitted && $v.employee.EmployeeCode.$error,
                    }"
                  />
                </div>
                <div style="flex: 1">
                  <label class="m-form-lable" for="">Tên <span> *</span></label>
                  <!-- Input EmployeeName -->
                  <input
                    type="text"
                    class="m-form-input"
                    v-model="employee.EmployeeName"
                    :class="{
                      'm-form-error':
                        submitted && $v.employee.EmployeeName.$error,
                    }"
                  />
                </div>
              </div>

              <div class="m-form-row">
                <label class="m-form-lable">Đơn vị <span> *</span></label>
                <!-- Combobox Department-->
                <v-select
                  :options="departmentList"
                  label="DepartmentName"
                  :reduce="(ontion) => ontion.DepartmentId"
                  v-model="employee.DepartmentId"
                  :class="{
                    'm-form-error':
                      submitted && $v.employee.DepartmentId.$error,
                  }"
                >
                  <template #list-header>
                    <div class="vs__header">
                      <div class="m-flex">
                        <div class="vs__option"><b>Mã đơn vị</b></div>
                        <div class="vs__option"><b>Tên đơn vị</b></div>
                      </div>
                    </div>
                  </template>
                  <template v-slot:option="option">
                    <div class="m-flex">
                      <div class="vs__option">{{ option.DepartmentCode }}</div>
                      <div class="vs__option">{{ option.DepartmentName }}</div>
                    </div>
                  </template>
                  <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                      Không tìm thấy <em>{{ search }}</em
                      >.
                    </template>
                    <em v-else style="opacity: 0.5"
                      >Điền vào ô để tìm kiếm tên đơn vị.</em
                    >
                  </template>
                </v-select>
              </div>
              <div class="m-form-row">
                <label class="m-form-lable">Chức danh</label>
                <!-- Input PositionName -->
                <input
                  type="text"
                  class="m-form-input"
                  v-model="employee.PositionName"
                />
              </div>
            </div>

            <div class="m-form-group">
              <div class="m-form-row m-flex">
                <div class="m-pr-6">
                  <label class="m-form-lable" for="">Ngày sinh</label>
                  <!-- Input DateOfBirth -->
                  <input
                    type="date"
                    class="m-form-input"
                    v-model="employee.DateOfBirth"
                    :class="{
                      'm-form-error':
                        submitted && $v.employee.DateOfBirth.$error,
                    }"
                  />
                </div>
                <div class="m-pl-10">
                  <label class="m-form-lable" for="">Giới tính</label>
                  <div class="m-radio-region">
                    <div class="m-mr-20 m-radio-label">
                      <!-- Input Radio Gender:'Nam' -->
                      <input
                        type="radio"
                        class="m-radio"
                        name="gender"
                        value="1"
                        v-model="employee.Gender"
                      />
                      <label for="gender">Nam</label>
                    </div>
                    <div class="m-radio-label">
                      <!-- Input Radio Gender:'Nữ' -->
                      <input
                        type="radio"
                        class="m-radio"
                        name="gender"
                        value="0"
                        v-model="employee.Gender"
                      />
                      <label for="gender">Nữ</label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="m-form-row m-flex">
                <div class="m-pr-6" style="flex: 1">
                  <label class="m-form-lable" for="">Số CMND</label>
                  <!-- Input IdentityNumber -->
                  <input
                    type="text"
                    class="m-form-input"
                    v-model="employee.IdentityNumber"
                  />
                </div>
                <div>
                  <label class="m-form-lable" for="">Ngày cấp</label>
                  <!-- Input IdentityDate -->
                  <input
                    type="date"
                    class="m-form-input"
                    v-model="employee.IdentityDate"
                    :class="{
                      'm-form-error':
                        submitted && $v.employee.IdentityDate.$error,
                    }"
                  />
                </div>
              </div>

              <div class="m-form-row">
                <label class="m-form-lable" for="">Nơi cấp</label>
                <!-- Input IdentityPlace -->
                <input
                  type="text"
                  class="m-form-input"
                  v-model="employee.IdentityPlace"
                />
              </div>
            </div>
          </div>

          <div class="m-form-row">
            <label class="m-form-lable" for="">Địa chỉ</label>
            <!-- Input Address -->
            <input
              type="text"
              class="m-form-input"
              v-model="employee.Address"
            />
          </div>

          <div class="m-form-row m-flex">
            <div class="m-pr-6">
              <label class="m-form-lable" for="">ĐT di động</label>
              <!-- Input PhoneNumber -->
              <input
                type="text"
                class="m-form-input"
                v-mask="'0##-###-####'"
                v-model="employee.PhoneNumber"
              />
            </div>
            <div class="m-pr-6">
              <label class="m-form-lable" for="">ĐT cố định</label>
              <!-- Input TelephoneNumber -->
              <input
                type="text"
                class="m-form-input"
                v-model="employee.TelephoneNumber"
              />
            </div>
            <div>
              <label class="m-form-lable" for="">Email</label>
              <!-- Input Email -->
              <input
                type="text"
                class="m-form-input"
                v-model="employee.Email"
                :class="{
                  'm-form-error': submitted && $v.employee.Email.$error,
                }"
              />
            </div>
          </div>

          <div class="m-form-row m-flex">
            <div class="m-pr-6">
              <label class="m-form-lable" for="">Tài khoản ngân hàng</label>
              <!-- Input BankAccount -->
              <input
                type="text"
                class="m-form-input"
                v-model="employee.BankAccount"
              />
            </div>

            <div class="m-pr-6">
              <label class="m-form-lable" for="">Tên ngân hàng</label>
              <!-- Input BankName -->
              <input
                type="text"
                class="m-form-input"
                v-model="employee.BankName"
              />
            </div>

            <div>
              <label class="m-form-lable" for="">Chi nhánh</label>
              <!-- Input BankBranch -->
              <input
                type="text"
                class="m-form-input"
                v-model="employee.BankBranch"
              />
            </div>
          </div>
        </form>
      </div>
      <!--===== End modal header ======-->

      <!--===== Modal footer ======-->
      <div class="m-modal-footer">
        <!-- Button close -->
        <button class="m-btn m-btn-gray" @click="onClickClose()">Huỷ</button>
        <div>
          <!-- Button save and close-->
          <button class="m-btn m-btn-gray m-mr-10" @click="onClickSubmit(0)">
            Cất
          </button>
          <!-- Button save and create -->
          <button class="m-btn m-btn-success" @click="onClickSubmit(1)">
            Cất và Thêm
          </button>
        </div>
      </div>
      <!--===== End modal footer ======-->
    </div>
    <div class="modal-background"></div>
  </div>
</template>

<script>
import _api from "../../../services/ApiService.js";
import { required, email } from "vuelidate/lib/validators";
import { eventBus } from "../../../main";

export default {
  created() {
    this.getDeparment();

    /**
     * Hide modal global
     * Author: TTKien(15/12/2021)
     */
    eventBus.$on("onClickClose", () => {
      this.onClickClose();
    });
    /**
     * Button submit global
     * Author: TTKien(15/12/2021)
     */
    eventBus.$on("onClickSubmit", (modeBtn) => {
      this.onClickSubmit(modeBtn);
    });
  },

  props: ["isShowModal", "isCreate", "employee", "employeeId", "apiRouter"],

  data() {
    return {
      departmentList: [],
      submitted: false,
      changeForm: 0,
    };
  },

  validations: {
    // Validate data
    employee: {
      EmployeeCode: {
        required,
      },
      EmployeeName: {
        required,
      },
      DepartmentId: {
        required,
      },
      Email: {
        email,
      },
      DateOfBirth: {
        maxValue: (value) => value < new Date().toISOString(),
      },
      IdentityDate: {
        maxValue: (value) => value < new Date().toISOString(),
      },
    },
  },
  methods: {
    /**
     *  Lấy tất cả phòng ban
     *  Author: TTKien(6/12/2021)
     */
    getDeparment() {
      // Call api
      _api
        .get("/Departments")
        .then((response) => {
          this.departmentList = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    /**
     * Nhấn nút cất hoặc cất và thêm
     * @param {*} modeBtn modeBtn=0 - nút cất, modeBtn=1 - nút cất và thêm
     * Author: TTKien(6/12/2021)
     */
    onClickSubmit(modeBtn) {
      let _this = this;
      // On validate
      this.submitted = true;
      this.$v.$touch();
      // if data error
      if (this.$v.$invalid) {
        if (!this.$v.employee.EmployeeCode.required) {
          this.$emit("showPopupDanger", "Mã nhân viên không được bỏ trống!");
          return;
        }
        if (!this.$v.employee.EmployeeName.required) {
          this.$emit("showPopupDanger", "Tên nhân viên không được bỏ trống!");
          return;
        }
        if (!this.$v.employee.DepartmentId.required) {
          this.$emit(
            "showPopupDanger",
            "Đơn vị nhân viên không được bỏ trống!"
          );
          return;
        }
        if (!this.$v.employee.Email.email) {
          this.$emit("showPopupDanger", "Email sai định dạng!");
          return;
        }
        if (!this.$v.employee.DateOfBirth.maxValue) {
          this.$emit(
            "showPopupDanger",
            "Ngày sinh không được lớn hơn ngày hiện tại!"
          );
          return;
        }
        if (!this.$v.employee.IdentityDate.maxValue) {
          this.$emit(
            "showPopupDanger",
            "Ngày sinh không được lớn hơn ngày hiện tại!"
          );
          return;
        }
        return;
      } else {
        // CREATE EMPLOYEE
        if (this.isCreate) {
          _api
            .create(this.apiRouter, this.employee)
            .then(() => {
              // Reset data
              this.$emit("getAllEmployee");
              this.submitted = false;
              // Select button 'cất '
              if (modeBtn == 0) {
                // Hide modal
                this.onClickClose();
              } else {
                // Select button 'cất và thêm'
                // Reset Form
                this.$emit("resetFormData");
                this.$emit("onClickAddEmployee");
                this.submitted = false;
                setTimeout(() => {
                  this.changeForm = 0;
                }, 0);
              }
            })
            .catch(function (res) {
              const status = res.response.status;
              console.log(res);

              switch (status) {
                case 400:
                  // Show popup danger to users
                  _this.$emit("showPopupDanger", res.response.data.data[0]);
                  break;
                case 500:
                  _this.$emit("showPopupDanger", res.response.data.userMsg);
                  break;
                default:
                  break;
              }
            });
        } else {
          // UPDATE
          _api
            .update(this.apiRouter, this.employeeId, this.employee)
            .then(() => {
              // Reset data
              this.$emit("getAllEmployee");
              // Select button 'cất'
              if (modeBtn == 0) {
                // Hide modal
                this.onClickClose();
              } else {
                // Select button 'cất và thêm'
                // Reset Form
                this.$emit("resetFormData");
                // get new EmployeeCode
                this.$emit("onClickAddEmployee");
                this.submitted = false;
                setTimeout(() => {
                  this.changeForm = 0;
                }, 0);
              }
            })
            .catch(function (res) {
              console.log(res.response.data);
              const status = res.response.status;
              switch (status) {
                case 400:
                  // Show popup danger to users
                  _this.$emit("showPopupDanger", res.response.data.data);
                  break;
                case 500:
                  _this.$emit("showPopupDanger", res.response.data.userMsg);
                  break;
                default:
                  break;
              }
            });
        }
      }
    },

    /**
     *  Call function hide modal in parent component
     *  Author: TTKien(6/12/2021)
     */
    onClickClose() {
      let _this = this;
      // Call function to parent component Reset form
      this.$emit("resetFormData");
      // Call function to parent component hide modal
      this.$emit("hideEmployeeModal");
      setTimeout(() => {
        _this.changeForm = 0;
        _this.submitted = false;
      }, 0);
    },

    /**
     *  If change form, click btn exit show popup question
     *  Author: TTKien(6/12/2021)
     */
    onClickExit() {
      if (this.changeForm > 1) {
        this.$emit(
          "showPopupQuestion",
          "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?"
        );
      } else {
        this.onClickClose();
      }
    },
  },
  watch: {
    /**
     *  If change form, changeForm + 1
     *  Author: TTKien(15/12/2021)
     */
    employee: {
      handler: function () {
        this.changeForm += 1;
      },
      deep: true,
    },

    isShowModal() {
      setTimeout(() => {
        this.$refs.txtEmployeeCode.focus();
      }, 10);
    },
  },
};
</script>