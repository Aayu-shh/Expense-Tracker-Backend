
document.addEventListener('submit', async (e) => {
    console.log();
    const backendApi = 'http://44.211.163.102:3000';

    try {
        e.preventDefault();
        const fgresp = await axios.post(`${backendApi}/password/forgot`, { email: document.querySelector('#email').value });
        if(fgresp.data.success==true) alert('Check you email for Password Reset link');
        else{
            alert('Please enter a Valid Email, Email was NOT found');
        }
    }
    catch (err) {
        console.log(err);
    }
})
