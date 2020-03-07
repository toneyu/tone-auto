export const feedbackSelector = (host, path) => (state) => state.feedbacks.entities[host]?.[path];
