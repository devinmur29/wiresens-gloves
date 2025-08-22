---
title: Recording Instructions
layout: base.njk
---

# Recording Instructions

Before taking a recording with your gloves, you will need to download software and firmware, upload firmware to microcontrollers, and use the software to cofigure the devices.

## Setup Software

Follow the installation instructions in the following GitHub Repos

- WiSens Toolkit [repo link](https://github.com/devinmur29/WiSensToolkit/tree/main): Firmware for microcontrollers
- WiReSensBackend [repo link](https://github.com/devinmur29/WiReSensBackend): Python library for interfacing with sensors
- (Optional) WiReSensWeb [repo link](https://github.com/devinmur29/WiReSensWeb): Real-time visualizer and GUI. Accessible from https://wi-re-sens-web.vercel.app/ with an internet connection. To have access to the web GUI without an internet connection you will need to set it up locally. 


## Upload Firmware

A transmitter is defined as a microcontroller which is attached to the readout circuit connected to an actual glove sensor via flex cables.

A receiver is a lone microcontroller which receives wireless data from the glove sensors (the transmitter microcontroller) and forwards it to the laptop.

If you plan to use ESP-NOW (recommended for most portable, fastest throughput, longest range wireless comms), you will need to upload firmware to both the receiver and transmitter microcontrollers. Otherwise (if you plan to use over USB-serial, WiFi, or Bluetooth), it is only necessary to upload to the transmitter.

### Upload Receiver Firmware

1. Grab an ESP32 which will be the receiver, and connect it to your laptop via a USB cable. 
2. Open the folder with the WiSensToolkit repository in VsCode. Set the serial port by searching for the `pioarduino: set project port` command.  Ctrl + Shift + P > Search and select command > Select Serial Port. The Port will say something like CP210x USB to UART Bridge. 
![select port 1](assets/setport1.png)
![select port 2](assets/setport2.png)
3. Open the file platformio.ini and make sure the `build_src_filter` reads `build_src_filter = +<espReceive.cpp> -<scanArray.cpp> -<noCalibrate.cpp>`. (This sets the receiver code as the code to be uploaded)
4.  Upload espReceive.cpp by running the `pioarduino: Upload and monitor` command
![upload](assets/uploadFirmware.png)
5. In the serial monitor that opens, find and make a note of the MAC address of the receiver, converting each hex to decimal (you can use an [online converter](https://www.rapidtables.com/convert/number/hex-to-decimal.html)). For example `14:2b:2f:ca:6b:80` -> `[20,43,47,202,107,128]`. When done you can disconnect the receiver from your laptop. 

![mac](assets/macAddress.png)


### Upload Transmitter Firmware

Grab the esp32 connected to the readout circuit to be the transmitter, and connect it to your laptop via a USB cable. Follow steps 1-4 again, instead making sure the build_src_filter is `build_src_filter = -<espReceive.cpp> -<scanArray.cpp> +<noCalibrate.cpp>`

## Configure Transmitter

The rest of the setup takes place in the WiReSensBackend and Web GUI.

1. Activate your python environment and start the python backend (python startBackend.py). Also visit https://wi-re-sens-web.vercel.app/ in the browser.
2.
3. Load config → oneGloveTransmitter{left or right}.json. Device Panel → Edit button → Program Device4
4. Load config → oneGloveReceiver{left or right}.json.  Click Record to test that the device is working.

## Recording from the Web GUI

## Calibrating the Gloves

## Recording from the Backend

## Running custom Python methods on data in real time



