const { ipcRenderer } = require('electron');
export class searchDocemp extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {
        
        this.render();
        
        var reply = ipcRenderer.sendSync('searchhelloSync',this.getAttribute("searchid") );
        console.log(this.getAttribute("searchid"));
        this.newtable(reply);

        const search = this.shadowRoot.querySelector('#myInput1');
        search.addEventListener('click', async () => {
           
            const search = this.shadowRoot.querySelector('#search1');
            onclick = new searchDoc1(search.value);
            
            
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
                   row.insertCell(2).innerHTML = reply[i].specialty;
                   row.insertCell(3).innerHTML = reply[i].workingdays;
                   row.insertCell(4).innerHTML = reply[i].toapatient;
                   row.insertCell(5).innerHTML = reply[i].fee;
                   row.insertCell(6).innerHTML = reply[i].workinghours;
                   row.insertCell(7).innerHTML = reply[i].phone;
                   row.insertCell(8).innerHTML = reply[i].room;
                  
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
<button type="submit" id="myInput1" style="margin-top:50px; margin-left:900px; background-color:rgba(26, 144, 143, 0.56); position:fixed;" >search</button>
<input type="text" id="search1" name="search" placeholder="Search for names.." title="Type in a name" style="width:250px; margin-top:50px; margin-left:1000px; position:fixed;">   
<table id="jana"  style="margin-left: 120px; padding-top:30px; color:rgba(26, 144, 143, 1); font-size:20px">
    <tr >
        <th style="padding-right:80px; padding-bottom:250px;" ></th>
        <th style="padding-right:80px;" >Name</th>
        <th style="padding-right:80px" >Specialty</th>
        <th style="padding-right:80px">Working Days</th>
        <th style="padding-right:80px">Time per an Appointment</th>
        <th style="padding-right:80px">Fee</th>
        <th style="padding-right:80px">Working Hours</th>
        <th style="padding-right:80px">Phone</th>
        <th style="padding-right:80px">Room</th>
        
        <th></th>
       
    </tr>

      
</table>





</div>

</div>           
  
`;
    }


}

customElements.define('search-doctoremp', searchDocemp)