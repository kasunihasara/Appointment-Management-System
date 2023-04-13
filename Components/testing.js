const template = document.createElement('template');

template.innerHTML = `
<style>
.image{
    margin-top: 180px;
    margin-left: 110px;
}
.patient{
    height: 180px;
    width: 180px;
    display: inline;
    padding-right: 130px;
}
.doctor{
    height: 180px;
    width: 180px;
    display: inline;
    padding-right: 130px;
}
.document{
    height: 180px;
    width: 180px;
    display: inline;
    padding-right: 130px;
}
.employee{
    height: 180px;
    width: 180px;
    display: inline;
}
.button{
    background-color: rgba(26, 144, 143, 1);
    border: none;
    color: aliceblue;
    width: 160px;
    height: 45px;
    font-size: 28px;
    margin-right:152px ;
}
.buttonstyle{
margin-left: 120px;
margin-top: 30px;
}
.buttonstyle a{
text-decoration: none;
color: aliceblue;
}
</style>


<div class="image">
        <img class="patient" src="images/patient.png">
        <img class="doctor" src="images/doctor.png">
        <img class="document" src="images/document.png">
        <img class="employee" src="images/employee.png"><br>
    </div>
    <div class="buttonstyle">
    <button class="button"><a onclick="patientdetails()">Patient</a></button>
    <a onclick=" addCDoctor()"> <button id="buttondoc" class="button">Doctor</button></a>
    <button class="button"><a  onclick="addAppointment1()">Document</a></button>
    <a onclick="addCustomer()"><button id="button" class="button" style="margin-right: 0px;">Employee</button></a>
    </div>
  
`;

export class Hello extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }

   /* connectedCallback() {
        const btt = this.shadowRoot.querySelector('#button');
        console.log(btt);
        btt.addEventListener('click',()=>{
            const div= doucument.querySelector('#main-body');
            div.innerHTML=`<add-Customer></add-Customer>`;
        })
    }*/

}

window.customElements.define('test-one', Hello)


