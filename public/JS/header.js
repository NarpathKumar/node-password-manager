if(window.location.pathname == '/'){
    console.log('path /')
    $('#login-not-display').css('display', 'none')
    $('#logout-icon').css('display', 'none')
}

$('#logout-icon').click(()=>{
    window.location.assign('/')
})