var scorm = pipwerks.SCORM;

function init() {
  scorm.init();
}

function set(param, value) {
  scorm.set(param, value);
}

function get(param) {
  scorm.get(param);
}

function end() {
  scorm.quit();
}

window.onload = function () {
  init();
}

window.onunload = function () {
  end();
}

var onCompleted = function (result) {
  var masteryScore;
  if (scorm.version == "2004") {
  } else if (scorm.version == "1.2") {
    masteryScore = scorm.get("cmi.student_data.mastery_score") / 100;
  }

  scorm.set("cmi.core.score.min", "0");
  scorm.set("cmi.core.score.max", "100");

  if (masteryScore === undefined) {
    scorm.status("set", "completed");
  }
  else {
    if (scorm.version == "2004") {
      scorm.status("set", "completed");
      if (passed) {
        scorm.set("cmi.success_status", "passed");
      }
      else {
        scorm.set("cmi.success_status", "failed");
      }
    }
    else if (scorm.version == "1.2") {
      if (passed) {
        scorm.status("set", "passed")
      }
      else {
        scorm.status("set", "failed")
      }
    }
  }
}

H5P.externalDispatcher.on('xAPI', function (event) {
  console.log('xAPI event: ' + JSON.stringify(event));
  if (event.data.statement.result) {
    onCompleted(event.data.statement.result);
  }
});