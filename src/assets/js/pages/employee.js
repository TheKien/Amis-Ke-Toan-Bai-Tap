import _api from "../../../services/ApiService.js";
import moment from "moment";
import EmployeeModal from "../../../components/pages/employee/EmployeeModal.vue";
import BasePopup from "../../../components/base/BasePopup.vue";
import BaseLoading from "../../../components/base/BaseLoading.vue";
import SlidingPagination from "vue-sliding-pagination";
export default {
  components: {
    EmployeeModal: EmployeeModal,
    BasePopup: BasePopup,
    BaseLoading: BaseLoading,
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
      // Loading
      loading: false,
      cols: 0,
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
        EmployeeCode: null,
        EmployeeName: null,
        DepartmentId: null,
        PositionName: null,
        Gender: 1,
        DateOfBirth: null,
        PhoneNumber: null,
        TelephoneNumber: null,
        Email: null,
        Address: null,
        IdentityNumber: null,
        IdentityDate: null,
        IdentityPlace: null,
        BankAccount: null,
        BankName: null,
        BankBranch: null,
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
      this.loading = true;
      this.cols = 12;
      let _this = this;
      // Call api
      _api
        .get(
          `${this.apiRouter}/Filter?pageSize=${this.pageSize}&pageIndex=${this.pageNumber}&searchText=${this.inputSearch}`
        )
        .then((response) => {
          this.employeeList = response.data.Data;
          this.totalRecord = response.data.TotalRecord;
          if (response.data) {
            this.totalPage = response.data.TotalPage;
          } else {
            this.totalPage = 1;
            this.totalRecord = 0;
          }
          setTimeout(()=>{
            _this.cols = 0,
            _this.loading = false;
          } , 0)
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
      // Call api get new EmployeeCode
      this.getEmployeeCodeNew();
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
      let title = `Bạn có chắc chắn muốn xoá nhân viên <${model.EmployeeCode}> không?`;
      // Show popup warning
      this.showPopupWarning(title);
    },

    /**
     * Click button replication employee
     * Author: (26/12/2021)
     */
    onClickReplicationEmployee(id) {
      // Mode update
      this.isCreate = true;
      this.getEmployeeCodeNew();
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
     * Click export excel list employee
     */
    onClickExportExcel() {
      window.open(
        "https://localhost:44375/api/v1/Employees/ExportExcel",
        "_blank"
      );
      // _api
      //   .export(`${this.apiRouter}/ExportExcel`, this.employeeList)
      //   .then(response => {
      //     const url = URL.createObjectURL(new Blob([response.data], {
      //       type: 'application/vnd.ms-excel'
      //   }))
      //   const link = document.createElement('a')
      //   link.href = url
      //   link.setAttribute('download', 'danh-sach')
      //   document.body.appendChild(link)
      //   link.click()
      //   })
      //   .catch((res) => {
      //     console.log(res);
      //   });
    },

    /**
     * Click button delete when checked one or more employees
     * Author: (26/12/2021)
     */
    onclickDeleteSelectEmployee() {
      let _this = this;
      _api
        .deleteMutilple(
          `${this.apiRouter}/DeleteMutilple`,
          this.selectedEmployees
        )
        .then(function () {
          _this.selectedEmployees = [];
          // Load data
          _this.getAllEmployee();
          // Hide popup
          _this.hidePopup(false);
        })
        .catch(function (e) {
          console.log(e);
        });
    },

    onClickRefresh(){
      this.page = 1;
      this.pageSize = 10;
      this.inputSearch = "";
      this.getAllEmployee();
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
     * Click checkbox select all
     * Author: TTKien(6/12/2021)
     */
    onClickCheckAll() {
      this.isCheckAll = !this.isCheckAll;
      this.selectedEmployees = [];
      if (this.isCheckAll) {
        // Check all
        for (var key in this.employeeList) {
          this.selectedEmployees.push(this.employeeList[key].EmployeeId);
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
     * Context menu
     * Author: TTKien (14/12/2021)
     */
    onClickShowBtnDel(id) {
      this.employeeId = id;
      this.showBtnDel = !this.showBtnDel;
    },

    /**
     * Get employee code new
     * Author: TTKien(26/12/2021)
     */
    getEmployeeCodeNew() {
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
     * Change page number
     * Author: TTKien(14/12/2021)
     */
    pageChange(selectedPage) {
      this.pageNumber = selectedPage;
      this.getAllEmployee();
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
     * Reset form modal employee
     * Author: TTKien (14/12/2021)
     */
    resetFormData() {
      this.employee = {
        EmployeeCode: "",
        EmployeeName: "",
        DepartmentId: "",
        PositionName: "",
        Gender: 1,
        DateOfBirth: "",
        PhoneNumber: "",
        TelephoneNumber: "",
        Email: "",
        Address: "",
        IdentityNumber: "",
        IdentityDate: "",
        IdentityPlace: "",
        BankAccount: "",
        BankName: "",
        BankBranch: "",
      };
    },

    /**
     * Show popup question
     * Author: TTKien (14/12/2021)
     */
    showPopupQuestion(title) {
      this.isShowPopup = true;
      this.popup.Status = "Question";
      this.popup.Title = title;
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
      if (value) return moment(String(value)).format("DD/MM/YYYY");
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
