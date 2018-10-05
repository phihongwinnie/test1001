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
        fillArea_resident();
    });
    $('#myCity_resident').change(function(){
        fillArea_resident();
    });
    $('#myProvince_home').change(function() {
        fillCity_home();
        fillArea_home();
    });
    $('#myCity_home').change(function(){
        fillArea_home();
    });
    $('#myProvince_eme').change(function() {
        fillCity_eme();
        fillArea_eme();
    });
    $('#myCity_eme').change(function(){
        fillArea_eme();
    });
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


function fillCity_resident(){
    $.ajax({
        url: 'proNo_ajax.php',
        type: 'POST',
        data:{
            proNo: $('#myProvince_resident').val()
        },
        error: function(xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function(data){
            $('#myCity_resident').html(data);
        }
    })
}
function fillArea_resident(){
    $.ajax({
        url: 'cityNo_ajax.php',
        type: 'POST',
        data:{
            cityNo: $('#myCity_resident').val()
        },
        error: function(xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function(data){
            $('#myArea_resident').html(data);
        }
    })
}

function fillCity_home(){
    $.ajax({
        url: 'proNo_ajax.php',
        type: 'POST',
        data:{
            proNo: $('#myProvince_home').val()
        },
        error: function(xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function(data){
            $('#myCity_home').html(data);
        }
    })
}

function fillArea_home(){
    $.ajax({
        url: 'cityNo_ajax.php',
        type: 'POST',
        data:{
            cityNo: $('#myCity_home').val()
        },
        error: function(xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function(data){
            $('#myArea_home').html(data);
        }
    })
}

function fillCity_eme() {
    $.ajax({
        url: 'proNo_ajax.php',
        type: 'POST',
        data:{
            proNo: $('#myProvince_eme').val()
        },
        error: function(xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function(data){
            $('#myCity_eme').html(data);
        }
    })
}

function fillArea_eme(){
    $.ajax({
        url: 'cityNo_ajax.php',
        type: 'POST',
        data:{
            cityNo: $('#myCity_eme').val()
        },
        error: function(xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function(data){
            $('#myArea_eme').html(data);
        }
    })
}

window.addEventListener('load', doFirst);