
var connected_flag=0;	
var mqtt;
var reconnectTimeout = 2000;
var y=0;
var l=0;

function onConnectionLost(){
	console.log("connection lost");
	document.getElementById("messages").innerHTML ="Connection Lost";
	connected_flag=0;
	}
	function onFailure(message) {
		console.log("Failed");
		document.getElementById("messages").innerHTML = "Connection Failed- Retrying";
        setTimeout(MQTTconnect, reconnectTimeout);
        }
		function onMessageArrived(r_message){
		out_msg="Message received "+r_message.payloadString+"<br>";
		out_msg=out_msg+"Message received Topic "+r_message.destinationName;
		//console.log("Message received ",r_message.payloadString);
		console.log(out_msg);
		document.getElementById("messages").innerHTML =out_msg;
		}
	function onConnected(recon,url){
	console.log(" in onConnected " +reconn);
	}
	function onConnect() {
	document.getElementById("messages").innerHTML ="Đã kết nối đến broker.hivemq.com";
	connected_flag=1
	console.log("on Connect "+connected_flag);
	  }

    function MQTTconnect() {

	var s = "broker.hivemq.com";
	var p = "8000";
	if (p!="")
	{
	console.log("ports");
		port=parseInt(p);
		console.log("port" +port);
		}
	if (s!="")
	{
		host=s;
		console.log("host");
		}
	console.log("connecting to "+ host +" "+ port);
	var x=Math.floor(Math.random() * 10000); 
	var cname="orderform-"+x;
	mqtt = new Paho.MQTT.Client(host,port,cname);
	//document.write("connecting to "+ host);
	var options = {
        timeout: 3,
		onSuccess: onConnect,
		onFailure: onFailure,
      
     };
	
        mqtt.onConnectionLost = onConnectionLost;
        mqtt.onMessageArrived = onMessageArrived;
		//mqtt.onConnected = onConnected;

	mqtt.connect(options);
	return false;
  
    }
	
	function sub_topics(){
		document.getElementById("messages").innerHTML ="";
		if (connected_flag==0){
		out_msg="<b>Not Connected so can't subscribe</b>"
		console.log(out_msg);
		document.getElementById("messages").innerHTML = out_msg;
		return false;
		}
	var stopic= document.forms["subs"]["Stopic"].value;
	console.log("Subscribing to topic ="+stopic);
	mqtt.subscribe(stopic);
	return false;
	}
	/*function send_message(){
		document.getElementById("messages").innerHTML ="";
		if (connected_flag==0){
		out_msg="<b>Not Connected so can't send</b>"
		console.log(out_msg);
		document.getElementById("messages").innerHTML = out_msg;
		return false;
		}
		var msg = document.forms["smessage"]["message"].value;
		console.log(msg);

		var topic = document.forms["smessage"]["Ptopic"].value;
		message = new Paho.MQTT.Message(msg);
		if (topic=="")
			message.destinationName = "test-topic"
		else
			message.destinationName = topic;
		mqtt.send(message);
		return false;
	}*/
    function dentang1(){
		if(y==0){
		document.getElementById("thanhtruoc").value=100;
		document.getElementById("hienthidosang").innerHTML= document.getElementById("thanhtruoc").value;
		document.getElementById('anhdentang1').src='https://img.icons8.com/fluent/96/000000/light.png';
		var msg="100";
		console.log(msg);
		var topic="dentang1";
		message = new Paho.MQTT.Message(msg);
		message.destinationName = topic;
		mqtt.send(message);
		y=1;
		}
		else {
	    document.getElementById("thanhtruoc").value=0;
		document.getElementById("hienthidosang").innerHTML= document.getElementById("thanhtruoc").value;
		document.getElementById('anhdentang1').src='https://img.icons8.com/fluent/48/000000/light-off.png'
		var msg="0";
		console.log(msg);
		var topic="dentang1";
		message = new Paho.MQTT.Message(msg);
		message.destinationName = topic;
		mqtt.send(message);
		y=0;
		}
		
	}

function dosang(){
	if(document.getElementById("thanhtruoc").value=="100"){
		document.getElementById("hienthidosang").innerHTML= document.getElementById("thanhtruoc").value;
		document.getElementById("switchdentang1").checked = true;
		var msg="100";
		console.log(msg);
		var topic="dentang1";
		message = new Paho.MQTT.Message(msg);
		message.destinationName = topic;
		mqtt.send(message);
		y=1;
        document.getElementById('anhdentang1').src='https://img.icons8.com/fluent/96/000000/light.png';
	}
	else if(document.getElementById("thanhtruoc").value=="0") {
		document.getElementById("hienthidosang").innerHTML= document.getElementById("thanhtruoc").value;
		document.getElementById("switchdentang1").checked = false;
		var msg="0";
		console.log(msg);
		var topic="dentang1";
		message = new Paho.MQTT.Message(msg);
		message.destinationName = topic;
		mqtt.send(message);
		y=0;
        document.getElementById('anhdentang1').src='https://img.icons8.com/fluent/48/000000/light-off.png'
	}
	else {
		document.getElementById("hienthidosang").innerHTML= document.getElementById("thanhtruoc").value;
	    var msg=document.getElementById("thanhtruoc").value;
		console.log(msg);
		var topic="dentang1";
		message = new Paho.MQTT.Message(msg);
		message.destinationName = topic;
		mqtt.send(message);	
	}
		
	}
	



  


    