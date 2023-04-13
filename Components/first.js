const template = document.createElement('template');
template.innerHTML = `
<style>
.image{
    margin-top:-120px;
    height:740px;
    width:690px;
}

.topic{
    background-color:rgba(26, 144, 143, 1);
    margin-left:890px;
    margin-top:-704px;
    font-size: 20px;
    color:rgb(255, 255, 255);
    width:458px;
    height:676px;
    }

.button{
    
    margin-top: 50px;
    color:rgba(26, 144, 143, 1);
    background-color: rgb(255, 255, 255);
    border: none;
    width: 130px;
    height: 45px;
    font-size: 20px;
    margin-left:180px;
    }
    
</style>
<div class="in">
<img class="image" src="images/Group 18.png">
<div class="topic">
<h1 style="margin-left:140px; padding-top:180px;">HOSPITAL</h1>
<h1 style="margin-left:90px; ">MANAGEMENT</h1>
<h1 style="margin-left:160px;">SYSTEM</h1>
<a onclick="login()"><button class="button">Log In</button></a>
</div>

</div>
  
`;

export class Test extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }

}

window.customElements.define('test-zero', Test)