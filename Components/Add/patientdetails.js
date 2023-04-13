const { ipcRenderer } = require('electron');
export class patientdetails extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {
        
        this.render();
        const submit = this.shadowRoot.querySelector('#save');
        var reply = ipcRenderer.sendSync('patientdetails', 'a string');
        this.newtable(reply);

        const search = this.shadowRoot.querySelector('#myInput');
        search.addEventListener('click', async () => {
           
            const search = this.shadowRoot.querySelector('#search');
            
            onclick = new searchpatient(search.value);
            
            
         });


         const logout = this.shadowRoot.querySelector('#logout');
         logout.addEventListener('click', async () => {
             onclick = new login();
                       
          });

       
    }

 

    newtable(reply){
  
        const table = this.shadowRoot.querySelector('#jana');
               
               for (let i=0; i < reply.length; i++) {
                
                const table = this.shadowRoot.querySelector('#jana');
               
               
                 
                    const row = table.insertRow(i + 1);
                    row.insertCell(0).innerHTML = reply[i].name;
                    row.insertCell(1).innerHTML = reply[i].age;
                    row.insertCell(2).innerHTML = reply[i].gender;
                    row.insertCell(3).innerHTML = reply[i].phone;
                    row.insertCell(4).innerHTML = reply[i].address;
                    row.insertCell(5).innerHTML = reply[i].details;
                    row.insertCell(6).innerHTML = "<img src='uploadpatient/"+ reply[i].photo +"' style='width:100px; heigth:100px; padding-right:80px'>";
               
                    
        
                   
        
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
<button type="submit" id="logout" style="margin-top:16px; margin-left:1200px; background-color:red;">Log Out</button>
<div id="tbl">   
<div class="tbl">
<table id="jana"  style="margin-left: 250px; margin-top:50px; color:rgba(26, 144, 143, 1); font-size:20px;">
<button type="submit" id="myInput" style="margin-top:20px; margin-left:950px; background-color:rgba(26, 144, 143, 0.56);">search</button>
<input type="text" id="search" name="search" placeholder="Search for names.." title="Type in a name" style="width:250px; margin-top:-38px; margin-left:20px;">           
    

<tr>
        
        <th style="padding-right:80px;">Name</th>
        <th style="padding-right:80px">Age</th>
        <th style="padding-right:80px">Gender</th>
        <th style="padding-right:80px">Phone</th>
        <th style="padding-right:80px">Address</th>
        <th style="padding-right:80px">Details</th>
        <th style="padding-right:80px">Reports</th>
       
</tr>

      
</table>






</div>

</div>           
  
`;
    }


}

customElements.define('patient-details', patientdetails)