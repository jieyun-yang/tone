var http = require('http');
var tessel = require('tessel');
var gpio = tessel.port['GPIO']; // select the GPIO port
var myPin0 = gpio.pwm[0]; //Red
var myPin1 = gpio.pwm[1]; //Blue
var myPin2 = gpio.pwm[2]; //Green
// can be gpio.pwm[0] through 3 or gpio.pin['G4'] through ‘G6’
// Tell the GPIO port that the frequency of its pwm pins is 980 Hz
gpio.pwmFrequency(980);

  // Loop forever
  setImmediate(function loop () {
    http.get('http://localhost:3000/getmood', function (res) {
	    console.log('# statusCode', res.statusCode)
	    var bufs = [];
	    res.on('data', function (data) {
	      // bufs.push(new Buffer(data));
	      var tempString = new Buffer(data).toString();
	      var receivedData = JSON.parse(tempString);
	      var onTwitterPage = receivedData.onTwitterPage;
	      console.log('# received', receivedData);
	      if(onTwitterPage) {
	      	switch (receivedData.mood) {
		      	case 'happy':
		      		console.log('this is happy');
							myPin0.pwmDutyCycle(0.80); // Red
							myPin1.pwmDutyCycle(0.92); // Blue 
							myPin2.pwmDutyCycle(0.18); // Green
	            break;
	          case 'excited':
		      		console.log('this is excited');
							myPin0.pwmDutyCycle(0.0); // Red
							myPin1.pwmDutyCycle(0.922); // Blue 
							myPin2.pwmDutyCycle(0.498); // Green
	            break;
	          case 'sad':
		      		console.log('this is sad');
							myPin0.pwmDutyCycle(0.89); // Red
							myPin1.pwmDutyCycle(0.09); // Blue 
							myPin2.pwmDutyCycle(0.44);
	            break;
	          case 'mad':
		      		console.log('this is mad');
	          	myPin0.pwmDutyCycle(0.0314); // Red
							myPin1.pwmDutyCycle(0.9255); // Blue 
							myPin2.pwmDutyCycle(0.9255); // Green
	            break;
	          case 'jealous':
		      		console.log('this is jealous');
	          	myPin0.pwmDutyCycle(0.56); // Red
							myPin1.pwmDutyCycle(0.03); // Blue 
							myPin2.pwmDutyCycle(0.847); // Green
	            break;
	          case 'upset':
		      		console.log('this is upset');
	            myPin0.pwmDutyCycle(0.09); // Red
							myPin1.pwmDutyCycle(0.243); // Blue 
							myPin2.pwmDutyCycle(0.93); // Green
	            break;
	         case 'comfort':
		      		console.log('this is comfort');
		      		myPin0.pwmDutyCycle(0.10); // Red
							myPin1.pwmDutyCycle(0.92); // Blue 
							myPin2.pwmDutyCycle(0.10); // Green
	            break;
	          case 'fear':
		      		console.log('this is fear');
	            myPin0.pwmDutyCycle(0.89); // Red
							myPin1.pwmDutyCycle(0.58); // Blue 
							myPin2.pwmDutyCycle(0.04); // Green
	            break;
	          case 'surprised':
		      		console.log('this is surprised');
	            myPin0.pwmDutyCycle(0.03); // Red
							myPin1.pwmDutyCycle(0.6137); // Blue 
							myPin2.pwmDutyCycle(0.6137); // Green
	            break;
	          default: 
							myPin0.pwmDutyCycle(0.80); // Red
							myPin1.pwmDutyCycle(0.92); // Blue 
							myPin2.pwmDutyCycle(0.18); // Green
		      };
	      } else {
	      	myPin0.pwmDutyCycle((255-parseInt(receivedData.red))/255); // Red
					myPin1.pwmDutyCycle((255-parseInt(receivedData.blue))/255); // Blue 
					myPin2.pwmDutyCycle((255-parseInt(receivedData.green))/255); // Green
	      }
	    })
	    res.on('close', function () {
	      console.log('done.');
	      setImmediate(loop);
	    })
	  }).on('error', function (e) {
	    console.log('not ok -', e.message, 'error event')
	    setImmediate(loop);
	  });
    setTimeout(loop, 3000);
  });