const { ipcRenderer } = require('electron');
export class callManagement extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {
        
        
        

        
        var reply = ipcRenderer.sendSync('helloSynccall', 'a string');
        console.log("reply length"+reply.length);
        var id=(reply.length+1);
        this.render(reply);
        
        const search = this.shadowRoot.querySelector('#call');
        search.addEventListener('click', () => {            
          const fn = this.shadowRoot.querySelector('#fname');
          const pn = this.shadowRoot.querySelector('#phone');
          const doc = this.shadowRoot.querySelector('#doctor');
          const room = this.shadowRoot.querySelector('#room');
          const appoint = this.shadowRoot.querySelector('#appoi');
          const appointmenttime = this.shadowRoot.querySelector('#appointmenttime');
    
          let obj = JSON.parse('{"fname":"' + fn.value + '", "phone": "' + pn.value + '","doctor": "' + doc.value + '","room": "' + room.value + '",  "appointment": "' + appoint.value + '" ,"appointmenttime": "' + appointmenttime.value+ '"}');
          ipcRenderer.send("callManagement", obj);
          onclick= new addAppointment(appoint.value,appointmenttime.value,id,room.value);
         
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
<input type="text" id="fname" name="fname" placeholder="Name" style="margin-top:130px"><br>
<input type="text" id="phone" name="phone" placeholder="Phone Number"><br>

<input type="text" id="doctor" name="doctor" placeholder="Doctor"><br>
<input type="text" id="room" name="room" placeholder="Room"><br>
<input type="text" id="appoi" name="appointment" placeholder="Appointment Date"><br>
<input type="text" id="appointmenttime" name="appointmenttime" placeholder="Appointment Time"><br>
<input type="text" id="id" name="id" placeholder="ID" value="`+(reply.length+1)+`">
</form> 
<button id="call" type="submit" style="background-color:rgba(26, 144, 143, 1); margin-left: 500px; margin-top:-40px"><b>Add</b></button>
</div>


`;
    }


}

customElements.define('call-management', callManagement)