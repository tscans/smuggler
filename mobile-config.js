App.accessRule('https://js.stripe.com/*', { type: 'navigation' });
App.accessRule('http://localhost*', { type: 'navigation' });

// This section sets up some basic app metadata, the entire section is optional.
App.info({
  id: 'com.example.option.veer',
  name: 'Veer',
  description: 'Veer into a better option.',
  author: 'Tom Scanlan',
  email: 'tscanlan@mchs.org',
  website: 'http://veeroption.com'
});
// Set up resources such as icons and launch screens.
App.icons({
  'iphone': 'public/mainlogo.png',
  'iphone_3x': 'public/mainlogo.png',
  // More screen sizes and platforms...
});
App.launchScreens({
  'iphone': 'public/mainlogo.png',
  'iphone_2x': 'public/mainlogo.png',
  'iphone6': 'public/mainlogo.png',
  'iphone6p_portrait': 'public/mainlogo.png'
  // More screen sizes and platforms...
});
// Set PhoneGap/Cordova preferences.
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
// Pass preferences for a particular PhoneGap/Cordova plugin.

// Add custom tags for a particular PhoneGap/Cordova plugin to the end of the
// generated config.xml. 'Universal Links' is shown as an example here.
App.appendToConfig(`
  <universal-links>
    <host name="localhost:3000" />
  </universal-links>
`);