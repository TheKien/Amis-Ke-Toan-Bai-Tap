import _api from "../../../services/ApiService.js";
import moment from "moment";
import EmployeeModal from "./EmployeeModal.vue";
import BasePopup from "../../base/BasePopup.vue";
import SlidingPagination from "vue-sliding-pagination";
import Resource from "../../../core/resource.js";

export default {
  components: {
    EmployeeModal: EmployeeModal,
    BasePopup: BasePopup,
    SlidingPagination: SlidingPagination,
  },

  data() {
    return {
      /* Controller */
      apiRouter: "/Employees",
      /*====================  Modal ==================== */
      /*
       * Hiển thị/ ẩn modal nhân viên
       * true - hiện, false - ẩn
       */
      isShowModal: false,
      /**
       * Trạng thái của modal
       * true - Thêm mới, false - Cập nhật
       */
      isCreate: true,
      /*====================  Popun ==================== */
      /**
       * Hiển thị/ ẩn popup
       * true - hiển thị, false - ẩn
       */
      isShowPopup: false,
      /**
       * Nội dung, trạng thái của popup
       * Mode 0 - xoá nhân viên, 1 - Xoá nhiều, 2 - cảnh báo
       */
      popup: {
        Title: null,
        Status: null,
        Mode: 0,
      },
      /*====================  Loading ==================== */
      /**
       * Loading table
       * true - hiển thị, false - ẩn
       */
      loading: false,
      /**
       * Số cột của bảng
       */
      cols: 0,
      /*==================== Dropdown ==================== */
      /**
       * Hiển thị/ ẩn dropdown nhân bản, xoá
       * true - hiển thị, false - ẩn
       */
      showBtnDel: false,
      /**
       * Hiển thị/ ẩn dropdown xoá nhiều
       * true - hiển thị, false - ẩn
       */
      showBtnDelMulti: false,
      /*==================== Check All ==================== */
      /**
       * Hiển thị/ ẩn dropdown nhân bản, xoá
       * true - check hết tất cả, false -  bỏ check tất cả
       */
      isCheckAll: false,
      /**
       * Danh sách nhân viên bị check
       */
      selectedEmployees: [],
      /*==================== Tìm kiếm và phân trang ==================== */
      /**
       * Văn bản tìm kiếm
       */
      inputSearch: "",
      /**
       * Trang hiện tại
       */

      pageNumber: 1,
      /**
       * Số lượng bản ghi trên 1 trang
       */
      pageSize: 10,
      /**
       * Tổng số bản ghi
       */
      totalRecord: 0,
      /**
       * Tổng số trang
       */
      totalPage: 0,
      /*====================  Nhân viên ==================== */
      /**
       * Danh sách nhân viên
       */
      employeeList: [],
      /**
       * Khoá chính nhân viên
       */
      employeeId: "",
      /**
       * 1 đối tượng nhân viên
       */
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
    this.getEmployees();
  },

  methods: {
    /* ==================== Event ==================== */

    /**
     * Lấy tất cả danh sách nhân viên theo từ khoá
     * Author: TTKien(26/12/2021)
     */
    getEmployees() {
      this.callApiFilter();
    },

    /**
     * Nhấn nút thêm mới nhân viên => Hiển thị modal
     * Author: TTKien(6/12/2021)
     */
    onClickAddEmployee() {
      // mode create
      this.isCreate = true;
      // Call api lấy mã nhân viên mới
      this.callApiGetEmployeeCodeNew();
    },

    /**
     * Nhấn nút sửa => Hiển thị modal với thông tin nhân viên đó
     * Author: TTKien(6/12/2021)
     */
    onClickUpdateEmployee(id) {
      // Mode update
      this.isCreate = false;
      this.employeeId = id;
      this.callApiGetEmployeeById(this.employeeId);
      // Hiển thị modal
      setTimeout(() => this.showEmployeeModal(), 0);
    },

    /**
     * Nhấn nút nhân bản => Hiển thị modal
     * Modal hiển thị mã nhân viên mới và thông tin nhân viên đã chọn
     * Author: (26/12/2021)
     */
    onClickReplicationEmployee(id) {
      // Mode create
      this.isCreate = true;
      this.employeeId = id;
      this.callApiGetEmployeeCodeNew();
      this.callApiGetEmployeeById(this.employeeId);
      // Hiển thị modal
      setTimeout(() => this.showEmployeeModal(), 0);
    },

    /**
     * Nhấn nút xoá nhân viên => hiển thị popup cảnh báo
     * Author: TTKien (14/12/2021)
     */
    onClickDeleteEmployee(model) {
      this.employeeId = model.EmployeeId;
      let title = Resource.PopUp.TitleWithParam(model.EmployeeCode);
      let status = Resource.PopUp.Status.Warning;
      let mode = Resource.PopUp.Mode.Delete;
      this.showPopup(title, status, mode);
    },

    /**
     * Nhấn nút xoá nhiều => Hiển thị popup cảnh báo
     * Author: (26/12/2021)
     */
    onClickDeleteMutilpleEmployee() {
      let title = Resource.PopUp.Title.DeleteMultiple;
      let status = Resource.PopUp.Status.Warning;
      let mode = Resource.PopUp.Mode.DeleteMultiple;
      this.showPopup(title, status, mode);
    },

    /**
     * Nhấn biểu tượng excel => Đẩy ra trang khác để download file
     * Author: (26/12/2021)
     */
    onClickExportExcel() {
      window.open(
        "https://localhost:44375/api/v1/Employees/ExportExcel",
        "_blank"
      );
    },

    /**
     * Nhấn icon refresh => load lại toàn bộ table và phân trang
     *
     */
    onClickRefresh() {
      this.pageNumber = 1;
      this.pageSize = 10;
      this.inputSearch = "";
      this.getEmployees();
    },

    /**
     * Nhấn nút checkbox all.
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
     * Hiển thị dropdown xoá.
     * Author: TTKien (14/12/2021)
     */
    onClickShowBtnDel(id) {
      this.employeeId = id;
      setTimeout(() => (this.showBtnDel = !this.showBtnDel), 0);
    },

    /**
     * Thay đổi trang hiện tại
     * @param {*} selectedPage Trang hiện tại
     * Author: TTKien(14/12/2021)
     */
    onChangePageNumber(selectedPage) {
      this.pageNumber = selectedPage;
      this.getEmployees();
    },

    /**
     * Cập nhật danh sách nhân viên khi thay đổi checkbox.
     * Author: TTKien(6/12/2021)
     */
    onChangeCheckBoxEmployee() {
      if (this.selectedEmployees.length == this.employeeList.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
    },

    /**
     * Combobox thay đổi số lượng bản ghi trên 1 trang
     * Author: TTKien(27/12/2021)
     */
    onClickShowCbxPagesize() {},

    /* ==================== Call Api ==================== */

    /**
     * Tìm kiếm theo từ khoá và phân trang.
     * Author: TTKien(27/12/2021)
     */
    callApiFilter() {
      let _this = this;
      // Loading
      this.loading = true;
      this.cols = 11;
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
          setTimeout(() => {
            // Ẩn loading
            (_this.cols = 0), (_this.loading = false);
          }, 0);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    /**
     * Gọi api xoá những nhân viên đã chọn
     * Author(26/12/2021)
     */
    callApiDeleteMutilpleEmployee() {
      let _this = this;
      _api
        .deleteMutilple(
          `${this.apiRouter}/DeleteMutilple`,
          this.selectedEmployees
        )
        .then(function () {
          _this.selectedEmployees = [];
          // Load data
          _this.getEmployees();
          // Ẩn popup
          _this.hidePopup(false);
          // Ẩn dropdown
          _this.closeDropDown;
        })
        .catch(function (e) {
          console.log(e);
        });
    },

    /**
     * Gọi api xoá nhân viên đã chọn
     * Author: TTKien (9/12/2021)
     */
    callApiDeleteEmployee() {
      let _this = this;
      _api
        .delete(this.apiRouter, this.employeeId)
        .then(function () {
          // Load lại table
          _this.getEmployees();
          // Ẩn popup
          _this.hidePopup(false);
          // Ẩn dropdown
          _this.closeDropDown;
        })
        .catch(function (e) {
          console.log(e);
        });
    },

    /**
     * Gọi api lấy mã nhân viên mới.
     * Author: TTKien(26/12/2021)
     */
    callApiGetEmployeeCodeNew() {
      _api
        .get(`${this.apiRouter}/NewEmployeeCode`)
        .then((response) => {
          this.employee.EmployeeCode = response.data;
          // Hiển thị modal
          this.showEmployeeModal();
        })
        .catch((res) => {
          console.log(res);
        });
    },

    /**
     * Lấy nhân viên theo khoá chính
     * @param {*} id Khoá chính
     * Author: TTKien(26/12/2021)
     */
    callApiGetEmployeeById(id) {
      _api
        .get(`${this.apiRouter}/${id}`)
        .then((response) => {
          this.employee = response.data;
          this.employee.DateOfBirth = this.formatDateYYYYMMDD(
            this.employee.DateOfBirth
          );
          this.employee.IdentityDate = this.formatDateYYYYMMDD(
            this.employee.IdentityDate
          );
        })
        .catch((res) => {
          console.log(res);
        });
    },

    /* ==================== Show/Hide ==================== */

    /**
     * Hiển thị modal nhân viên
     * Author: TTKien(6/12/2021)
     */
    showEmployeeModal() {
      this.isShowModal = true;
    },

    /**
     * Ẩn modal nhân viên
     * Author: TTKien(6/12/2021)
     */
    hideEmployeeModal() {
      this.isShowModal = false;
    },

    /**
     * Hiển thị popup
     * @param {*} title văn bản thông báo
     * @param {*} status Trạng thái popup
     * @param {*} mode Trạng thái popup
     * Author: TTKien (28/12/2021)
     */
    showPopup(title, status, mode = null) {
      this.isShowPopup = true;
      this.popup.Status = status;
      this.popup.Title = title;
      this.popup.Mode = mode;
    },

    /**
     * Ẩn tất cả popup
     * Author: TTKien (14/12/2021)
     */
    hidePopup() {
      this.isShowPopup = false;
      this.popup.Status = "";
      this.popup.Title = "";
    },

    /* ==================== Other ==================== */
    /**
     * Reset form nhân viên
     * Author: TTKien (14/12/2021)
     */
    resetFormEmployee() {
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

    closeDropDown() {
      setTimeout(() => {
        this.showBtnDel = false;
        this.showBtnDelMulti = false;
      }, 100);
    },
    /* ==================== Convert Value ==================== */

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
     * Gõ vào ô tìm kiếm => tìm kiếm nhân viên theo từ khoá
     * Author: TTKien(14/12/2021)
     */
    inputSearch() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.pageNumber = 1;
        this.getEmployees();
      }, 2000);
    },

    /**
     * Thay đổi số bản ghi hiện trên 1 trang
     * Author: TTKien(14/12/2021)
     */
    pageSize() {
      this.pageNumber = 1;
      this.getEmployees();
    },

    /**
     * Tắt dropdown khi id thay đổi
     */
    employeeId() {
      this.showBtnDelMulti = false;
      this.showBtnDel = false;
    },

    /**
     * Tắt dropdown khi danh sách nhân viên bị check thay đổi
     */
    selectedEmployees() {
      this.showBtnDel = false;
      this.showBtnDelMulti = false;
    },
  },
};
