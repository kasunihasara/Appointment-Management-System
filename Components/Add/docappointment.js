const { ipcRenderer } = require('electron');
export class docappointment extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {

        this.render()
       
        var reply = ipcRenderer.sendSync('docappointment', 'a string');
        this.newtable(reply);
       
        const logout = this.shadowRoot.querySelector('#logout');
        logout.addEventListener('click', async () => {
            onclick = new login();
                      
         });
       
    }


    newtable(reply){
  
        const table = this.shadowRoot.querySelector('#jana');
               
               for (let i=0; i < reply.length; i++) {
                
                   const row = table.insertRow(i + 1);
                   row.insertCell(0).innerHTML =`<a onclick='appointmentDetails(${reply[i].did})'>`+reply[i].name+`</a>`;           
                      
       
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

  th, td {
    text-align: left;
    padding: 10px;
    width:150px;
    border-radius:12px;
    padding-right:80px;
     
  }
  
  tr {
    padding-bottom:10px;
    background-color: rgba(26, 144, 143, 1);
    

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

<table id="jana"  style="margin-left: 250px; margin-top:50px; padding-top:150px;  color:white; font-size:20px">
    <tr></tr>

      
</table>





</div>

</div>         
  
`;
    }


}

customElements.define('doc-appointment', docappointment)