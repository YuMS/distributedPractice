$(document).ready(function() {
    isRawExit = true;
    $('.submit').click(function() {
        isRawExit = false;
        return true;
    })
    window.onbeforeunload = function() {
        if (isRawExit) {
            return '请不要直接退出，否则当前工作将一直处在“标记中”状态，给工作带来不便。请点击取消后再关闭页面。';
        }
    };
})
