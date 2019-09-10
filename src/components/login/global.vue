<script>
    // pre.js
    var register_judge = {
        phone: false,
        password1: false,
        password2: false,
        code: false,
        accept: false,
        identity: "用户"
    }
    var user_msg = {
        userInfo: {
            // 头像的url地址
            avatar: "",
            // user表中的主键id
            uid: "",
            // 姓名
            name: "",
            // 性别
            gender: "男",
            // 生日
            birthday: "",
            // 身份证号码
            identityCard: "",
            // 身份证图片的url地址
            identityCardPicture: "",
            // 注册身份(司机或用户)
            role: ""
        },
        area: {
            uid: "",
            // 省名
            province: "",
            // 市名
            city: "",
            // 区名
            district: "",
            // 注意： 只能传 "1"，表示为用户注册填写的所属地址
            status: "1"
        },
        driverInfo: {
            // 汽车类型(司机特有字段)
            carType: "",
            // 路线描述(如果汽车类型为客运车)(司机特有字段)
            runningRoute: "",
            // 驾驶证的url地址(司机特有字段)
            drivingLicencePicture: "",
            // 汽车照片的url地址(司机特有字段)
            carPicture: ""
        }
    }
    //用户id存放
    var user_id = undefined;
    //验证码存储
    var user_code = {
        data: ""
    }
    //用户身份选择
    var user_r_msg = {
        status: ""
    }
    export default {
        register_judge, //用户输入信息状态
        user_msg,   //用户id存放
        user_id,    //验证码存储
        user_code,  //用户身份选择
        user_r_msg, //用户身份选择
    }


    var l_user = {



    }
</script>