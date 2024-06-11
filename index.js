// Device Constructor
function Device(name, type, status = "off") {
  this.name = name;
  this.type = type;
  this.status = status;
}

Device.prototype.turnOn = function() {
  this.status = "on";
  console.log(`${this.name} is now turned on.`);
};

Device.prototype.turnOff = function() {
  this.status = "off";
  console.log(`${this.name} is now turned off.`);
};

Device.prototype.checkStatus = function() {
  console.log(`${this.name} is currently ${this.status}.`);
};

// SmartDevice Constructor
function SmartDevice(name, type, brand, connectivity, status = "off") {
  Device.call(this, name, type, status);
  this.brand = brand;
  this.connectivity = connectivity;
}

SmartDevice.prototype = Object.create(Device.prototype);
SmartDevice.prototype.constructor = SmartDevice;

SmartDevice.prototype.updateFirmware = async function() {
  try {
    const response = await fetch('https://api.firmware-update.com/update', {
      method: 'POST',
      body: JSON.stringify({ brand: this.brand }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(`Firmware updated for ${this.name}: ${data.message}`);
  } catch (error) {
    console.error(`Error updating firmware for ${this.name}: ${error.message}`);
  }
};

SmartDevice.prototype.checkConnectivity = function() {
  console.log(`${this.name} connectivity status: ${this.connectivity}`);
};

// SmartLight Constructor
function SmartLight(name, brand, connectivity, brightness = 100, color = "white") {
  SmartDevice.call(this, name, "light", brand, connectivity);
  this.brightness = brightness;
  this.color = color;
}

SmartLight.prototype = Object.create(SmartDevice.prototype);
SmartLight.prototype.constructor = SmartLight;

SmartLight.prototype.adjustBrightness = function(brightness) {
  this.brightness = brightness;
  console.log(`${this.name} brightness adjusted to ${this.brightness}.`);
};

SmartLight.prototype.changeColor = function(color) {
  this.color = color;
  console.log(`${this.name} color changed to ${this.color}.`);
};

// SmartThermostat Constructor
function SmartThermostat(name, brand, connectivity, temperature = 25, mode = "auto") {
  SmartDevice.call(this, name, "thermostat", brand, connectivity);
  this.temperature = temperature;
  this.mode = mode;
}

SmartThermostat.prototype = Object.create(SmartDevice.prototype);
SmartThermostat.prototype.constructor = SmartThermostat;

SmartThermostat.prototype.setTemperature = function(temperature) {
  this.temperature = temperature;
  console.log(`${this.name} temperature set to ${this.temperature}°C.`);
};

SmartThermostat.prototype.changeMode = function(mode) {
  this.mode = mode;
  console.log(`${this.name} mode changed to ${this.mode}.`);
};

// User Constructor
function User(username, password) {
  this.username = username;
  this.password = password;
}

User.prototype.authenticate = async function() {
  try {
    const response = await fetch('https://api.authentication.com/authenticate', {
      method: 'POST',
      body: JSON.stringify({ username: this.username, password: this.password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(`User authenticated: ${data.message}`);
  } catch (error) {
    console.error(`Authentication failed: ${error.message}`);
  }
};

User.prototype.manageSmartHome = function(action, device) {
  if (action === "add") {
    console.log(`${this.username} added ${device.name} to their smart home.`);
  } else if (action === "remove") {
    console.log(`${this.username} removed ${device.name} from their smart home.`);
  } else {
    console.log(`Invalid action: ${action}`);
  }
};

// Demonstration
const smartLight = new SmartLight("Living Room Light", "Philips", "Wi-Fi");
const smartThermostat = new SmartThermostat("Living Room Thermostat", "Nest", "Zigbee");

const user = new User("john_doe", "password123");

user.authenticate();

smartLight.turnOn();
smartThermostat.turnOn();

smartLight.adjustBrightness(70);
smartLight.changeColor("blue");

smartThermostat.setTemperature(22);
smartThermostat.changeMode("manual");

user.manageSmartHome("add", smartLight);
user.manageSmartHome("add", smartThermostat);
