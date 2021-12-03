<template>
<div>
    <!--=========== CONTENT ===========-->
    <div class="content">
        <div class="content-header m-flex-between">
            <div class="content-title">Nhân viên </div>
            <button class="m-btn" @click="employeeModal=true">Thêm mới nhân viên</button>
        </div>

        <div class="content-main">
            <div class="main-header">
                <div class="m-input">
                    <input type="text" class="m-input-text" placeholder="Tìm theo mã, tên nhân viên" name="" id="">
                    <div class="m-input-icon mi mi-16 mi-search"></div>
                </div>
                <a class="btn-refresh" href="#"><div class="mi mi-24 mi-refresh"></div></a>
            </div>
            <div class="content-table">
                <table class="m-table" id="tblEmployee">
                    <thead>
                        <tr>
                            <th><input type="checkbox" class="m-checkbox"></th>
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
                            <th><input type="checkbox" class="m-checkbox"></th>
                            <td>{{employee.EmployeeCode}}</td>
                            <td>{{employee.FullName}}</td>
                            <td>{{employee.GenderName}}</td>
                            <td>{{employee.DateOfBirth | formatDate}}</td>
                            <td>{{employee.IdentityNumber}}</td>
                            <td>{{employee.PositionName}}</td>
                            <td>{{employee.DepartmentName}}</td>
                            <td>{{employee.Salary | formatMoney}}</td>
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
    
   
     <div class="m-modal-box" v-show="employeeModal">
        <div class="m-modal">
            <div class="m-flex-between">
                <div class="m-modal-header">
                    <div class="m-modal-title">Thêm thông tin nhân viên</div> 
                    <div class="m-modal-checkbox m-flex-item-center">
                        <input type="checkbox" class="m-checkbox"><span style="margin-left: 10px">Là khách hàng</span>
                        <input type="checkbox" class="m-checkbox"><span style="margin-left: 10px">Là nhà cung cấp</span>
                    </div>
                    <div style="flex: 1"></div>
                    
                </div>
                <div class="m-modal-icon m-flex">
                    <div class="mi mi-24 mi-help"></div>
                    <div class="m-modal-close mi mi-24 mi-close" @click="employeeModal=false"></div>
                </div> 
            </div>
             
        </div>
        <div class="modal-background"></div>

    </div>

</div>

</template>
<script>
import axios from 'axios';
import moment from 'moment';
export default {
    data() {
        return {
            employees : [],
            employeeModal: false
        }
    },
    created() {
        axios.get(`http://cukcuk.manhnv.net/api/v1/Employees`)
        .then(response => {
            this.employees = response.data;
            console.log(this.employees)
        })
        .catch(e => {
            alert(e)
        })
    },
    filters: {
        formatDate: function(value) {
            if (value) return moment(String(value)).format('DD/MM/YYYY')
        },
        formatMoney: function(value) {
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    },
    
}
</script>
<style>
    @import url("../../assets/css/common/content.css");
    @import url("../../assets/css/pages/employee.css");
</style>