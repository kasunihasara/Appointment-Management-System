import { addCustomer } from './addCustomer.js';

const { ipcRenderer } = require('electron');
export class updateCustomer extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }


    connectedCallback() {

        var upreply = ipcRenderer.sendSync('updateItem', this.getAttribute("updateid"));
        console.log(upreply);
        this.render(upreply);
        const submit = this.shadowRoot.querySelector('#save');
        submit.addEventListener('click', () => {
            
            const fn = this.shadowRoot.querySelector('#fname');
            const pn = this.shadowRoot.querySelector('#phone');
            const address = this.shadowRoot.querySelector('#address');
            const email = this.shadowRoot.querySelector('#email');
            const pass = this.shadowRoot.querySelector('#pass');
            const user = this.shadowRoot.querySelector('#user');
            const x = this.shadowRoot.querySelector('#myFile');

            let obj = JSON.parse('{"fname":"' + fn.value + '", "phone": "' + pn.value + '","address": "' + address.value + '","email": "' + email.value + '","user": "' + user.value + '",  "pass": "' + pass.value + '"}');
            obj.id= this.getAttribute("updateid");
            obj.path=x.files[0].path;
            obj.name=x.files[0].name;
            ipcRenderer.send("updateCustomer", obj);
            document.getElementById("main-body").innerHTML = "<add-customer></add-customer>";
           

        })

        const logout = this.shadowRoot.querySelector('#logout');
        logout.addEventListener('click', async () => {
            onclick = new login();
                      
         });

    }


    render(upreply) {
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
            margin-top:40px;
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
        <input type="text" id="fname" name="fname" placeholder="Name" style="margin-top:30px" value="`+upreply[0].name+`"><br>
        <input type="text" id="phone" name="phone" placeholder="Phone Number" value="`+upreply[0].phone+`"><br>
        <input type="text" id="pass" name="pass" placeholder="Password" value="`+upreply[0].password+`"><br>
        <input type="text" id="address" name="address" placeholder="Address" value="`+upreply[0].address+`"><br>
        <input type="text" id="email" name="email" placeholder="Email" value="`+upreply[0].email+`"><br>
        <input type="text" id="user" name="user" placeholder="Username" value="`+upreply[0].username+`"><br>
        <input type="file" id="myFile" name="filename" placeholder="choose a photo" style="margin-bottom:-180px;">
        
        </form> 
        <button id="save" type="submit" style="background-color:rgba(26, 144, 143, 1); margin-left: 500px; margin-top:-40px"><b>Update</b></button>
        </div>
        
                
            
       
        `;
            }
        
        
        }



customElements.define('update-customer', updateCustomer)