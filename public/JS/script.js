
$('#store-detail-form').on({
    'submit': (e)=>{
        e.preventDefault();
        // if(validator.isURL(e.target.webName.value)){
            fetch(`/addDetails?webName=${e.target.webName.value}&webPass=${e.target.webPass.value}`).then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        alert('An error occured while storing')
                    } else {
                        alert('Storing Successful')
                        e.target.webName.value = ''
                        e.target.webPass.value = ''
                        console.log(data)
                    }
                })
            })
        // }
        // else {
        //     alert('please enter valid Url')
        //     e.target.webName.value = ''
        //     e.target.webPass.value = ''
        // }
    }
})

$('#getter-form').on({
    'submit': (e)=>{
        e.preventDefault();
        fetch(`/getDetails?webName=${e.target.webName.value}`).then((response) => {
            response.json().then((data) => {
                console.log(data)
                if (data.error) {
                    alert('An error occured while getting the data')
                } else {
                    $('#toenter-password').text(data.password)
                }
            })
            .catch(error=>{
                alert('Domain Not Found')
            })
        })
    }
})

const signUp = $('#signup-form-button');
const formTitle = $('#title');
const login = $('#login');

signUp.click(()=>{
    if(signUp.get(0).innerText == 'Sign Up ?.'){
        formTitle.text('Sign Up')
        signUp.text('Login .')
        login.attr({value: 'Sign Up'})
    }
    else {
        formTitle.text('Sign In')
        signUp.text('Sign Up ?.')
        login.attr({value: 'Login'})
    }
})


$('#login-form-first').on({
    submit : (e)=>{
        e.preventDefault();
        const event = e.target
        if(event.submit.value == 'Login'){
            let mernName = window.localStorage.getItem('mernUserName')
            let mernPass = window.localStorage.getItem('mernPassword')
            if(event.username.value == mernName && event.password.value == mernPass){
                alert('Login Successful')
                window.location.assign('/home')
            }
            else {
                alert('Please enter valid credentials!')
            }
        }
        else {
            window.localStorage.setItem('finalUserName', event.username.value)
            window.localStorage.setItem('finalPassword', event.password.value)
            alert('Please Remember Your Credentials')
            window.location.assign('/home')
        }
    }
})