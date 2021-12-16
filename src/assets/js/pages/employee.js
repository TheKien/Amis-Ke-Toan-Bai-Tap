import _api from "../../../services/ApiService.js";
import moment from "moment";
import EmployeeModal from "../../../components/pages/employee/EmployeeModal.vue";
import BasePopup from "../../../components/base/BasePopup.vue";
import SlidingPagination from "vue-sliding-pagination";
export default {
  components: {
    EmployeeModal: EmployeeModal,
    BasePopup: BasePopup,
    SlidingPagination: SlidingPagination,
  },

  data() {
    return {
      // controller
      apiRouter: "/Employees",
      // Modal
      isShowModal: false,
      isCreate: true,
      // Popup
      isShowPopup: false,
      popup: {
        Title: "",
        Status: "",
      },
      // Dropdown
      showBtnDel: false,
      // Check all
      isCheckAll: false,
      selectedEmployees: [],
      // Search
      inputSearch: "",
      // Pagination
      pageNumber: 1,
      pageSize: 10,
      totalRecord: 0,
      totalPage: 0,
      // Employee
      employeeList: [],
      employeeId: "",
      employee: {
        EmployeeCode: "",
        EmployeeName: "",
        DepartmentId: "",
        EmployeePosition: "",
        Gender: 1,
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
    this.getAllEmployee();
  },

  methods: {
    /**
     * Get all employee
     * Author: TTKien(3/12/2021)
     */
    getAllEmployee() {
      // Call api
      _api
        .get(
          `${this.apiRouter}/filter?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&employeeFilter=${this.inputSearch}`
        )
        .then((response) => {
          this.employeeList = response.data.Data;
          this.totalRecord = response.data.TotalRecord;
          this.totalPage = response.data.TotalPage;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    /**
     * Click button create employee
     * Author: TTKien(6/12/2021)
     */
    onClickAddEmployee() {
      // mode create
      this.isCreate = true;
      // reset form
      (this.employee = {
        EmployeeCode: "",
        EmployeeName: "",
        DepartmentId: "",
        EmployeePosition: "",
        Gender: 1,
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
      }),
        // Call api get new EmployeeCode
        _api
          .get(`${this.apiRouter}/NewEmployeeCode`)
          .then((response) => {
            this.employee.EmployeeCode = response.data;
            // Show modal
            this.showEmployeeModal();
          })
          .catch((res) => {
            console.log(res);
          });
    },

    /**
     * Click button update employee
     * Author: TTKien(6/12/2021)
     */
    onClickUpdateEmployee(id) {
      // Mode update
      this.isCreate = false;
      // Call api get employee by id
      this.employeeId = id;
      _api
        .get(`${this.apiRouter}/${this.employeeId}`)
        .then((response) => {
          this.employee = response.data;
          this.employee.DateOfBirth = this.formatDateYYYYMMDD(
            this.employee.DateOfBirth
          );
          this.employee.IdentityDate = this.formatDateYYYYMMDD(
            this.employee.IdentityDate
          );
          // Show modal
          this.showEmployeeModal();
        })
        .catch((res) => {
          console.log(res);
        });
    },

    /**
     * Click button delete employee
     * Author: TTKien (14/12/2021)
     */
    onClickDeleteEmployee(model) {
      this.employeeId = model.EmployeeId;
      let title = `Bạn có chắc chắn muốn xoá Nhân viên <${model.EmployeeCode}> không?`;
      // Show popup warning
      this.showPopupWarning(title);
    },

    /**
     * Delete an employee
     * Author: TTKien (9/12/2021)
     */
    deleteEmployee() {
      let _this = this;
      // Call api to delete an employee
      _api
        .delete(this.apiRouter, this.employeeId)
        .then(function () {
          // Load data
          _this.getAllEmployee();
          // Hide popup
          _this.hidePopup(false);
        })
        .catch(function (e) {
          console.log(e);
        });
    },

    /**
     * Change page number
     * Author: TTKien(14/12/2021)
     */
    pageChange(selectedPage) {
      this.pageNumber = selectedPage;
      this.getAllEmployee();
    },

    /**
     * Context menu
     * Author: TTKien (14/12/2021)
     */
    onClickShowBtnDel(id) {
      this.employeeId = id;
      this.showBtnDel = !this.showBtnDel;
    },

    /**
     * Click checkbox select all
     * Author: TTKien(6/12/2021)
     */
    onClickCheckAll() {
      this.isCheckAll = !this.isCheckAll;
      this.selectedEmployees = [];
      if (this.isCheckAll) {
        // Check all
        for (var key in this.employeeList) {
          this.selectedEmployees.push(this.employeeList[key]);
        }
      }
    },

    /**
     * Update selected list if change selected emoloyee
     * Author: TTKien(6/12/2021)
     */
    updateCheckAll() {
      if (this.selectedEmployees.length == this.employeeList.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
      console.log(this.selectedEmployees);
    },

    /**
     * Show modal employee
     * Author: TTKien(6/12/2021)
     */
    showEmployeeModal() {
      this.isShowModal = true;
    },

    /**
     * Hide modal employee
     * Author: TTKien(6/12/2021)
     */
    hideEmployeeModal() {
      this.isShowModal = false;
    },

    /**
     * Show popup warning
     * Author: TTKien (14/12/2021)
     */
    showPopupWarning(title) {
      this.isShowPopup = true;
      this.popup.Status = "Warning";
      this.popup.Title = title;
    },

    /**
     * Show popup danger
     * Author: TTKien (14/12/2021)
     */
    showPopupDanger(title) {
      this.isShowPopup = true;
      this.popup.Status = "Danger";
      this.popup.Title = title;
    },

    /**
     * Hide popup
     * Author: TTKien (14/12/2021)
     */
    hidePopup() {
      this.isShowPopup = false;
      this.popup.Status = "";
      this.popup.Title = "";
    },

    /**
     * Format datetime to YYYY-MM-DD
     * Author: TTKien (10/12/2021)
     */
    formatDateYYYYMMDD(dateTime) {
      if (dateTime) {
        var date = new Date(dateTime);
        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        return date.getFullYear() + "-" + month + "-" + day;
      }
    },
  },
  filters: {
    /**
     * Format datetime to DD-MM-YYYY
     * Author: TTKien(3/12/2021)
     */
    formatDateDDMMYYYY(value) {
      if (value) return moment(String(value)).format("DD-MM-YYYY");
    },

    /**
     * Format number to money VD: 1000000 => 1.000.000
     * Author: TTKien(3/12/2021)
     */
    formatMoney(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
  watch: {
    /**
     * Type input search
     * Author: TTKien(14/12/2021)
     */
    inputSearch() {
      this.getAllEmployee();
    },

    /**
     * Change page size
     * Author: TTKien(14/12/2021)
     */
    pageSize() {
      this.pageNumber = 1;
      this.getAllEmployee();
    },
  },
};
