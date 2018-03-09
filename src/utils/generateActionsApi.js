export const PROGRESS = 'PROGRESS';
export const SUCCESS = 'SUCCESS';
export const SUCCESS_EMPTY = 'SUCCESS_EMPTY';
export const FAILED = 'FAILED';

const isFunction = next => typeof next === 'function';

export const listResolve = (request, action, payloadString, dispatch, params = {}, next = null) => {
  dispatch({
    type: `${action}_${PROGRESS}`,
  });

  request(...Object.keys(params).map(e => params[e]))
    .then((response) => {
      if (response.data.ModelData !== '') {
        if (isFunction(next) === true) {
          next(null, true);
        }
        dispatch({
          type: `${action}_${SUCCESS}`,
          [payloadString]: response.data.ModelData,
        });
      } else if (response.data.Message.Flag === false ||
        !response.data.ModelData
      ) {
        dispatch({
          type: `${action}_${SUCCESS_EMPTY}`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      if (isFunction(next) === true) {
        next(err, false);
      }
      dispatch({
        type: `${action}_${FAILED}`,
      });
    });
};

export const resolveAction = (request, action, dispatch, params = {}, next = null) => {
  dispatch({
    type: `${action}_${PROGRESS}`,
  });

  request(params)
    .then((response) => {
      if (response.data.ModelData !== '' && response.data.Message.Flag === true) {
        if (isFunction(next) === true) {
          next(null, true);
        }
        dispatch({
          type: `${action}_${SUCCESS}`,
        });
      } else if (response.data.Message.Flag === false) {
        dispatch({
          type: `${action}_${FAILED}`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      if (isFunction(next) === true) {
        next(err, false);
      }
      dispatch({
        type: `${action}_${FAILED}`,
      });
    });
};
