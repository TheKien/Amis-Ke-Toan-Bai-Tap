<template>
       <!--=========== NAVBAR ===========-->
        <div class="navbar">
            <!-- Logo -->
            <div class="logo-container">
                <a href="#" class="toggle-icon"></a>
                <a class="logo" href="#">
                    <img src="../../assets/content/img/Logo_Module_TiengViet_White.66947422.svg" alt="">
                </a>
            </div>
            <!-- End Logo -->

            <!-- Menu -->
            <div class="menu-item-list">
                <router-link to="/employee" class="menu-item">
                    <div class="menu-item-icon">
                        <div class="mi mi-24 mi-sidebar-dashboard"></div>
                    </div>
                    <div class="menu-item-title">Tổng quan</div>
                </router-link>
                <router-link to="/customer" class="menu-item">
                    <div class="menu-item-icon">
                        <div class="mi mi-24 mi-sidebar-cash"></div>
                    </div>
                    <div class="menu-item-title">Tiền mặt</div>
                </router-link>
                <a href="#" class="menu-item">
                    <div class="menu-item-icon">
                        <div class="mi mi-24 mi-sidebar-bank"></div>
                    </div>
                    <div class="menu-item-title">Tiền gửi</div>
                </a>
                <a href="#" class="menu-item">
                    <div class="menu-item-icon">
                        <div class="mi mi-24 mi-sidebar-pu"></div>
                    </div>
                    <div class="menu-item-title">Mua hàng</div>
                </a>
                <a href="#" class="menu-item">
                    <div class="menu-item-icon">
                        <div class="mi mi-24 mi-sidebar-sale"></div>
                    </div>
                    <div class="menu-item-title">Bán hàng</div>
                </a>
                <a href="#" class="menu-item">
                    <div class="menu-item-icon">
                        <div class="mi mi-24 mi-sidebar-invoice"></div>
                    </div>
                    <div class="menu-item-title">Quản lý hoá đơn</div>
                </a>
                <a href="#" class="menu-item">
                    <div class="menu-item-icon">
                        <div class="mi mi-24 mi-sidebar-stock"></div>
                    </div>
                    <div class="menu-item-title">Kho</div>
                </a>
                <a href="#" class="menu-item">
                    <div class="menu-item-icon">
                        <div class="mi mi-24 mi-sidebar-tools"></div>
                    </div>
                    <div class="menu-item-title">Công cụ dụng cụ</div>
                </a>
                <a href="#" class="menu-item">
                    <div class="menu-item-icon">
                        <div class="mi mi-24 mi-sidebar-fixed-assets"></div>
                    </div>
                    <div class="menu-item-title">Tài sản cố định</div>
                </a>
                <a href="#" class="menu-item">
                    <div class="menu-item-icon">
                        <div class="mi mi-24 mi-sidebar-salary"></div>
                    </div>
                    <div class="menu-item-title">Tiền lương</div>
                </a>
                <a href="#" class="menu-item">
                    <div class="menu-item-icon">
                        <div class="mi mi-24 mi-sidebar-tax"></div>
                    </div>
                    <div class="menu-item-title">Thuế</div>
                </a>
                <a href="#" class="menu-item">
                    <div class="menu-item-icon">
                        <div class="mi mi-24 mi-sidebar-price"></div>
                    </div>
                    <div class="menu-item-title">Giá thành</div>
                </a>
                <a href="#" class="menu-item">
                    <div class="menu-item-icon">
                        <div class="mi mi-24 mi-sidebar-general"></div>
                    </div>
                    <div class="menu-item-title">Tổng hợp</div>
                </a>
                <a href="#" class="menu-item">
                    <div class="menu-item-icon">
                        <div class="mi mi-24 mi-sidebar-budget"></div>
                    </div>
                    <div class="menu-item-title">Ngân sách</div>
                </a>
                <a href="#" class="menu-item">
                    <div class="menu-item-icon">
                        <div class="mi mi-24 mi-sidebar-report"></div>
                    </div>
                    <div class="menu-item-title">Báo cáo</div>
                </a>
                <a href="#" class="menu-item">
                    <div class="menu-item-icon">
                        <div class="mi mi-24 mi-sidebar-finance"></div>
                    </div>
                    <div class="menu-item-title">Phân tích tài chính</div>
                </a>
            </div>
            <!-- End Menu -->
        </div>
        <!--=========== END NAVBAR ===========-->
</template>

<script>
</script>

<style>
    @import url("../../assets/css/common/navbar.css");
</style>