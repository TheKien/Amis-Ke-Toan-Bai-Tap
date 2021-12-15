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
      pageSize: 5,
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
     * Lấy danh sách nhân viên
     * Author: TheKien(3/12/2021)
     */
    getAllEmployee() {
      // Gọi Api
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
    pageChange(selectedPage) {
      this.pageNumber = selectedPage;
      this.getAllEmployee();
    },
    /**
     * Nhấn nút thêm mới nhân viên và hiển thị modal
     * Author: TheKien(10/12/2021)
     */
    onClickAddEmployee() {
      // mode là thêm mới
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
        // Gọi api lấy mã nhân viên mới
        _api
          .get(`${this.apiRouter}/NewEmployeeCode`)
          .then((response) => {
            this.employee.EmployeeCode = response.data;
            this.showEmployeeModal();
          })
          .catch((res) => {
            console.log(res);
          });
    },

    /**
     * Nhấn nút sửa nhân viên và hiển thị modal
     * Author: TheKien(6/12/2021)
     */
    onClickUpdateEmployee(id) {
      // mode là sửa
      this.isCreate = false;
      // Lấy đối tượng chọn
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
          // Hiển thị modal
          this.showEmployeeModal();
        })
        .catch((res) => {
          console.log(res);
        });
    },

    /**
     * Hiển thị modal
     * Author: TheKien(6/12/2021)
     */
    showEmployeeModal() {
      this.isShowModal = true;
    },

    /**
     * Ẩn modal
     * Author: TheKien(6/12/2021)
     */
    hideEmployeeModal() {
      this.isShowModal = false;
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
        for (var key in this.employeeList) {
          this.selectedEmployees.push(this.employeeList[key]);
        }
      }
    },

    /**
     * Cập nhật nếu chọn hoặc bỏ chọn một nhân viên
     * Author: TheKien(6/12/2021)
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
     * Hiển thị thông báo cảnh báo
     * Author: TheKien (14/12/2021)
     */
    showPopupWarning(title) {
      this.isShowPopup = true;
      this.popup.Status = "Warning";
      this.popup.Title = title;
    },

    /**
     * Hiển thị thông báo nguy hiểm
     * Author: TheKien (14/12/2021)
     */
    showPopupDanger(title) {
      this.isShowPopup = true;
      this.popup.Status = "Danger";
      this.popup.Title = title;
    },
    /**
     * Ẩn popup
     * Author: TheKien (14/12/2021)
     */
    hidePopup() {
      this.isShowPopup = false;
      this.popup.Status = "";
      this.popup.Title = "";
    },
    /**
     * Click nút xoá nhân viên
     * Author: TheKien (14/12/2021)
     */
    onClickDeleteEmployee(model) {
      this.employeeId = model.EmployeeId;
      let title = `Bạn có chắc chắn muốn xoá Nhân viên <${model.EmployeeCode}> không?`;
      // show popup confirm
      this.showPopupWarning(title);
    },

    /**
     * Xoá nhân viên đã chọn
     * Author: TheKien (9/12/2021)
     */
    deleteEmployee() {
      let _this = this;
      // call api to delete an employee
      _api
        .delete(this.apiRouter, this.employeeId)
        .then(function () {
          // load data
          _this.getAllEmployee();
          // Hide popup confirm
          _this.hidePopup(false);
        })
        .catch(function (e) {
          console.log(e);
        });
    },
    /**
     * Chuyển dạng datetime thành YYYY-MM-DD
     * Author: TheKien (10/12/2021)
     */
    formatDateYYYYMMDD(dateTime) {
      if (dateTime) {
        var date = new Date(dateTime);
        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        return date.getFullYear() + "-" + month + "-" + day;
      }
    },
    onClickShowBtnDel(id) {
      this.employeeId = id;
      this.showBtnDel = !this.showBtnDel;
    }
  },
  filters: {
    /**
     * Chuyển dạng datetime thành DD-MM-YYYY
     * Author: TheKien(3/12/2021)
     */
    formatDateDDMMYYYY(value) {
      if (value) return moment(String(value)).format("DD-MM-YYYY");
    },

    /**
     * Format number to money VD: 1000000 => 1.000.000
     * Author: TheKien(3/12/2021)
     */
    formatMoney(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
  watch: {
    inputSearch() {
      this.getAllEmployee();
    },
    pageSize() {
      this.pageNumber = 1;
      this.getAllEmployee();
    }
  },
};
