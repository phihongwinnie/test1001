//簡化寫法
function $id(id) {
    return document.getElementById(id);
}

function doFirst() {
    $(document).ready(function() {
        var allinfo = yearMonth();
        var t = new Date();
        var n = t.getMonth() + 1;
        var nowMonth = t.getFullYear() + "年" + n + "月";
        $(".dateinfo").append("<option value='" + nowMonth + "'>" + nowMonth + "</option>");


        for (i = 0; i < allinfo.length; i++) {
            $(".dateinfo").append("<option value='" + allinfo[i] + "'>" + allinfo[i] + "</option>");

        }
    });
}

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

window.addEventListener('load', doFirst);