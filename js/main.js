( ()=>{
    if (document.getElementById("init"))
        document.getElementById("init").onclick = ()=>window.location.href = 'select.html';
    if (document.getElementById("btn-finish"))
        document.getElementById("btn-finish").onclick = ()=>window.location.href = 'index.html';
})()