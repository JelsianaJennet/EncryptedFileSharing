
import { SkynetClient } from "skynet-js";

//const client =new SkynetClient();

window.createMediaPage = function (mainMediaFile){
    const pageContent =''

    const mediaFolder ={
        "index.html": new File(),
        "media.jpg" : mainMediaFile
    }
    try{
        (async() => {
            const {skyLink} = await client.uploadDirectory(mediaFolder, 'mediaFolder')
            let directlink ="/"+skylink+"/";
            this.document.getElementById("mediaLink").href= directlink;
            this.document.getElementById("mediaLink").text=skyLink;
        }) ();
        }
        catch(error){
            this.console.log(error);
    }
    
}
/*
const name = "testcreateskykey";

async function createSkykeyExample() {
  try {
    const client = new SkynetClient();
    const skykey = await client.createSkykey(name, "private-id");
  } catch (error) {
    console.log(error)
  }
}*/

window.createSkykeyExample = async function (s) {
    const name = "testcreateskykey";
    try{
        
            const client =new SkynetClient();
            const skykey = await client.createSkykey(name, "private-id");
            console.log(skykey);
        
    }catch(error){
        alert(error);
        console.log(error);
    }
}

window.uploadFileEncryption = async function(file,skyKeyName) {
    try {
      const client = new SkynetClient();
      const { skylink } = await client.upload(file, { skykeyName: skyKeyName });
      this.console.log(skylink);
    } catch (error) {
      console.log(error);
    }
  }

  window.downloadFileEncryption = async function(skylink){
    //const skylink = "XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg";
    try {
      const client = new SkynetClient();
      client.download(skylink);
    } catch (error) {
      console.log(error)
    }
  }