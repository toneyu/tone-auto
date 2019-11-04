import * as jsxapi from 'jsxapi';

export default (
  onClose,
  { host, password } = {
    host: '10.12.15.158',
    password: 'fabC711',
  },
) =>
  new Promise((resolve, reject) =>
    jsxapi
      .connect(`ssh://${host}`, {
        username: 'admin',
        password,
      })
      .on('error', reject)
      .on('ready', resolve)
      .on('close', onClose),
  );
