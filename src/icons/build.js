const req = require.context('../assets/icons/', true, /\.svg$/);
req.keys().forEach(fileName => req(fileName));
