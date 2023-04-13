import { addDoctor } from './addDoctor.js';

const { ipcRenderer } = require('electron');
export class updateDoctor extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }


    connectedCallback() {

        var upreply = ipcRenderer.sendSync('updateItemdoc', this.getAttribute("updateid"));
        console.log(upreply);
        this.render(upreply);
        const submit = this.shadowRoot.querySelector('#save');
        submit.addEventListener('click', () => {
            
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
              obj.id= this.getAttribute("updateid");
            obj.path=x.files[0].path;
            obj.name=x.files[0].name;
            ipcRenderer.send("updateDoctor", obj);
            document.getElementById("main-body").innerHTML = "<add-doctor></add-doctor>";
           

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
        <input type="text" id="fname" name="fname" placeholder="Name" style="margin-top:30px" value="`+upreply[0].name+`"><br>
        <input type="text" id="specialty" name="specialty" placeholder="Specialty" value="`+upreply[0].specialty+`"><br>
        <input type="text" id="workingdays" name="workingdays" placeholder="Working Days" value="`+upreply[0].workingdays+`"><br>
        <input type="text" id="time" name="time" placeholder="Time Take per an Appointment" value="`+upreply[0].toapatient+`"><br>
        <input type="text" id="fee" name="fee" placeholder="Fee" value="`+upreply[0].fee+`"><br>
        <input type="text" id="start" name="start" placeholder="Start" value="`+upreply[0].start+`"><br>
        <input type="text" id="end" name="end" placeholder="Start" value="`+upreply[0].end+`"><br>
        <input type="text" id="phone" name="phone" placeholder="Phone Number" value="`+upreply[0].phone+`"><br>
        <input type="text" id="room" name="room" placeholder="Room Number" value="`+upreply[0].room+`"><br>
        <input type="file" id="myFile" name="filename" placeholder="choose a photo" style="margin-bottom:-180px;" >
        </form> 
        <button id="save" type="submit" style="background-color:rgba(26, 144, 143, 1); margin-left: 500px; margin-top:-40px"><b>Update</b></button>
        </div>
        
                
        
          
        `;
            }
        
        
        }



customElements.define('update-doctor', updateDoctor)