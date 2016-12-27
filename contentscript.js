var bad_phrases = {"SJW(?!s)":"person_singular",
    "social justice warrior(?!s)":"person_singular",
    "femi?nazi(?!s)":"person_singular",
    "SJWs":"person_plural",
    "social justice warriors":"person_plural",
    "femi?nazis":"person_plural",
    "political(ly)? correct(ness)?":"thing"
};

var personPlural = ["kind people",
    "ones who care for others",
    "compassionate individuals",
    "people who want to make the world better"];

var personSingular = ["kind person",
    "one who cares for others",
    "compassionate individual",
    "person who wants to make the world better"];

var thing = ["empathy",
    "respect for others",
    "compassion and awareness"];

function exactReplace(text, phrase, ind){
    var type = bad_phrases[phrase];
    var betterStatements = [];
    switch(type){
        case "person_singular":
            betterStatements = personSingular;
            break;
        case "person_plural":
            betterStatements = personPlural;
            break;
        default:
            betterStatements = thing;
    }
    var newIndex = Math.floor(Math.random()*betterStatements.length);
    var newPhrase = betterStatements[newIndex];
    if(text[ind] == text[ind].toUpperCase()){
        newPhrase = newPhrase[0].toUpperCase()+newPhrase.slice(1);
    }
    var newText = text.replace(new RegExp(phrase, "i"), newPhrase);
    return newText;
}

function replaceWords(text){
    for(var phrase in bad_phrases){
        while(text.search(new RegExp(phrase, "i"))!=-1){
            text = exactReplace(text,phrase,text.search(new RegExp(phrase, "i"))); 
        }
    }
    return text;
}

function doReplacement(isOn){
    if(isOn){
        var elements = document.getElementsByTagName('*');

        for(var i=0; i<elements.length; i++){
            var elem = elements[i];
            for(var j=0; j<elem.childNodes.length; j++){
                var node = elem.childNodes[j];
                if(node.nodeType === 3){

                    var text = node.nodeValue;
                    newText = replaceWords(text);
                    if(newText !== text){
                        elem.replaceChild(document.createTextNode(newText), node);
                    }
                }
            }
        }
    }
}

chrome.runtime.sendMessage({checkIfOn: true}, function(response) {
      var onOff = response.onOff;
      doReplacement(onOff);
});

