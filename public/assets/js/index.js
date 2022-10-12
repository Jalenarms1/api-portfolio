// Place script code here
const loginBtn = document.querySelector("#submit-login");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const logoutBtn = document.querySelector("#logout-btn");
const addProjBtn = document.querySelector("#submit-proj");
const imageInput = document.querySelector("#image-input");
const title = document.querySelector("#proj-title");
const link = document.querySelector("#proj-link");
const description = document.querySelector("#proj-descr");


const submitLogin = async (e) => {
    try{
        e.preventDefault();

        let response = await fetch("/api/admin/check", {
            method: "POST",
            body: JSON.stringify({email: emailInput.value, password: passwordInput.value}),
            headers: {"Content-Type": "application/json"}
        })

        if(response.ok){
            location.replace("/")
        }

    }catch(err){
        console.log(err);

    }
}

const submitLogout = async () => {
    try{

        let response = await fetch('/api/admin/exit', {
            method: 'POST',
            body: {}
            
        })

        location.replace("/");
    

    }catch(err){
        console.log(err);
    }
}

const submitProject = async () => {
    try{
        let image = imageInput.files[0]
        let reader = new FileReader;

        reader.addEventListener("load", async () => {
            let response = await fetch("/api/admin/new-proj", {
                method: "POST",
                body: JSON.stringify({
                    title: title.value,
                    link: link.value,
                    description: description.value,
                    image: reader.result.toString()
                }),
                headers: {"Content-Type": "application/json"}
            })
            
        })
        
        reader.readAsDataURL(image);


    }catch(err){
        console.log(err);
    }
}


if(loginBtn){
    loginBtn.addEventListener("click", submitLogin);

}
if(logoutBtn){
    logoutBtn.addEventListener("click", submitLogout);
}

if(addProjBtn){
    addProjBtn.addEventListener("click", submitProject);
}
