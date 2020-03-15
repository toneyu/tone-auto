// import { put } from 'redux-saga/effects';
// import {
//   script1Success,
//   script1Failure,
//   script2Success,
//   script2Failure,
//   script3Success,
//   script3Failure,
//   script4Success,
//   script4Failure,
// } from '../actions/scripts';

// export function* script1Saga(xapi) {
//   try {
//     let response;
//     // Enable selfview from the touchpad or remote
//     yield xapi.config.set('Video Selfview Default Mode', 'On');
//     response = yield xapi.config.get('Video Selfview Default Mode');
//     console.log(response);

//     // // Disable selfview from the touchpad or remote
//     yield xapi.config.set('Video Selfview Default Mode', 'Off');
//     response = yield xapi.config.get('Video Selfview Default Mode');
//     console.log(response);

//     // Change the status of the endpoint from Available to Do Not Disturb
//     yield xapi.command('Conference DoNotDisturb Deactivate');
//     response = yield xapi.status.get('Conference DoNotDisturb');
//     console.log(response);

//     // // Place a call to the endpoint from any other endpoint
//     yield xapi.command('Dial', { Number: '1' });
//     console.log(response);
//     //response = yield xapi.status.get('Dial', { Number: '1' });
//     //console.log(response);

//     // Change the status of the endpoint from Do Not Disturb to Available
//     yield xapi.command('Conference DoNotDisturb Activate');
//     response = yield xapi.status.get('Conference DoNotDisturb');
//     console.log(response);

//     // // Place a call to the endpoint from any other endpoint
//     response = yield xapi.command('Dial', { Number: '2' });
//     console.log(response);
//     //response = yield xapi.status.get('Dial', { Number: '2' });
//     //console.log(response);

//     // // Dial out to 917039480488
//     yield xapi.command('Dial', { Number: '917039480488' });
//     console.log(response);
//     //response = yield xapi.status.get('Dial', { Number: '917039480488' });
//     //console.log(response);

//     //Disconnect from call
//     yield xapi.command('Call Disconnect');
//     console.log(response);
//     response = yield xapi.status.get('Call');
//     console.log(response);

//     //Check current volume/mute status
//     yield xapi.status.get('Audio');
//     response = yield xapi.status.get('Audio');
//     console.log(response);

//     yield put(script1Success());
//   } catch (e) {
//     yield put(script1Failure(e));
//   }
// }

// export function* script2Saga(xapi) {
//   try {
//     let response;

//     //Mute/Unmute both endpoints and speak
//     yield xapi.status.get('Audio VolumeMute');
//     response = yield xapi.status.get('Audio VolumeMute');
//     console.log(response);

//     //Resume the call
//     yield xapi.command('Call Resume');
//     response = yield xapi.status.get('Call');
//     console.log(response);

//     //Place the second endpoint on hold
//     yield xapi.command('Call Hold');
//     response = yield xapi.status.get('Call');
//     console.log(response);

//     //Disconnect both endpoints from call
//     yield xapi.command('Call Disconnect');
//     response = yield xapi.status.get('Call');
//     console.log(response);

//     yield put(script2Success());
//   } catch (e) {
//     yield put(script2Failure(e));
//   }
// }

// export function* script3Saga(xapi) {
//   try {
//     let response;

//     //Mute/Unmute both endpoints and speak
//     yield xapi.status.get('Audio VolumeMute');
//     response = yield xapi.status.get('Audio VolumeMute');
//     console.log(response);

//     //Resume the call
//     yield xapi.command('Call Resume');
//     response = yield xapi.status.get('Call');
//     console.log(response);

//     //Place the second endpoint on hold
//     yield xapi.command('Call Hold');
//     response = yield xapi.status.get('Call');
//     console.log(response);

//     //Disconnect both endpoints from call
//     yield xapi.command('Call Disconnect');
//     response = yield xapi.status.get('Call');
//     console.log(response);

//     yield put(script3Success());
//   } catch (e) {
//     yield put(script3Failure(e));
//   }
// }

// export function* script4Saga(xapi) {
//   try {
//     let response;

//     //Mute/Unmute both endpoints and speak
//     yield xapi.status.get('Audio VolumeMute');
//     response = yield xapi.status.get('Audio VolumeMute');
//     console.log(response);

//     //Place the second endpoint on hold
//     yield xapi.command('Call Hold');
//     response = yield xapi.status.get('Call');
//     console.log(response);

//     //Resume the call
//     yield xapi.command('Call Resume');
//     response = yield xapi.status.get('Call');
//     console.log(response);

//     //Disconnect both endpoints from call
//     yield xapi.command('Call Disconnect');
//     response = yield xapi.status.get('Call');
//     console.log(response);

//     yield put(script4Success());
//   } catch (e) {
//     yield put(script4Failure(e));
//   }
// }
