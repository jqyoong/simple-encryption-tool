var regexpG = /^[A-Z]+$/; // ^ equal start of line, [a-zA-Z]+ equal one of more chars, $ equal end of line,define as global variable
var save_file_name= "";
function KeyCipher()
{
    var keyInput = document.getElementById("keycipherinput").value; //get the value from textarea and assign to var keyinput
    var keyToUpper = keyInput.toUpperCase(); //change keyinput value to upper case and assign to var keyToUpper
    if(keyToUpper.match(regexpG))
    {
        document.getElementById("ciphertext").innerHTML = Validate(keyToUpper); //assign keyToUpper to innerHTML and shown on the place with id=ciphertext
    }
    else
    {
        alert("Please enter alphabet letters only.");
    }
}

function KeyCipherEncryption()
{
    var textfile = document.getElementById("cipherinputfile").files[0]; //get file object
    var fileExtension = /text.*/; //set file extension

    if (textfile.type.match(fileExtension))  //check whether file extension match
    {
        var readFile = new FileReader(); //initialize readFile as FileReader object to read file
        readFile.onload = function()
        {
            var fileContent = readFile.result.toUpperCase();
            var textresult = "";
            var plainText = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var cipherText = document.getElementById("ciphertext").textContent;
            for(var i = 0; i < fileContent.length; i++ )
            {
                if(!fileContent.charAt(i).match(regexpG))
                {
                    textresult += fileContent.charAt(i);
                }
                for(var j = 0; j < plainText.length; j++)
                {
                   if(plainText.charAt(j) === fileContent.charAt(i))//&& fileContent.charAt(i) >= "A" && fileContent.charAt(i) <= "Z"
                   {
                       textresult += cipherText.charAt(j);
                    }
                }
            }
            save_file_name = "EncryptedCipherText.txt";
            save_as_text_file(textresult,save_file_name);//call save txt function
        };
        readFile.readAsText(textfile);  //read textfile, once finished, result attribute contains textfile's contents as text string
    } else
    {
        document.getElementById("cipher_textfiledisplayed").innerHTML = "File not supported!" // if file extension not match then show this as error message
    }
}
function KeyCipherDecryption()// decryption of rail fence, use back same key just reverse plaintext value and ciphertext value
{
    var textfile = document.getElementById("cipherinputfile").files[0]; //get file object
    var fileExtension = /text.*/; //set file extension

    if (textfile.type.match(fileExtension))  //check whether file extension match
    {
        var readFile = new FileReader(); //initialize readFile as FileReader object to read file
        readFile.onload = function()
        {
            var fileContent = readFile.result.toUpperCase();
            var textresult = "";
            var plainText = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var cipherText = document.getElementById("ciphertext").textContent;
            for(var i = 0; i < fileContent.length; i++ )
            {
                if(!fileContent.charAt(i).match(regexpG))
                {
                    textresult += fileContent.charAt(i);
                }
                for(var j = 0; j < cipherText.length; j++)
                {
                   if(cipherText.charAt(j) === fileContent.charAt(i))//&& fileContent.charAt(i) >= "A" && fileContent.charAt(i) <= "Z"
                   {
                       textresult += plainText.charAt(j);
                    }
                }
            }
            save_file_name = "DecryptedCipherText.txt";
            save_as_text_file(textresult,save_file_name);//call save txt function
        };
        readFile.readAsText(textfile);  //read textfile, once finished, result attribute contains textfile's contents as text string
    } else
    {
        document.getElementById("cipher_textfiledisplayed").innerHTML = "File not supported!" // if file extension not match then show this as error message
    }
}

function Validate(keyToUpper)
{
    var hasDuplicates = (/([A-Z]).*?\1/).test(keyToUpper); //[a-zA-Z] letter captured in first group; .*? zero or more char where ? denotes as few as possible; \1 until it find a first matched char ==> to test whether has duplicate char

    if(keyToUpper.match(regexpG) && keyToUpper.length === 26 && !hasDuplicates)
    {
        return keyToUpper;

    }else if (keyToUpper.match(regexpG) && keyToUpper.length === 25 && !hasDuplicates)
    {
        var plainText = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var regexp = new RegExp('\[^'+ keyToUpper +'\]', 'g'); //any char in \[^keyToUpper\] notincluded
        var newPlainText = plainText.match(regexp).join(""); //join the remainder chars together
        keyToUpper += newPlainText; //add the last char to var keyToUpper

    }else
    {
        var unique = ''; // initial to empty
        var temp = ''; // initial to empty
        var plainText = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for(var i=0; i<keyToUpper.length; i++)
        {
            temp += keyToUpper.charAt(i); //concatenate every char at i and assign to temp
            for(var j=i+1; j<keyToUpper.length; j++)
            {
                if(keyToUpper.charAt(i) !== keyToUpper.charAt(j))
                {
                    unique += keyToUpper.charAt(j); //compare two consecutive char, if not equal then add char at j to var unique
                }
            }
            keyToUpper = temp + unique; // concatenate var temp with var unique to become new keyToUpper
            unique = ''; // initial to empty
        }

        var regexp = new RegExp('\[^'+ keyToUpper +'\]', 'g'); //any char in \[^keyToUpper\] notincluded
        var newPlainText = plainText.match(regexp).join(""); //join the remainder chars together
        var newPlainChar = "";

        if (keyToUpper.length === 25)
        {
            var regexp = new RegExp('\[^'+ keyToUpper +'\]', 'g'); //any char in \[^keyToUpper\] notincluded
            var newPlainText = plainText.match(regexp).join(""); //join the remainder chars together
            keyToUpper += newPlainText; //add the last char to var keyToUpper
        }else
        {
            for(var i=0; i<newPlainText.length; i++ ) //
            {
                i = 0; // initialize to 0 again
                newPlainChar = newPlainText.charAt(i); // assign first element of new remaining plaintext to Char
                keyToUpper += newPlainChar; //add selected char to original var keyToUpper
                regexp = new RegExp('\[^'+ keyToUpper +'\]', 'g'); //use new var keyToUpper to get chars not included in \[^keyToUpper\]
                newPlainText = plainText.match(regexp).join(""); //join remainder chars again
            }
            regexp = new RegExp('\[^'+ keyToUpper +'\]', 'g'); //use new var keyToUpper to get chars not included in \[^keyToUpper\]
            newPlainText = plainText.match(regexp).join(""); //join remainder chars again
            keyToUpper += newPlainText; //add the last char to var keyToUpper
        }
    }
    return keyToUpper;
}

function RailFenceCipherEncrypt(){

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
    var row = receiveRow();
    if(row > 1)//encrypt the text only when input row number is 2 or greater number
    {
        var textrailfence = document.getElementById("textrailfence").files[0]; //get file object
        var fileExtension = /text.*/; //set file extension
        //check whether file extension match
        if (textrailfence.type.match(fileExtension))
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
                        textarray[controlrow].splice(comparelength,0,textcontentarray[comparelength]);//replace the array emptystring with the letter
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
                save_file_name = "EncryptedRailFenceText.txt";
                save_as_text_file(textresult,save_file_name);//result save as text file
            }
            readFile.readAsText(textrailfence);//read textfile, once finished, result attribute contains textfile's contents as text string
            //readFile.readAsArrayBuffer(textfile);
        }else{
            document.getElementById("railfence_textfiledisplayed").innerHTML = "File not supported!" // if file extension not match then show this as error message
        }
    }else if(row <=1 )//if row is smaller or equal to 1 will not run the program as cannot encrypt with 1 row.
    {
        alert("Please input row number greater than 1");
    }
}
function receiveRow(){
    var temprow = document.getElementById("inputRownumber").value;
    //document.getElementById("displayRownumber").innerHTML = temprow;
    return temprow;
}

function RailFenceCipherDecrypt(){

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
    var row = receiveRow();
    if(row > 1)//encrypt the text only when input row number is 2 or greater number
    {
        var textrailfence = document.getElementById("textrailfence").files[0]; //get file object
        var fileExtension = /text.*/; //set file extension
        //check whether file extension match
        if (textrailfence.type.match(fileExtension))
        {
            var readFile = new FileReader(); //initialize readFile as FileReader object to read file
            var regexp = /^[A-Z]+$/
            readFile.onload = function(){
                var fileContent = readFile.result.toUpperCase();
                for(var i = 0; i < fileContent.length; i++ )//put file string into value string
                {
                    if(fileContent.charAt(i).match(regexp))//take only alphabets
                    {
                        textcontentarray += fileContent.charAt(i);
                    }
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
                        if(textarray[controlrow][comparelength]==emptystring)
                        {
                             textarray[controlrow].splice(comparelength,1,"A");//replace the array emptystring with the letter
                        }
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
                        else if(comparelength+1>=textcontentarray.length){//end the while loop by assign the controlrow value exceed the row condition in while loop
                            controlrow=row+1;
                        }
                    }
                }
                comparelength=0;//set the comparelength back to 0 again.
                while(comparelength<textcontentarray.length)//compare with the total textcontentarray length, comparelength initialize with 0 value
                {
                    for(var i=0;i<row;i++)
                    {
                        for(var j=0;j<textarray[i].length;j++)
                        {
                            if (textarray[i][j] == "A")
                            {
                                textarray[i].splice(j,1,textcontentarray[comparelength]);//replace the array emptystring with the letter//push double dimensional array into single array
                                comparelength++;
                            }
                        }
                    }
                }
                comparelength=0;
                controlrow=0;
                while(comparelength<textcontentarray.length)//compare with the total textcontentarray length, comparelength initialize with 0 value
                {
                    while(controlrow<row)//control the row number,controlrow initialize with 0 value
                    {
                        textjoin.push(textarray[controlrow][comparelength]);//push double dimensional array into single array
                        comparelength++;//after finish adding then increase the comparelength until its reach the textcontentarray length.
                        if(controlrow == 0)//initialize control direction to bottom at first, then control row direction to bottom when it reach top row.
                        {
                            controldirection = 0;
                        }
                        else if(controlrow+1== row)//control row direction to know when need back to top row when it reach bottom row.
                        {
                            controldirection = 1;
                        }
                        if(controldirection ==0 && comparelength<=textcontentarray.length)//control row direction to bottom
                        {
                            controlrow++;

                        }else if(controldirection ==1 && comparelength<=textcontentarray.length){//control direction back to top
                            controlrow--;
                        }
                        else if(comparelength+1>=textcontentarray.length){//end the while loop by assign the controlrow value exceed the row condition in while loop
                            controlrow=row+1;
                        }
                    }
                }
                textresult = textjoin.join('');//remove all comma when join with two or more array
                save_file_name = "DecryptedRailFenceText.txt";
                save_as_text_file(textresult,save_file_name);//result save as text file
            }
            readFile.readAsText(textrailfence);//read textfile, once finished, result attribute contains textfile's contents as text string
        }else{
            document.getElementById("railfence_textfiledisplayed").innerHTML = "File not supported!" // if file extension not match then show this as error message
        }
    }else if(row <=1 )//if row is smaller or equal to 1 will not run the program as cannot encrypt with 1 row.
    {
        alert("Please input row number greater than 1");
    }
}


function save_as_text_file(textresult,save_file_name) //parse the text value in
{
    var textfileblob = new Blob([textresult], {type:'text/plain'}); // initialize a new blob that contains the raw data
    var Filename = save_file_name; // file name to be saved

    var downloadLink = document.createElement("a");// initialize a link for js
    downloadLink.download = Filename; //name of the file for the link
    downloadLink.innerHTML = "Text File";//text for the link, it is hidden
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
    document.body.removeChild(event.target); // remove the link from the DOM
}
