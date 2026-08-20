
/*
 * McGraw-Hill Education Activity API
 * Copyright (c) 2012. All Rights Reserved.
 *
 * Version 2.0
 */

/*
 * Communication Layer
 */
var _coms_layer = {
  version : '2.0',

  questions : {},
  actions : {},
  attempts : 0,
  finished : false,

  userName : null,

  actionsRetrieved : false,
  previousActions : 0,

  service : null,
  record: true
};

//getQuestionsStatus - return the total, answered, and correct question counts
_coms_layer.getQuestionStatus = function(){
    var answeredCount = 0;
    var attemptCount  = 0;
    var correctCount  = 0;
    var scoredCount   = 0;
    
    for (var questionID in this.questions) {
        answeredCount++; // <-- Total Question Count
    
        var question = this.questions[questionID];
    
        for (var i = 0; i < question.length; i++) {
            attemptCount++; // <-- Total Attempt Count
            
            if (question[i].scored) {
                scoredCount++; // <-- Total Scored Attempt Count
    
                if (question[i].correct) {
                    correctCount++; // <-- Total Correct Attempt Count
                }
            }
        }
    }
    
    if (attemptCount > 0) {
        this.attempts = attemptCount
    }
    
    return { total : answeredCount, attempts : this.attempts, scored : scoredCount, correct : correctCount };
}

//getActionCount - return the number of actions completed during this activity
_coms_layer.getActionCount = function(){
  var count = 0;

  for(var actionID in this.actions){
    count += this.actions[actionID].length;
  }

  return count - this.previousActions;
}

//getActionIDCounts - return the number of time a particular action was performed for each ID
_coms_layer.getActionIDCounts = function(actionID){
  var ret = {};

  for(id in this.actions){
    ret[id] = this.actions[id].length;
  }

  return ret;
}

//getQuestionAttemptCount - return the total
_coms_layer.getQuestionAttemptCount = function(questionID){
  var count = 0;

  if(questionID){
    for(var i = 0; i < this.questions[questionID].length; i++){
      if(this.questions[questionID][i].scored){
        count++;
      }
    }
  }else{
    for(questionID in this.questions){
      count += this.getQuestionAttemptCount(questionID);
    }
  }

  return count;
}

//recordQuestionCount - store the total number of questions
_coms_layer.recordAttemptCount = function(attemptCount){
  this.attempts = attemptCount;
}

//recordQuestion - store the student's actions on a question
_coms_layer.recordQuestion = function(questionID, answer, isCorrect, isScoredAttempt, timeOnQuestion, requestedHelp){
  if(!this.questions[questionID]){
    this.questions[questionID] = [];
  }

  //add to internal storage
  var question = { answer : answer, correct : isCorrect, scored : isScoredAttempt, time : timeOnQuestion, help : requestedHelp };
  this.questions[questionID].push(question);

  //send data record
  question.question = questionID;
  this.sendData('question', this.createDataString(question));
}

//recordAction - store a student action
_coms_layer.recordAction = function(actionID, studentResponse, isSuccessful, timeOnAction, requestedHelp){
  if(!this.actions[actionID]){
    this.actions[actionID] = [];
  }

  //add to internal storage
  var action = { response : studentResponse, success : isSuccessful, time : timeOnAction, help : requestedHelp };
  this.actions[actionID].push(action);

  //send data record
  action.action = actionID;
  this.sendData('action', this.createDataString(action));
}

//recordActivityComplete - record activity time and exit status
_coms_layer.recordActivityComplete = function(timeInActivity, exitStatus, exitMessage){
  //calculate question totals
  var questionStatus = this.getQuestionStatus();

  this.sendData('complete', this.createDataString({
    time : timeInActivity,
    status : exitStatus,
    message : exitMessage?exitMessage:'',
    questionsCount : questionStatus.total,
    attemptsCount : questionStatus.attempts,
    isCorrectCount : questionStatus.correct,
    isScoredCount : questionStatus.scored,
    actionCount : this.getActionCount()
  }));

  this.finished = true;
}

//requestUserName - fire callback with student name data
_coms_layer.requestUserName = function(callback){
  if(!this.username){
    if(!this.service){
      this.parseService();
    }

    var request = this.getRequestObject(this.service+'&v='+this.version+'&action=username', function(response){ _coms_layer.handleUserName(response, callback); });

    request.send();
  }else{
    callback(this.username);
  }
}

//handleUserName - handle AJAX request for username
_coms_layer.handleUserName = function(response, callback){
  var response = JSON.parse(response);

  if(response.response != 'success'){
    _activity_debug.logError('Invalid response from server: '+response.response);
    return;
  }

  if(!response.username){
    _activity_debug.logError('Invalid response from server: no username returned');
    return;
  }

  this.username = response.username;

  callback(this.username);
}

//requestURL - fire callback with notebook or journal URL
_coms_layer.requestURL = function(callback, type){
  if(!this.service){
    this.parseService();
  }

  var request = this.getRequestObject(this.service+'&v='+this.version+'&action=url&url_type='+type, function(response){ _coms_layer.handleURL(response, callback, type); });

  request.send();
}

//handleURL - handle AJAX request for URL
_coms_layer.handleURL = function(response, callback, type){
  var response = JSON.parse(response);

  if(response.response != 'success'){
    _activity_debug.logError('Invalid response from server: '+response.response);
    return;
  }

  if(!response.link_data){
    _activity_debug.logError('Invalid response from server: no URL data returned');
    return;
  }

  callback(response.link_data);
}

//requestActionCount - get the number of times an action was performed
_coms_layer.requestActionCounts = function(callback, actionID){
  if(this.actionsRetrieved){
    callback(this.getActionIDCounts());
  }else{
    this.requestPreviousActions(function(){ callback(_coms_layer.getActionIDCounts()); });
  }
}

//requestPreviousActions - get all previously performed actions for the user and activity
_coms_layer.requestPreviousActions = function(callback){
  if(!this.service){
    this.parseService();
  }

  var request = this.getRequestObject(this.service+'&v='+this.version+'&action=action_record', function(response){ _coms_layer.handlePreviousActions(response, callback); });

  request.send();
}

//handlePreviousActions - handle list of actions
_coms_layer.handlePreviousActions = function(response, callback){
  var response = JSON.parse(response);

  if(response.response != 'success'){
    _activity_debug.logError('Invalid response from server: '+response.response);
    return;
  }

  if(!response.actions){
    _activity_debug.logError('Invalid response from server: no action data returned');
    return;
  }

  //rebuild actions array
  var oldActions = this.actions;
  this.actions = {};

  //add previous actions
  for(id in response.actions){
    this.actions[id] = [];

    for(var i = 0; i < response.actions[id].length; i++){
      this.actions[id].push(response.actions[id][i]);
      this.previousActions++; //count previous actions
    }
  }

  //re-add current actions
  for(id in oldActions){
    this.actions[id] = [];

    for(var i = 0; i < oldActions[id].length; i++){
      this.actions[id].push(oldActions[id][i]);
    }
  }

  //flag actions retrieved
  this.actionsRetrieved = true;

  callback();
}

//createDataString - create a data string from an object
_coms_layer.createDataString = function(obj){
  var dataString = '';

  for(id in obj){
    if(typeof obj[id] === 'undefined'){
      dataString += '&'+id+'=0';
    }else if(obj[id] instanceof Array){
      dataString += '&'+id+'='+escape(obj[id].join(':'));
    }else{
      dataString += '&'+id+'='+escape(obj[id]);
    }
  }

  return dataString.substring(1);
}

//parseService - parse service URL from querystring
_coms_layer.parseService = function(){
  var serviceMatch = /service=([^&#]+)/i.exec(window.location.toString());
  if(serviceMatch && serviceMatch[1]){
    this.service = decodeURIComponent(serviceMatch[1]);
  }else{
    _coms_layer.record = false;
    this.service = 'http://cinch.mhlgt.com/activity_api_service.php?';
    _activity_debug.logMessage('Using default service');
  }
}

//getRequestObject - return a cross-domain capable request object
_coms_layer.getRequestObject = function(url, callback){
  if (!_coms_layer.record) {
      return null;
  }

  if(window.XDomainRequest){
    var xmlhttp = new XDomainRequest();
    xmlhttp.open('POST', url);

    xmlhttp.onload = function(){
      callback(xmlhttp.responseText);
    }

  }else{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', url, true);

    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4){
        callback(xmlhttp.responseText);
      }
    };
  }

  return xmlhttp;
}

//sendData - send user data
_coms_layer.sendData = function(type, dataString){
  if(!this.service){
    this.parseService();
  }

  if(this.finished){
    throw 'Trying to send data after activity complete';
  }

  var request = this.getRequestObject(this.service+'&v='+this.version+'&action='+type, function(response){ _coms_layer.handleDataResponse(response); });

  request.send(dataString);
}

//handleDataResponse - handle data AJAX response
_coms_layer.handleDataResponse = function(response){
  var response = JSON.parse(response);

  if(response.response != 'success'){
    _activity_debug.logError('Invalid response from server: '+response.response);
  }
}


/*
 * Debug
 */
var _activity_debug = {
  content : null,
  mode : null,
  initialized : false
}

//init - initialize debug object
_activity_debug.init = function(){
  //find mode
  var modeMatch = /debug=([a-z]+)/g.exec(window.location.toString());

  if(modeMatch && modeMatch[1]){
    this.mode = modeMatch[1];
  }

  //build popup
  if(this.mode == 'popup' || this.mode == 'all'){
    var popup = document.createElement('div');
    document.body.appendChild(popup);

    popup.style.position = 'absolute';
    popup.style.top = '10px';
    popup.style.right = '10px';
    popup.style.backgroundColor = '#FFFFFF';
    popup.style.border = '2px solid #000';
    popup.style.borderRadius = '5px';
    popup.style.padding = '10px';
    popup.style.boxShadow = '0px 0px 5px rgba(0, 0, 0, 0.5)';
    popup.zIndex = '2000';

    var title = document.createElement('div');
    title.innerHTML = '<strong>API Console</strong><br /><a href="#" onclick="_activity_debug.listConsole(); return false;">console log</a> | <a href="#" onclick="_activity_debug.listQuestions(); return false;">question log</a> | <a href="#" onclick="_activity_debug.listActions(); return false;">action log</a>';
    popup.appendChild(title);

    this.content = document.createElement('div');
    popup.appendChild(this.content);
  }

  this.messages = [];

  this.initialized = true;
}

//logMessage - record a message
_activity_debug.logMessage = function(message){
  if(!this.initialized){
    this.init();
  }

  this.messages.push({ type : 'message', text : message });

  if(this.mode == 'popup' || this.mode == 'all'){
    this.content.innerHTML = message.replace(/\n/g, '<br />');
  }

  if((this.mode == 'console' || this.mode == 'all') && console && typeof(console.log) == 'function'){
    console.log('API log:\n'+message);
  }
}

//logError - record an error
_activity_debug.logError = function(error){
  if(!this.initialized){
    this.init();
  }

  this.messages.push({ type : 'error', text : error });

  if(this.mode == 'popup' || this.mode == 'all'){
    this.content.innerHTML = '<span style="color:red;">'+error.replace(/\n/g, '<br />')+'</span>';
  }

  if((this.mode == 'console' || this.mode == 'all') && console && typeof(console.error) == 'function'){
    console.error('API log:\n'+error);
  }
}

//listQuestions - display previously answered question data
_activity_debug.listQuestions = function(){
  this.content.innerHTML = '';

  var table = document.createElement('table');
  table.innerHTML = '<tr><th>Question</th><th>Answer</th><th>Response</th><th>Scored</th><th>Time</th><th>Help</th></tr>';
  table.cellpadding = 2;
  table.cellspacing = 0;
  table.border = 1;

  for(var id in _coms_layer.questions){
    var question = _coms_layer.questions[id];

    for(var i = 0; i < question.length; i++){
      var entry = question[i];

      var responseText;
      if(entry.correct == 0){
        responseText = 'incorrect';
      }else if(entry.correct == 1){
        responseText = 'correct';
      }else{
        responseText = 'not checked';
      }

      var scoredText;
      if(entry.scored == 0){
        scoredText = 'no';
      }else{
        scoredText = 'yes';
      }

      var tr = document.createElement('tr');
      tr.innerHTML = '<td>'+id+'</td><td>'+((entry.answer instanceof Array)?('['+entry.answer.join(',')+']'):entry.answer)+'</td><td>'+responseText+'</td><td>'+scoredText+'</td><td>'+this.intToTime(entry.time)+'</td><td>'+(entry.help?'yes':'no')+'</td>';

      table.appendChild(tr);
    }
  }

  this.content.appendChild(table);
}

//listActions - display previous actions
_activity_debug.listActions = function(){
  this.content.innerHTML = '';

  var table = document.createElement('table');
  table.innerHTML = '<tr><th>Action</th><th>Response</th><th>Success</th><th>Time</th><th>Help</th></tr>';
  table.cellpadding = 2;
  table.cellspacing = 0;
  table.border = 1;

  for(var id in _coms_layer.actions){
    var action = _coms_layer.actions[id];

    for(var i = 0; i < action.length; i++){
      var entry = action[i];

      var responseText;
      if(entry.success == 0){
        responseText = 'unsuccessful';
      }else if(entry.success == 1){
        responseText = 'successful';
      }else{
        responseText = 'not applicable';
      }

      var tr = document.createElement('tr');
      tr.innerHTML = '<td>'+id+'</td><td>'+entry.response+'</td><td>'+responseText+'</td><td>'+this.intToTime(entry.time)+'</td><td>'+(entry.help?'yes':'no')+'</td>';

      table.appendChild(tr);
    }
  }

  this.content.appendChild(table);
}

//listConsole - display previous messages
_activity_debug.listConsole = function(){
  this.content.innerHTML = '';

  var wrapper = document.createElement('div');
  wrapper.style.overflow = 'auto';
  wrapper.style.maxHeight = '300px';
  wrapper.style.border = '1px solid #999';
  this.content.appendChild(wrapper);

  for(var i = 0; i < this.messages.length; i++){
    var element = document.createElement('div')
    element.style.borderBottom = '1px solid #999';
    element.style.padding = '5px';

    if(this.messages[i].type == 'error'){
      element.style.color = 'red';
    }

    element.innerHTML = this.messages[i].text.replace(/\n/g, '<br />');

    wrapper.appendChild(element);
  }
}

//intToTime - convert milliseconds to string
_activity_debug.intToTime = function(timestamp){
  var seconds = Math.floor(timestamp / 1000) % 60;
  var minutes = Math.floor(timestamp / 60000) % 60;
  var hours = Math.floor(timestamp / 3600000);

  return hours+'h '+minutes+'m '+seconds+'s';
}


/*
 * Activity API
 */
var activityAPI = {};

//_is_int - check type for int
activityAPI._is_int = function(value){
  return parseInt(value) == value;
}

//_is_int_array - check type for int array
activityAPI._is_int_array = function(value){
  if(!(value instanceof Array)){
    return false;
  }

  for(var i = 0; i < value.length; i++){
    if(!this._is_int(value[i])){
      return false;
    }
  }

  return true;
}

//reportQuestionCount - report total number of questions
activityAPI.reportQuestionCount = function(questionCount){
  _activity_debug.logError('activityAPI.reportQuestionCount is deprecated');
}

//reportAttemptCount - override number of attempts taken
activityAPI.reportAttemptCount = function(attemptCount){
  //check input
  if(!this._is_int(attemptCount) || attemptCount < 0){
    _activity_debug.logError('Invalid number of attempts: '+attemptCount);
    return;
  }

  //send to coms layer
  _coms_layer.recordAttemptCount(attemptCount);

  //log request
  _activity_debug.logMessage('attempt count: '+attemptCount);
}

//reportQuestion - report student performance on a question
activityAPI.reportQuestion = function(questionID, answer, isCorrect, isScoredAttempt, timeOnQuestion, requestedHelp){
  //check inputs
  if(!this._is_int(questionID) || questionID <= 0){
    _activity_debug.logError('"Question ID" is not a valid ID: '+questionID);
    return;
  }

  if(!((this._is_int(answer) && answer > 0) || this._is_int_array(answer) || typeof answer == 'string')){
    _activity_debug.logError('"Answer" is not an valid ID, ID array, or string: '+answer);
    return;
  }

  if(!(isCorrect == 0 || isCorrect == 1)){
    _activity_debug.logError('Invalid "Is-Correct" value (0 or 1 required): '+isCorrect);
    return;
  }

  if(!(isScoredAttempt == 0 || isScoredAttempt == 1)){
    _activity_debug.logError('Invalid "Is-Scored-Attempt" value (0 or 1 required): '+isCorrect);
    return;
  }

  if(!this._is_int(timeOnQuestion) || timeOnQuestion < 0){
    _activity_debug.logError('"Time on Question" is not a valid time: '+timeOnQuestion);
    return;
  }

  if(requestedHelp && !(requestedHelp == 0 || requestedHelp == 1)){
    _activity_debug.logError('Invalid "Requested-Help" value (0 or 1 required): '+requestedHelp);
    return;
  }

  //send to coms layer
  try{
    _coms_layer.recordQuestion(questionID, answer, isCorrect, isScoredAttempt, timeOnQuestion, requestedHelp);
  }catch(e){
    _activity_debug.logError(e.toString());
    return;
  }

  //log request
  _activity_debug.logMessage('question: '+questionID+'\nresponse: '+(isCorrect?'correct':'incorrect')+'\nscored: '+(isScoredAttempt?('yes\nattempt #: '+_coms_layer.getQuestionAttemptCount(questionID)):'no')+'\nhelp: '+(requestedHelp?'yes':'no')+'\ntime: '+_activity_debug.intToTime(timeOnQuestion));
};

//reportAction - report student performance on an action
activityAPI.reportAction = function(actionID, studentResponse, isSuccessful, timeOnAction, requestedHelp){
  //check inputs
  if(!this._is_int(actionID) || actionID <= 0){
    _activity_debug.logError('"Action ID" is not a valid ID: '+actionID);
    return;
  }

  if(!(isSuccessful == 0 || isSuccessful == 1 || isSuccessful == 2)){
    _activity_debug.logError('Invalid "Is-Successful" value (0, 1, or 2 required): '+isSuccessful);
    return;
  }

  if(!this._is_int(timeOnAction) || timeOnAction < 0){
    _activity_debug.logError('"Time on Action" is not a valid time: '+timeOnAction);
    return;
  }

  if(requestedHelp && !(requestedHelp == 0 || requestedHelp == 1)){
    _activity_debug.logError('Invalid "Required-Help" value (0 or 1 required): '+requestedHelp);
    return;
  }

  //send to coms layer
  try{
    _coms_layer.recordAction(actionID, studentResponse, isSuccessful, timeOnAction, requestedHelp);
  }catch(e){
    _activity_debug.logError(e.toString());
    return;
  }

  //log request
  var responseText;
  if(isSuccessful == 0){
    responseText = 'unsuccessful';
  }else if(isSuccessful == 1){
    responseText = 'successful';
  }else{
    responseText = 'not applicable';
  }

  _activity_debug.logMessage('action: '+actionID+'\nstudent response: "'+studentResponse+'"\nattempt: '+_coms_layer.actions[actionID].length+'\nsuccess: '+responseText+'\nhelp: '+(requestedHelp?'yes':'no')+'\ntime: '+_activity_debug.intToTime(timeOnAction));
};

//requestActionCount - make a request for the number of times an action was performed
activityAPI.requestAllActionCounts = function(callback){
  _activity_debug.logMessage('action count requested');

  if(typeof(callback) != 'function'){
    _activity_debug.logError('No callback function for action count request');
    return;
  }

  try{
    _coms_layer.requestActionCounts(callback);
  }catch(e){
    _activity_debug.logError(e.toString());
    return;
  }
}

//activityCompleted - report student performance on the activity
activityAPI.activityCompleted = function(timeInActivity, exitStatus, exitMessage){
  //check inputs
  if(!this._is_int(timeInActivity) || timeInActivity < 0){
    _activity_debug.logError('"Time in Activity" is not a valid time: '+timeInActivity);
    return
  }

  if(!this._is_int(exitStatus) || !(exitStatus == 0 || exitStatus == 1 || exitStatus == 2)){
    _activity_debug.logError('Invalid "Exit Status" value (0, 1, or 2 required): '+exitStatus);
    return
  }

  //send to coms layer
  try{
    _coms_layer.recordActivityComplete(timeInActivity, exitStatus, exitMessage);
  }catch(e){
    _activity_debug.logError(e.toString());
    return;
  }

  //log action
  var totals = _coms_layer.getQuestionStatus();
  var statusText;
  if(exitStatus == 0){
    statusText = 'timeout';
  }else if(exitStatus == 1){
    statusText = 'complete';
  }else{
    statusText = 'incomplete';
  }
  var msg = 'activity status: '+exitStatus+' ('+statusText+")\n";
  if(exitMessage){
    msg += 'exit message: '+exitMessage+"\n";
  }
  msg += 'unique questions: '+totals.total+"\n";
  msg += 'questions attempted: '+totals.attempts+"\n";
  msg += 'questions correct: '+totals.correct+"\n";
  msg += 'estimated score: '+(totals.total > 0?Math.round(totals.correct / totals.total * 100):0)+"%\n";
  msg += 'actions performed: '+_coms_layer.getActionCount()+"\n";
  msg += 'time: '+_activity_debug.intToTime(timeInActivity)+"\n";

  _activity_debug.logMessage(msg);
}

//requestUserName - make a request for username data
activityAPI.requestUserName = function(callback){
  _activity_debug.logMessage('user name requested');

  if(typeof(callback) != 'function'){
    _activity_debug.logError('No callback function for username request');
    return;
  }

  try{
    _coms_layer.requestUserName(callback);
  }catch(e){
    _activity_debug.logError(e.toString());
    return;
  }
};

//requestLoginNeeded - make a request to determine if a login is required
activityAPI.requestLoginNeeded = function(callback){
  _activity_debug.logMessage('login URL requested');

  if(typeof(callback) != 'function'){
    _activity_debug.logError('No callback function for login URL request');
    return;
  }

  try{
    _coms_layer.requestURL(callback, 'login');
  }catch(e){
    _activity_debug.logError(e.toString());
    return;
  }
}

//requestNotebookURL - make a request for the notebook URL
activityAPI.requestNotebookURL = function(callback){
  _activity_debug.logMessage('notebook URL requested');

  if(typeof(callback) != 'function'){
    _activity_debug.logError('No callback function for notebook URL request');
    return;
  }

  try{
    _coms_layer.requestURL(callback, 'notebook');
  }catch(e){
    _activity_debug.logError(e.toString());
    return;
  }
}

//requestJournalURL - make a request for the notebook URL
activityAPI.requestJournalURL = function(callback){
  _activity_debug.logMessage('journal URL requested');

  if(typeof(callback) != 'function'){
    _activity_debug.logError('No callback function for journal URL request');
    return;
  }

  try{
    _coms_layer.requestURL(callback, 'journal');
  }catch(e){
    _activity_debug.logError(e.toString());
    return;
  }
}