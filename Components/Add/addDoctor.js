const { ipcRenderer } = require('electron');
export class addDoctor extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {
        
        this.render()
        const submit = this.shadowRoot.querySelector('#save');
        var reply = ipcRenderer.sendSync('helloSyncdoc', 'a string');
        this.newtable(reply);
        submit.addEventListener('click', async () => {
            
            const fn = this.shadowRoot.querySelector('#fname');
            const pn = this.shadowRoot.querySelector('#phone');
            const spec = this.shadowRoot.querySelector('#specialty');
            const work = this.shadowRoot.querySelector('#workingdays');
            const time = this.shadowRoot.querySelector('#time');
            const fee = this.shadowRoot.querySelector('#fee');
            const start = this.shadowRoot.querySelector('#start');
            const end = this.shadowRoot.querySelector('#end');
            const room = this.shadowRoot.querySelector('#room');
            const x = this.shadowRoot.querySelector('#myFile');
            console.log(x.files[0]);
            let obj = JSON.parse('{"fname":"' + fn.value + '", "phone": "' + pn.value + '","specialty": "' + spec.value + '","workingd": "' + work.value + '","time": "' + time.value + '", "start": "' + start.value + '", "end": "' + end.value + '", "room": "' + room.value + '",  "fee": "' + fee.value + '"}');
            obj.path=x.files[0].path;
            obj.name=x.files[0].name;
            await ipcRenderer.send("addDoctor", obj);
            
            const droptable = this.shadowRoot.querySelector('#tbl');
            droptable.remove();
            this.connectedCallback();
        

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
                   console.log( reply[i].photo);
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
                   row.insertCell(10).innerHTML = "<img src='images/bin.png' id='del" + i + "'>";
                   row.insertCell(11).innerHTML = `<a onclick='updateDoctor(${reply[i].did})'><img src='images/pencil.png'></a>`;
       
                   const dele = this.shadowRoot.querySelector('#del' + i);
    
                   dele.addEventListener('click', () => {
                    
                       ipcRenderer.send("returnItemdoc", reply[i].did)
                       const droptable = this.shadowRoot.querySelector('#tbl');
                       droptable.remove()
                       this.connectedCallback()
                   })
             
                  
       
           }}
       

render() {
        this.shadowRoot.innerHTML = `
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
    margin-top:50px;
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

    position: fixed;
    margin-top: 25px;
    width: 100px;
    background-color: rgba(26, 144, 143, 1);
    height: 500px;
  
     
    
  }
  .image{
      width:60px;
      heigth:60px;
      margin-left:20px;
      margin-bottom:50px;
  }
  
  
</style>

<div class="nav">
 <a onclick="patientdetails()"><img class="image" src="images/patient1.png" style="margin-top:70px"></a><br>
 <a onclick="addCDoctor()"><img class="image" src="images/docotor1.png"></a><br>
 <a onclick="addAppointment1()"><img class="image" src="images/document1.png"></a><br>
 <a onclick="addCustomer()"><img class="image" src="images/employee1.png" style="margin-bottom:15px"></a>
</div>
 </div>
</div>
<button type="submit" id="logout" style="margin-top:0px; margin-left:1200px; background-color:red;">Log Out</button> 

<div class="form"> 
<form action="/action_page.php" >
<input type="text" id="fname" name="fname" placeholder="Name" style="margin-top:30px"><br>
<input type="text" id="specialty" name="specialty" placeholder="Specialty"><br>
<input type="text" id="workingdays" name="workingdays" placeholder="Working Days"><br>
<input type="text" id="time" name="time" placeholder="Time Take per an Appointment"><br>
<input type="text" id="fee" name="fee" placeholder="Fee"><br>
<input type="text" id="start" name="start" placeholder="Start"><br>
<input type="text" id="end" name="end" placeholder="End"><br>
<input type="text" id="phone" name="phone" placeholder="Phone Number"><br>
<input type="text" id="room" name="room" placeholder="Room Number"><br>
<input type="file" id="myFile" name="filename" placeholder="choose a photo" style="margin-bottom:-180px;">
</form> 
<button id="save" type="submit" style="background-color:rgba(26, 144, 143, 1); margin-left: 500px; margin-top:-40px"><b>Add</b></button>
</div>

        
    
<div id="tbl">   

<div class="tbl">

<table id="jana"  style="margin-left: 120px; margin-top:50px; color:rgba(26, 144, 143, 1); font-size:20px">
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
        <th style="padding-right:50px"></th>
        <th style="padding-right:50px"></th>
        <th></th>
       
    </tr>

      
</table>





</div>

</div>         
  
`;
    }


}

customElements.define('add-doctor', addDoctor)