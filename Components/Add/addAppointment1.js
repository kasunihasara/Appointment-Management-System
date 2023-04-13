const { ipcRenderer } = require('electron');
export class addAppointment1 extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {
        this.render();
        var reply = ipcRenderer.sendSync('addappointmenthelloSync','string');
        this.newtable(reply);
       /* const search = this.shadowRoot.querySelector('#myInput');
        search.addEventListener('click', async () => {
           
            const search = this.shadowRoot.querySelector('#search');
            
            onclick= new searchpatient(search.value);
            
            
         });*/

         const logout = this.shadowRoot.querySelector('#logout');
        logout.addEventListener('click', async () => {
            onclick = new login();
                      
         });

    }


    newtable(reply){
  
        const table = this.shadowRoot.querySelector('#jana');
               
               for (let i=0; i < reply.length; i++) {
                
                   const row = table.insertRow(i + 1);
                   row.insertCell(0).innerHTML = reply[i].date;
                   row.insertCell(1).innerHTML = reply[i].time;
                   row.insertCell(2).innerHTML = reply[i].hospitalcharge;
                   row.insertCell(3).innerHTML = reply[i].total;
                   row.insertCell(4).innerHTML = reply[i].pid;
                   row.insertCell(5).innerHTML = reply[i].room;
                   //row.insertCell(6).innerHTML =  "<img src='images/bin.png' id='del" + i + "'>";
                   //row.insertCell(8).innerHTML = `<a onclick='updateAppointment(${reply[i].apid})'><img src='images/pencil.png'></a>`;
       
                   //const dele = this.shadowRoot.querySelector('#del' + i);
    
                  /* dele.addEventListener('click', () => {
                    
                       ipcRenderer.send("deleteappointment", reply[i].apid)
                       const droptable = this.shadowRoot.querySelector('#tbl');
                       droptable.remove()
                       this.connectedCallback()
                   })*/
                   
       
                  
       
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

    position: fixed;
    margin-top: 35px;
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


<div id="tbl">   

<div class="tbl">

<table id="jana"  style="margin-left: 250px; margin-top:70px; color:rgba(26, 144, 143, 1); font-size:20px; ">
    <tr >
        
        <th style="padding-right:80px; padding-top:150px;" >Date</th>
        <th style="padding-right:80px; padding-top:150px;" >Time</th>
        <th style="padding-right:80px; padding-top:150px;">Hospital Charge</th>
        <th style="padding-right:80px; padding-top:150px;">Total</th>
        <th style="padding-right:80px; padding-top:150px;">Patient Id</th>
        <th style="padding-right:80px; padding-top:150px;">Room</th>
        <th style="padding-right:80px; padding-top:150px;"></th>
        <th style="padding-right:80px; padding-top:150px;"></th>
       
    </tr>

      
</table>





</div>

</div>         
  
`;
    }


}

customElements.define('add-appointment1', addAppointment1)