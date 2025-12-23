#ifndef HANDLERS_H
#define HANDLERS_H

#include <Arduino.h>

#define LED1 26
#define LED2 27

#define NODE_SERVER "http://host.wokwi.internal:8080"

void sendHtml();
void handleToggleLed();
void sendSensorData(int deviceIndex, bool state);

#endif
