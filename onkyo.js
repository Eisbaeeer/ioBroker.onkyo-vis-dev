/* jshint -W097 */// jshint strict:false
/*jslint node: true */
"use strict";

const eiscp = require('eiscp');

// you have to require the adapter module and pass a options object
const utils = require(__dirname + '/lib/utils'); // Get common adapter utils

const objects = {};
const volume = {};

//const adapter = utils.Adapter('onkyo-vis');    // name has to be set and has to be equal to adapters folder name and main file name excluding extension
var adapter = utils.adapter({    
	// name has to be set and has to be equal to adapters folder name and main file name excluding extension
    name:  'onkyo-vis',
	// is called if a subscribed state changes
	//adapter.on('stateChange', (id, state) => {
	stateChange: function (id, state) {	
    adapter.log.debug('stateChange ' + id + ' ' + JSON.stringify(state));
    // is called if a subscribed state changes
        if (state && !state.ack) {
			adapter.log.debug('ack is not set!');
			adapter.log.debug('Value: ' + state.val);
			adapter.log.debug('id: ' + id);
		
			if (id == adapter.namespace + '.' +'command') {
					var newcommand = state.val;
						adapter.log.debug('newcommand: ' + newcommand);
			if (newcommand) {				
                eiscp.raw(newcommand);
				}		
			} else {
                        
          // Here we go and send command from accepted Objects to command var
 			  
			  // SET RAW EISCP COMMAND
              if (id == adapter.namespace + '.' +'RAW') {
                new_val = state.val;
				adapter.log.debug('Send RAW to Receiver: ' + new_val);
				adapter.setState (adapter.namespace + '.' + 'command', {val: new_val, ack: false});
				adapter.setState (adapter.namespace + '.' + 'RAW', {val: null, ack: true});
                  }
			  
			  // Volume Zone1
              if (id == adapter.namespace + '.' +'Zone1.Volume') {
              var new_val = parseInt(state.val);  //string to integer
                if (new_val >= adapter.config.maxvolzone1)
                {
                  new_val = adapter.config.maxvolzone1;
                  adapter.log.info('>>> Limit max volume zone 1 to: ' + new_val);
                  adapter.log.info('>>> see in adapter config for limits');
                }              
              new_val = decimalToHex(new_val).toUpperCase();  //call function decimalToHex();
              new_val = 'MVL' + new_val;
              adapter.log.debug('new_val: ' + new_val);
			  adapter.setState (adapter.namespace + '.' + 'command', {val: new_val, ack: false});
                  }
                  
              // Volume Zone2                    
              if (id == adapter.namespace + '.' +'Zone2.Volume') {
              var new_val = parseInt(state.val);  //string to integer
                if (new_val >= adapter.config.maxvolzone2)
                {
                  new_val = adapter.config.maxvolzone2;
                  adapter.log.info('>>> Limit max volume zone 2 to: ' + new_val);
                  adapter.log.info('>>> see in adapter config for limits');
                }
              new_val = decimalToHex(new_val).toUpperCase();  //call function decimalToHex();
              new_val = 'ZVL' + new_val;
              adapter.log.debug('new_val: ' + new_val);
              adapter.setState (adapter.namespace + '.' + 'command', {val: new_val, ack: false});
                  }

              // Audio_Mute_Zone1                    
              if (id == adapter.namespace + '.' +'Zone1.Mute') {
                  new_val = state.val;
              adapter.log.debug('new_val: ' + new_val);
                  if (new_val == true) {
                      new_val = '01';
                      }
              if  (new_val == false) {
                    new_val = '00';
                      } 
              new_val = 'AMT' + new_val;
              adapter.log.debug('new_val: ' + new_val);
              adapter.setState (adapter.namespace + '.' + 'command', {val: new_val, ack: false});
                  }        

              // Audio_Mute_Zone2                    
              if (id == adapter.namespace + '.' +'Zone2.Mute') {
                  new_val = state.val;
                  if (new_val == true) {
                      new_val = '01';
                      }
              if  (new_val == false) {
                    new_val = '00';
                      } 
              new_val = 'ZMT' + new_val;
              adapter.log.debug('new_val: ' + new_val);
              adapter.setState (adapter.namespace + '.' + 'command', {val: new_val, ack: false});
                  }        
              
              // Input_Select_Zone1       SLI
              if (id == adapter.namespace + '.' +'Zone1.InputSelect') {
                  new_val = state.val;
                  new_val = 'SLI' + new_val;
              adapter.log.debug('new_val: ' + new_val);
              adapter.setState (adapter.namespace + '.' + 'command', {val: new_val, ack: false});
                  }        

              // Input_Select_Zone2       SLZ
              if (id == adapter.namespace + '.' +'Zone2.InputSelect') {
                  new_val = state.val;
                  new_val = 'SLZ' + new_val;
              adapter.log.debug('new_val: ' + new_val);
              adapter.setState (adapter.namespace + '.' + 'command', {val: new_val, ack: false});
                  }        
                          
              // Internet_Radio_Preset_Zone1   NPR                  
              if (id == adapter.namespace + '.' +'Zone1.NetRadioPreset') {
              var new_val = parseInt(state.val);  //string to integer
              new_val = decimalToHex(state.val).toUpperCase();  //call function decimalToHex();
              new_val = 'NPR' + new_val;
              adapter.log.debug('new_val: ' + new_val);
              adapter.setState (adapter.namespace + '.' + 'command', {val: new_val, ack: false});
                  }

              // Internet_Radio_Preset_Zone2   NPZ
              if (id == adapter.namespace + '.' +'Zone2.NetRadioPreset') {
              var new_val = parseInt(state.val);  //string to integer
              new_val = decimalToHex(state.val).toUpperCase();  //call function decimalToHex();
              new_val = 'NPZ' + new_val;
              adapter.log.debug('new_val: ' + new_val);
              adapter.setState (adapter.namespace + '.' + 'command', {val: new_val, ack: false});
                  }                          
              
              // Tuner_Preset_Zone1  PRS
              if (id == adapter.namespace + '.' +'Zone1.TunerPreset') {
              var new_val = parseInt(state.val);  //string to integer
              new_val = decimalToHex(state.val).toUpperCase();  //call function decimalToHex();
              new_val = 'PRS' + new_val;
              adapter.log.debug('new_val: ' + new_val);
              adapter.setState (adapter.namespace + '.' + 'command', {val: new_val, ack: false});
                  }                          

              // Tuner_Preset_Zone2  PRZ
              if (id == adapter.namespace + '.' +'Zone2.TunerPreset') {
              var new_val = parseInt(state.val);  //string to integer
              new_val = decimalToHex(state.val).toUpperCase();  //call function decimalToHex();
              new_val = 'PRZ' + new_val;
              adapter.log.debug('new_val: ' + new_val);
              adapter.setState (adapter.namespace + '.' + 'command', {val: new_val, ack: false});
                  }                          

              // Power_Zone1    PWR
              if (id == adapter.namespace + '.' +'Zone1.Power') {
                  new_val = state.val;
                  if (new_val == true) {
                      new_val = '01';
                      }
              if  (new_val == false) {
                    new_val = '00';
                      } 
              new_val = 'PWR' + new_val;
              adapter.log.debug('new_val: ' + new_val);
              adapter.setState (adapter.namespace + '.' + 'command', {val: new_val, ack: false});
                  }        
 
              // Power_Zone2    ZPW
              if (id == adapter.namespace + '.' +'Zone2.Power') {
                  new_val = state.val;
                  if (new_val == true) {
                      new_val = '01';
                      }
              if  (new_val == false) {
                    new_val = '00';
                      } 
              new_val = 'ZPW' + new_val;
              adapter.log.debug('new_val: ' + new_val);
              adapter.setState (adapter.namespace + '.' + 'command', {val: new_val, ack: false});
                  }        
              
           }       
        }
	},

  // is called when adapter shuts down - callback has to be called under any circumstances!
    unload: function (callback) {
        try {
            eiscp.close();
        } finally {
            callback();
        }
    },

    ready: function () {
        adapter.subscribeStates('*');
        main();
    }
});

			
			

function decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return hex;
}
   
function main() {
         
    // The adapters config (in the instance object everything under the attribute "native") is accessible via
    // adapter.config:
    eiscp.on("error", function (e) {
        adapter.log.error("Error: " + e);
    });

    // Try to read all states
    adapter.getStatesOf(function (err, objs) {
        if (objs) {
            for (var i = 0; i < objs.length; i++) {
                objects[objs[i]._id] = objs[i];
            }
        }

        const options = {reconnect: true, verify_commands: false};

        if (adapter.config.avrAddress) {
            adapter.log.info('Connecting to AVR ' + adapter.config.avrAddress + ':' + adapter.config.avrPort);
            options.host = adapter.config.avrAddress;
            options.port = adapter.config.avrPort;
        } else {
            adapter.log.info('Starting AVR discovery');
        }

        // Connect to receiver
        eiscp.connect(options);
    });

    eiscp.on('connect', function () {
        adapter.log.info('Successfully connected to AVR');
        adapter.setState('connected', {val: true, ack: true});

        // Query some initial information
        
		var datapoints = new Array(
          'PWRQSTN',
          'MVLQSTN',
		  'ZVLQSTN',
		  'IFAQSTN',
          'SLIQSTN',
		  'SLZQSTN',
		  'ZMTQSTN',
		  'AMTQSTN',
		  'NSTQSTN',
		  'NPRQSTN',
		  'NPZQSTN',
		  'LMDQSTN',
		  'NALQSTN',
		  'NATQSTN',
		  'NTMQSTN',
		  'NTIQSTN',
		  'NTRQSTN',
		  'PRSQSTN',
		  'PRZQSTN',
		  'TUNQSTN',
		  'TUZQSTN',
		  'IFVQSTN',
          'SLAQSTN'
          );
	
        
        setTimeout(function () {
            // Try to read initial values
            for (var i = 0; i < datapoints.length; i++) {
                adapter.setState (adapter.namespace + '.' + 'command', {val: datapoints[i], ack: false});
                }
        }, 5000);
    });

    eiscp.on('close', function () {
        adapter.log.info("AVR disconnected");
        adapter.setState("connected", {val: false, ack: true});
    });

    eiscp.on("data", function (cmd) {
        adapter.log.debug('Got message: ' + JSON.stringify(cmd));
        adapter.log.info('EISCP String: ' + cmd.iscp_command);
    // Here we go to select the RAW feedback and take it to the right variable. The RAW is in cmd.iscp_command
  
        var chunk = cmd.iscp_command.substr(0,3);
        var string = 	cmd.iscp_command.substr(3,80);
 
        adapter.log.debug('chunk: ' + chunk);
        adapter.log.debug('string: ' + string);   
   
     //Onkyo_Power_Zone1
    if (chunk == 'PWR')  {
      string = parseInt(string);                   //convert string to integer
    if (string == '1') {
      adapter.setState (adapter.namespace + '.' + 'Zone1.Power', {val: true, ack: true});
                        }
    if (string == '0') {
      adapter.setState (adapter.namespace + '.' + 'Zone1.Power', {val: false, ack: true});
                        }                                              
                    }
     //Onkyo_Power_Zone2
    if (chunk == 'ZPW')  {
      string = parseInt(string);                   //convert string to integer
    if (string == '1') {
      adapter.setState (adapter.namespace + '.' + 'Zone2.Power', {val: true, ack: true});
                        }
    if (string == '0') {
      adapter.setState (adapter.namespace + '.' + 'Zone2.Power', {val: false, ack: true});
                        } 
                    }
    //Audio information
      if (chunk == 'IFA')  {  
      adapter.setState (adapter.namespace + '.' + 'Device.AudioInformation', {val: string, ack: true});
                    }                    
    //Net Play Status
      if (chunk == 'NST')  {
        var nst_play = string.substr(0,1);         //Play status    (S=Stop,P=Play,p=pause,F,FF,R,FR)
        var nst_repeat = string.substr(1,1);       //Repeat status  (-=Off,R=All,F=Folder,1=Repeat 1)
        var nst_shuffle = string.substr(2,1);      //Shuffle status (-=Off,S=All,A=Album,F=Folder)
		//NET_Play_Status
		switch (nst_play) {
			case 'S' :
				adapter.setState (adapter.namespace + '.' + 'Device.MediaStop', {val: true, ack: true});
			default: 
				adapter.setState (adapter.namespace + '.' + 'Device.MediaStop', {val: false, ack: true});
			break;
			
			case 'P' :
				adapter.setState (adapter.namespace + '.' + 'Device.MediaPlay', {val: true, ack: true});
			default:
				adapter.setState (adapter.namespace + '.' + 'Device.MediaPlay', {val: false, ack: true});
			break;
			
			case 'p' :
				adapter.setState (adapter.namespace + '.' + 'Device.MediaPause', {val: true, ack: true});
			default:
				adapter.setState (adapter.namespace + '.' + 'Device.MediaPause', {val: false, ack: true});
			break;
			
			case 'F' :
				adapter.setState (adapter.namespace + '.' + 'Device.MediaForward', {val: true, ack: true});
			default:
				adapter.setState (adapter.namespace + '.' + 'Device.MediaForward', {val: false, ack: true});
			break;
			
			case 'FF' :
				adapter.setState (adapter.namespace + '.' + 'Device.MediaFastForward', {val: true, ack: true});
			default:
				adapter.setState (adapter.namespace + '.' + 'Device.MediaFastForward', {val: false, ack: true});
			break;
		
			case 'R' :
				adapter.setState (adapter.namespace + '.' + 'Device.MediaReverse', {val: true, ack: true});
			default:
				adapter.setState (adapter.namespace + '.' + 'Device.MediaReverse', {val: false, ack: true});
			break;
		
			case 'FR' :
				adapter.setState (adapter.namespace + '.' + 'Device.MediaFastReverse', {val: true, ack: true});
			default:
				adapter.setState (adapter.namespace + '.' + 'Device.MediaFastReverse', {val: false, ack: true});
			break;
		}	
		
		switch (nst_repeat) {
			case '-' : 	
				adapter.setState (adapter.namespace + '.' + 'Device.MediaState', {val: 'Off', ack: true});
				adapter.setState (adapter.namespace + '.' + 'Device.MediaRepeat', {val: false, ack: true});
				break;
			case 'R' :
				adapter.setState (adapter.namespace + '.' + 'Device.MediaState', {val: 'All', ack: true});
				adapter.setState (adapter.namespace + '.' + 'Device.MediaRepeat', {val: true, ack: true});
				break;
			case 'F' :
				adapter.setState (adapter.namespace + '.' + 'Device.MediaState', {val: 'Folder', ack: true});
				adapter.setState (adapter.namespace + '.' + 'Device.MediaRepeat', {val: true, ack: true});
				break;
			case '1' :
				adapter.setState (adapter.namespace + '.' + 'Device.MediaState', {val: 'Repeat 1', ack: true});
				adapter.setState (adapter.namespace + '.' + 'Device.MediaRepeat', {val: true, ack: true});
				break;
			
		switch (nst_shuffle) {
			case '-' :
				adapter.setState (adapter.namespace + '.' + 'Device.MediaModeShuffleStatus', {val: 'Off', ack: true});
				adapter.setState (adapter.namespace + '.' + 'Device.MediaModeShuffle', {val: '0', ack: true});
				break;
			case 'S' :
				adapter.setState (adapter.namespace + '.' + 'Device.MediaModeShuffleStatus', {val: 'All', ack: true});
				adapter.setState (adapter.namespace + '.' + 'Device.MediaModeShuffle', {val: '1', ack: true});
				break;
			case 'A' :
				adapter.setState (adapter.namespace + '.' + 'Device.MediaModeShuffleStatus', {val: 'Album', ack: true});
				adapter.setState (adapter.namespace + '.' + 'Device.MediaModeShuffle', {val: '1', ack: true});
				break;
			case 'F' :
				adapter.setState (adapter.namespace + '.' + 'Device.MediaModeShuffleStatus', {val: 'Folder', ack: true});
				adapter.setState (adapter.namespace + '.' + 'Device.MediaModeShuffle', {val: '1', ack: true});
				break;
			}	
        
        adapter.setState (adapter.namespace + '.' + 'NET_Shuffle_Status', {val: nst_shuffle, ack: true});
                          }

    //Onkyo_Audio_Mute_Zone1
      if (chunk == 'AMT')  {
        string = parseInt(string);                  //convert string to integer
          if (string == '1') {
      adapter.setState (adapter.namespace + '.' + 'Zone1.Mute', {val: true, ack: true});
                        }
          if (string == '0') {
      adapter.setState (adapter.namespace + '.' + 'Zone1.Mute', {val: false, ack: true});
                        }
                      }                              
 
  //Onkyo_Audio_Mute_Zone2
      if (chunk == 'ZMT')  {
        string = parseInt(string);                  //convert string to integer  
          if (string == '1') {
      adapter.setState (adapter.namespace + '.' + 'Zone2.Mute', {val: true, ack: true});
                        }
          if (string == '0') {
      adapter.setState (adapter.namespace + '.' + 'Zone2.Mute', {val: false, ack: true});
                        } 
                    }

  //Onkyo_Input_Select_Zone1  (hex)
      if (chunk == 'SLI')  {
        string = string.substr(0,2)        
        adapter.setState (adapter.namespace + '.' + 'Zone1.InputSelect', {val: string, ack: true});
                    }
  //Onkyo_Input_Select_Zone2  (hex)
      if (chunk == 'SLZ')  {
        string = string.substr(0,2)  
        adapter.setState (adapter.namespace + '.' + 'Zone2.InputSelect', {val: string, ack: true});
                    }

  //Onkyo_Internet_Radio_Preset_Zone1 
      if (chunk == 'NPR')  {
        string = parseInt(string, 16);              //convert hex to decimal
        adapter.setState (adapter.namespace + '.' + 'Zone1.NetRadioPreset', {val: string, ack: true});
                    }
  //Onkyo_Internet_Radio_Preset_Zone2
      if (chunk == 'NPZ')  {
        string = parseInt(string, 16);              //convert hex to decimal
        adapter.setState (adapter.namespace + '.' + 'Zone2.NetRadioPreset', {val: string, ack: true});
                    }

  //Listening_Mode
      if (chunk == 'LMD')  {
        string = string.substr(0,2)  
        adapter.setState (adapter.namespace + '.' + 'Device.ListeningMode', {val: string, ack: true});
                    }                    
                        
  //Onkyo_NET/USB_Album_Name_Info
      if (chunk == 'NAL')  {
        adapter.setState (adapter.namespace + '.' + 'Device.MediaAlbumName', {val: string, ack: true});
                    }

  //Onkyo_NET/USB_Artist_Name_Info
      if (chunk == 'NAT')  {
        adapter.setState (adapter.namespace + '.' + 'Device.MediaArtistNameInfo', {val: string, ack: true});
                    }

  //Onkyo_NET/USB_Time_Info
      if (chunk == 'NTM')  {
        adapter.setState (adapter.namespace + '.' + 'Device.MediaTimeInfo', {val: string, ack: true});
        var time_current_1 = string.substr(0,2);         // Current time
        time_current_1 = parseInt(time_current_1) * 60 ;
        var time_current_2 = string.substr(3,2);         // Current time
        time_current_2 = parseInt(time_current_2);
        var time_current =  time_current_1 + time_current_2 ;
        var time_1 = string.substr(6,2);                 // time
        time_1 = parseInt(time_1) * 60 ;
        var time_2 = string.substr(9,2);                 // time
        time_2 = parseInt(time_2);
        var time = time_1 + time_2 ;              
        adapter.setState (adapter.namespace + '.' + 'Device.MediaTimeCurrent', {val: time_current, ack: true});
        adapter.setState (adapter.namespace + '.' + 'Device.MediaTime', {val: time, ack: true});
                    }

  //Onkyo_NET/USB_Title_Name
      if (chunk == 'NTI')  {
        adapter.setState (adapter.namespace + '.' + 'MediaTitelName', {val: string, ack: true});
                    }

  //Onkyo_NET/USB_Track_Info
      if (chunk == 'NTR')  {
        adapter.setState (adapter.namespace + '.' + 'Device.MediaTrack', {val: string, ack: true});
                    }

  //Onkyo_Tuner_Preset_Zone1
      if (chunk == 'PRS')  {
        string = parseInt(string, 16);              //convert hex to decimal
        adapter.setState (adapter.namespace + '.' + 'Zone1.TunerPreset', {val: string, ack: true});
                    }
  //Onkyo_Tuner_Preset_Zone2
      if (chunk == 'PRZ')  {
        string = parseInt(string, 16);              //convert hex to decimal
        adapter.setState (adapter.namespace + '.' + 'Zone2.TunerPreset', {val: string, ack: true});
                    }

  //Onkyo_Tuning_Zone1
      if (chunk == 'TUN')  {
        string = parseInt(string) / 100;            //set dot for decimal
        adapter.setState (adapter.namespace + '.' + 'Zone1.Tune', {val: string, ack: true});
                    }
  //Onkyo_Tuning_Zone2                    
      if (chunk == 'TUZ')  {
        string = parseInt(string) / 100;            //set dot for decimal
        adapter.setState (adapter.namespace + '.' + 'Zone2.Tune', {val: string, ack: true});
                    }

  //Video_information
      if (chunk == 'IFV')  {
        adapter.setState (adapter.namespace + '.' + 'Device.VideoInformation', {val: string, ack: true});
                    }  

  //Onkyo_Volume_Zone1
      if (chunk == 'MVL')  {
        string = parseInt(string, 16);              //convert hex to decimal - backward: string = string.toString(16);
        adapter.setState (adapter.namespace + '.' + 'Zone1.Volume', {val: string, ack: true});
                    }
  //Onkyo_Volume_Zone2
      if (chunk == 'ZVL')  {
        string = parseInt(string, 16);              //convert hex to decimal
        adapter.setState (adapter.namespace + '.' + 'Zone2.Volume', {val: string, ack: true});
                    }                     
    });

    eiscp.on("debug", function (message) {
        adapter.log.debug(message);
    });
}