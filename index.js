//簡化寫法
function $id(id) {
    return document.getElementById(id);
}

function doFirst() {

    //年月下拉式選單
    var allinfo = yearMonth();
    var t = new Date();
    var n = t.getMonth() + 1;
    var nowMonth = t.getFullYear() + "年" + n + "月";
    $(".dateinfo").append("<option value='" + nowMonth + "'>" + nowMonth + "</option>");
    for (i = 0; i < allinfo.length; i++) {
        $(".dateinfo").append("<option value='" + allinfo[i] + "'>" + allinfo[i] + "</option>");
    }


    $('#myProvince_resident').change(function() {
        fillCity_resident();
    });
    $('#myCity_resident').change(function() {
        fillArea_resident();
    });
    $('#myArea_resident').change(function() {
        $('#address_resident').html($('#myProvince_resident option:selected').text() + $('#myCity_resident option:selected').text() + $('#myArea_resident option:selected').text());
        $('#addressOne').show();
    });

    $('#myProvince_home').change(function() {
        fillCity_home();
    });
    $('#myCity_home').change(function() {
        fillArea_home();
    });
    $('#myArea_home').change(function() {
        $('#address_home').html($('#myProvince_home option:selected').text() + $('#myCity_home option:selected').text() + $('#myArea_home option:selected').text());
        $('#addressTwo').show();
    });
    $('#myProvince_eme').change(function() {
        fillCity_eme();
    });
    $('#myCity_eme').change(function() {
        fillArea_eme();
    });
    $('#myArea_eme').change(function() {
        $('#address_eme').html($('#myProvince_eme option:selected').text() + $('#myCity_eme option:selected').text() + $('#myArea_eme option:selected').text());
        $('#addressThree').show();
    });
    $('#userIdCheck').click(function() {
        checkUserId();
    });

    $('#sameAddress').click(function() {
        if ($('#addressOne').val() == '') {
            alert("請输入地址");
            this.checked = false;
        } else {
            if (this.checked) {
                $('#myProvince_home').hide();
                $('#myCity_home').hide();
                $('#myArea_home').hide();
                $('#address_home').html($('#myProvince_resident option:selected').text() + $('#myCity_resident option:selected').text() + $('#myArea_resident option:selected').text());
                $('#addressTwo').show();
                $('#addressTwo').val($('#addressOne').val());
                $('#addressTwo').attr('disabled', true);
            } else {
                openHome();
            }
        }
    });

    //新增家庭成員之click事件
    $('#addFamGroup').click(function() {
        addFamGroup();
    });

    deleBtnFam = document.getElementsByClassName('deleBtnFam');
    for (var i = 0; i < deleBtnFam.length; i++) {
        deleBtnFam[i].addEventListener('click', deleteFam);
    }

}

//刪除家庭成員之click事件
// deleBtnFam = document.getElementsByClassName('deleBtnFam');
// for (var i = 0; i < deleBtnFam.length; i++) {
//     deleBtnFam[i].addEventListener('click', deleteFam);
// }

//刪除工作經歷之click事件
deleBtnWork = document.getElementsByClassName('deleBtnWork');
for (var i = 0; i < deleBtnWork.length; i++) {
    deleBtnWork[i].onclick = deleteWork;
}





//新增家庭成員欄位
function addFamGroup() {
    var famGroup = document.querySelector('.famGroupSample');
    var newFamily = famGroup.cloneNode(true);
    var family = document.querySelector('.family');
    family.appendChild(newFamily);
    removeClass();

    //刪除家庭成員之click事件
    deleBtnFam = document.getElementsByClassName('deleBtnFam');
    for (var i = 0; i < deleBtnFam.length; i++) {
        deleBtnFam[i].addEventListener('click', deleteFam);
    }
}

function removeClass() {
    var famGroupSample = document.querySelectorAll('.famGroupSample');
    famGroupSample[1].classList.remove("hiddenPart");
    famGroupSample[1].classList.remove("famGroupSample");
}

//刪除家庭成員
function deleteFam() {
    var famParent = this.parentNode.parentNode;
    // famParent.parentNode.removeChild(famParent);
    var famCount = document.querySelectorAll('.famGroup');

    //famCount.length含隱藏欄位的數量，故需要>2
    if (famCount.length > 2) {
        var warn = confirm("确定要删除吗？");
        if (warn == true) {
            famParent.parentNode.removeChild(famParent);
        } else {}
    } else {
        alert('必填一位家庭成員！')
    }

}

function deleteWork() {

}


//形成年月下拉式選單
var yearMonth = function() {
    var d = new Date();
    var result = [];
    for (var i = 0; i < 900; i++) {
        d.setMonth(d.getMonth() - 1);
        var m = d.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        result.push(d.getFullYear() + "年" + m + "月");
    }
    return result;
}


//縣市區選單
function fillCity_resident() {
    $.ajax({
        url: 'proNo_ajax.php',
        type: 'POST',
        data: {
            proNo: $('#myProvince_resident').val()
        },
        error: function(xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function(data) {
            $('#myCity_resident').html(data);
            $('#myArea_resident').html('<option value="">请选择区县</option>');
            $('#address_resident').html('');
            $('#addressOne').val('').hide();
            $('#sameAddress').prop('checked', false);
            openHome();
        }
    })
}

function fillArea_resident() {
    $.ajax({
        url: 'cityNo_ajax.php',
        type: 'POST',
        data: {
            cityNo: $('#myCity_resident').val()
        },
        error: function(xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function(data) {
            $('#myArea_resident').html(data);
            $('#address_resident').html('');
            $('#addressOne').val('').hide();
            $('#sameAddress').prop('checked', false);
            openHome();
        }
    })
}

function fillCity_home() {
    $.ajax({
        url: 'proNo_ajax.php',
        type: 'POST',
        data: {
            proNo: $('#myProvince_home').val()
        },
        error: function(xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function(data) {
            $('#myCity_home').html(data);
            $('#myArea_home').html('<option value="">请选择区县</option>');
            $('#address_home').html('');
            $('#addressTwo').val('').hide();
        }
    })
}

function fillArea_home() {
    $.ajax({
        url: 'cityNo_ajax.php',
        type: 'POST',
        data: {
            cityNo: $('#myCity_home').val()
        },
        error: function(xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function(data) {
            $('#myArea_home').html(data);
            $('#address_home').html('');
            $('#addressTwo').val('').hide();
        }
    })
}

function fillCity_eme() {
    $.ajax({
        url: 'proNo_ajax.php',
        type: 'POST',
        data: {
            proNo: $('#myProvince_eme').val()
        },
        error: function(xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function(data) {
            $('#myCity_eme').html(data);
            $('#myArea_eme').html('<option value="">请选择区县</option>');
            $('#address_eme').html('');
            $('#addressThree').hide();
        }
    })
}

function fillArea_eme() {
    $.ajax({
        url: 'cityNo_ajax.php',
        type: 'POST',
        data: {
            cityNo: $('#myCity_eme').val()
        },
        error: function(xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function(data) {
            $('#myArea_eme').html(data);
            $('#address_eme').html('');
            $('#addressThree').hide();
        }
    })
}

//驗證身分證
function checkUserId() {
    var value = $('#userId').val();
    // console.log(value);
    var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
    var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    if (/^\d{17}\d|x$/i.test(value)) {
        var sum = 0,
            idx;
        for (var i = 0; i < value.length - 1; i++) {
            sum += parseInt(value.substr(i, 1), 10) * arrExp[i];
            // console.log(sum);
        }
        idx = sum % 11;
        var numOne = value.substr(17, 1).toUpperCase();
        var numTwo = arrValid[idx];
        if (numTwo == numOne) {

            //展開其他填寫欄位
            var secondPart = document.querySelector(".secondPart");
            var thirdPart = document.querySelector(".thirdPart");
            var fourPart = document.querySelector(".fourPart");

            secondPart.style.display = "block";
            thirdPart.style.display = "block";
            fourPart.style.display = "block";

            document.querySelector(".defaultUserId").innerText = value;
            var birYear = value.substr(6, 4);
            var birMonth = value.substr(10, 2);
            var birDate = value.substr(12, 2);
            document.querySelector(".defaultUserBir").innerText = birYear + "年" + birMonth + "月" + birDate + "日";
            var gender = value.substr(16, 1);
            // alert(gender);
            if (gender % 2 == 0) {
                document.querySelector(".defaultUserGend").innerText = "女性";
            } else {
                document.querySelector(".defaultUserGend").innerText = "男性";
            }

            //隱藏身分證輸入欄位
            document.querySelector(".firstPart").style.display = "none";
        } else {
            alert("身分证号码输入错误！");
        }
    } else {
        alert("身分证号码输入错误！");
    }
}

//取消勾選"同戶籍地址"
function openHome() {
    fillCity_home();
    $('#myProvince_home').show();
    $('#myCity_home').show();
    $('#myArea_home').show();
    $('#address_home').html('');
    $('#addressTwo').val('').hide();
    $('#addressTwo').attr('disabled', false);
}

window.addEventListener('load', doFirst);