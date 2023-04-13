const { ipcRenderer } = require('electron');
export class oldpatient extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {
        
        
        

        
        var reply = ipcRenderer.sendSync('helloSynccall', 'a string');
        console.log("reply length"+reply.length);
        var x=(reply.length+1);
        this.render(reply);
        
        const search = this.shadowRoot.querySelector('#call');
        search.addEventListener('click', () => {            
          const id = this.shadowRoot.querySelector('#id');
          const doc = this.shadowRoot.querySelector('#doctor');
          const room = this.shadowRoot.querySelector('#room');
          const date = this.shadowRoot.querySelector('#appoi');
          const time = this.shadowRoot.querySelector('#appointmenttime');
    
          let obj = JSON.parse('{"id":"' + id.value + '", "doctor": "' + doc.value + '","room": "' + room.value + '",  "appointment": "' + date.value + '" ,"appointmenttime": "' + time.value+ '"}');
         
         onclick= new addAppointment(date.value,time.value,id.value,room.value);
         
         });

         const logout = this.shadowRoot.querySelector('#logout');
         logout.addEventListener('click', async () => {
             onclick = new login();
                       
          });
        
    }

    

       

render(reply) {
        this.shadowRoot.innerHTML = `

        <link rel="stylesheet" href="css/style1.css">
        <link rel="stylesheet" href="css/style2.css">
        <link rel="stylesheet" href="css/style3.css">
<style>
input[type=text] {
    width:400px;
    heigth:20px;
    padding:10px;
    margin-bottom:10px;
    border-radius:10px;
    border-color:rgba(26, 144, 143, 1);
    color:rgba(26, 144, 143, 0.56);
} 

.form{
    margin-left:550px;
    margin-top:-40px;
}
button{
    width: 80px; 
    height:40px;  
    border:none; 
    
    cursor: pointer;
    padding: 3px; 
    border-radius:15px;
    color:white;
}

</style>

<div class="sidebar" style="width:100px; height: 68%;">
            <a onclick="newpatient()"><img src=" images/patient1.png " alt=" " style="width: 60px; height:60px; "></a>
            <a onclick="addPatient()"><img src="images/docotor1.png " alt=" " style="width: 60px; height:60px; "></a>
            <a onclick="docappointment()"><img src="images/document1.png " alt=" " style="width: 60px; height:60px; "></a>
            <div class="dropdown">
                <button class="dropdown-btn " style="box-shadow: none; float:left; margin-left:5px"><img src="images/call (2).png" alt=" " style="width: 60px; height:60px; "></button>
                <div class=" dropdown-content ">
                    <a onclick="callManagement()" style="margin-top:2px;">New Patient</a>
                    <a onclick="oldpatient()" >Old Patient</a>
                </div>
            </div>
</div>
 
 
<button type="submit" id="logout" style="margin-top:0px; margin-left:1200px; background-color:red;">Log Out</button> 

<div class="form"> 
<form action="/action_page.php" >
<input type="text" id="id" name="id" placeholder="ID" style="margin-top:130px"><br>
<input type="text" id="doctor" name="doctor" placeholder="Doctor"><br>
<input type="text" id="room" name="room" placeholder="Room"><br>
<input type="text" id="appoi" name="appointment" placeholder="Appointment Date"><br>
<input type="text" id="appointmenttime" name="appointmenttime" placeholder="Appointment Time"><br>

</form> 
<button id="call" type="submit" style="background-color:rgba(26, 144, 143, 1); margin-left: 500px; margin-top:-40px"><b>Add</b></button>
</div>


`;
    }


}

customElements.define('old-patient', oldpatient)