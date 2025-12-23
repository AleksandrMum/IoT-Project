/* ESP32 IoT Controller - API Only
   Управляется через Node.js сервер
   Периодически опрашивает сервер для синхронизации состояния
*/
#include <WiFi.h>
#include <WiFiClient.h>
#include <WebServer.h>
#include <HTTPClient.h>
#include <uri/UriBraces.h>

#include "handlers.h"

#define WIFI_SSID "Wokwi-GUEST"
#define WIFI_PASSWORD ""
#define WIFI_CHANNEL 6

// Node.js сервер (в Wokwi используется host.wokwi.internal для доступа к localhost)
#define NODE_SERVER "http://host.wokwi.internal:8080"
#define CONTROLLER_ID 1
#define POLL_INTERVAL 2000  // Опрос состояния каждые 2 секунды

WebServer server(80);

bool led1State = false;
bool led2State = false;
unsigned long lastPollTime = 0;

// Функция отправки состояния в БД
void sendStateToDatabase(int deviceIndex, bool state) {
  HTTPClient http;
  
  String url = String(NODE_SERVER) + "/api/devices/update-state";
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  
  String jsonPayload = "{\"controller_id\":" + String(CONTROLLER_ID) + 
                       ",\"device_index\":" + String(deviceIndex) + 
                       ",\"state\":" + (state ? "true" : "false") + "}";
  
  Serial.println("Sending state to server:");
  Serial.println(jsonPayload);
  
  int httpCode = http.POST(jsonPayload);
  
  if (httpCode > 0) {
    Serial.print("Response code: ");
    Serial.println(httpCode);
    String response = http.getString();
    Serial.println("Response: " + response);
  } else {
    Serial.print("Error: ");
    Serial.println(httpCode);
  }
  
  http.end();
}

// Функция получения состояния с сервера
void pollStateFromServer() {
  HTTPClient http;
  
  String url = String(NODE_SERVER) + "/api/controllers/" + String(CONTROLLER_ID) + "/states";
  http.begin(url);
  
  int httpCode = http.GET();
  
  if (httpCode == 200) {
    String payload = http.getString();
    
    // Парсинг JSON ответа
    StaticJsonDocument<512> doc;
    DeserializationError error = deserializeJson(doc, payload);
    
    if (!error) {
      JsonArray devices = doc.as<JsonArray>();
      
      // Обновляем состояния устройств
      if (devices.size() >= 2) {
        bool newLed1State = devices[0]["state"];
        bool newLed2State = devices[1]["state"];
        
        // Применяем изменения только если они отличаются
        if (newLed1State != led1State) {
          led1State = newLed1State;
          digitalWrite(LED1, led1State);
          Serial.print("LED1 synced: ");
          Serial.println(led1State ? "ON" : "OFF");
        }
        
        if (newLed2State != led2State) {
          led2State = newLed2State;
          digitalWrite(LED2, led2State);
          Serial.print("LED2 synced: ");
          Serial.println(led2State ? "ON" : "OFF");
        }
      }
    } else {
      Serial.println("JSON parse error");
    }
  } else {
    Serial.print("Poll error: ");
    Serial.println(httpCode);
  }
  
  http.end();
}

void setupWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD, WIFI_CHANNEL);
  Serial.print("Connecting to WiFi ");
  Serial.print(WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }
  Serial.println(" Connected!");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void setup(void) {
  Serial.begin(115200);
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);

  setupWiFi();

  server.on("/", sendHtml);
  server.on(UriBraces("/toggle/{}"), handleToggleLed);
  
  server.begin();
  Serial.println("HTTP server started successfully!");
  Serial.print("Connecting to Node.js server at: ");
  Serial.println(NODE_SERVER);
}

void loop(void) {
  server.handleClient();
  
  // Периодический опрос состояния с сервера
  unsigned long currentTime = millis();
  if (currentTime - lastPollTime >= POLL_INTERVAL) {
    pollStateFromServer();
    lastPollTime = currentTime;
  }
  
  delay(40);
}
