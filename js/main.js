( ()=>{
    if (document.getElementById("init"))
        document.getElementById("init").onclick = ()=>window.location.href = 'select.html';
    if (document.getElementById("btn-finish"))
        document.getElementById("btn-finish").onclick = ()=>window.location.href = 'index.html';
    if (document.getElementById("toMain"))
        document.getElementById("toMain").onclick = ()=>window.location.href = 'index.html';
    if (document.getElementById("btn-save-road"))
        document.getElementById("btn-save-road").onclick = ()=>window.location.href = 'list-road.html';
    if (document.getElementById("logout"))
        document.getElementById("logout").onclick = ()=>window.location.href = 'login.html';
})()