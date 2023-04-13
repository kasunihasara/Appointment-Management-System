const { ipcRenderer } = require('electron');
export class newpatient extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {

        this.render()
        const submit = this.shadowRoot.querySelector('#save');
        var reply = ipcRenderer.sendSync('newpatient', 'a string');
        this.newtable(reply);
        submit.addEventListener('click', async () => {
        
            
            const id = this.shadowRoot.querySelector('#id');
            const age = this.shadowRoot.querySelector('#age');
            const gender = this.shadowRoot.querySelector('#gender');
            const address = this.shadowRoot.querySelector('#address');
            const details= this.shadowRoot.querySelector('#details');
            const x = this.shadowRoot.querySelector('#myFile');
            let obj = JSON.parse('{"id":"' + id.value + '", "age": "' + age.value + '", "gender": "' + gender.value + '","address": "' + address.value + '","details": "' + details.value + '"}');
            obj.path=x.files[0].path;
            obj.name=x.files[0].name;
            await ipcRenderer.send("addPatient", obj);
            
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
                   row.insertCell(0).innerHTML = reply[i].name;
                   row.insertCell(1).innerHTML = reply[i].age;
                   row.insertCell(2).innerHTML = reply[i].gender;
                   row.insertCell(3).innerHTML = reply[i].phone;
                   row.insertCell(4).innerHTML = reply[i].address;
                   row.insertCell(5).innerHTML = reply[i].details;
                   //row.insertCell(6).innerHTML = `<a href='uploadpatient'>Reports</a>`;
                   row.insertCell(6).innerHTML = "<img src='uploadpatient/"+ reply[i].photo +"' style='width:100px; heigth:100px; padding-right:80px'>";
              
                   
       
                  
       
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

<div class="form"> 
<form action="/action_page.php" >
<input type="text" id="id" name="id" placeholder="ID" style="margin-top:30px"><br>
<input type="text" id="age" name="age" placeholder="Age"><br>
<input type="text" id="gender" name="gender" placeholder="Gender"><br>
<input type="text" id="address" name="address" placeholder="Address"><br>
<input type="text" id="details" name="details" placeholder="Details"><br>
<input type="file" id="myFile" name="filename" placeholder="choose a photo" style="margin-bottom:-180px;">
</form> 
<button id="save" type="submit" style="background-color:rgba(26, 144, 143, 1); margin-left: 500px; margin-top:-40px"><b>Add</b></button>
</div>
   
<div id="tbl">   

<div class="tbl">

<table id="jana"  style="margin-left: 250px; margin-top:50px; color:rgba(26, 144, 143, 1); font-size:20px">
    <tr >
        
        <th style="padding-right:80px;" >Name</th>
        <th style="padding-right:80px" >Age</th>
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

customElements.define('new-patient', newpatient)