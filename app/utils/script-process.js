import xml2js from 'xml2js';

const builder = new xml2js.Builder();

/**
 * @param {Script Entity} script
 * @param {number} index
 * @return {{
 *   type: string,
 *   name: string,
 *   description: string,
 *   payload: string,
 * }}
 */

export const getStep = (script, index) => {
  let { Step } = script.Script.Steps;
  if (!Array.isArray(Step)) {
    Step = [Step];
  }
  const step = Step[index];

  let payload;
  const { type } = step.$;
  if (type === 'putxml') {
    payload = {
      host: step.Host,
      putxml: builder.buildObject(step.putxml),
    };
  } else if (type === 'feedbacks') {
    payload = { label: step.Feedback.$.label, path: step.Feedback._ };
  }
  return {
    ...step.$,
    payload,
  };
};

export const getSteps = (script) => {
  let { Step: steps } = script.Script.Steps;
  if (!Array.isArray(steps)) {
    steps = [steps];
  }

  return steps.map((_, index) => {
    return getStep(script, index);
  });
};
