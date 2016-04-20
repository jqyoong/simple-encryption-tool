var regexpG = /^[A-Z]+$/; // ^ equal start of line, [a-zA-Z]+ equal one of more chars, $ equal end of line,define as global variable
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

function Encryption()
{       
    var textfile = document.getElementById("textfile").files[0]; //get file object
    var fileExtension = /text.*/; //set file extension
   
    if (textfile.type.match(fileExtension))  //check whether file extension match
    {
        var readFile = new FileReader(); //initialize readFile as FileReader object to read file       
        readFile.onload = function() 
        {
            var fileContent = readFile.result.toUpperCase();
            var alpha = "";
            var plainText = document.getElementById("plaintext").innerHTML;           
            var cipherText = document.getElementById("ciphertext").innerHTML;
            for(var i = 0; i < fileContent.length; i++ )
            {   
                if(!fileContent.charAt(i).match(regexpG))
                {
                    alpha += fileContent.charAt(i);
                }
                for(var j = 0; j < plainText.length; j++)
                {
                   if(plainText.charAt(j) === fileContent.charAt(i))//&& fileContent.charAt(i) >= "A" && fileContent.charAt(i) <= "Z"
                   {                         
                       alpha += cipherText.charAt(j);                                              
                    }                                          
                }                 
            }                      
            save_as_text_file(alpha);//call save txt function
        };
        readFile.readAsText(textfile);  //read textfile, once finished, result attribute contains textfile's contents as text string
    } else 
    {
        document.getElementById("textfiledisplayed").innerHTML = "File not supported!"; // if file extension not match then show this as error message
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
			var plainText = document.getElementById("plaintext").textContent;
			var regexp = new RegExp('\[^'+ keyToUpper +'\]', 'g'); //any char in \[^keyToUpper\] notincluded
            var newPlainText = plainText.match(regexp).join(""); //join the remainder chars together
			keyToUpper += newPlainText; //add the last char to var keyToUpper
			
		}else
        {
            var unique = ''; // initial to empty
            var temp = ''; // initial to empty
            var plainText = document.getElementById("plaintext").textContent;
            
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

function save_as_text_file(alpha) //parse the text value in
{
    var textfileblob = new Blob([alpha], {type:'text/plain'}); // initialize a new blob that contains the raw data
    var Filename = "encrpytedpartA.txt"; // file name to be saved

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

