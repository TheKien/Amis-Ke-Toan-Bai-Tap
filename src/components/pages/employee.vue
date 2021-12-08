<template>
  <div>
    <!--=========== CONTENT ===========-->
    <div class="content">
      <div class="content-header m-flex-between">
        <div class="content-title">Nhân viên</div>
        <button class="m-btn m-btn-success" @click="onClickAddEmployee()">
          Thêm mới nhân viên
        </button>
      </div>

      <div class="content-main">
        <div class="main-header">
          <div class="m-input">
            <input type="text" class="m-input-text" placeholder="Tìm theo mã, tên nhân viên" />
            <div class="m-input-icon mi mi-16 mi-search"></div>
          </div>
          <a class="btn-refresh" href="#">
              <div class="mi mi-24 mi-refresh"></div>
            </a>
        </div>
        <div class="content-table">
          <table class="m-table" id="tblEmployee">
            <thead>
              <tr>
                <th><input type="checkbox" class="m-checkbox" /></th>
                <th>Mã nhân viên</th>
                <th>Tên nhân viên</th>
                <th>Giới tính</th>
                <th>Ngày sinh</th>
                <th>Số CMND</th>
                <th>Chức danh</th>
                <th>Tên đơn vị</th>
                <th>Lương cơ bản</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in employees" :key="employee.EmployeeId">
                <th><input type="checkbox" class="m-checkbox" /></th>
                <td>{{ employee.EmployeeCode }}</td>
                <td>{{ employee.FullName }}</td>
                <td>{{ employee.GenderName }}</td>
                <td>{{ employee.DateOfBirth | formatDate }}</td>
                <td>{{ employee.IdentityNumber }}</td>
                <td>{{ employee.PositionName }}</td>
                <td>{{ employee.DepartmentName }}</td>
                <td>{{ employee.Salary | formatMoney }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="content-footer">
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
    <!--=========== END CONTENT ===========-->

    <!--=========== Modal ===========-->
    <div class="m-modal-box" v-show="employeeModal">
      <div class="m-modal">
        <div class="m-flex-between">
          <div class="m-modal-header">
            <div class="m-modal-title">Thêm thông tin nhân viên</div>
            <div class="m-modal-checkbox m-flex-item-center">
              <input type="checkbox" class="m-checkbox" /><span style="margin-left: 10px">Là khách hàng</span>
              <input type="checkbox" class="m-checkbox" /><span style="margin-left: 10px">Là nhà cung cấp</span>
            </div>
          </div>
          <div class="m-modal-icon m-flex">
            <div class="mi mi-24 mi-help"></div>
            <div  class="m-modal-close mi mi-24 mi-close" @click="employeeModal = false"></div>
          </div>
        </div>
        <div class="m-modal-content">
          <div class="m-flex m-pb-12">
            <div class="m-pr-26 m-form-group">
              <div class="m-form-row m-flex">
                <div class="m-pr-6">
                  <label class="m-lable" for="">Mã <span> *</span></label>
                  <input  type="text" class="m-form-input" style="width: 150px" v-model="EmployeeCode" />
                </div>
                <div style="flex: 1">
                  <label class="m-lable" for="">Tên <span> *</span></label>
                  <input type="text" class="m-form-input" v-model="FullName" />
                </div>
              </div>

              <div class="m-form-row">
                <label class="m-lable">Đơn vị <span> *</span></label>
                <input type="text" class="m-form-input" v-model="DepartmentId" />
              </div>
              <div class="m-form-row">
                <label class="m-lable">Chức danh</label>
                <input type="text" class="m-form-input" v-model="PositionId" />
              </div>
            </div>
            <div class="m-form-group">
              <div class="m-form-row m-flex">
                <div class="m-pr-6">
                  <label class="m-lable" for="">Ngày sinh</label>
                  <input type="date" class="m-form-input" v-model="DateOfBirth" />
                </div>
                <div class="m-pl-10">
                  <label class="m-lable" for="">Giới tính</label>
                  <div class="m-flex-item-center" style="height: 30px">
                    <input type="radio" /><span class="m-pl-10 m-pr-20">Nam</span>
                    <input type="radio" /><span class="m-pl-10 m-pr-20" >Nữ</span>
                  </div>
                </div>
              </div>

              <div class="m-form-row m-flex">
                <div class="m-pr-6" style="flex: 1">
                  <label class="m-lable" for="">Số CMND</label>
                  <input type="text" class="m-form-input" v-model="IdentityNumber" />
                </div>
                <div>
                  <label class="m-lable" for="">Ngày cấp</label>
                  <input type="date" class="m-form-input" v-model="IdentityDate" />
                </div>
              </div>
              <div class="m-form-row">
                <label class="m-lable" for="">Nơi cấp</label>
                <input type="text" class="m-form-input" v-model="IdentityPlace" />
              </div>
            </div>
          </div>
          <div class="m-form-row">
            <label class="m-lable" for="">Địa chỉ</label>
            <input type="text" class="m-form-input" v-model="Address" />
          </div>
          <div class="m-form-row m-flex">
            <div class="m-pr-6">
              <label class="m-lable" for="">ĐT di động</label>
              <input type="text" class="m-form-input" v-model="PhoneNumber" />
            </div>
            <div class="m-pr-6">
              <label class="m-lable" for="">ĐT cố định</label>
              <input type="text" class="m-form-input" />
            </div>
            <div>
              <label class="m-lable" for="">Email</label>
              <input type="text" class="m-form-input" v-model="Email" />
            </div>
          </div>
          <div class="m-form-row m-flex">
            <div class="m-pr-6">
              <label class="m-lable" for="">Tài khoản ngân hàng</label>
              <input type="text" class="m-form-input" />
            </div>
            <div class="m-pr-6">
              <label class="m-lable" for="">Tên ngân hàng</label>
              <input type="text" class="m-form-input" />
            </div>
            <div>
              <label class="m-lable" for="">Chi nhánh</label>
              <input type="text" class="m-form-input" />
            </div>
          </div>
        </div>
        <div class="m-modal-footer">
          <button class="m-btn m-btn-gray">Huỷ</button>
          <div>
            <button class="m-btn m-btn-gray m-mr-10" @click="onClickSubmit()">Cất</button>
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
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
        employees: [],
        employeeModal: false,
        EmployeeCode:'',
        FullName:'',
        DepartmentId:'',
        PositionId:'',
        Gender:0,
        DateOfBirth:'',
        PhoneNumber:'',
        Email:'',
        Address:'',
        IdentityNumber:'',
        IdentityDate:'',
        IdentityPlace:'',
    };
  },

  created() {
    this.getData();
  },

  beforeUpdate() {
    
  },

  updated() {

  },

  methods: {
    /**
     * Lấy danh sách nhân viên
     * Author: TheKien(3/12/2021)
     */
    getData() {
      axios
        .get(`http://cukcuk.manhnv.net/api/v1/Employees`)
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
          this.EmployeeCode = response.data;
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
        let employee = {
            EmployeeCode: this.EmployeeCode,
            FullName: this.FullName,
            DepartmentId: this.DepartmentId,
            PositionId: this.PositionId,
            Gender:this.Gender,
            DateOfBirth: this.DateOfBirth,
            PhoneNumber: this.PhoneNumber,
            Email: this.Email,
            Address: this.Address,
            IdentityNumber: this.IdentityNumber,
            IdentityDate: this.IdentityDate,
            IdentityPlace: this.IdentityPlace,
        };
        axios.post(`http://cukcuk.manhnv.net/api/v1/Employees`, employee)
          .then(() => {
              // Ẩn modal
              this.employeeModal = true;
        })
        .catch((e) => {
          console.log(e);
        });
    }
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
<style>
@import url("../../assets/css/common/content.css");
@import url("../../assets/css/pages/employee.css");
</style>