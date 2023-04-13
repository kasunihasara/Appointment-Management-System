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
        <img class="employee" src="images/group 11.png"><br>
    </div>
    <div class="buttonstyle">
    <button id="button2" class="button"><a onclick="newpatient()">Patient</a></button>
    <button id="button" class="button"><a onclick="addPatient()">Doctor</a></button>
    <button id="button3"class="button"><a onclick="docappointment()">Document</a></button>
    <button id="button1" class="button" style="margin-right: 0px;"><a onclick="callManagement()">Calls</a></button>
    </div>
  
`;

export class employee extends HTMLElement {
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

window.customElements.define('test-two', employee)