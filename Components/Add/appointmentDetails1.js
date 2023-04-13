const { ipcRenderer } = require('electron');
export class appointmentDetails1 extends HTMLElement {
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
  
        const table = this.shadowRoot.querySelector('#jana');
               
               for (let i=0; i < (reply.length-1); i++) {
                
                   const row = table.insertRow(i + 1);
                   row.insertCell(0).innerHTML = reply[i];
                   row.insertCell(1).innerHTML = "-";
                   row.insertCell(2).innerHTML = reply[i+1];
                   row.insertCell(3).innerHTML = "Appointment";
                   row.insertCell(4).innerHTML = `<input type="checkbox" style="margin-left:50px; border-color:rgba(26, 144, 143, 1);"></input> `; 
                   
                  // row.insertCell(4).innerHTML = Appointment;    
       
           }}
              
       

render(reply) {
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
 <a onclick="appointmentDetails1()"><img class="image" src="images/document1.png"></a><br>
 <a onclick="addCustomer()"><img class="image" src="images/employee1.png" style="margin-bottom:15px"></a>
</div>
 </div>
</div>
<p style="margin-left:625px; font-color:white; padding:50px; background-color:rgba(26, 144, 143, 1); border-radius:10px; width:360px;">`+reply[0].workingdays+`</p>


<div id="tbl">   

<div class="tbl">

<table id="jana"  style="margin-left: 550px;  margin-top:150px; color:white; font-size:20px; background-color:rgba(26, 144, 143, 0.47); padding:20px;">
    
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

customElements.define('appointment-details1', appointmentDetails1)