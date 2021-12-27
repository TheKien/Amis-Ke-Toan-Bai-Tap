let Resource = {
    Message: {
        ValidateNotValid:{
            EmployeeCodeIsEmpty: "Mã nhân viên không được để trống",
            EmployeeNameIsEmpty: "Tên không được để trống",
            DepartmentIsEmpty: "Đơn vị không được để trống",
            EmployeeCodeIsNotAvailable: "Mã nhân viên này đã tồn tại trong hệ thống, vui lòng kiểm tra lại !",
            DateOfBirthError: "Ngày sinh không được vượt quá ngày hiện tại",
            EmailError: "Email không đúng định dạng",
            IndentityDateError: "Ngày cấp CMND/thẻ căn cước không được vượt quá ngày hiện tại",
            IdentityNumberError: "Số CMND/thẻ căn cước không đúng định dạng",
            PhoneNumberError: "Số điện thoại phải có 10 số",
        },
        Warning:"Có lỗi sảy ra vui lòng gọi MISA để nhận trợ giúp !"
    },
    PopUp:{
        Status:{
            Danger: "Danger",
            Warning: "Warning",
            Question: "Question"
        },
        Title:{
            DeleteMultiple: "Bạn có chắc chắn muốn xoá các nhân viên đã chọn không?",
            Delete: "Bạn có chắc chắn muốn xoá nhân viên không?",
            Question: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?"
        },
        Mode:{
            Delete: 0,
            DeleteMultiple: 1,
            Warning: 2,
        },
        TitleWithParam (param){ return `Bạn có chắc chắn muốn xoá nhân viên <${param}> không?`}
    }
}

export default Resource;