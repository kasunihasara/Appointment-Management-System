const { ipcRenderer } = require('electron');
export class addAppointment extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {

        
        
        var a=this.getAttribute("pid") ;
        var y=this.getAttribute("date") ;
        var z=this.getAttribute("time") ;
        var b=this.getAttribute("room") ;
        this.render(y,z);
        var reply = ipcRenderer.sendSync('addappointmenthelloSync','string');
        this.newtable(reply);
        const add = this.shadowRoot.querySelector('#save');
        add.addEventListener('click', async () => {
        
            
           
            const date = this.shadowRoot.querySelector('#date');
            const time = this.shadowRoot.querySelector('#time');
            const hospital = this.shadowRoot.querySelector('#hospital');
            const total= this.shadowRoot.querySelector('#total');
            
            let obj = JSON.parse('{"room": "' + b + '","pid": "' + a + '","date": "' + date.value + '", "time": "' + time.value + '","hospital": "' + hospital.value + '","total": "' + total.value + '"}');

            await ipcRenderer.send("addAppointment", obj);
            
            const droptable = this.shadowRoot.querySelector('#tbl');
            droptable.remove();
            this.connectedCallback();
        

        });

       /* const search = this.shadowRoot.querySelector('#myInput');
        search.addEventListener('click', async () => {
           
            const search = this.shadowRoot.querySelector('#search');
            
            onclick= new searchpatient(search.value);
            
            
         });*/

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
                   row.insertCell(6).innerHTML =  "<img src='images/bin.png' id='del" + i + "'>";
                   //row.insertCell(8).innerHTML = `<a onclick='updateAppointment(${reply[i].apid})'><img src='images/pencil.png'></a>`;
       
                   const dele = this.shadowRoot.querySelector('#del' + i);
    
                   dele.addEventListener('click', () => {
                    
                       ipcRenderer.send("deleteappointment", reply[i].apid)
                       const droptable = this.shadowRoot.querySelector('#tbl');
                       droptable.remove()
                       this.connectedCallback()
                   })
                   
       
                  
       
           }}
       

render(y,z) {
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

<div class="form"> 
<form action="/action_page.php" >
<input type="text" id="date" name="date" placeholder="Date" style="margin-top:30px" value="`+y+`"><br>
<input type="text" id="time" name="time" placeholder="Time" value="`+z+`"><br>
<input type="text" id="hospital" name="hospital" placeholder="Hoapital Charge" ><br>
<input type="text" id="total" name="total" placeholder="Total"><br>

</form> 
<button id="save" type="submit" style="background-color:rgba(26, 144, 143, 1); margin-left: 500px; margin-top:-40px"><b>Add</b></button>
</div>

 
<div id="tbl">   

<div class="tbl">

<table id="jana"  style="margin-left: 250px; margin-top:70px; color:rgba(26, 144, 143, 1); font-size:20px">
    <tr >
        
        <th style="padding-right:80px;" >Date</th>
        <th style="padding-right:80px" >Time</th>
        <th style="padding-right:80px">Hospital Charge</th>
        <th style="padding-right:80px">Total</th>
        <th style="padding-right:80px">Patient Id</th>
        <th style="padding-right:80px">Room</th>
        <th style="padding-right:80px"></th>
        <th style="padding-right:80px"></th>
       
    </tr>

      
</table>





</div>

</div>         
  
`;
    }


}

customElements.define('add-appointment', addAppointment)