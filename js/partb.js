function RailFenceCipher(){

	var textcontent=[];
	var textcontentarray=[];
	var textarray=[];
    var textjoin=[]
	var textresult=[];
	var comparelength=0;
	var controlrow=0;
	var controldirection=0;
	var textstring;
	var emptystring="";
    var row = partbreceiveRow();
    if(row > 1)//encrypt the text only when input row number is 2 or greater number
    {
        var textpartb = document.getElementById("textpartb").files[0]; //get file object
        var fileExtension = /text.*/; //set file extension
        //check whether file extension match
        if (textpartb.type.match(fileExtension))
        {
            var readFile = new FileReader(); //initialize readFile as FileReader object to read file
            var regexp = /^[A-Z]+$/       
            readFile.onload = function(){
                var fileContent = readFile.result.toUpperCase();
                for(var i = 0; i < fileContent.length; i++ )//put file string into value string
                {   
                    if(fileContent.charAt(i).match(regexp))//take only alphabets
                    {
                        textcontent += fileContent.charAt(i);
                    }
                    
                }
                textcontent = textcontent.replace(/\s| /g,'');//take out all spaces
                for(var j=0;j<textcontent.length;j++)//convert whole txt file string text into single array string
                {
                
                    textcontentarray.push(textcontent[j]);
                }
                for(var i=0;i<row;i++)//initialize an empty double dimensional array dynamic row with user input row number
                {
                    textarray[i]=new Array();
                    for(var j=0;j<textcontentarray.length;j++)
                        {
                            textarray[i][j]=emptystring;
                        }
                }


                while(comparelength<textcontentarray.length)//compare with the total textcontentarray length, comparelength initialize with 0 value
                {
                    while(controlrow<row)//control the row number,controlrow initialize with 0 value
                    {
                        textarray[controlrow].splice(comparelength,1,textcontentarray[comparelength]);//replace the array emptystring with the letter
                        comparelength++;//after finish adding then increase the comparelength until its reach the textcontentarray length.
                        if(controlrow == 0)//control row direction count to know when is limit to bottom
                        {
                            controldirection = 0;
                        }
                        else if(controlrow+1== row)//control row direction count to know when need back to top
                        {
                            controldirection = 1;
                        }
                        if(controldirection ==0 && comparelength<=textcontentarray.length)//control row direction to bottom
                        {
                            controlrow++;

                        }else if(controldirection ==1 && comparelength<=textcontentarray.length){//control direction back to top
                            controlrow--;
                        }   
                        else if(comparelength+1>=textcontentarray.length){//end the while loop by increase the controlrow exceed the row condition in while loop
                            controlrow=row+1;
                        }
                    }
                }
                for(var i=0;i<textarray.length;i++)
                {
                    for(var j=0;j<textarray[i].length;j++)
                    {
                        if (textarray[i][j] !== "")
                        {
                            textjoin.push(textarray[i][j]);//push double dimensional array into single array
                        }
                    }
                }
                textresult = textjoin.join('');//remove all comma when join with two or more array
                save_as_text_file_partb(textresult);//result save as text file
            }
            readFile.readAsText(textpartb);//read textfile, once finished, result attribute contains textfile's contents as text string
            //readFile.readAsArrayBuffer(textfile);
        }else{
            document.getElementById("partbtextfiledisplayed").innerHTML = "File not supported!" // if file extension not match then show this as error message
        }
    }else if(row <=1 )//if row is smaller or equal to 1 will not run the program as cannot encrypt with 1 row.
    {
        alert("Please input row number greater than 1");
    }
}
function partbreceiveRow(){
    var temprow = document.getElementById("inputRownumber").value;
    document.getElementById("displayrownumber").innerHTML = temprow;
    return temprow;
}

//save file functions
function save_as_text_file_partb(textresult){//parse the text value in
    var textfileblob = new Blob([textresult], {type:'text/plain'}); // initialize a new blob that contains the raw data
    var Filename = "encrpytedpartB.txt"; // file name to be saved

    var downloadLink = document.createElement("a");// initialize a link for js
    downloadLink.download = Filename; //name of the file for the link
    downloadLink.innerHTML = "TextName";//text for the link, it is hidden
    if (window.webkitURL != null) //able to work in webkit 
    {
        downloadLink.href = window.webkitURL.createObjectURL(textfileblob);
    }
    else
    {
        downloadLink.href = window.URL.createObjectURL(textfileblob); // link object
        downloadLink.onclick = destroyClickedElement; // call function to remove it so can use 2nd time
        downloadLink.style.display = "none"; //link is hidden
        document.body.appendChild(downloadLink); // add link to dom
    }
 
    downloadLink.click();//click the link
}

function destroyClickedElement(event)
{
// remove the link from the DOM
    document.body.removeChild(event.target);
}
