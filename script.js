// browser info
var div = document.getElementById("browserinfo");
var browserinfo = [
    [platform.name, "[NAME] : "],
    [platform.os, "[OS] : "],
    [platform.manufacturer, "[MANUFACTURER] : "],
    [platform.prerelease, "[PRERELEASE] : "],
    [platform.product, "[PRODUCT] : "],
    [platform.layout, "[LAYOUT] : "],
    [platform.ua, "[USER_AGENT] : "],
    [platform.description, "[DESCRIPTION] : "],
    [platform.version, "[VERSION] : "],
];

browserinfo.forEach(line => {
    if(line[0]) div.innerText += line[1] + line[0] + "\n"; 
    else div.innerText += line[1] + "idk\n";
});

// user info
div = document.getElementById("userinfo");

fetch("https://ipapi.co/json")
    .then((response) => response.json())
    .then((data) => {
        //console.log(data);

        div.innerText += "here's your ip incase you forgot\n";
        div.innerText += data.ip + '\n';

        // display() here 
        
        div.innerText += data.country_name + "\n" + data.region + '(' + data.city + ")\n"
        div.innerText += "youre 1 in " + data.country_population + " <3\n";
        div.innerText += "i found god and she lives at" + data.latitude + '\n' + data.longitude + '\n';
    });
