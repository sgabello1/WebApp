var cmdJoy = new ROSLIB.Topic({
  ros : ros,
  name : '/' + robot.name +'/joy',
  messageType : 'geometry_msgs/Vector3'
});








console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");

var joystick	= new VirtualJoystick({
  container	: document.getElementById('joypad'),
  mouseSupport	: true,
});

var lastzero=false;

setInterval(function(){
  var outputEl	= document.getElementById('result');
  let joydata = {
    x: joystick.deltaX(),
    y: joystick.deltaY()
  };


  if (joydata.x != 0 || joydata.y != 0) {
    lastzero = false;
    var joy = new ROSLIB.Message(joydata);
    cmdJoy.publish(joy);
  } else if (lastzero == false) {
    lastzero = true;
    var joy = new ROSLIB.Message(joydata);
    cmdJoy.publish(joy);
  }
}, 1/10 * 1000);
