( ()=>{
    if (document.getElementById("btn-finish"))
        document.getElementById("btn-finish").onclick = ()=>window.location.href = 'index.html';
    if (document.getElementById("toMain"))
        document.getElementById("toMain").onclick = ()=>window.location.href = 'index.html';
    if (document.getElementById("btn-save-route"))
        document.getElementById("btn-save-route").onclick = ()=>window.location.href = 'list-route.html';
    if (document.getElementById("logout"))
        document.getElementById("logout").onclick = ()=>window.location.href = 'login.html';

})()