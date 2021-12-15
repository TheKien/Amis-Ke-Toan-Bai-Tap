<template>
  <div class="m-modal-box" :class="{ 'modal-show': isShowModal }">
    <div class="m-modal">
      <div class="m-flex-between">
        <div class="m-modal-header">
          <div class="m-modal-title">Thêm thông tin nhân viên</div>
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
        <div class="m-modal-icon m-flex">
          <div class="mi mi-24 mi-help"></div>
          <div
            class="m-modal-close mi mi-24 mi-close"
            @click="hideModal()"
          ></div>
        </div>
      </div>
      <div class="m-modal-content">
        <form>
          <div class="m-flex m-pb-12">
            <div class="m-pr-26 m-form-group">
              <div class="m-form-row m-flex">
                <div class="m-pr-6">
                  <label class="m-form-lable" for="">Mã <span> *</span></label>
                  <input
                    type="text"
                    class="m-form-input"
                    style="width: 150px"
                    v-model="employee.EmployeeCode"
                    :class="{
                      'm-form-error':
                        submitted && $v.employee.EmployeeCode.$error,
                    }"
                  />
                </div>

                <div style="flex: 1">
                  <label class="m-form-lable" for="">Tên <span> *</span></label>
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
                    <!-- <div><span>Mã đơn vị</span>  <span>Tên đơn vị</span> </div> -->
                  </template>
                  <template v-slot:option="option">
                    <!-- {{ option.DepartmentCode }} -->
                    {{ option.DepartmentName }}
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
                <input
                  type="text"
                  class="m-form-input"
                  v-model="employee.EmployeePosition"
                />
              </div>
            </div>

            <div class="m-form-group">
              <div class="m-form-row m-flex">
                <div class="m-pr-6">
                  <label class="m-form-lable" for="">Ngày sinh</label>
                  <input
                    type="date"
                    class="m-form-input"
                    v-model="employee.DateOfBirth"
                  />
                </div>

                <div class="m-pl-10">
                  <label class="m-form-lable" for="">Giới tính</label>
                  <div class="m-radio-region">
                  <div class="m-mr-20 m-radio-label">
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
                  <input
                    type="text"
                    class="m-form-input"
                    v-model="employee.IdentityNumber"
                  />
                </div>

                <div>
                  <label class="m-form-lable" for="">Ngày cấp</label>
                  <input
                    type="date"
                    class="m-form-input"
                    v-model="employee.IdentityDate"
                  />
                </div>
              </div>

              <div class="m-form-row">
                <label class="m-form-lable" for="">Nơi cấp</label>
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
            <input
              type="text"
              class="m-form-input"
              v-model="employee.Address"
            />
          </div>

          <div class="m-form-row m-flex">
            <div class="m-pr-6">
              <label class="m-form-lable" for="">ĐT di động</label>
              <input
                type="text"
                class="m-form-input"
                v-model="employee.TelephoneNumber"
              />
            </div>

            <div class="m-pr-6">
              <label class="m-form-lable" for="">ĐT cố định</label>
              <input
                type="text"
                class="m-form-input"
                v-model="employee.PhoneNumber"
              />
            </div>

            <div>
              <label class="m-form-lable" for="">Email</label>
              <input
                type="text"
                class="m-form-input"
                v-model="employee.Email"
              />
            </div>
          </div>

          <div class="m-form-row m-flex">
            <div class="m-pr-6">
              <label class="m-form-lable" for="">Tài khoản ngân hàng</label>
              <input
                type="text"
                class="m-form-input"
                v-model="employee.BankAccountNumber"
              />
            </div>

            <div class="m-pr-6">
              <label class="m-form-lable" for="">Tên ngân hàng</label>
              <input
                type="text"
                class="m-form-input"
                v-model="employee.BankName"
              />
            </div>

            <div>
              <label class="m-form-lable" for="">Chi nhánh</label>
              <input
                type="text"
                class="m-form-input"
                v-model="employee.BankBranchName"
              />
            </div>
          </div>
        </form>
      </div>
      <div class="m-modal-footer">
        <button class="m-btn m-btn-gray">Huỷ</button>
        <div>
          <button
            class="m-btn m-btn-gray m-mr-10"
            @click="onClickSubmitAndExit()"
          >
            Cất
          </button>
          <button class="m-btn m-btn-success">Cất và Thêm</button>
        </div>
      </div>
    </div>
    <div class="modal-background"></div>
  </div>
</template>
<script>
import _api from "../../../services/ApiService.js";
import { required } from "vuelidate/lib/validators";
export default {
  created() {
    this.getDeparment();
  },

  props: ["isShowModal", "isCreate", "employee", "employeeId", "apiRouter"],

  data() {
    return {
      departmentList: [],
      submitted: false,
    };
  },

  validations: {
    // validate dữ liệu gửi về
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
    },
  },
  methods: {
    /**
     *  Lấy tất cả phòng ban
     *  Author: TheKien(10/12/2021)
     */
    getDeparment: function () {
      // Gọi Api
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
     * Nhấn nút cất trên form thêm sửa nhân viên
     * Author: TheKien(6/12/2021)
     */
    onClickSubmitAndExit: function () {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        if(!this.$v.employee.EmployeeCode.required){
          this.$emit("showPopupDanger", 'Mã nhân viên không được bỏ trống');
          return;
        }
         if(!this.$v.employee.EmployeeName.required){
          this.$emit("showPopupDanger", 'Tên nhân viên không được bỏ trống');
          return;
        }
         if(!this.$v.employee.DepartmentId.required){
          this.$emit("showPopupDanger", 'Đơn vị nhân viên không được bỏ trống');
          return;
        }
      } else {
        // Thêm mới
        if (this.isCreate) {
          _api
            .create(this.apiRouter, this.employee)
            .then(() => {
              // load lại dữ liệu
              this.$emit("getAllEmployee");
              this.submitted = false;
              // Ẩn modal
              this.hideModal();
            })
            .catch(function (res) {
              console.log(res.response.data);
              const status = res.response.status;
              switch (status) {
                case 400:
                  alert(res.response.data.userMsg);
                  break;

                default:
                  break;
              }
            });
        } else {
          // Cập nhật
          _api
            .update(this.apiRouter, this.employeeId, this.employee)
            .then(() => {
              // load lại dữ liệu
              this.$emit("getAllEmployee");
              // Ẩn modal
              this.hideModal();
            })
            .catch(function (res) {
              console.log(res.response.data);
              const status = res.response.status;
              switch (status) {
                case 400:
                  console(res.response.data.userMsg);
                  break;
                default:
                  break;
              }
            });
        }
      }
    },

    /**
     *  Gọi hàm ẩn modal bên EmployeeList
     *  Author: TheKien(6/12/2021)
     */
    hideModal: function () {
      this.submitted = false;
      this.$emit("hideModal");
    },
  },
};
</script>