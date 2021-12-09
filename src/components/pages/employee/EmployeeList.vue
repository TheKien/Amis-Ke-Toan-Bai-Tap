<template>
  <!--=========== Main ===========-->
  <div>
    <div class="main">
      <div class="main-header m-flex-between">
        <div class="main-title">Nhân viên</div>
        <button class="m-btn m-btn-success" @click="onClickAddEmployee()">
          Thêm mới nhân viên
        </button>
      </div>

      <div class="main-content">
        <div class="main-search">
          <div class="m-input">
            <input
              type="text"
              class="m-input-text"
              placeholder="Tìm theo mã, tên nhân viên"
            />
            <div class="m-input-icon mi mi-16 mi-search"></div>
          </div>
          <a class="btn-refresh" href="#">
            <div class="mi mi-24 mi-refresh"></div>
          </a>
        </div>
        <div class="main-table">
          <table class="m-table" id="tblEmployee">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    class="m-checkbox"
                    @click="checkAll()"
                    v-model="isCheckAll"
                  />
                </th>
                <th>Mã nhân viên</th>
                <th>Tên nhân viên</th>
                <th>Giới tính</th>
                <th>Ngày sinh</th>
                <th>Số CMND</th>
                <th>Chức danh</th>
                <th>Tên đơn vị</th>
                <th>Số tài khoản</th>
                <th>Tên ngân hàng</th>
                <th>Chi nhánh ngân hàng</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in employees" :key="employee.EmployeeId">
                <th>
                  <input
                    type="checkbox"
                    class="m-checkbox"
                    v-bind:value="employee"
                    v-model="selectedEmployees"
                    @change="updateCheckAll()"
                  />
                </th>
                <td>{{ employee.EmployeeCode }}</td>
                <td>{{ employee.EmployeeName }}</td>
                <td>{{ employee.GenderName }}</td>
                <td>{{ employee.DateOfBirth | formatDate }}</td>
                <td>{{ employee.IdentityNumber }}</td>
                <td>{{ employee.PositionName }}</td>
                <td>{{ employee.DepartmentName }}</td>
                <td>{{ employee.BankAccountNumber }}</td>
                <td>{{ employee.BankName }}</td>
                <td>{{ employee.BankBranchName }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="main-footer">
        <div class="total-item">Tổng số: 1000 bản ghi</div>
        <div class="option"></div>
        <div class="page-size">
          <select name="" id="">
            <option value="">10 bản ghi</option>
            <option value="">20 bản ghi</option>
          </select>
        </div>
        <div class="m-panigation"></div>
      </div>
    </div>
    <!--=========== End Main ===========-->

    <!--=========== Modal ===========-->
    <div class="m-modal-box" v-show="employeeModal">
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
              @click="employeeModal = false"
            ></div>
          </div>
        </div>
        <div class="m-modal-content">
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
                  />
                </div>
                <div style="flex: 1">
                  <label class="m-form-lable" for="">Tên <span> *</span></label>
                  <input
                    type="text"
                    class="m-form-input"
                    v-model="employee.EmployeeName"
                  />
                </div>
              </div>

              <div class="m-form-row">
                <label class="m-form-lable">Đơn vị <span> *</span></label>
                <input
                  type="text"
                  class="m-form-input"
                  v-model="employee.DepartmentId"
                />
              </div>
              <div class="m-form-row">
                <label class="m-form-lable">Chức danh</label>
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
                  <input
                    type="date"
                    class="m-form-input"
                    v-model="employee.DateOfBirth"
                  />
                </div>
                <div class="m-pl-10">
                  <label class="m-form-lable" for="">Giới tính</label>
                  <div class="m-flex-item-center" style="height: 30px">
                    <input type="radio" /><span class="m-pl-10 m-pr-20"
                      >Nam</span
                    >
                    <input type="radio" /><span class="m-pl-10 m-pr-20"
                      >Nữ</span
                    >
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
        </div>
        <div class="m-modal-footer">
          <button class="m-btn m-btn-gray">Huỷ</button>
          <div>
            <button class="m-btn m-btn-gray m-mr-10" @click="onClickSubmit()">
              Cất
            </button>
            <button class="m-btn m-btn-success">Cất và Thêm</button>
          </div>
        </div>
      </div>
      <div class="modal-background"></div>
    </div>
    <!--=========== Modal ===========-->
  </div>
</template>
<script>
import _api from "../../../services/ApiService.js";
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      apiRouter: "/Employees",
      isCheckAll: false,
      selectedEmployees: [],
      employees: [],
      employeeModal: false,
      employee: {
        EmployeeCode: "",
        EmployeeName: "",
        DepartmentId: "",
        PositionId: "",
        Gender: 0,
        DateOfBirth: "",
        PhoneNumber: "",
        TelephoneNumber: "",
        Email: "",
        Address: "",
        IdentityNumber: "",
        IdentityDate: "",
        IdentityPlace: "",
        BankAccountNumber: "",
        BankName: "",
        BankBranchName: "",
      },
    };
  },

  created() {
    this.getData();
  },

  beforeUpdate() {},

  updated() {},

  methods: {
    /**
     * Lấy danh sách nhân viên
     * Author: TheKien(3/12/2021)
     */
    getData() {
      _api
        .get(this.apiRouter)
        .then((response) => {
          this.employees = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    /**
     * Nhấn nút thêm mới nhân viên
     * Author: TheKien(6/12/2021)
     */
    onClickAddEmployee() {
      // Lấy mã nhân viên
      axios
        .get(`http://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode`)
        .then((response) => {
          this.employee.EmployeeCode = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
      // Hiển thị modal
      this.employeeModal = true;
    },

    /**
     * Nhấn nút cất trên form thêm sửa nhân viên
     * Author: TheKien(6/12/2021)
     */
    onClickSubmit() {
      _api
        .create(this.apiRouter, this.employee)
        .then(() => {
          // Ẩn modal
          this.employeeModal = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * Tích nút checkbox all
     * Author: TheKien(6/12/2021)
     */
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.selectedEmployees = [];
      if (this.isCheckAll) {
        // Check all
        for (var key in this.employees) {
          this.selectedEmployees.push(this.employees[key]);
        }
      }
    },
    /**
     * Cập nhật nếu thay đổi checked một hàng
     * Author: TheKien(6/12/2021)
     */
    updateCheckAll() {
      if (this.selectedEmployees.length == this.employees.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
      console.log(this.selectedEmployees)
    },
  },
  filters: {
    /**
     * Format datetime => DD/MM/YYYY
     * Author: TheKien(3/12/2021)
     */
    formatDate: function (value) {
      if (value) return moment(String(value)).format("DD/MM/YYYY");
    },

    /**
     * Format number to money VD: 1000000 => 1.000.000
     * Author: TheKien(3/12/2021)
     */
    formatMoney: function (value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>
<style scoped>
@import url("../../../assets/css/pages/employee.css");
</style>