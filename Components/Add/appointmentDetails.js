
const { ipcRenderer } = require('electron');
export class appointmentDetails extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {
        
       var x=this.getAttribute("updateid") ;
        var reply = ipcRenderer.sendSync('doctorappointmenthelloSync',x);
        this.render(reply);
        this.calculatetime(reply);

        const logout = this.shadowRoot.querySelector('#logout');
         logout.addEventListener('click', async () => {
             onclick = new login();
                       
          });
       

    }

    calculatetime(reply){
        var s= reply[0].start;
        var e= reply[0].end;
        var t= reply[0].toapatient;
        var time=s;
        var k=s;
        var i=0;
        const arra=[];
       while(time < e){
        arra[i]=time;
        i++;
         time=time+t;
         var x = time-k;
         
        if(x >= 0.60){
           k=time-x;
           x=x-0.60;
           k=k+1;
           
           time=k+x;
        
        }
       }
       arra[i++]=e;
       this.newtable(arra);
    }
   

       
    newtable(reply){
        
    $(document).ready(function () {
        $('#activelist :checkbox').change(function () {
          alert('changed');
        });
      });
        const table = this.shadowRoot.querySelector('#jana');
               
               for (let i=0; i < (reply.length-1); i++) {
                
                   const row = table.insertRow(i + 1);
                   row.insertCell(0).innerHTML = reply[i];
                   row.insertCell(1).innerHTML = "-";
                   row.insertCell(2).innerHTML = reply[i+1];
                   row.insertCell(3).innerHTML = "Appointment";
                   row.insertCell(4).innerHTML = `<input type="checkbox" id='inactivelist' value="inactivelist" />`; 
                   
                  // row.insertCell(4).innerHTML = Appointment;    
       
           }}
              
       

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
.checkmark:after {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
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

<p style="margin-left:650px; font-color:white; padding:30px; background-color:rgba(26, 144, 143, 1); border-radius:8px; width:200px; color:white;">`+reply[0].workingdays+`</p>


<div id="tbl">   

<div class="tbl">

<table id="jana"  style="margin-left: 550px;  margin-top:100px; color:white; font-size:20px; background-color:rgba(26, 144, 143, 0.47); padding:20px;">
    
<tr >
        
        <th style="padding-right:80px;" ></th>
        <th style="padding-right:80px" ></th>
        <th style="padding-right:80px"></th>
        <th style="padding-right:80px"></th>
        <th style="padding-right:80px"></th>

    </tr>

      
</table>





</div>

</div>         
  
`;
    }


}

customElements.define('appointment-details', appointmentDetails)