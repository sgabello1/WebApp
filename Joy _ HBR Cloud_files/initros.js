var ros;

var robot = {
  master : null,
  name : null,
  ip : null
};

function start_ros(master, name, ip, bridge) {
  robot.master = master;
  robot.name = name;
  robot.ip = ip

  if (bridge == "" || bridge == "None") {
    robot.bridge = robot.master.trim() +':9090'
  } else {
    robot.bridge = bridge
  }

  console.log(robot);
  ros = new ROSLIB.Ros({
    url : 'ws://'+ robot.bridge
  });

  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
    $("#roscore-alert").show();
  });

  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });


  ros.on('connection', function() {
    console.log('Connected to websocket server.');
  });
}

function ros_error() {
  alert("ROS non trovato");
}
