const { ipcRenderer } = require('electron');
export class addPatient extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {
        
        this.render();
        const submit = this.shadowRoot.querySelector('#save');
        var reply = ipcRenderer.sendSync('helloSyncdoc', 'a string');
        this.newtable(reply);

        const search = this.shadowRoot.querySelector('#myInput');
       
        search.addEventListener('click', async () => {
            const search = this.shadowRoot.querySelector('#search');
            onclick= searchDocemp(search.value);
          });

          const logout = this.shadowRoot.querySelector('#logout');
          logout.addEventListener('click', async () => {
              onclick = new login();
                        
           });

       }

 

    newtable(reply){
  
        const table = this.shadowRoot.querySelector('#jana');
               
               for (let i=0; i < reply.length; i++) {
                
                   const row = table.insertRow(i + 1);
                   console.log(reply[i].name);
                   row.insertCell(0).innerHTML = "<img src='uploaddoctor/"+ reply[i].photo +"' style='width:100px; heigth:100px; padding-right:80px'>";
                   row.insertCell(1).innerHTML = reply[i].name;
                   row.insertCell(2).innerHTML = reply[i].phone;
                   row.insertCell(3).innerHTML = reply[i].specialty;
                   row.insertCell(4).innerHTML = reply[i].workingdays;
                   row.insertCell(5).innerHTML = reply[i].toapatient;
                   row.insertCell(6).innerHTML = reply[i].fee;
                   row.insertCell(7).innerHTML = reply[i].start;
                   row.insertCell(8).innerHTML = reply[i].end;
                   row.insertCell(9).innerHTML = reply[i].room;
                  
      }}


       

render() {
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
    margin-top:80px;
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
.nav{
    background-color:rgba(26, 144, 143, 1);
    width:100px;
    heigth:220px;
    margin-top: 11px;
    position: fixed;
    margin-left:-12px;
  
}
.image{
    width:70px;
    heigth:70px;
    margin-left:13px;
    margin-bottom:80px;
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

<div id="tbl">   

<div class="tbl">
<button type="submit" id="myInput" style="margin-top:50px; margin-left:980px; background-color:rgba(26, 144, 143, 0.56); position:fixed;" >search</button>
<input type="text" id="search" name="search" placeholder="Search for names.." title="Type in a name" style="width:250px; margin-top:50px; margin-left:1080px; position:fixed;">   
<table id="jana"  style="margin-left: 120px; padding-top:150px; color:rgba(26, 144, 143, 1); font-size:20px">
    <tr >
    <th style="padding-right:80px; padding-bottom:70px;" ></th>
    <th style="padding-right:80px;" >Name</th>
    <th style="padding-right:80px">Phone</th>
    <th style="padding-right:80px" >Specialty</th>
    <th style="padding-right:80px">Working Days</th>
    <th style="padding-right:80px">Time per an Appointment</th>
    <th style="padding-right:80px">Fee</th>
    <th style="padding-right:80px">Start</th>
    <th style="padding-right:80px">End</th>
    <th style="padding-right:80px">Room</th>

    <th></th>
       
    </tr>

      
</table>





</div>

</div>           
  
`;
    }


}

customElements.define('add-patient', addPatient)