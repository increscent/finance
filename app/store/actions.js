export const PUSH_VIEW = 'PUSH_VIEW';
export const POP_VIEW = 'POP_VIEW';
export const POP_ALL_VIEWS = 'POP_ALL_VIEWS';
export const POP_ALL_VIEWS_BUT_ONE = 'POP_ALL_VIEWS_BUT_ONE';

export const pushView = (component, title) => ({
  type: PUSH_VIEW,
  component,
  title
});

export const popView = (count) => ({
  type: POP_VIEW,
  count
});

export const popAllViews = () => ({
  type: POP_ALL_VIEWS
});

export const popAllViewsButOne = () => ({
  type: POP_ALL_VIEWS_BUT_ONE
});
