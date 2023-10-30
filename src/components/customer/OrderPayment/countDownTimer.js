export const countDownTimer = (ms) => {
  const s = Math.round(ms / 1000);
  const hour = Math.floor(s / 3600);
  const minute = Math.floor((s % 3600) / 60);
  const second = Math.floor((s % 3600) % 60);

  return `${hour < 10 ? 0 : ''}${hour}:${minute < 10 ? 0 : ''}${minute}:${
    second < 10 ? 0 : ''
  }${second}`;
};
