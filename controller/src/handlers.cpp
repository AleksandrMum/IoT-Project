#include "handlers.h"
#include <WebServer.h>
#include <HTTPClient.h>

extern WebServer server;
extern bool led1State, led2State;

void sendHtml() {
  String response = R"(

<!DOCTYPE html><html>
  <head>
    <title>ESP32 Web Server</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      html { font-family: sans-serif; text-align: center; }
      body { display: inline-flex; flex-direction: column; }
      h1 { margin-bottom: 1.2em; } 
      h2 { margin: 0; }
      div { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto auto; grid-auto-flow: column; grid-gap: 1em; }
      .btn { background-color: #5B5; border: none; color: #fff; padding: 0.5em 1em;
              font-size: 2em; text-decoration: none }
      .btn.OFF { background-color: #333; }
    </style>
  </head>
        
  <body>
    <h1>ESP32 Web Server</h1>

    <div>
      <h2>LED 1</h2>
      <a href="/toggle/1" class="btn LED1_TEXT">LED1_TEXT</a>
      <h2>LED 2</h2>
      <a href="/toggle/2" class="btn LED2_TEXT">LED2_TEXT</a>
    </div>

    <h2>Powered By Mumladze Aleksandr KTbo3-2</h2>
  </body>
</html>
  
  )";
  response.replace("LED1_TEXT", led1State ? "ON" : "OFF");
  response.replace("LED2_TEXT", led2State ? "ON" : "OFF");
  server.send(200, "text/html", response);
}

void sendSensorData(int deviceIndex, bool state) {
  HTTPClient http;
  
  String url = NODE_SERVER + "/api/devices/update-state";
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  
  String jsonPayload = "{\"controller_id\":1,\"device_index\":" + String(deviceIndex) + 
                       ",\"state\":" + (state ? "true" : "false") + "}";
  
  Serial.println("Sending sensor data:");
  Serial.println(jsonPayload);
  
  int httpResponseCode = http.POST(jsonPayload);
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    Serial.println("Response: " + response);
  } else {
    Serial.print("Error on sending POST: ");
    Serial.println(httpResponseCode);
  }
  
  http.end();
}

void handleToggleLed() {
  String led = server.pathArg(0);
  Serial.print("Toggle LED #");
  Serial.println(led);

  switch (led.toInt()) {
    case 1:
      led1State = !led1State;
      digitalWrite(LED1, led1State);
      sendSensorData(1, led1State);
      break;
    case 2:
      led2State = !led2State;
      digitalWrite(LED2, led2State);
      sendSensorData(2, led2State);
      break;
  }

  sendHtml();
}


