
import { SkynetClient } from "skynet-js";

const client = new SkynetClient("https://siasky.net");
const name = "testcreateskykey";

window.display = function (show) {
  (async() => {
    if (show == 'display-Upload'){
      document.getElementById('upload').style.display='block';
      document.getElementById('download').style.display='none';
    }
    if (show == 'display-Download'){
      document.getElementById('download').style.display='block';
      document.getElementById('upload').style.display='none';
    }
  }) ();
  
}

window.showEncryption = function(show){
  var check = document.getElementById('encryptionCheck-u');
  var check2 = document.getElementById('encryptionCheck-d');

  (async () => {
    if (show == 'encryptionCheck-u'){
      if(check.checked == true){
        document.getElementById('skykey_Text').style.display='inline-block';
        document.getElementById('skykey').style.display='inline-block';
        document.getElementById('encryptionCheck-d').checked=false;
      }
      if(check.checked == false) {
        document.getElementById('skykey_Text').style.display='none';
        document.getElementById('skykey').style.display='none';
      }
    }
  }) ();

  (async () => {
    if (show == 'encryptionCheck-d'){
      if(check2.checked == true){
        document.getElementById('skykey_Text2').style.display='inline-block';
        document.getElementById('skykey-download').style.display='inline-block';
        document.getElementById('encryptionCheck-u').checked= false;
      }
      if(check2.checked == false){
        document.getElementById('skykey_Text2').style.display='none';
        document.getElementById('skykey-download').style.display='none';
      }
    }
  }) ();
  
  return false;

}
window.uploadFileEncryption = function(file , skykey) {

    try {
      (async() => {

        if(file == null){
          alert("Please send the file to upload")
        }
        
        document.getElementById('skylinkDisplay').text = "";
        if(skykey == "" && document.getElementById('encryptionCheck-u').checked == true){
          alert("Please Enter the skyKey");
          return;
        } 

        if(skykey == "" && document.getElementById('encryptionCheck-u').checked == false){
          const { skylink } = await client.upload(file);
          document.getElementById('skylinkDisplay').text = "Skylink : " + skylink;
          document.getElementById('skylinkDisplay').href = "https://siasky.net/" + skylink;
          console.log(`Upload successful, skylink: ${skylink}`);
        } 
        else{
          const { skylink } = await client.upload(file,{skykey : skykey});
          document.getElementById('skylinkDisplay').text = "Skylink : " + skylink;
          document.getElementById('skylinkDisplay').href = "https://siasky.net/" + skylink;
          console.log(`Upload successful, skylink: ${skylink}`);
        }
               
      }) ();
    } catch (error) {
      console.log(error);
    }
  }

  window.downloadFileEncryption = function(skylink , skykey){
    try {
      (async () => {

        if(skylink == "" && skykey == ""){
          alert("Please Enter the SkyKey & SkyLink to download");
          return;
        }
        if(skylink == ""){
          alert("Please Enter the SkyLink to download");
          return;
        }       

        document.getElementById('skylinkMsg2').text = "";
        if(skykey == "" && document.getElementById('encryptionCheck-d').checked == true){
          alert("Please Enter the skyKey");
          return;
        } 
    
        if(skykey == "" && document.getElementById('encryptionCheck-d').checked == false){
          await client.download(skylink);
        } 
        else{
          await client.download(skylink,{skykey : skykey});
        }
       
        document.getElementById('skylinkMsg2').text = "Download Successful";
    })();
    } catch (error) {
      console.log(error)
    }
  }

 
