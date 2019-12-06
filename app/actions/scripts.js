export const SCRIPT_1_REQUEST = 'SCRIPT_1_REQUEST';
export const SCRIPT_1_SUCCESS = 'SCRIPT_1_SUCCESS';
export const SCRIPT_1_FAILURE = 'SCRIPT_1_FAILURE';

export const SCRIPT_2_REQUEST = 'SCRIPT_2_REQUEST';
export const SCRIPT_2_SUCCESS = 'SCRIPT_2_SUCCESS';
export const SCRIPT_2_FAILURE = 'SCRIPT_2_FAILURE';

export const SCRIPT_3_REQUEST = 'SCRIPT_3_REQUEST';
export const SCRIPT_3_SUCCESS = 'SCRIPT_3_SUCCESS';
export const SCRIPT_3_FAILURE = 'SCRIPT_3_FAILURE';

export const SCRIPT_4_REQUEST = 'SCRIPT_4_REQUEST';
export const SCRIPT_4_SUCCESS = 'SCRIPT_4_SUCCESS';
export const SCRIPT_4_FAILURE = 'SCRIPT_4_FAILURE';

export const script1Request = () => ({
  type: SCRIPT_1_REQUEST,
});
export const script1Success = () => ({
  type: SCRIPT_1_SUCCESS,
});
export const script1Failure = (error) => ({
  type: SCRIPT_1_FAILURE,
  error,
});

export const script2Request = () => ({
  type: SCRIPT_2_REQUEST,
});
export const script2Success = () => ({
  type: SCRIPT_2_SUCCESS,
});
export const script2Failure = (error) => ({
  type: SCRIPT_2_FAILURE,
  error,
});

export const script3Request = () => ({
  type: SCRIPT_3_REQUEST,
});
export const script3Success = () => ({
  type: SCRIPT_3_SUCCESS,
});
export const script3Failure = (error) => ({
  type: SCRIPT_3_FAILURE,
  error,
});

export const script4Request = () => ({
  type: SCRIPT_4_REQUEST,
});
export const script4Success = () => ({
  type: SCRIPT_4_SUCCESS,
});
export const script4Failure = (error) => ({
  type: SCRIPT_4_FAILURE,
  error,
});
