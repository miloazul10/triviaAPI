function listener(){
    const FORM1 = document.getElementById("FOR1").value;
    const FORM2 = document.getElementById("FOR1").value;
    const FORM3 = document.getElementById("FOR1").value;
    const FORM4 = document.getElementById("FOR1").value;

    const newElement = {FORM1,FORM2,FORM3,FORM4};

    respuestaAPI.push(newElement);
}