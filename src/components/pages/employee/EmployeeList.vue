<template>
  <!--=========== Main ===========-->
  <div>
    <div class="main">
      <!--===== Main header =====-->
      <div class="main-header m-flex-between">
        <div class="main-title">Nhân viên</div>
        <!-- Button create -->
        <button class="m-btn m-btn-success" @click="onClickAddEmployee()">
          Thêm mới nhân viên
        </button>
      </div>
      <!--===== End main header =====-->

      <!--===== Main content =====-->
      <div class="main-content">
        <div class="main-search">
          <!-- Input search -->
          <div class="m-input">
            <input
              type="text"
              class="m-input-text"
              placeholder="Tìm theo mã, tên nhân viên"
              v-model="inputSearch"
            />
            <div class="m-input-icon mi mi-16 mi-search"></div>
          </div>
          <a class="btn-refresh" href="#">
            <div class="mi mi-24 mi-refresh"></div>
          </a>
        </div>
        <!-- Table -->
        <div class="main-table">
          <table class="m-table" id="tblEmployee">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    class="m-checkbox"
                    @click="onClickCheckAll()"
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
              <tr v-for="employee in employeeList" :key="employee.EmployeeId">
                <td style="position: sticky">
                  <input
                    type="checkbox"
                    class="m-checkbox"
                    v-bind:value="employee"
                    v-model="selectedEmployees"
                    @change="updateCheckAll()"
                  />
                </td>
                <td>{{ employee.EmployeeCode }}</td>
                <td>{{ employee.EmployeeName }}</td>
                <td>{{ employee.GenderName }}</td>
                <td>{{ employee.DateOfBirth | formatDateDDMMYYYY }}</td>
                <td>{{ employee.IdentityNumber }}</td>
                <td>{{ employee.EmployeePosition }}</td>
                <td>{{ employee.DepartmentName }}</td>
                <td>{{ employee.BankAccountNumber }}</td>
                <td>{{ employee.BankName }}</td>
                <td>{{ employee.BankBranchName }}</td>
                <td>
                  <div class="m-flex-item-center">
                    <div
                      class="m-btn-edit"
                      @click="onClickUpdateEmployee(employee.EmployeeId)"
                    >
                      Sửa
                    </div>
                    <div
                      class="m-dropdown"
                      :class="{
                        'm-dropdown-active':
                          showBtnDel && employeeId === employee.EmployeeId,
                      }"
                      @click="onClickShowBtnDel(employee.EmployeeId)"
                    >
                      <div class="mi mi-14 mi-arrow-up--blue"></div>
                      <div class="m-dropdown-list">
                        <div class="m-dropdown-item">Nhân bản</div>
                        <div
                          class="m-dropdown-item"
                          @click="onClickDeleteEmployee(employee)"
                        >
                          Xóa
                        </div>
                        <div class="m-dropdown-item">Ngừng sử dụng</div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- End table -->
      </div>
      <!--===== End main content =====-->

      <!--===== Main footer =====-->
      <div class="main-footer">
        <div class="total-item">Tổng số: {{ totalRecord }} bản ghi</div>
        <div class="option"></div>
        <!-- Combobox change page size -->
        <div class="page-size">
          <select name="" id="" v-model="pageSize">
            <option value="10">10 bản ghi trên trang</option>
            <option value="20">20 bản ghi trên trang</option>
            <option value="30">30 bản ghi trên trang</option>
            <option value="50">50 bản ghi trên trang</option>
            <option value="100">100 bản ghi trên trang</option>
          </select>
        </div>
        <!-- Pagination -->
        <div class="m-panigation">
          <sliding-pagination
            :current="pageNumber"
            :total="totalPage"
            @page-change="pageChange"
            :slidingEndingSize="1"
            :slidingWindowSize="3"
            :nonSlidingSize="3"
          ></sliding-pagination>
        </div>
      </div>
      <!--===== End main footer =====-->
    </div>
    <!--=========== End Main ===========-->

    <!--=========== Modal ===========-->
    <employee-modal
      :apiRouter="apiRouter"
      :isShowModal="isShowModal"
      :isCreate="isCreate"
      :employee="employee"
      :employeeId="employeeId"
      @hideEmployeeModal="hideEmployeeModal"
      @getAllEmployee="getAllEmployee"
      @showPopupDanger="showPopupDanger"
    ></employee-modal>
    <!--=========== End Modal ===========-->

    <!--=========== Popup ===========-->
    <base-popup
      :isShowPopup="isShowPopup"
      :popup="popup"
      @onClickClosePopup="hidePopup"
      @onClickComfirm="deleteEmployee"
    ></base-popup>
    <!--=========== End Popup ===========-->
  </div>
</template>

<!-- SCRIPT -->
<script src="../../../assets/js/pages/employee.js"></script>
<!-- SCRIPT -->

<!-- CSS -->
<style scoped>
@import url("../../../assets/css/pages/employee.css");
</style>
<!-- CSS -->