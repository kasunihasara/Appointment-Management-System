const { ipcRenderer } = require('electron');
export class login extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {
        
        this.render()
        const submit = this.shadowRoot.querySelector('#save');
        var reply = ipcRenderer.sendSync('admin', 'a string');
        var reply1 = ipcRenderer.sendSync('admin1', 'a string');
        submit.addEventListener('click', async () => {
            
            const fn = this.shadowRoot.querySelector('#fname');
            const pn = this.shadowRoot.querySelector('#pass');
            var na=fn.value;
            var pas=pn.value;
           
             if((na == reply[0].username) && pas == reply[0].password ){
                testing();
             }
             else{
                for(var i=0;i<reply1.length;i++){
                    console.log(reply1[i].password );
                if(na == reply1[i].username && pas == reply1[i].password){
                   employee();
                }
             }}
           
        

        });

    }


    
       

render() {
        this.shadowRoot.innerHTML = `
<style>

input[type=text] {
    width:300px;
    heigth:20px;
    padding:10px;
    margin-bottom:10px;
    border-radius:10px;
    border-color:rgba(26, 144, 143, 1);
    color:rgba(26, 144, 143, 0.56);
} 

.form{
    margin-left:500px;
    margin-top:150px;
    background-color:rgba(26, 144, 143, 1);
    width:350px;
    height:300px;
    padding-left:50px;
    padding-top:50px;
}
button{
    width: 90px; 
    height:38px;  
    border:none; 
    
    cursor: pointer;
    padding: 3px; 
    border-radius:12px;
    color:rgba(26, 144, 143, 1);
}

</style>


<div class="form"> 
<form action="/action_page.php" >
<input type="text" id="fname" name="fname" placeholder="Username" style="margin-top:30px"><br>
<input type="text" id="pass" name="pass" placeholder="Password"><br>
</form> 
<button id="save" type="submit" style="background-color:white; margin-left: 110px; margin-top:40px"><b>Log In</b></button>
</div>
        
  
`;
    }


}

customElements.define('log-in', login)