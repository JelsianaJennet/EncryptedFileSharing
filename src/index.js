
import { SkynetClient } from "skynet-js";

const client = new SkynetClient("https://siasky.net");
const name = "testcreateskykey";
// const myskykey ="skykey:AUI0eAOXWXHwW6KOLyI5O1OYduVvHxAA8qUR_fJ8Kluasb-ykPlHBEjDczrL21hmjhH0zAoQ3-Qq"

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
  
  return false;
}
window.uploadFileEncryption = function(file , skykey) {

if(file == null){
  this.alert("Please send the file to upload")
}

    try {
      (async() => {
        if(skykey == null || skykey == ""){
          if(document.getElementById('skylinkMsg').text == ""){
            document.getElementById('skylinkMsg').text = "Please Enter SkyKey or Select Upload again to proceed with deafult Skykey.";
            return;
          }
          else{
            skykey = "AUI0eAOXWXHwW6KOLyI5O1OYduVvHxAA8qUR_fJ8Kluasb-ykPlHBEjDczrL21hmjhH0zAoQ3-Qq";
          }      
          
        }

        const { skylink } = await client.upload(file,{skykey : skykey});
        document.getElementById('skylinkDisplay').text = "Skylink :" + skylink;
        document.getElementById('skylinkMsg').text = "SkyKey : " + skykey;
        console.log(`Upload successful, skylink: ${skylink}`);
      }) ();
    } catch (error) {
      console.log(error);
    }
  }

  window.downloadFileEncryption = function(skylink , skykey){

    if(skylink == "" && skykey == ""){
      alert("Please Enter the SkyKey & SkyLink to download");
      return;
    }
    if(skylink == ""){
      alert("Please Enter the SkyLink to download");
      return;
    }
    if(skykey == ""){
      alert("Please Enter the SkyKey to proceed");
      return;
    }

    try {
      (async () => {
        await client.download(skylink,{skykey : skykey});
        document.getElementById('skylinkMsg2').text = "Download Successful"
    })();
    } catch (error) {
      console.log(error)
    }
  }
